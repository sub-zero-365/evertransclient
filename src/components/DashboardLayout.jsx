import { AiOutlineArrowUp } from "react-icons/ai"
import { Outlet, useNavigate, Navigate, useLocation, Link, redirect, useNavigation } from "react-router-dom"

import { Rounded, SideBar } from './'
import { useDispatch } from "react-redux"
import { actions } from '../actions/toggleSide'
import { useState, createContext, useContext, useEffect } from 'react'


import { useQuery, useQueryClient } from "@tanstack/react-query"

import OnlineDetector from "./OnlineDetector"
import customFetch from '../utils/customFetch'
import AppSpinner from './AppSpinner'
import Header from './Header'
const adminQuery = {
    queryKey: ["user"],
    queryFn: async () => {
        const res = await customFetch.get("/users/current-user", {
            params: {
                higherorderuser: "higherorderuser"
            }
        })
        return res.data
    }, staleTime: Infinity
}

export const loader = (queryClient) => async ({ request }) => {
    try {
        return await queryClient.ensureQueryData(adminQuery);
    } catch (error) {
        if (error?.response?.status == 423) return redirect("/suspended")
        return redirect(`/auth?message=something went wrong try again here&from=${new URL(request.url).pathname}`);
    }
}

const DashBoardContext = createContext()
const DashBoardLayout = ({ isDarkThemeEnabled }) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const logoutUser = async () => {
        navigate("/")
        await customFetch.get('/auth/logout');
        queryClient.removeQueries()
    };

    const [isAuthError, setIsAuthError] = useState(false);
    const [isBlockError, setIsBlockError] = useState(false);



    const { user } = useQuery(adminQuery)?.data || { user: {} }

    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.documentElement.classList.toggle('dark')
        if (newDarkTheme) {
            localStorage.setItem('theme', "dark");
            return
        }
        localStorage.removeItem('theme');
    };
    const navigation = useNavigation()
    const isPageLoading = navigation.state === "loading"
    const dispatch = useDispatch()
    const [view, setView] = useState(false)
    const toggleSideBar = () => dispatch(actions.toggleSideBar())
    customFetch.interceptors.response.use(
        (response) => {
            // console.log("this is the response before the request is being sent ", response)

            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                setIsAuthError(true);
            }
            if (error?.response?.status === 423) {
                setIsBlockError(error?.response?.data);
            }
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        if (isAuthError) {
            logoutUser(isAuthError);
        }
        if (isBlockError) {
            navigate("/suspended")
            // logoutUser(isBlockError);
        }
    }, [isAuthError, isBlockError]);
    return (
        <DashBoardContext.Provider value={{
            user,
            toggleSideBar,
            view,
            setView,
            toggleDarkTheme,
            isDarkTheme,
            logoutUser
        }}>
            <OnlineDetector />

            <Header

                isDarkThemeEnabled={isDarkThemeEnabled}
            />
            <div className="overflow-x-hidden xl:container mx-auto overflow-y-hidden">

                <div className={`flex ${view && "lg:flex-row-reverse"} ease duration-500 transition-all`}>
                    <SideBar
                        isDarkThemeEnabled={isDarkThemeEnabled}
                    />
                    {
                        isPageLoading && <AppSpinner />
                    }

                    <Outlet
                        context={{ user }}
                    />
                </div>
            </div>

        </DashBoardContext.Provider>
    )

}
export const useDashBoardContext = () => useContext(DashBoardContext)

export default DashBoardLayout
