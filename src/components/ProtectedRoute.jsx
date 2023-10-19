import { Outlet, Navigate, useNavigate, useLocation, redirect, useNavigation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setUserName } from "../actions/userName"
import Alert from '../components/Alert'
import OnlineDetector from './OnlineDetector';
import customFetch from '../utils/customFetch';
import { toast } from "react-toastify"
import { createContext, useContext } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import logo from "../Assets/images/logo.png"
import { useUserLayoutContext } from "./UserLayout"
import AppSpinner from './AppSpinner'
const ProtectedContext = createContext()

const userQuery = {
    queryKey: ['user'],
    queryFn: async () => {
        const { data } = await customFetch.get('/users/current-user');
        return data;
    },
};

export const loader = (queryClient) => async ({ request }) => {
    try {
        return await queryClient.ensureQueryData(userQuery);
    } catch (error) {
    const errorMessage=error?.response?.data || error?.message || "something went wrong try again later"
        toast.error(errorMessage)
        return redirect(`/login?message=${errorMessage}&from=${new URL(request.url).pathname}`);
    }
};

const ProtectedRoute = () => {
    const { setUserDetails, logoutUser } = useUserLayoutContext()
    const { user } = useQuery(userQuery).data || {}
    setUserDetails(user)
    const [isAuthError, setIsAuthError] = useState(false);
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading'
    customFetch.interceptors.response.use(
        (response) => {
            // console.log("this is the response before the request is being sent ", response)
            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                setIsAuthError(true);
            }
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        if (!isAuthError) return;
        logoutUser();
    }, [isAuthError]);
    return (
        <ProtectedContext.Provider
            value={{
                logoutUser,

            }}
        >
            <OnlineDetector />

            {
                isPageLoading ? <AppSpinner /> : <Outlet
                    context={{ user }}
                />
            }

        </ProtectedContext.Provider>
    )
}
export default ProtectedRoute