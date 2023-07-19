import { useState, useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { BsMoonStars, BsSun } from 'react-icons/bs';
import { useNavigate, NavLink } from 'react-router-dom';
import { useravatar } from '../Assets/images';
import { useSelector, useDispatch } from 'react-redux'
import { motion, useScroll } from "framer-motion";
import { storeTicket, setLoading } from "../actions/userticket"
import Alert from '../components/Alert'
import Form from './Form';
const Navbar = () => {
    useEffect(() => {
        if (localStorage.theme === 'white') {
            setDarkTheme(false)
            return
        }
        else if (localStorage.theme === 'dark' || (
            window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setDarkTheme(true)

        } else {
            document.documentElement.classList.remove('dark')
            setDarkTheme(false)

        }
    }, [])
    const [darkTheme, setDarkTheme] = useState(false)
    const toggleDarkTheme = () => {
        changeTheme()

    }
    const changeTheme = () => {
        if (!darkTheme) {
            localStorage.setItem("theme", "dark")
        } else {
            localStorage.setItem("theme", "white")
        }
        document.documentElement.classList.toggle('dark')
        setDarkTheme(c => !c)
    }
    const [toggle, setToggle] = useState(false)
    const isUserName = useSelector(state => state.username.username);
    const dispatch = useDispatch()

    const userTicket = (load) => {
        return dispatch(storeTicket(load))

    }
    const setLoading_ = (bool) => {
        return dispatch(setLoading(bool))
    }
    const handleLogout = () => {
        setLoading_(true)
        setToggle(false)
        userTicket([])
        localStorage.removeItem("token")
        navigate("/login");
    }
    const isLogin = localStorage.getItem("token");
    const { scrollYProgress } = useScroll()
    const navigate = useNavigate()
    const gotoLoginPage = () => {
        localStorage.removeItem("token")
        setIsOpen(false)
        navigate("/login")
    }
    const gotoRegisterPage = () => {
        navigate("/register")
        setIsOpen(false)
    }
    const gotoUserPage = () => navigate("/user")
    const [isOpen, setIsOpen] = useState(false)
    // const [darkTheme, setDarkTheme] = useState(false)
    const toggleNavBar = () => {
        setIsOpen(c => !c)

    }
    // const toggleDarkTheme = () => {
    //     setDarkTheme(c => !c)
    //     changeTheme()

    // }
    const navigateToHome = () => navigate("/")
    // const changeTheme = () => {
    //     document.documentElement.classList.toggle('dark')
    // }


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

    const item = {
        hidden: { opacity: 0, x: -10000 },
        show: { opacity: 1, x: 0 }
    }

    return (
        <div className="sticky top-0 left-0 shadow-lg dark:shadow-black select-none bg-color_light  dark:bg-color_dark dark:text-white z-20">
            <Alert toggle={toggle} setToggle={setToggle}

                duration="30000"

                confirmFunc={handleLogout}
                message={"DO YOU WANT TO LOGOUT?"}
                className={`border !border-red-400
${toggle && "!top-1/2 -translate-y-1/2"}
`}
            />
            <div className="container mx-auto  h-[60px] items-center  px-4 flex justify-between relative  ">
                <motion.div

                    className="h-[1px] absolute right-0 transform-origin-0 left-0 bottom-0 w-full- bg-slate-400"
                    style={{ scaleX: scrollYProgress }}
                />
                <div className="text-2xl font-montserrat cursor-pointer hover:text-slate-950 dark:hover:text-white duration-300 hover:font-light transition-[color] " onClick={navigateToHome}>Afri-Con</div>
                <ul className="hidden flex-col md:flex-row  md:flex items-center">
                    <motion.li

                        initial={false}
                        // animate={{ x: isOpen ? 0 : -1000 }}

                        className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                            to="/?#ourservices"
                            className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                        >Our Services</NavLink></motion.li>

                    <motion.li whileHover={{ scaleX: 1.2 }} className='links-item  border-b-2 mx-4 md:mx-2 my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300' ><NavLink
                        to="/booking"
                        className={({ isActive, isPending }) => isPending ? "text-blue-500" : isActive ? "text-blue-500" : ""}
                    >Bus Here</NavLink></motion.li>
                    {/* <li className='links-item mx-4 md:mx-2  my-4 md:my-0 text-lg hover:cursor-pointer hover:text-blue-600 transition-colors duration-300'>Bus ticket</li> */}
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
                                <p className="w-fit mx-auto ">{isUserName}</p>
                                <div className="flex justify-center pt-1">

                                    <button
                                        type="button"
                                        a data-te-ripple-init
                                        data-te-ripple-color="light"
                                        className="inline-block rounded  bg-red-400 px-6 pb-2 pt-2.5 w-fit my-4 mt-0 text-xs font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
ease-in-out hover:bg-primary-600 mx-auto
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700
active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        onClick={() => setToggle(true)}
                                    >
                                        LogOut
                                    </button>

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
                    <div className='hover:bg-slate-300  w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={toggleDarkTheme}>
                        {
                            darkTheme ? <BsMoonStars size={25} /> : <BsSun size={25} />
                        }
                    </div>


                    {
                        isLogin
                            ? (


                                <div className=" relative flex gap-4 items-center   rounded-full overflow-hidden- " >
                                    <img src={useravatar} alt="user " className='w-[40px] h-[40px] rounded-full shadow-2xl ' onClick={gotoUserPage} />

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

                                        onClick={handleLogout}
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
                            darkTheme ? <BsMoonStars size={25} /> : <BsSun size={25} />
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