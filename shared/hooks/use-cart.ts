import React from "react"
import { useCartStore } from "../store/cart"
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/cart-dto";


type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = ():ReturnProps => {
    const cartState = useCartStore((state) => state) 

    React.useEffect(() => {
        cartState.fetchCartItems()
    },[])

    return cartState
}