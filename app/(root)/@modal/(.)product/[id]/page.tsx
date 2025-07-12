import { prisma } from '@/prisma/prisma-client'
import { GroupVariants } from '@/shared/components/shared/groupe-variant'
import { ProductImage,Container, Title, ChosenProductModal } from '@/shared/components/shared/index'
import { notFound } from 'next/navigation'
import React from 'react';

export default async function ProductModalPage ({params:{id}} : {params: {id : string}}) {    
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            ingredients: true,
            items: true,
        },
    });

    if(!product){
        notFound()
    }

    return (
        <ChosenProductModal product={product}/>
    )
}