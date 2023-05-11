import { Outlet } from "react-router-dom"
import { SideBar } from './'
import { useDispatch, useSelector } from "react-redux"
import { actions } from '../actions/toggleSide'
import { AiOutlineMenu } from 'react-icons/ai'
const DashBoardLayout = () => {
    const dispatch = useDispatch()
    const toggleSideBar = () => dispatch(actions.toggleSideBar())
    return (
        <>
            <div className="min-h-[3rem] border-5 justify-between flex items-center sticky top-0 bg-indigo-300 container mx-auto px-4" >
                <div className='hover:bg-slate-300  w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={toggleSideBar}>
                    <AiOutlineMenu size={25} />
                </div>
                    <h1  className="-auto">DashBoard </h1>
                    <button
              data-te-ripple-init
              data-te-ripple-color="light"
              className="inline-block  rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
  transition duration-150 ease-in-out hover:bg-red-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              logout
            </button>

            </div>
            <div className="flex">
                <SideBar />
                <Outlet />
            </div>
        </>
    )

}

export default DashBoardLayout
