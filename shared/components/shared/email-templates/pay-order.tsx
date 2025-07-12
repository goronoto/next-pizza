import React from 'react'

interface Props {
    orderId:number;
    totalAmount:number
    paymentUrl:string
}

export const PayOrderTemplate: React.FC<Props> =({orderId,totalAmount,paymentUrl}) => {
    return (
        <div>
            <h1>Order #{orderId}</h1>

            <p>Your order total is ${totalAmount}. <a href={paymentUrl}>Proceed to payment.</a></p>
        </div>
    )
}