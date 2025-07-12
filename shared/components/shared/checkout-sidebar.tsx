import React from 'react'
import { WhiteBlock } from './white-block'
import { CheckoutItemDetails } from './checkout-item-details'
import { Percent ,Package,Truck,ArrowRight} from 'lucide-react'
import { Button, Skeleton } from '../ui'

interface Props {
    totalAmount:number
    className?:string
    loading?:boolean
}

const VAT = 15
const DELIVERY_PRICE = 250

export const CheckoutSideBar: React.FC<Props> =({className,totalAmount,loading}) => {
    const vatPrice = (totalAmount * VAT) / 100
    const OrderPrice = totalAmount + vatPrice + DELIVERY_PRICE

    return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Results:</span>
                {loading ? <Skeleton className='w-full h-8'/> :<span className="h-11 text-[34px] font-extrabold">{OrderPrice}</span>}
            </div>
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Package size={18} className="mr-2 text-gray-400"/>
                    Cart Price:
                </div>
                } 
                value={loading ? <Skeleton className='h-6 w-16' /> :`${totalAmount} $`}/>
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Percent size={18} className="mr-2 text-gray-400"/>
                    Taxes:
                </div>
            } 
                value={loading ? <Skeleton className='h-6 w-16' /> :`${vatPrice} $`}/>
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Truck size={18} className="mr-2 text-gray-400"/>
                    Delivery:
                </div>
            } 
                value={loading ? <Skeleton className='h-6 w-16' /> :`${DELIVERY_PRICE} $`}/>
            <Button loading={loading} type='submit' className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Proceed to payment
                <ArrowRight className="w-5 ml-2"/>
            </Button>
        </WhiteBlock>
    )
}