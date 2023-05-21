import { Outlet,useNavigate } from "react-router-dom"
import { SideBar } from './'
import { useDispatch, useSelector } from "react-redux"
import { actions } from '../actions/toggleSide'
import { AiOutlineMenu } from 'react-icons/ai'
import Alert from "./Alert"
import {useState} from 'react'
const DashBoardLayout = () => {
const navigate=useNavigate()
    const [toggle,setToggle]=useState(false);
    const dispatch = useDispatch();
    const toggleSideBar = () => dispatch(actions.toggleSideBar())
    return (
        <><Alert toggle={toggle} setToggle={setToggle} message={"Do you want to log out ?"} confirmFunc={()=>{
        navigate("/auth")
        
        }}/>
            <div className="min-h-[3rem] border-5 justify-between flex items-center sticky top-0 bg-indigo-300 container mx-auto px-4" >
                <div className='hover:bg-slate-300 md:hidden w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={toggleSideBar}>
                    <AiOutlineMenu size={25} />
                </div>
                    <h1  className="-auto">DashBoard </h1>
                    <div className="md:space-x-3">

                    
                    <button
              data-te-ripple-init
              data-te-ripple-color="light"
              className="hidden md:inline-block  rounded bg-blue-500   px-3 py-1 text-xs font-montserrat font-medium 
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
  transition duration-150 ease-in-out hover:bg-blue-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            
            onClick={()=>navigate("/")}
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
            
            onClick={()=>setToggle(true)}
            >
              logout
            </button>
            </div>
            </div>
            <div className="flex container mx-auto">
                <SideBar />
                <Outlet />
            </div>
        </>
    )

}

export default DashBoardLayout
