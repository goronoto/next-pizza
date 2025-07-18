import { useRouter } from 'next/navigation';

import qs from "qs";
import React from "react";
import { Filters } from './use-filters';

export const useQueryFilters = (filters:Filters) => {
    const router = useRouter()
    React.useEffect(() => {
        const query = qs.stringify({
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients)
            }, {
                arrayFormat:'comma'
            }
        );

        router.push(`?${query}`, {
            scroll:false
        })
    },[filters])
}