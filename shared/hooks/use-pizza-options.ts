import React from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/groupe-variant";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
    size:PizzaSize,
    type:PizzaType,
    selectedIngredients:Set<number>
    availableSizes:Variant[]
    currentItemId?: number
    setSize:(size:PizzaSize) => void
    setType:(type:PizzaType) => void
    addIngredient:(id:number) => void
}

export const usePizzaOptions = (items:ProductItem[]):ReturnProps => {
    const [size,setSize] = React.useState<PizzaSize>(20)
    const [type,setType] = React.useState<PizzaType>(1)
    const [selectedIngredients, {toggle:addIngredient}] = useSet(new Set<number>([]))

    const availableSizes = getAvailablePizzaSizes(type,items)

    const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id

    React.useEffect(() => {
        const isAvailableSize = availableSizes?.find((item) => Number(item.value) === size)

        const availableSize = availableSizes?.find((item) => !item.disabled)

        if(!isAvailableSize && availableSizes){
            setSize(Number(availableSize?.value) as PizzaSize)
            
        }
    },[type])

    return {
        size,
        type,
        selectedIngredients,
        availableSizes,
        currentItemId,
        setSize,
        setType,
        addIngredient,
    };
}