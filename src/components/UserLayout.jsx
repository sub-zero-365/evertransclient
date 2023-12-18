
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, ScrollRestoration } from "react-router-dom";
import { setUser } from '../actions/User';
import customFetch from "../utils/customFetch";
import Navbar from "./Navbar";
// import ScrollRestoration from "./ScrollRestoration";
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

  const logoutUser = async (error = "") => {
    try {
      await customFetch.get('/auth/logout');
      // queryClient.invalidateQueries();
      queryClient.removeQueries()
      setUserDetails({})
      navigate("/login?message=" + error)
    } catch (err) {
      console.log("this is the fail response here", err.response?.data)
    }

  };
  return (
    <UserLayoutContext.Provider
      value={{
        user: data?.data?.user,
        isDarkThemeEnabled: isDarkThemeEnabled,
        logoutUser,
        setUserDetails
      }}
    >
      {/* <ScrollRestoration /> */}
      <Navbar
        user={data?.user}
        isDarkThemeEnabled={isDarkThemeEnabled}
      />
      <Outlet />
      <ScrollRestoration
        getKey={(location, matches) => { return location.pathname }}
      />

    </UserLayoutContext.Provider>
  )
}
export const useUserLayoutContext = () => useContext(UserLayoutContext)
export default UserLayout