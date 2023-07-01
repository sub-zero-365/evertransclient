import { IoMdClose } from "react-icons/io"
import { RxDashboard } from "react-icons/rx"
import { TiMessages } from "react-icons/ti"
import { CiLogout } from "react-icons/ci"
import { FcAssistant } from "react-icons/fc"
import { GrServicePlay } from "react-icons/gr"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { actions } from '../actions/toggleSide'
import { motion } from 'framer-motion'
const SideBar = () => {

  const dispatch = useDispatch()
  const toggleSideBar = () => dispatch(actions.toggleSideBar())
  const isSideOpen = useSelector((state) => state.sidebar.isOpen)
  const navigate = useNavigate()
  const navLinks = [

    {

      name: "Home",
      icon: <RxDashboard size={20} />
      , to: "/dashboard"

    },

    {

      name: "Tickets",
      icon: <TiMessages size={20} />
      , to: "/dashboard/tickets?view=all"
    },
    {

      name: "Employees",
      icon: <TiMessages size={20} />

      , to: "/dashboard/users"
    },

    {

      name: "Cities",
      icon: <GrServicePlay size={20} />
      , to: "/dashboard/cities"

    },
    {

      name: "Buses",
      icon: <GrServicePlay size={20} />
      , to: "/dashboard/bus"

    },
    {

      name: "create new assistants",
      icon: <FcAssistant size={20} />
      , to: "/dashboard/assistant"

    },
    {
      name: "register new employee",
      icon: <GrServicePlay size={20} />
      , to: "/dashboard/register"

    },



  ]
  const defaultClasses = "flex text-medium hover:bg-violet-500 dark:hover:bg-violet-900 transition-colors duration-300 py-2 px-3 mt-4 shadow-md dark:shadow-lg dark:shadow-slate-800 ring-offset-slate-200 mb-2 rounded-md"
  return (

    <div className={`w-[15rem] overflow-auto 
    select-none max-w-[calc(100vw-2.5rem)] z-[100]
    px-4 text-xs overflow-y--auto flex-none fixed
    md:static transition-[left]
    duration-700 ${isSideOpen ? "left-0" : "left-[-100%]"}
    top-0 h-full md:top-0 bg-color_light
    dark:bg-color_dark
    md:h-[calc(100svh-3.75rem)]
    overflow-visible shadow-lg `}>
      <span className="absolute w-[3.125rem] h-[3.125rem] top-0
       text-red-700 hover:bg-orange-500 rounded-e-md transition-all md:hidden duration-500 
       -right-[3.125rem] z-10 rounded-none flex items-center justify-center border-2- font-black border-black"
        onClick={toggleSideBar}
      >
        <IoMdClose size={25} />
      </span>
      <h3 className="text-2xl text-center py-4 font-manrope md:hidden ">Dashboard</h3>
      <div className="group">

        {

          navLinks.map(({ name, icon, to }, index) => (
            <motion.div>
              <NavLink to={to}
                end
                key={index}
                onClick={toggleSideBar}


                className={({ isActive }) => (isActive ? "!bg-violet-500 !dark:bg-violet-800 !text-white !text-semibold flex text-medium hover:bg-violet-500 dark:hover:bg-violet-900 transition-colors duration-300 py-2 px-3 mt-4 shadow-md dark:shadow-lg dark:shadow-slate-800 ring-offset-slate-200 mb-2 rounded-md" : defaultClasses)}

              >

                {icon}
                <h3 className="text-xs md:text-sm ml-5 group-[.active]:hidden">{name}</h3>
              </NavLink></motion.div>))

        }
      </div>
      {/*  */}
      <div
        onClick={() => navigate("/")}
        className=" md:hidden  absolute bottom-8 w-full max-w-[calc(15rem-2.5rem)]   py-2 px-10 items-center text-white
        ml-auto hover:bg-blue-800   flex gap-2  bg-blue-500 transition-colors duration-300 hover:text-white  mb-2 rounded-lg">
        <CiLogout size={25} />
        <h3 className="text-xs text-center">view site</h3>
      </div>

    </div>
  )
}

export default SideBar