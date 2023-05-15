import { IoMdClose } from "react-icons/io"
import { RxDashboard } from "react-icons/rx"
import { TiMessages } from "react-icons/ti"
import { GrServicePlay } from "react-icons/gr"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import {actions} from '../actions/toggleSide'
import {motion} from 'framer-motion'
const SideBar = () => {
  useEffect(() => {
    navigate("/dashboard")
  }, [])
  const dispatch = useDispatch()
  const toggleSideBar = () => dispatch(actions.toggleSideBar())
  const isSideOpen= useSelector((state) => state.sidebar.isOpen)
  const [active, setActive] = useState(0);
  const navigate = useNavigate()
  const navLinks = [
    
    {

      name: "Home",
      icon: <RxDashboard size={25} />
      , to: "/dashboard"

    },

    {

      name: "Users",
      icon: <TiMessages size={25} />

      , to: "/dashboard"
    },
    
    {

      name: "Services",
      icon: <GrServicePlay size={25} />
      , to: "/dashboard"

    },
    {

      name: "Contacts",
      icon: <GrServicePlay size={25} />
      , to: "/dashboard"

    },



  ]

  return (

    <div className={`w-[12.5rem]   select-none max-w-[calc(100vw-2.5rem)] z-[100]
    px-4 text-xs overflow-y--auto flex-none fixed md:static transition-[left] duration-700
    ${isSideOpen ? "left-0" : "left-[-100%]"} top-0 h-full md:top-0 bg-color_light md:h-[calc(100svh-3.75rem)] overflow-visible border`}>
    
      <span className="absolute w-[3.125rem] h-[3.125rem] top-0
       text-red-700 hover:bg-orange-500 rounded-e-md transition-all md:hidden duration-500 
       -right-[3.125rem] z-10 rounded-none flex items-center justify-center border-2- font-black border-black"
        onClick={toggleSideBar}
      >
        <IoMdClose size={25} />
      </span>
      <h3 className="text-2xl text-center py-4 font-manrope md:hidden ">Dashboard</h3>
      {/*  */}

      {

        navLinks.map(({ name, icon, to }, index) => (
        <motion.div
        initial={false}
        // animate={{opacity:isSideOpen?1:0}}
        // transition={{delay:index*0.2}}
        
        className="">
        <NavLink to={to}
          key={index}
          onClick={() => {
if(window.innerWidth<=600){

  toggleSideBar()

}
            setActive(index)
          }



          }
          className={`flex 
 ${active === index ? "bg-violet-500 text-white" : "bg-white"}  hover:bg-violet-500 transition-colors 
 duration-300 py-2 px-3 mt-4 shadow-md ring-offset-slate-200 mb-2 rounded-lg`}>
          {icon}
          <h3 className="text-sm ml-5">{name}</h3>
        </NavLink></motion.div>))

      }
      {/*  */}
      <div
      onClick={() => navigate("/")}
      className=" md:hidden  absolute bottom-8   py-2 px-10 items-center text-white ml-auto hover:bg-blue-800   w-fit bg-blue-500 transition-colors duration-300 hover:text-white  mb-2 rounded-lg">
      {/* <CiLogout size={25} /> */}
      <h3 className="text-xs ml-2">view site</h3>
  </div>

    </div>
  )
}

export default SideBar