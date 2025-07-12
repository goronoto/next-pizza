import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import crypto from 'crypto';
import { CreateCartItemValues } from '@/shared/services/cart-dto';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';


export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('CartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'did able to get the cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('CartToken')?.value;
    if (!token) {
      token = crypto.randomUUID();
    }
    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every:{
            id:{in:data.ingredients },
          },
        }
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    
    if (!req.cookies.has('CartToken')) {
        resp.cookies.set('CartToken', token, { httpOnly: true, path: '/' });
    }

    return resp;

  } catch (error) {
    console.error('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не вдалося обробити запит' }, { status: 500 });
  }
}