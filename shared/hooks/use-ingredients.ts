import React from "react"
import { Api } from "@/shared/services/api-client"
import { Ingredient } from "@prisma/client"

export const useIngredients = () => {
    const [Ingredient,setIngredients] = React.useState<Ingredient[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true)
                const ingredients = await Api.Ingredients.getAll()
                setIngredients(ingredients)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchIngredients()
    }, [])

    return {Ingredient,loading}
}