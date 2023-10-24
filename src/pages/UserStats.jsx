import React from 'react'
import { Outlet } from "react-router-dom"
const UserStats = () => {
  return (
    <div>UserStats
      <Outlet />
    </div>
  )
}

export default UserStats