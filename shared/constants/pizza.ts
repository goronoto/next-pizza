export const MapPizzaSize = {
    20 : 'Small',
    30 : 'Middle',
    40 : 'Large'
} as const

export const MapPizzaTypes = {
    1 : 'normal',
    2 : 'thin'
} as const

export const pizzaSizes = Object.entries(MapPizzaSize).map(([value,name]) => ({
    name,
    value
}))

export const pizzaTypes = Object.entries(MapPizzaTypes).map(([value,name]) => ({
    name,
    value
}))

export type PizzaSize = keyof typeof MapPizzaSize
export type PizzaType = keyof typeof MapPizzaTypes