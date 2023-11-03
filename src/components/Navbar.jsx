import { useState, useEffect, createContext, useContext } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { BsMoonStars, BsSearch, BsSun } from 'react-icons/bs';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { useravatar } from '../Assets/images';
import logo from "../Assets/images/logo.png"
import logotext from "../Assets/images/logotext.png"
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from "framer-motion";
import Rounded from './Rounded';
import { useUserLayoutContext } from './UserLayout';
import UiButton from "./UiButton"
import { useQueryClient } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { clearUser } from '../actions/User'
import React from "react"
import SearchResultContainer from './SearchResult';
import SeachContainer from './SearchContainer';
import { useQuery } from "@tanstack/react-query"
const SearchContext = createContext()

const allTicketsQuery = (params = {}) => {
    // console.log("this is the params", params)
    const { search, sort, page } = params
    return {
        queryKey: [
            'tickets',
            // { search: search ?? "", page: page ?? 1, sort: sort ?? "newest" }
            {
                search: search ?? ""
            }
        ],
        queryFn: async () => {
            const { data } = await customFetch.get('/ticket', {
                params: {
                    search: search ?? ""
                },
            });
            return data;
        },
        keepPreviousData: true
    };
};
const Navbar = ({ }) => {
    const [toggle, setToggle] = useState(false)

    const queryClient = useQueryClient()
    const disatch = useDispatch()
    const { isDarkThemeEnabled, user } = useUserLayoutContext()
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
    const [search, setSeach] = useState("")
    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.documentElement.classList.toggle('dark')
        if (newDarkTheme) {
            localStorage.setItem('theme', "dark");
            return
        }
        localStorage.removeItem('theme');
    };
    const isLogin = user?.fullname
    const navigate = useNavigate()
    const logoutUser = async () => {
        await customFetch.get('/auth/logout');
        // queryClient.invalidateQueries();
        queryClient.removeQueries()
        navigate("/login")
    };
    const gotoLoginPage = () => {
        localStorage.removeItem("token")
        setIsOpen(false)
        disatch(clearUser())
        navigate("/login")

    }
    const gotoRegisterPage = () => {
        navigate("/register")
        setIsOpen(false)
    }
    const gotoUserPage = () => {
        const currentUserRole = user?.role;
        if (currentUserRole == "tickets") navigate("/user")
        else if (currentUserRole == "restaurants") navigate("/restaurant")
        else navigate("/user/mails")
    }
    const [isOpen, setIsOpen] = useState(false)
    const currentUserRole = user?.role
    const toggleNavBar = () => {
        setIsOpen(c => !c)

    }

    const { data, isPreviousData } = useQuery(allTicketsQuery({ search }))

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
            setToggle, search, setSeach, isPreviousData,
            data
        }}>

            <div className="sticky
     bg-white/70 text-black dark:bg-slate-900 dark:text-white shadow-gray-200
        top-0 left-0 shadow-sm dark:shadow-black dark:shadow-sm select-none
         z-20">

                <div className="lg:container  mx-auto  h-[4rem] items-center  px-4 flex justify-between relative  ">
                    <Link to="/">
                        {/* <img
                        className='h-12 w-20'
                        src={logo}

                    /> */}
                        {/* <h1
                        className='text-3xl font-black '
                    >{process.env.REACT_APP_APP_NAME}</h1> */}
                        <img src={logotext}
                            className="h-32 w-24"
                            alt="logotext"
                        />

                    </Link>
                    {/* <div className="text-2xl font-montserrat cursor-pointer font-black hover:text-slate-950 dark:hover:text-white duration-300 hover:font-light transition-[color] " onClick={navigateToHome}>{process.env.REACT_APP_APP_NAME || "EvansTrans"}</div> */}
                    <ul className="hidden flex-col lg:flex-row  lg:flex items-center">
                        <motion.li
                            initial={false}
                            className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/?#ourservices"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Our Services</NavLink></motion.li>
                        {
                            isLogin &&
                            (user?.role === "tickets" ?
                                <motion.li whileHover={{ scaleX: 1.2 }} className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                    to="/booking"
                                    className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                                >Book A Seat</NavLink></motion.li> :
                                <motion.li whileHover={{ scaleX: 1.2 }} className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                    to="/mailing"
                                    className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                                >Mail Here</NavLink></motion.li>
                            )

                        }

                        {/* <div className='group relative'>
                        <h1
                            className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300'
                        >Book Services</h1>

                        <div
                            className='
absolute
top-[calc(100%+0.3rem)] 
translate-y-5
invisible 
opacity-0 group-hover:opacity-100
group-hover:visible
group-hover:translate-y-0
transition-all
duration-200
py-2
min-w-fit
bg-color_light  dark:bg-color_dark
px-5
left-0
-translate-x-[calc(calc(100%-100px)/2)]
rounded-sm
shadow
'
                        >
                            <motion.li whileHover={{ scaleX: 1.2 }} className='links-item min-w-full  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/booking"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Car Here</NavLink></motion.li>
                            <motion.li whileHover={{ scaleX: 1.2 }} className='links-item min-w-full  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/mailing"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Mail Here</NavLink></motion.li>
                        </div>

                    </div> */}



                        <li className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/about-us"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >About Us</NavLink></li>
                        <li className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/contact-us"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >Contact Us</NavLink></li>

                        {
                            user?.role == "tickets" && <li className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/seat"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Boarderaux</NavLink></li>
                        }

                        <li className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
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
                    lg:hidden absolute top-[4rem] left-0 bg-color_light  dark:bg-color_dark dark:text-white  w-full `}>
                        <motion.li

                            initial={false}
                            animate={{ x: isOpen ? 0 : -1000 }}

                            className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/?#ourservices"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Our Services</NavLink></motion.li>


                        {
                            isLogin &&
                            (user?.role === "tickets" ?

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
                            )

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
                            user?.role == "tickets" &&
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

                            className='links-item  border-b-2- mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                                to="/dashboard"
                                className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                            >Dashboard</NavLink></motion.li>
                        <div className='md:hidden'>
                            {
                                isLogin ? (
                                    <>
                                        <motion.div
                                            initial={false}
                                            animate={{ y: isOpen ? 0 : -1000 }}
                                            className="h-[80px] w-[80px]  mx-auto shadow-2xl border-2 overflow-hidden  rounded-full mt- p-0 ">
                                            <img src={useravatar} alt="user " onClick={gotoUserPage} className='w-full h-full m-0  object-cover scale-[1.3]' />
                                        </motion.div>
                                        <p className="w-fit mx-auto capitalize">{user?.fullname}</p>
                                        <p className="w-fit mx-auto ">{user?.phone}</p>
                                        <div className="flex justify-center pt-2 -hidden">

                                            <UiButton
                                                className="!bg-rose-700"
                                                onClick={() => logoutUser()}>
                                                logout
                                            </UiButton>

                                        </div>

                                    </>
                                ) :

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
                                    )
                            }

                        </div>





                    </motion.ul>
                    <div className='hidden md:flex gap-3 items-center'>
                        <Rounded
                            // className=className="!w-10 !h-10"
                            className="!w-10 !h-10"
                        >
                            <motion.div

                                className='cursor-pointer    border-[#7d7d7d] '>
                                {
                                    currentUserRole == "restaurants" &&
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
                                }
                            </motion.div>
                        </Rounded>
                        <Rounded className="!w-10 !h-10"
                            onClick={toggleDarkTheme}
                        >
                            {
                                isDarkTheme ? <BsMoonStars size={25} /> : <BsSun size={25} />
                            }
                        </Rounded>



                        {
                            isLogin
                                ? (

                                    <>

                                        <div className=" relative flex gap-4 items-center group  " >
                                            <Rounded className=" !flex-none group">
                                                <img src={useravatar} alt="user " className='w-[40px] h-[40px] rounded-full shadow-2xl ' onClick={gotoUserPage} />
                                            </Rounded>

                                        </div>

                                        <UiButton
                                            className="bg-red-400"
                                            onClick={() => logoutUser()}>
                                            Logout
                                        </UiButton>
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

                    <div className='flex md:hidden' >
                        <Rounded
                            // className={"!h-[50px] !w-[50px]"}
                            className="!w-10 !h-10"
                        >
                            <motion.div

                                className='cursor-pointer    border-[#7d7d7d] '>
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
                            </motion.div>
                        </Rounded>
                        <div className='hover:bg-slate-300  w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={toggleDarkTheme}>

                            {
                                isDarkTheme ? <BsMoonStars size={25} /> : <BsSun size={25} />
                            }
                        </div>
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