import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Title } from './title';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  loading?:boolean
  price:number
  onSubmit?: VoidFunction
}

{/*Product Form*/}

export const ChoseProductForm: React.FC<Props> =({imageUrl,name,className,price,onSubmit,loading}) => {
    return (
        <div className={cn(className,'flex')}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img src={imageUrl} alt={name}
                    className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
                />
            </div>

            <div className="flex-1 w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size='md' className='font-extrabold mb-1'/>

                <Button 
                    loading={loading}
                    onClick={() => onSubmit?.()} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
                    Add to Cart {price} $
                </Button>
            </div>
        </div>
    )
}