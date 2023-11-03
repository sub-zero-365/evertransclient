import { createSlice } from "@reduxjs/toolkit";
import  {data}   from "../constants/demoData";

const initialState = {
    cartItem: [],
    isLoading: false,
    amount: 0,
    total: 0,
    totalAmount: 0
}
const cartSlice = createSlice({
    initialState,
    name: "cartItem",
    reducers: {
        clearCart: (state) => {
            state.cartItem = []
        }
        ,
        addToCart: (state, { payload }) => {
            // if (checkItem(payload)) return
            state.cartItem = [
                ...state.cartItem,
                payload
            ]
        },
        increaseItem(state, { payload }) {
            // console.log(payload, state.cartItem)
            const {
                cartItem: item
            } = state;
            const isItem = item.find(({ _id: id }) => id == payload);
            if (isItem.total > 9) return
            isItem.total += 1
        },
        decreaseItem(state, { payload }) {
            const item = state.cartItem
            const isItem = item.find(({ _id: id }) => id == payload);
            if (isItem?.total <= 1) return
            isItem.total -= 1
        },
        removeFromCart(state, { payload }) {
            const newItems = state.cartItem.filter(({ _id: id }) => id != payload);
            state.cartItem = newItems;
        },
        calculateTotal: (state) => {
            let price = 0;
            let total = 0
            for (let item of state.cartItem) {
                price += item.product_price * item.total
                total += item.total
            }
            state.total = total
            state.amount = price
            state.totalAmount = state.cartItem.length
        }
    }
})
export const { removeFromCart, calculateTotal, addToCart, increaseItem, decreaseItem, clearCart } = cartSlice.actions
export default cartSlice.reducer