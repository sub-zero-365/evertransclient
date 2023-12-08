import { MdShoppingBasket, MdHome, MdFavorite } from "react-icons/md"
import { AiOutlineShoppingCart, AiOutlineMessage, AiOutlineUser } from "react-icons/ai"
import { BiCategoryAlt } from 'react-icons/bi'
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { calculateTotal } from "../actions/cartItems"
import { motion } from "framer-motion"
import useToggleCartSlider from "../utils/useToggleCartSlider"
import { BsShop } from "react-icons/bs"


const NavFooter = () => {
    const location = useLocation();
    const path = location.pathname.substring(1)
    const [isNotShoppingCart, setIsNotShoppingCart] = useState(false)
    const dotshowhere = [
        "auth",
        "user",
        "user/restaurant"
    ]
    useEffect(() => {
        if (dotshowhere.some(x => x == path)) {
            setIsNotShoppingCart(true)
        } else {
            setIsNotShoppingCart(false)
        }
    }, [location.pathname])
    const { open } = useToggleCartSlider()
    const dispatch = useDispatch()
    const { totalAmount, cartItem } = useSelector(state => state.cartItems)
    useEffect(() => {
        dispatch(calculateTotal())
        
    }, [totalAmount, cartItem])
    const NavLinkContainer = ({ to, icon: Icon, text }) => {
        return (
            <NavLink
                to={to}
                className={"justify-center  font-montserrat font-medium tracking-tight w-1/5  items-center flex flex-col group "}
            >
                {({ isActive, isPending }) => (
                    <div
                        className="grid place-items-center transition-all duration-500  rounded-full "
                    >
                        <Icon
                            size={25}
                            color={(isPending ? "blue" : isActive ? "#7a63e1" : "gray")}

                        />
                        <p className={` text-xs font-montserrat font-medium  tracking-tight leading-normal select-none ${(isPending ? "!text-blue" : isActive ? "text-[#7a63e1]" : "text-slate-900")} `}>{text}</p>
                    </div>
                )}

            </NavLink>
        )
    }
    return (

        <motion.div>
            {
                !isNotShoppingCart && <div
                    className="fixed pt-4 sm:max-w-md  sm:translate-x-1/2  z bottom-0 lg:py-4 z-10 w-full lg:w-fit lg:translate-y-1/2 lg:rounded-md lg:left-6 lg:bottom-1/2 min-h-[3rem] pb-4 bg-white shadow left-0"
                >
                    <div className="flex lg:justify-center lg:items-center lg:flex-col grid-flow-col gap-4 px-4">

                        <NavLinkContainer to={"/restaurant"}
                            text={"Home"}
                            icon={MdHome}

                        />
                        <NavLinkContainer to={"/product-category/main-categories"}
                            text={"Category"}
                            icon={BiCategoryAlt}

                        />


                        <div onClick={() => open()}
                            className="justify-center 
           font-montserrat font-medium
           tracking-tight bg-black
           relative shadow lg:shadow-2xl 
           flex-none h-[60px] rounded-full
           mt-[-25px] lg:mr-[-60px] lg:w-[60px]
           lg:mt-0 text-white hover:bg-opacity-80
           transition-all duration-300  w-[60px]  
           items-center flex flex-col " to={"/cart"} >
                            <AiOutlineShoppingCart size={25} />
                            <p className="text-xs font-montserrat font-medium text-slate-900 tracking-tight leading-normal select-none">Cart</p>
                            <motion.div
                                key={cartItem}
                                animate={{ scale: [1.5, 0.7, 2, 1] }}
                                transition={{ duration: 2 }}

                                className="absolute -top-0 text-white -right-0 w-4 h-4 flex justify-center items-center rounded-full text-xs bg-red-400">{totalAmount}</motion.div>
                        </div>
                        <NavLinkContainer to={"/user/restaurant"}
                            text={"user"}
                            icon={AiOutlineUser}

                        />

                        <NavLinkContainer className="justify-center font-montserrat font-medium tracking-tight w-1/5  items-center flex flex-col " to="/shop" text="Shop" icon={BsShop} />

                    </div>


                </div>
            }

        </motion.div>
    )
}

export default NavFooter