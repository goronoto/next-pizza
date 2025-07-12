'use client'
import React from 'react'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox'
import { Input } from '../ui'
import { Skeleton } from '../ui'

type Item = FilterChecboxProps

interface Props {
    title:string
    items:Item[]
    defaultItems?:Item[]
    limit?:number
    loading?:boolean
    SearchInputPlaceholder?:string
    onClickCheckBox?: (id:string) => void
    defaultValue?:string[]
    selected?: Set<string>
    classname?:string
    name?:string
}

export const CheckBoxFilterGroup: React.FC<Props> =({
    title,
    items,
    defaultItems,
    limit=5,
    loading,
    SearchInputPlaceholder = 'Searching...',
    classname,
    onClickCheckBox,
    selected: values,
    defaultValue,
    name,
}) => {
    const [showAll, setShowAll] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')

    const onChangeSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    if(loading) {
        return <div className="">
            <p className='font-bold mb-3'>{title}</p>

            {
                ...Array(limit).fill(0).map((_,index) => (
                    <Skeleton key={index} className='h-6 mb-5 rounded-[8px]'></Skeleton>
                ))
            }
            <Skeleton className='w-26 h-6 mb-5 rounded-[8px]'></Skeleton>
        </div>
    }

    const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items).slice(0,limit)
    return (    
        <div className={classname}>
            <p className='font-bold mb-3'>{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input onChange={onChangeSearchInput} placeholder={SearchInputPlaceholder} className='bg-gray-50 border-none'/>
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list?.map((item,index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={values?.has(item.value)}
                        onCheckedChange={() => onClickCheckBox?.(item.value)}
                        name={name}
                    />
                ))}
            </div>
            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : '' }>
                    <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3 '>
                        {showAll ? 'Hide' : '+ Show all'}
                    </button>
                </div>
            )}
        </div>
    )
}