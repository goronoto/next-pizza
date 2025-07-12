'use server'

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/checkout/schemas/checkout-form-schemas";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { VerificationUserTemplate } from '@/shared/components/shared/email-templates/verification-user';
import { sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data:CheckoutFormValues){
    try {
        const cookieStore = cookies()
        const cartToken = cookieStore.get("CartToken")?.value

        if(!cartToken){
            throw new Error('Cart token not found')
        }

        /*Find cart by token*/
        const userCart = await prisma.cart.findFirst({
            include:{
                user:true,
                items:{
                    include:{
                        ingredients:true,
                        productItem:{
                            include:{
                                product:true
                            }
                        }
                    }
                }
            },
            where:{
                token: cartToken
            }
        })

        /*If cart not found return error*/
        if(!userCart){
            throw new Error('Cart is not found')
        }

        /*If cart is empty return error*/
        if(userCart?.totalAmount === 0){
            throw new Error('Cart is empty')
        }

        /**/
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });

        /*Clear the cart*/
        await prisma.cart.update({
            where:{
                id:userCart.id
            },
            data:{
                totalAmount:0
            }

        })
        
        await prisma.cartItem.deleteMany({
            where:{
                cartId:userCart.id
            }
        })

        /*Create a link for payment */

        await sendEmail(data.email,'Next Pizza | Pay for order #' + order.id,PayOrderTemplate({
            orderId:order.id,
            totalAmount:order.totalAmount,
            paymentUrl:'https://resend.com/docs/send-with-nextjs'
        }))
    } catch (error) {
        console.log('[CatchOrder] Server error',error);
        
    }
}

export async function updateUserInfo(body:Prisma.UserUpdateInput){
    try {
        const currentUser = await getUserSession()

        if(!currentUser){
            throw new Error(`User wasn't found`)
        }

        const findUser = await prisma.user.findFirst({
            where:{
                id:Number(currentUser.id)
            }
        }) 

        await prisma.user.update({
            where:{
                id:Number(currentUser.id)
            },
            data:{
                fullName:body.fullName,
                email:body.email,
                password:body.password ? hashSync(body.password as string,10) : findUser?.password
            }
        })
        
    } catch (error) {
        console.log('Error [UPDATE_USER]',error);
        throw error
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / 📝 Подтверждение регистрации',
      VerificationUserTemplate({
        code,
      }),
    );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}