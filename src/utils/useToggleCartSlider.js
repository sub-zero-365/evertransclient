import { useDispatch, useSelector } from "react-redux"
import { open as Open, close as Close } from "../actions/Slider"
function useToggleCartSlider() {
    const dispatch = useDispatch()
    const open = () => dispatch(Open())
    const close = () => dispatch(Close())
    const isOpen = useSelector(state => state.cartSlider.isOpen)
    return (
        {
            open, close, 
            isOpen
        }
    )
}

export default useToggleCartSlider