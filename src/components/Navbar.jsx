import { AnimatePresence, motion } from "framer-motion";
import { default as React, createContext, useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsBag, BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useravatar } from '../Assets/images';
import logotext from "../Assets/images/logotext.png";
import useOutsideAlerter from "../Hooks/click-outside-hook";
import { USER_ROLES } from "../utils/roles";
import useToggleCartSlider from '../utils/useToggleCartSlider';
import userRole from "../utils/userRole";
import Rounded from './Rounded';
import SeachContainer from './SearchContainer';
import SearchResultContainer from './SearchResult';
import ThemeToggler from './ThemeToggler';
import { useUserLayoutContext } from './UserLayout';
import LogOut from "./LogOut";
// } from '@tanstack/react-query'
// const allRecieptsQuery = (params = {}, enable = false) => {
//     return (
//         {
//             queryKey: ["reciepts", {
//                 ...params
//             }],
//             queryFn: async () => {
//                 const { data } = await customFetch.get('/reciepts', {

//                     ...params,
//                     limits: 5
//                     ,
//                 });
//                 return data;
//             },
//             enable: enable


//         }
//     )

// }

const SearchContext = createContext()
const Navbar = ({ }) => {
    var redirectLink = userRole()
    const {logoutUser}=useUserLayoutContext()
    const navRef = useRef(null)
    const { toggle: outside } = useOutsideAlerter(navRef)
    const [toggle, setToggle] = useState(false)
    const { open } = useToggleCartSlider()
    // const queryClient = useQueryClient()
    // const disatch = useDispatch()
    const { isDarkThemeEnabled, user} = useUserLayoutContext()
    const [search, setSeach] = useState("")

    const isLogin = user?._id ? true : false
    const navigate = useNavigate()

    const gotoLoginPage = () => {
        setIsOpen(false)
        navigate("/login")
    }
    const gotoRegisterPage = () => {
        navigate("/register")
        setIsOpen(false)
    }
    useEffect(() => {
        if (outside) {
            setIsOpen(false)
        }
    }, [outside])
    const [lastScrollY, setLastScrollY] = useState(0);
    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
            setIsOpen(false);
        }

        // else { // if scroll up show the navbar
        //   setIsOpen(true);  
        // }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        // cleanup function
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);


    const gotoUserPage = () => {
        navigate(redirectLink)
    }
    const [isOpen, setIsOpen] = useState(false)
    const currentUserRole = user?.role
    const toggleNavBar = () => {
        setIsOpen(c => !c)

    }
    const { totalAmount } = useSelector(state => state.cartItems)
    const [isCartEmpty, setIsCartEmpty] = useState(false)
    useEffect(() => {
        if (totalAmount > 0) {
            setIsCartEmpty(true)
        } else {
            setIsCartEmpty(false)
        }
    }, [totalAmount])
    const { data, isPreviousData } = {}
    // useQuery(allRecieptsQuery({ search },
    //     user?.role === "restaurants"))

    // console.log("this is the search data", data)
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerDirection: -1, duration: 4
            }
        }
    }


    return (
        <SearchContext.Provider value={{
            setToggle,
            search,
            setSeach,
            isPreviousData,
            data
        }}>

            <div
                ref={navRef}

                className="sticky
     bg-white/70 text-black gold:bg-[var(--color-primary)] dark:bg-slate-900 dark:text-white shadow-gray-200
        top-0 left-0 shadow-sm dark:shadow-black dark:shadow-sm select-none
         z-20">

                <div className="lg:container  mx-auto  h-[4rem] items-center  px-4 flex justify-between relative  ">
                    <Link to="/">
                        <img src={logotext}
                            className="h-32 w-24"
                            alt="logotext"
                        />
                    </Link>
                    {/* bigger screen */}
                    <ul className="hidden flex-col lg:flex-row  lg:flex items-center">
                        <motion.li
                            initial={false}
                            className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/?#ourservices"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Our Services</NavLink></motion.li>
                        {
                            isLogin && user?.role === USER_ROLES.ticketer &&
                            <motion.li whileHover={{ scaleX: 1.2 }} className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/booking"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Book A Seat</NavLink></motion.li>
                        }


                        {
                            isLogin &&

                            user?.role === USER_ROLES.mailer &&
                            <motion.li whileHover={{ scaleX: 1.2 }} className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/mailing"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Mail Here</NavLink></motion.li>


                        }




                        <li className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/about-us"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >About Us</NavLink></li>
                        <li className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/contact-us"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >Contact Us</NavLink></li>

                        {
                            user?.role == USER_ROLES.ticketer && <li className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/seat"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Boarderaux</NavLink></li>
                        }

                        <li className='links-item !hidden border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/dashboard"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >Dashboard</NavLink></li>
                    </ul>
                    <motion.ul
                        onClick={() => isOpen && setIsOpen(false)}
                        variant={isOpen ? container : null}
                        initial="hidden"
                        animate="show"

                        className={`${!isOpen ? " max-h-0" :
                            " max-h-screen"} overflow-hidden transition-[max-height] duration-500 border-b-0 
                    lg:hidden absolute gold:bg-yellow-100 top-[4rem] left-0 bg-color_light  dark:bg-color_dark dark:text-white  w-full `}>
                        <motion.li

                            initial={false}
                            animate={{ x: isOpen ? 0 : -1000 }}

                            className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/?#ourservices"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Our Services</NavLink></motion.li>


                        {
                            isLogin &&
                                user?.role === USER_ROLES.ticketer ?

                                <motion.li
                                    initial={false}
                                    animate={{ x: isOpen ? 0 : -1000 }}
                                    transition={{ delay: 0.1 }}

                                    className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                        to="/booking"
                                        className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                                    >Book A Seat</NavLink></motion.li> :
                                <motion.li
                                    initial={false}
                                    animate={{ x: isOpen ? 0 : -1000 }}
                                    transition={{ delay: 0.1 }}

                                    className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                        to="/mailing"
                                        className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                                    >Mail Service</NavLink></motion.li>


                        }


                        <motion.li
                            initial={false}
                            animate={{ x: isOpen ? 0 : -1000 }}
                            transition={{ delay: 0.1 }}

                            className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/about-us"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >About Us</NavLink></motion.li>
                        <motion.li

                            initial={false}
                            animate={{ x: isOpen ? 0 : -1000 }}
                            transition={{ delay: 0.2 }}

                            className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/contact-us"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Contact Us</NavLink></motion.li>
                        {
                            user?.role == USER_ROLES.ticketer &&
                            <motion.li
                                initial={false}
                                animate={{ x: isOpen ? 0 : -1000 }}
                                transition={{ delay: 0.2 }}

                                className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                    to="/seat"
                                    className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                                >Boarderaux</NavLink></motion.li>
                        }




                        <motion.li

                            initial={false}
                            animate={{ x: isOpen ? 0 : -1000 }}
                            transition={{ delay: 0.2 }}

                            className='links-item !hidden border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/dashboard"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Dashboard</NavLink></motion.li>
                        {/* <div
                            className='mb-2'
                        /> */}
                        <h1 className='text-xl font-medium px-2 mb-1'>Toggle themes</h1>
                        <ThemeToggler
                            // toggleDarkTheme={toggleDarkTheme}
                            isDarkThemeEnabled={isDarkThemeEnabled}
                        />
                        <div
                            className='my-4'
                        />
                        <div className='md:hidden'>
                            {
                                !isLogin ?
                                    (<div className="flex ">
                                        <button
                                            type="button"
                                            a data-te-ripple-init
                                            data-te-ripple-color="light"
                                            className="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 ml-5 my-4 text-xs font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
ease-in-out hover:bg-primary-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700
active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                                            onClick={gotoLoginPage}
                                        >
                                            Login
                                        </button>

                                        <button
                                            type="button"
                                            data-te-ripple-init
                                            data-te-ripple-color="light"
                                            className="inline-block rounded bg-red-400 px-6 pb-2 pt-2.5 ml-5 my-4 text-xs font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
ease-in-out hover:bg-primary-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700
active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                                            onClick={gotoRegisterPage}
                                        >
                                            Register
                                        </button>
                                    </div>
                                    ) : null
                            }

                        </div>





                    </motion.ul>
                    <div className='hidden md:flex gap-3 items-center'>

                        {
                            currentUserRole == "restaurants" &&
                            <Rounded
                                // className=className="!w-10 !h-10"
                                className="!w-10 !h-10"
                            >
                                {/* <motion.div

                                className='cursor-pointer    border-[#7d7d7d] '>
                           */}

                                <motion.div
                                    whileHover={{
                                        scale: 1.2
                                    }}
                                >
                                    {
                                        !toggle && currentUserRole == "restaurants" ?
                                            <BsSearch
                                                onClick={() => setToggle(true)}
                                                className='text-[#9773ce]'
                                                size={20}
                                            />
                                            : <AiOutlineClose
                                                onClick={() => setToggle(false)}
                                                className='text-gray-700'
                                                size={20}
                                            />
                                    }

                                </motion.div>

                                {/* </motion.div> */}
                            </Rounded>
                        }
                        {
                            user?.role == USER_ROLES.restaurant_user &&
                            <Rounded>

                                <motion.div className='relative'
                                    whileHover={{
                                        scale: 1.2
                                    }}
                                >
                                    {
                                        isCartEmpty && <div
                                            className='w-2.5 h-2.5 bg-rose-800 rounded-full right-0 absolute -top-0.5' />
                                    }

                                    <BsBag
                                        onClick={() => {
                                            open()
                                        }}
                                        className='text-gray-700'
                                        size={20}
                                    />


                                </motion.div>
                            </Rounded>
                        }
                        <ThemeToggler
                            // toggleDarkTheme={toggleDarkTheme}
                            isDarkThemeEnabled={isDarkThemeEnabled}
                        />




                        {
                            isLogin
                                ? (

                                    <>

                                        <div className=" relative flex gap-4 items-center group   " >
                                            <NavLink
                                                end
                                                to={redirectLink}
                                                className={({ isActive, isPending }) => isPending ? "text-blue-500 pending" : isActive ? "text-blue-500" : ""}
                                            >
                                                {({ isPending,
                                                    isActive }) => (
                                                    <Rounded className={` !flex-none group  !relative !w-10 !h-10`}>
                                                        {isPending ? <div class="lds-roller !w-10 !h-10"
                                                            style={{
                                                                height: "40px",
                                                                width: "40px"
                                                            }}
                                                        >
                                                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                                            :
                                                            <img src={useravatar} alt="user " className={`w-[40px] h-[40px] rounded-full shadow-2xl ${isActive && ""} `} onClick={gotoUserPage} />

                                                        }
                                                    </Rounded>
                                                )}

                                            </NavLink>
                                  
                                            <LogOut
                                                dont_show_logout_icon
                                                className={"xl:!block hidden !pt-1 !pb-1"} />
                                        </div>

                                    </>

                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            data-te-ripple-init
                                            data-te-ripple-color="light"
                                            class="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
  ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700
  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
  dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                                            onClick={gotoLoginPage}
                                        >
                                            Login
                                        </button>

                                    </>
                                )


                        }
                        <div className="lg:hidden h-[50px] w-[50px] rounded-full flex items-center justify-center hover:bg-slate-300" onClick={toggleNavBar}>

                            {
                                !isOpen ? <AiOutlineMenu size={25} /> : <IoMdClose size={27} />

                            }

                        </div>

                    </div>

                    <div className='flex md:hidden gap-x-2 items-center' >

                        <Rounded
                            className="!w-10 !h-10"
                        >
                            <motion.div

                                className='cursor-pointer    border-[#7d7d7d] '>
                                <motion.div
                                    whileHover={{
                                        scale: 1.2
                                    }}
                                >
                                    {currentUserRole == "restaurants" &&
                                        (!toggle ?
                                            <BsSearch
                                                onClick={() => setToggle(true)}
                                                className='text-[#9773ce]'
                                                size={20}
                                            />
                                            : <AiOutlineClose
                                                onClick={() => setToggle(false)}
                                                className='text-gray-700'
                                                size={20}
                                            />)
                                    }

                                </motion.div>
                            </motion.div>
                        </Rounded>

                        {
                            isLogin &&
                            <>

                                <NavLink
                                    to={redirectLink}
                                    // relative='p'
                                    end
                                    className={({ isActive, isPending }) => isPending ? "text-blue-500 pending" : isActive ? "text-blue-500" : ""}
                                >
                                    {({ isPending,
                                        isActive }) => (
                                        <Rounded className={` !flex-none  !relative `}>
                                            {isPending ? <div class="lds-roller "
                                                style={{
                                                    height: "40px",
                                                    width: "40px"
                                                }}
                                            >
                                                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                                :
                                                <img src={useravatar} alt="user " className={`w-[40px] h-[40px] rounded-full shadow-2xl ${isActive && ""} `} onClick={gotoUserPage} />

                                            }
                                        </Rounded>
                                    )}

                                </NavLink>
                                <LogOut
                                    dont_show_logout_icon
                                    className={"block !w-fit sm:!hidden "} />

                            </>
                        }

                        <div className="md:hidden h-[50px] w-[50px] rounded-full flex items-center justify-center hover:bg-slate-300" onClick={toggleNavBar}>

                            {
                                !isOpen ? <AiOutlineMenu size={25} /> : <IoMdClose size={27} />

                            }

                        </div>
                    </div>
                    <AnimatePresence>

                        {
                            toggle &&
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 1000, opacity: 0 }}
                                transition={{ duration: 0.08 }}
                                // key={"inputmodal"}
                                className={`absolute z-[1000] scrollto bg-[#f9f5f5] lg:px-24 px-4 ${true ? "visible pointer-events-auto opacity-100" : "invsible pointer-events-none opacity-0"} duration-700 transition-all left-0  right-0 py-4 border top-full  bg-white`}
                            >

                                <div
                                    className='flex pl-2 lg:pl-3 items-center border space-x-3 hover:outline-none focus:outline-none bg-white w-full '
                                >
                                    <BsSearch
                                        size={20}
                                    />
                                    <SeachContainer />

                                </div>

                                {/* result of seaec here */}
                                <SearchResultContainer />


                            </motion.div>
                        }
                    </AnimatePresence>
                </div>

            </div >

        </SearchContext.Provider>
    )
}
export const useSearchContext = () => useContext(SearchContext)
export default Navbar