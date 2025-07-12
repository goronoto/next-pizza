'use client'

import React from 'react'
import { Title } from './title'
import { Input } from '../ui'
import { RangeSlider } from './range-slider'
import { CheckBoxFilterGroup } from './checkbox-filter-group'
import qs from 'qs'
import { useIngredients,useFilters,useQueryFilters } from '@/shared/hooks'

interface Props {
    classname?:string
}

interface PriceProps {
    priceFrom?: number,
    priceTo?: number,
}

export interface QueryFilters extends PriceProps {
    pizzaTypes:string,
    sizes:string,
    ingredients:string
}


export const Filters: React.FC<Props> =({classname}) => {
    const {Ingredient,loading} = useIngredients()
    const filters = useFilters()

    useQueryFilters(filters)

    const items = Ingredient.map((item) => ({ value: String(item.id), text: item.name }));

    const updatePrices = (prices: number[]) => {
        console.log(prices, 999);
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    };

    return (
        <div className={classname}>
            <Title text='Filters' size='sm' className='mb-5 font-bold'/>
            {/*TOP CHECKBOXES*/}
            <CheckBoxFilterGroup 
                title='Dough Type'
                name='pizzaType'
                classname='mt-5' 
                onClickCheckBox={filters.setPizzaTypes}
                selected={filters.pizzaTypes}
                items={[
                    {text: 'thin',value:'1'},
                    {text: 'normal',value:'2'},
                ]}
            />

            <CheckBoxFilterGroup 
                title='Size'
                name='sizes'
                classname='mt-5' 
                onClickCheckBox={filters.setSizes}
                selected={filters.sizes}
                items={[
                    {text: '20 cm',value:'20'},
                    {text: '30 cm',value:'30'},
                    {text: '40 cm',value:'40'},
                ]}
            />
            {/*PRICE FILTER*/}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className='font-bold mb-3'>Price range:</p>
                <div className="flex gap-3 mb-5">
                    <Input type='number' placeholder='0' min={0} max={1000} value={String(filters.prices.priceFrom)} onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}/>
                    <Input type='number' min={100} max={1000} placeholder='1000' value={String(filters.prices.priceTo)}onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}/>
                </div>
                <RangeSlider 
                    min={0} 
                    max={1000} 
                    step={10} 
                    value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000 ]}
                    onValueChange={updatePrices}
                />
            </div>
            {/*BOTTOM CHECKBOXES*/}
            <CheckBoxFilterGroup 
                title='Ingredients'
                name='ingredients'
                classname='mt-5' 
                limit={6} 
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckBox={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
            />
        </div>
    )
}