
import { Outlet, useNavigate, redirect } from "react-router-dom"
import Navbar from "./Navbar"
import { createContext, useContext, useEffect, useState } from "react"
import customFetch from "../utils/customFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { setUser, clearUser } from '../actions/User'
import { useDispatch, useSelector } from "react-redux"
const UserLayoutContext = createContext()

const UserLayout = ({ isDarkThemeEnabled }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const setUserDetails = (payload) => dispatch(setUser(payload))
  const userQuery = {
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await customFetch.get('/users/current-user');
      return data;
    },
    staleTime: Infinity
  };

  const data = useQuery(userQuery)
  if (data?.data?.user) {
    setUserDetails(data?.data?.user)
  }
  const logoutUser = async () => {
    try {
      await customFetch.get('/auth/logout');
      queryClient.invalidateQueries();
      setUserDetails({})
      navigate("/login")
    } catch (err) {
      console.log("this is the fail response here", err.response?.data)
    }

  };
  return (
    <UserLayoutContext.Provider
      value={{
        user: data?.data?.user,
        isDarkThemeEnabled: { isDarkThemeEnabled },
        logoutUser,
        setUserDetails
      }}
    >
      <Navbar
        user={data?.user}
        isDarkThemeEnabled={isDarkThemeEnabled}
      />
      <Outlet />

    </UserLayoutContext.Provider>
  )
}
export const useUserLayoutContext = () => useContext(UserLayoutContext)
export default UserLayout