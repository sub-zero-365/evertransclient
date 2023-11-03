import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { removeFromCart, increaseItem, decreaseItem } from '../actions/cartItems'
import { useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import IncrementDecrementButton from "./IncrementDecrementButton.js";
export default function ShoppingCart(props) {
    const { _id: id = 1, total, product_price: price, product_name: productname, product_imgUrl } = props
    const dispatch = useDispatch()
    const incrementCounter = (id) => {
        dispatch(increaseItem(id))
    }
    const decrementCounter = (id) => {
        dispatch(decreaseItem(id))
    }
    return (
        <motion.div
            key={props}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, }}
            exit={{
                scale: 0.5,
                opacity: 0,
                transition: {
                    duration: 0.3,
                    mass: 25,
                    
                }
            }}
            className={` border-[0.0925rem] select-none border-[#e8e8e8]   w-full py-4 px-2 md:px-2.5 lg:px-3 `}
        >
            <div
                className='flex w-full h-full justify-between items-center'
            >
                <div
                    className='flex items-center'
                >
                    <img
                        className='w-20'
                        src=
                        {
                            product_imgUrl ??
                            'https://evergreenhouseshop.com/wp-content/uploads/2021/08/image_search_1629557120822.jpg'
                        }
                    />
                    <div
                        className='flex text-start flex-col gap-y-1 items-center- justify-center-'
                    >
                        <h3
                            className='uppercase line-clamp-2 text-xl mb-1 font-bold text-black'
                        >{productname || "n/a"}</h3>
                        <p
                            className='font-medium lg:hidden  uppercase leading-tight text-gray-500 text-sm'
                        >
                            ${price * (total ?? 1)}
                        </p>
                        <p
                            className='font-medium -mt-0.5 uppercase text-black leading-tight text-sm'
                        >
                            color:gilden green
                        </p>
                        <span
                            onClick={() => dispatch(removeFromCart(id))}
                            className='text-rose-700 cursor-pointer uppercase text-xs font-medium lg:hidden '
                        >
                            remove
                        </span>
                    </div>

                </div>
                <div
                    className='flex items-center space-x-5 lg:px-12'
                >

                    <IncrementDecrementButton
                        increement={() => incrementCounter(id)}
                        decreement={() => decrementCounter(id)}
                        total={total}
                    />

                    <p
                        className='font-medium hidden lg:block uppercase leading-tight text-gray-500 text-sm'
                    >
                        ${price * total}
                    </p>
                    <span
                        onClick={() => dispatch(removeFromCart(id))}
                        className='text-rose-700 uppercase cursor-pointer text-xs font-medium hidden lg:block '
                    >
                        remove
                    </span>

                </div>
            </div>
            <AnimatePresence>
                {
                    total > 9 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, x: [-100, 100, -100, 100, 0, -100, 100, -100, 100, 0] }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-rose-500 text-center pt-2"

                        >you can only add 10 of this items to cart </motion.p>
                    )
                }
            </AnimatePresence>

        </motion.div>
    )
}
