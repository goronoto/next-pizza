'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { ProductWithRelations } from '@/@types/prisma'
import { ProductForm } from '../product-form'

interface Props {
    product: ProductWithRelations
    className?:string
}

export const ChosenProductModal: React.FC<Props> =({className,product}) => {
    const router = useRouter()
    
    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden ',className)}>
                <ProductForm product={product} onSubmit={() => router.back()}/>
            </DialogContent>
        </Dialog>
    )
}