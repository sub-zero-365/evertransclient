import { AiOutlineArrowUp } from "react-icons/ai"
import { Outlet, useNavigate, Navigate, useLocation, Link } from "react-router-dom"
import { Rounded, SideBar } from './'
import { useDispatch, useSelector } from "react-redux"
import { actions } from '../actions/toggleSide'
import { AiOutlineMenu } from 'react-icons/ai'
import Alert from "./Alert"
import { useState, useEffect } from 'react'
import UiButton from "../components/UiButton"
import { BsMoonStars, BsSun } from 'react-icons/bs';
import { useravatar } from '../Assets/images';
import { motion } from 'framer-motion'
import axios from 'axios'
// import { useDispatch } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { setUser } from '../actions/adminData';

const DashBoardLayout = ({ darkTheme, toggleDarkTheme }) => {
    const token = localStorage.getItem("admin_token");
    const dispatch = useDispatch()
    const setUserInfoFunction = payload => dispatch(setUser(user))
    const user = useSelector(state => state.setAdminData.user);

    const { data, isLoading, loading, refetch, isError, error } = useQuery({
        queryKey: ["currentadmin"],
        queryFn: async () => axios.get("/admin/user", {
            headers: {
                'Authorization': "makingmoney " + token
            },
        })

    })
    if (!isError) {
        // setUserInfoFunction(data?.data)
    }
    // console.log(error)
    // console.log("this is the data here", data)
    // console.log("this is the admin user", user)
    // const location = useLocation()
    // useEffect(() => {

    // }
    //     , [location.pathname])
    const navigate = useNavigate()

    const [view, setView] = useState(false)

    const [toggle, setToggle] = useState(false);
    const toggleSideBar = () => dispatch(actions.toggleSideBar())

    if (!token) {
        return <Navigate to="/auth?message=you must logging to continue as admin" replace />
    }
    return (
        <div className="overflow-x-hidden xl:container mx-auto">

            <Alert toggle={toggle}
                setToggle={setToggle} message={"Do you want to log out ?"}
                confirmFunc={() => {
                    localStorage.removeItem("admin_token")
                    navigate("/auth");

                }} />
            <div className="min-h-[60px] z-[0] 
            relative border-5 justify-between flex items-center  
            bg-white dark:bg-color_dark shadow-sm shadow-slate-300 container-- mx-auto px-4" >
                <div className='hover:bg-slate-300 md:hidden w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={toggleSideBar}>
                    <AiOutlineMenu size={25} />
                </div>

                <div className="flex gap-x-5">

                    <div className="hidden md:block gap-x-4">
                        <motion.div
                            initial={false}
                            className="h-[30px] w-[30px]   mx-auto shadow-2xl border-2 overflow-hidden  rounded-full mt- p-0 ">
                            <img src={useravatar} alt="user "
                                onClick={() => 0} className='w-full h-full m-0  object-cover scale-[1.3]' />
                        </motion.div>
                        <p className="w-fit mx-auto ">{data?.data?.user?.fullname || "loading"}</p>

                    </div>
                </div>
                <Link to="/dashboard" className="-auto">DashBoard </Link>
                <div className="md:space-x-6 space-x-3 flex items-center">
                    <UiButton name="Change view" className="hidden !text-xs lg:!inline-block !rounded-xl" onClick={() => setView(!view)} />

                    <button
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="hidden md:inline-block 
                        rounded bg-blue-500   px-3 py-1 text-xs font-montserrat font-medium 
  leading-normal text-white 
  shadow-[0_4px_9px_-4px_#3b71ca] 
  transition duration-150 ease-in-out hover:bg-blue-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                        onClick={() => navigate("/")}
                    >
                        view site
                    </button>
                    <Rounded
                        className={"!w-[40px] !h-[40px]"}
                        onClick={() => toggleDarkTheme()}
                    >
                        {
                            darkTheme ? <BsMoonStars size={25} /> : <BsSun size={25} />
                        }
                    </Rounded>

                    <button
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="inline-block  rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
  transition duration-150 ease-in-out hover:bg-red-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                        onClick={() => setToggle(true)}
                    >
                        logout
                    </button>
                </div>
            </div>
            <div className={`flex ${view && "lg:flex-row-reverse"} ease duration-500 transition-all`}>
                <SideBar
                    user={data?.data?.user}
                />
                <Outlet />
            </div>
        </div>
    )

}

export default DashBoardLayout
