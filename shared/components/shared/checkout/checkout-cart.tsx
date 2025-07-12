import React from 'react'
import { WhiteBlock } from '../white-block'
import { CheckoutItem } from '../checkout-item'
import { getCartItemDetails } from '@/shared/lib'
import { CartStateItem } from '@/shared/lib/get-cart-details'
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from '@/shared/hooks/use-cart'
import { Skeleton } from '../../ui'
import { CheckoutItemSkeleton } from '../checkout-item-skeleton'

interface Props {
    className?:string;
    onClickCountButton:(id:number,quantity:number,type:'plus'|'minus') => void;
    items:CartStateItem[];
    loading?:boolean
    removeCartItem:(id:number) => void
}

export const CheckoutCart: React.FC<Props> =({className,items,onClickCountButton,removeCartItem,loading}) => {
    return (
        <WhiteBlock title="1. Cart" className={className}>
            
            <div className="flex flex-col gap-5">
            {loading ? [...Array(4)].map((_,index) => <CheckoutItemSkeleton key={index} />)
                    : !loading && items.length && items.map((item) => (
                    <CheckoutItem 
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={
                            getCartItemDetails(
                                item.ingredients,
                                item.pizzaType as PizzaType,
                                item.pizzaSize as PizzaSize
                            )
                        }
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        disabled={item.disabled}
                        onClickCountButton={(type) =>
                            onClickCountButton(item.id, item.quantity, type)
                        }
                        onClickRemove={() => removeCartItem(item.id)}
                    />
                ))}
            </div>
        </WhiteBlock>
    )
}