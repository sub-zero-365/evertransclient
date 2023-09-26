import { useState, useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { BsMoonStars, BsSun } from 'react-icons/bs';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { useravatar } from '../Assets/images';
import logo from "../Assets/images/logo.png"
import { useSelector, useDispatch } from 'react-redux'
import { motion, useScroll } from "framer-motion";
import Rounded from './Rounded';
import { useUserLayoutContext } from './UserLayout';
import UiButton from "./UiButton"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { setUser, clearUser } from '../actions/User'

const Navbar = ({ }) => {
    const queryClient = useQueryClient()
    const disatch = useDispatch()
    const userDetails = useSelector(store => store.User.user)
    const { isDarkThemeEnabled, user } = useUserLayoutContext()
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
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
    const isLogin = userDetails?.phone ? true : false;
    const navigate = useNavigate()
    const logoutUser = async () => {
        await customFetch.get('/auth/logout');
        queryClient.invalidateQueries();
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
    const gotoUserPage = () => navigate("/user")
    const [isOpen, setIsOpen] = useState(false)

    const toggleNavBar = () => {
        setIsOpen(c => !c)

    }




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
        <div className="sticky
     bg-white/70 text-black dark:bg-slate-900 dark:text-white
        top-0 left-0 shadow-lg dark:shadow-black dark:shadow-sm select-none
         z-20">

            <div className="lg:container mx-auto  h-[4rem] items-center  px-4 flex justify-between relative  ">
                <Link to="/">
                    <img
                        className='h-12 w-20'
                        src={logo}

                    />

                </Link>
                {/* <div className="text-2xl font-montserrat cursor-pointer font-black hover:text-slate-950 dark:hover:text-white duration-300 hover:font-light transition-[color] " onClick={navigateToHome}>{process.env.REACT_APP_APP_NAME || "EvansTrans"}</div> */}
                <ul className="hidden flex-col md:flex-row  md:flex items-center">
                    <motion.li
                        initial={false}
                        className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/?#ourservices"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >Our Services</NavLink></motion.li>

                    <motion.li whileHover={{ scaleX: 1.2 }} className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                        to="/booking"
                        className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                    >Bus Here</NavLink></motion.li>
                    <li className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                        to="/about-us"
                        className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                    >About Us</NavLink></li>
                    <li className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                        to="/contact-us"
                        className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                    >Contact Us</NavLink></li>
                    <li className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                        to="/seat"
                        className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                    >Boarderaux</NavLink></li>
                    <li className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
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
                    md:hidden absolute top-[60px] left-0 bg-color_light  dark:bg-color_dark dark:text-white  w-full `}>
                    <motion.li

                        initial={false}
                        animate={{ x: isOpen ? 0 : -1000 }}

                        className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/?#ourservices"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >Our Services</NavLink></motion.li>

                    <motion.li
                        initial={false}
                        animate={{ x: isOpen ? 0 : -1000 }}
                        transition={{ delay: 0.1 }}

                        className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/about-us"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >About Us</NavLink></motion.li>
                    <motion.li

                        initial={false}
                        animate={{ x: isOpen ? 0 : -1000 }}
                        transition={{ delay: 0.2 }}

                        className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/contact-us"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >Contact Us</NavLink></motion.li>



                    <motion.li

                        initial={false}
                        animate={{ x: isOpen ? 0 : -1000 }}
                        transition={{ delay: 0.2 }}

                        className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/seat"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >Boarderaux</NavLink></motion.li>

                    <motion.li

                        initial={false}
                        animate={{ x: isOpen ? 0 : -1000 }}
                        transition={{ delay: 0.2 }}

                        className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/dashboard"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >Dashboard</NavLink></motion.li>
                    {
                        isLogin ? (
                            <>
                                <motion.div
                                    initial={false}
                                    animate={{ y: isOpen ? 0 : -1000 }}
                                    className="h-[80px] w-[80px]  mx-auto shadow-2xl border-2 overflow-hidden  rounded-full mt- p-0 ">
                                    <img src={useravatar} alt="user " onClick={gotoUserPage} className='w-full h-full m-0  object-cover scale-[1.3]' />
                                </motion.div>
                                <p className="w-fit mx-auto ">{userDetails?.fullname}</p>
                                <p className="w-fit mx-auto ">{userDetails?.phone}</p>
                                <div className="flex justify-center pt-1">

                                    <UiButton onClick={() => logoutUser()}>
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





                </motion.ul>
                <div className='hidden md:flex gap-3 items-center'>
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


                                <div className=" relative flex gap-4 items-center   rounded-full overflow-hidden- " >
                                    <Rounded className="!w-10 !h-10">
                                        <img src={useravatar} alt="user " className='w-[40px] h-[40px] rounded-full shadow-2xl ' onClick={gotoUserPage} />
                                    </Rounded>

                                    <button
                                        type="button"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        class="inline-block rounded bg-red-400 px-4 py-1 text-xs font-medium capitalize
                                        hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
  ease-in-out hover:bg-primary-600
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700
  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
  dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                                        onClick={() => logoutUser()}
                                    >
                                        logout

                                    </button>



                                </div>

                            ) : (
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
                            )

                    }


                </div>

                <div className='flex md:hidden' >
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

            </div>

        </div>
    )
}

export default Navbar