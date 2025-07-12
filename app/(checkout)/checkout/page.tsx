'use client'

import { Container, Title } from "@/shared/components/shared";
import { CheckoutSideBar } from "@/shared/components/shared/checkout-sidebar";
import { useCart } from "@/shared/hooks/use-cart";
import { useForm, FormProvider } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { CheckoutCart } from "@/shared/components/shared/checkout/checkout-cart";
import { CheckoutAddressForm } from "@/shared/components/shared/checkout/checkout-address-form";
import { CheckoutPersonalForm } from "@/shared/components/shared/checkout/checkout-personal-form";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/components/shared/checkout/schemas/checkout-form-schemas";
import { createOrder } from "@/app/actions";
import React from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const [submitting,setSubmitting] = React.useState(false)
    const {totalAmount,updateItemQuantity,removeCartItem,items,loading} = useCart()

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues:{
            email:'',
            firstName:'',
            lastName:'',
            phone:'',
            address:'',
            comment:''
        }
    })

    const onSubmit = async (data:CheckoutFormValues) => {
        try {
            setSubmitting(true)
            const url = await createOrder(data);
            toast.error('Order was create successfully', {
                icon: '✅',
            });

        } catch (error) {
            console.log(error);
            setSubmitting(false)
            toast.error('failed to create an order'),{
                icon: '❌',
            }
        }
    }

    return (
        <Container className="mt-10">
            <Title text="Place an order" className="font-extrabold mb-8 text-[36px]"/>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/*LEFT SIDE*/}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart loading={loading} items={items} removeCartItem={removeCartItem} onClickCountButton={onClickCountButton}/>

                            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ''}/>

                            <CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ''}/>
                        </div>

                        {/*RIGHT SIDE*/}
                        <div className="w-[450px]">
                            <CheckoutSideBar totalAmount={totalAmount} loading={loading || submitting}/>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}