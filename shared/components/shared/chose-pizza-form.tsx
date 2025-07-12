import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './groupe-variant';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { ProductImage } from './product-image';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  loading?:boolean;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId:number,ingredients:number[]) => void
}

{/*Pizza Form*/}

export const ChosePizzaForm: React.FC<Props> =({className,name,imageUrl,ingredients,items,onSubmit,loading}) => {
    const {size,type,setSize,setType,selectedIngredients,addIngredient,availableSizes,currentItemId} = usePizzaOptions(items)

    const {totalPrice, textDetails} = getPizzaDetails(type,size,items,ingredients,selectedIngredients)

    const handleClick = () => {
        if(currentItemId){
            onSubmit(currentItemId, Array.from(selectedIngredients))
        }
    }

    return (
        <div className={cn(className,'flex')}>
            <ProductImage imageUrl={imageUrl} size={size}/>

            <div className="flex-1 w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size='md' className='font-extrabold mb-1'/>

                <p className='text-gray-400'>{textDetails}</p>

                <div className="flex flex-col gap-5 mt-5">
                    <GroupVariants onClick={value => setSize(Number(value) as PizzaSize)} items={availableSizes} value={String(size)}/>

                    <GroupVariants onClick={value => setType(Number(value) as PizzaType)} items={pizzaTypes} value={String(type)}/>
                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <IngredientItem 
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    loading={loading}
                    onClick={handleClick} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
                    Add to Cart {totalPrice} $
                </Button>
            </div>
        </div>
    )
}