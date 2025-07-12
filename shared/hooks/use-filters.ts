import { useRouter, useSearchParams } from "next/navigation"
import { useSet } from "react-use"
import React from "react"

interface PriceProps {
    priceFrom?: number,
    priceTo?: number,
}

interface QueryFilters extends PriceProps {
    pizzaTypes:string,
    sizes:string,
    ingredients:string
}

export interface Filters {
    sizes: Set<string>,
    pizzaTypes: Set<string>,
    selectedIngredients: Set<string>,
    prices:PriceProps
}

interface ReturnProps extends Filters  {
    setPrices:(name:keyof PriceProps ,value:number) => void
    setPizzaTypes: (value:string) => void
    setSizes:(value:string) => void
    setSelectedIngredients: (value:string) => void
}

export const useFilters = () : ReturnProps => {
    const router = useRouter()
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters,string>

    {/*Ingredient's Filter*/}
    const [selectedIngredients,{toggle:toggleIngredients}] = useSet(
        new Set<string>(searchParams.get('ingredients')?.split(','))
    )
    
    {/*Sizes Filter*/}
    const [sizes,{toggle:toggleSizes}] = useSet(new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(','): []))
    
    {/*Pizza Types Filter*/}
    const [pizzaTypes,{toggle:togglePizzaType}] = useSet(new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(','): []))

    {/*Prices Filter*/}
    const [prices,setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    })

    const updatedPrice = (name:keyof PriceProps,value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    

    return React.useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices: updatedPrice,
      setPizzaTypes: togglePizzaType,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [sizes, pizzaTypes, selectedIngredients, prices],
  );
}