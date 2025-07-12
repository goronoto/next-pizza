import { ProductItem } from '@prisma/client';
import { PizzaType, pizzaSizes } from '@/shared/constants/pizza';
import { Variant } from '../components/shared/groupe-variant';

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]):Variant[] => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));
};
