import { AiOutlineArrowUp } from "react-icons/ai"
import { Outlet, useNavigate, Navigate, useLocation, Link } from "react-router-dom"
import { SideBar } from './'
import { useDispatch, useSelector } from "react-redux"
import { actions } from '../actions/toggleSide'
import { AiOutlineMenu } from 'react-icons/ai'
import Alert from "./Alert"
import { useState, useEffect } from 'react'
import UiButton from "../components/UiButton"
const DashBoardLayout = () => {
    const token = localStorage.getItem("admin_token");
    const location = useLocation()
    useEffect(() => {

    }
        , [location.pathname])
    const navigate = useNavigate()

    const [view, setView] = useState(false)

    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
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
            <div className="min-h-[3rem] z-[0] 
            relative border-5 justify-between flex items-center  
            bg-white dark:bg-color_dark shadow-sm shadow-slate-300 container-- mx-auto px-4" >
                <div className='hover:bg-slate-300 md:hidden w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={toggleSideBar}>
                    <AiOutlineMenu size={25} />
                </div>
                <Link to="/dashboard" className="-auto">DashBoard </Link>
                <div className="md:space-x-3">
                    <UiButton name="Change view" className="hidden lg:!inline-block" onClick={() => setView(!view)} />

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
                <SideBar />
                <Outlet />
            </div>
        </div>
    )

}

export default DashBoardLayout
