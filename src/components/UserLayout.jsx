
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const UserLayout = ({darkTheme, toggleDarkTheme}) => {
  return (
    <>
        <Navbar 
       toggleDarkTheme={ toggleDarkTheme}
        darkTheme={darkTheme}
        />
    
    <Outlet/>
    
    
    </>
  )
}

export default UserLayout