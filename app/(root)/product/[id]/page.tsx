import { prisma } from '@/prisma/prisma-client'
import { Container } from '@/shared/components/shared/index'
import { ProductForm } from '@/shared/components/shared/product-form'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function ProductPage ({params:{id}} : {params: {id : string}}) {
    const product = await prisma.product.findFirst({where: {id: Number(id)},include:{
      ingredients:true,
      category:{
        include:{
          products:{
            include:{
              items:true
            }
          }
        },
      },
      items:true
    } })
    
    if(!product) {
      return notFound()
    }

    return (
      <Container className='flex flex-col my-10'>
        <ProductForm product={product}/>
      </Container>
    )
}

