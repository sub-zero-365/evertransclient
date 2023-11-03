import { useSelector, useDispatch } from "react-redux"

const useItem = (id) => {
    const { cartItem } = useSelector(state => state.cartItems);
    const incart = cartItem.some(({ _id: cartId }) => cartId == id);
    return {
        incart,
    }

}
export default useItem