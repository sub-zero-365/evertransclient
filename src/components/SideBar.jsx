import { IoMdClose } from "react-icons/io"
import { RxDashboard } from "react-icons/rx"
import { TiMessages } from "react-icons/ti"
import { CiLogout, CiRoute } from "react-icons/ci"
import { useState } from 'react'
import { GrBus } from "react-icons/gr"
import { GiModernCity } from "react-icons/gi"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { actions } from '../actions/toggleSide'
import { motion } from 'framer-motion'
import { BsPersonLinesFill } from "react-icons/bs"
import { BsClipboardDataFill } from "react-icons/bs"
import { FcAssistant } from 'react-icons/fc'
import { BsSliders2Vertical } from 'react-icons/bs'
import { MdOutlineSecurity } from 'react-icons/md'
import { useravatar } from '../Assets/images';
import { useDashBoardContext } from "./DashboardLayout"
import { BiMailSend } from "react-icons/bi"

const SideBar = () => {
  const { user } = useDashBoardContext()
  const dispatch = useDispatch()
  const toggleSideBar = () => dispatch(actions.toggleSideBar())
  const isSideOpen = useSelector((state) => state.sidebar.isOpen)
  const navigate = useNavigate()
  let navLinks = null
  if (user?.role == "admin") {
    navLinks = [

      {

        name: "Home",
        icon: <RxDashboard size={20} />
        , to: "/dashboard"
      },

      {

        name: "Tickets",
        icon: <TiMessages size={20} />
        , to: "/dashboard/tickets?view=all&admin=true"
      },
      {
        name: "Mails",
        icon: <BiMailSend size={20} />
        , to: "/dashboard/mails?view=all&admin=true"
      },
      {

        name: "Employees",
        icon: <BsPersonLinesFill size={20} />

        , to: "/dashboard/users?admin=true"
      },
      {
        name: "Cities",
        icon: <GiModernCity size={20} />
        , to: "/dashboard/cities"
      },
      {
        name: "Routes",
        icon: <CiRoute size={20} />
        , to: "/dashboard/routes"
      },
      {

        name: "Cars",
        icon: <GrBus size={20} />
        , to: "/dashboard/bus"

      },

      {
        name: "Borderaux",
        icon: <BsClipboardDataFill size={20} />
        , to: "/dashboard/seat?admin=true"

      },
      {
        name: "Security",
        icon: <MdOutlineSecurity size={20} />
        , to: "/dashboard/security"
      },
      {

        name: "Assistants",
        icon: <FcAssistant size={20} />
        , to: "/dashboard/assistants"

      },


    ]
  } else {
    navLinks = [
      {
        name: "Home",
        icon: <RxDashboard size={20} />
        , to: "/dashboard"
      },
      {
        name: "Tickets",
        icon: <TiMessages size={20} />
        , to: "/dashboard/tickets?view=all&admin=true"
      },
      {

        name: "Employees",
        icon: <BsPersonLinesFill size={20} />

        , to: "/dashboard/users?admin=true"
      },

      {

        name: "Cities",
        icon: <GiModernCity size={20} />
        , to: "/dashboard/cities"

      },
      {

        name: "Buses",
        icon: <GrBus size={20} />
        , to: "/dashboard/bus"

      },

      {
        name: "Borderaux",
        icon: <BsClipboardDataFill size={20} />
        , to: "/dashboard/seat?admin=true"

      },
      {
        name: "Assistants",
        icon: <FcAssistant size={20} />
        , to: "/dashboard/assistants"
      },

    ]

  }

  const [view, setView] = useState(false)
  const handleChangeView = () => {
    if (view) return setView(false)
    return setView(true)

  }
  const defaultClasses = "flex text-medium hover:bg-violet-500 dark:hover:bg-violet-900 transition-colors duration-300 py-2 px-3 mt-4 shadow-md dark:shadow-sm dark:shadow-black ring-offset-slate-200 mb-2 rounded-md"
  return (
    <div className={`w-[15rem] 
    md:w-fit lg:w-[15rem]
    ${view && "w-fit"}
    md:overflow-y-auto
    select-none 
    max-w-[calc(100vw-2.5rem)]
    z-[100]
    px-4 text-xs overflow-y--auto flex-none fixed
    md:static transition-[left]
    duration-700 ${isSideOpen ? "left-0" : "left-[-100%]"}
    top-0 h-full md:top-0 bg-color_light
    dark:bg-color_dark
    
    md:h-[calc(100vh-3.75rem)]
    overflow-visible shadow-lg `}>
      <span className="absolute w-[3.125rem] h-[3.125rem] top-0
       text-red-700 hover:bg-orange-500 rounded-e-md transition-all md:hidden duration-500 
       -right-[3.125rem] z-10 rounded-none flex items-center justify-center border-2- font-black border-black"
        onClick={toggleSideBar}
      >
        <IoMdClose size={25} />
      </span>
      <span className="absolute w-[3.125rem] h-[3.125rem] top-[3.125rem] mt-2
       text-slate-700 hover:bg-slate-500 rounded-e-md transition-all md:hidden duration-500 
       -right-[3.125rem] z-10 rounded-none flex items-center justify-center border-2- font-black border-black"
        onClick={handleChangeView}
      >
        <BsSliders2Vertical size={25} />
      </span>
      <div className="mt-10 mb-5 md:hidden">
        <motion.div
          initial={false}
          className="h-[60px] w-[60px]   mx-auto shadow-2xl border-2 overflow-hidden  rounded-full mt- p-0 ">
          <img src={useravatar} alt="user "
            onClick={() => 0} className='w-full h-full m-0  object-cover scale-[1.3]' />
        </motion.div>
        <p className="w-fit mx-auto ">{user?.fullname ?? "loading"}</p>
        <p className="w-fit mx-auto ">{user?.phone ?? "loading"}</p>

      </div>
      <div className="group md:w-fit lg:w-full ">

        {

          navLinks.map(({ name, icon, to }, index) => (
            <motion.div>
              <NavLink to={to}
                end
                key={index}
                onClick={toggleSideBar}
                className={({ isActive }) => (isActive ? "!bg-violet-500 dark:shadow-black   !text-white !text-semibold flex text-medium hover:bg-violet-500 dark:hover:bg-violet-900 transition-colors duration-300 py-2 px-3 mt-4 shadow-md  dark:!shadow-sm ring-offset-slate-200 mb-2 rounded-md" : defaultClasses)}
              >

                {icon}
                <h3 className={`text-xs md:text-sm ml-5 group-[.active]:hidden ${view && "hidden"} md:hidden lg:block`}>{name}</h3>
              </NavLink></motion.div>))

        }
      </div>
      {/*  */}

      <div
        onClick={() => navigate("/")}
        className=" md:hidden  absolute bottom-8 w-full  max-w-[calc(15rem-2.5rem)]
        py-2 px-2 
        items-center text-white
         hover:bg-blue-800   flex gap-2 
        bg-blue-500 transition-colors duration-300 hover:text-white  mb-2 rounded-lg">
        <CiLogout size={25} />
        <h3 className={`text-xs text-center ${view && "hidden"}`}>view site</h3>
      </div>

    </div>
  )
}

export default SideBar