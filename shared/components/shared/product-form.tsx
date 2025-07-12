'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { useCartStore } from '@/shared/store/cart'
import React from 'react'
import { ChosePizzaForm } from './chose-pizza-form'
import toast from 'react-hot-toast'
import router from 'next/router'
import { ChoseProductForm } from './chose-product-form'

interface Props {
    product:ProductWithRelations
    onSubmit?:VoidFunction
    className?:string
}

export const ProductForm: React.FC<Props> =({product,onSubmit: _onSubmit}) => {
    const [addCartItem,loading] = useCartStore(state => [state.addCartItem,state.loading]) 
    const firstItem = product.items[0]
    const isPizzaForm = Boolean(firstItem.pizzaType)

    const onSubmit = async (productItemId?:number,ingredients?:number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id
            
            await addCartItem({
                productItemId:itemId,
                ingredients,
            })

            toast.success(`Added ${product.name} to the cart`)

            _onSubmit?.()

        } catch (error) {
            toast.error(`Didn't add  ${product.name} to the cart`)
            console.error(error);
        }
    }

    if(isPizzaForm){
        return (
            <ChosePizzaForm 
                loading={loading} 
                onSubmit={onSubmit} 
                items={product.items} 
                imageUrl={product.imageUrl} 
                name={product.name} 
                ingredients={product.ingredients}
            />
        )
    }

    return (
        <ChoseProductForm 
            loading={loading} 
            onSubmit={onSubmit} 
            price={firstItem.price} 
            imageUrl={product.imageUrl} 
            name={product.name}
        />
    )

}