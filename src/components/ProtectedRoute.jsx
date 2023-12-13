import { Outlet, Navigate, useNavigate, useLocation, redirect, useNavigation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import OnlineDetector from './OnlineDetector';
import customFetch from '../utils/customFetch';
import { toast } from "react-toastify"
import { createContext, useContext } from 'react';
import { useQueries, useQuery, useIsFetching } from '@tanstack/react-query';
import { motion } from "framer-motion"
import { useUserLayoutContext } from "./UserLayout"
import AppSpinner from './AppSpinner'
import { useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import NavFooter from './NavFooter';
import CartModal from './CartModal';

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
        const errorMessage = error?.response?.data || error?.message || "something went wrong try again later"
        toast.error(errorMessage)
        return redirect(`/login?message=${errorMessage}&from=${new URL(request.url).pathname}`);
    }
};

const ProtectedRoute = () => {

    const navigate = useNavigate()
    const { logoutUser } = useUserLayoutContext()
    const { user } = useQuery(userQuery).data || {}
    // setUserDetails(user)
    const [isAuthError, setIsAuthError] = useState(false);
    const navigation = useNavigation();
    const constraintsRef = useRef(null);

    const isPageLoading = navigation.state === 'loading'
    customFetch.interceptors.response.use(
        (response) => {
            // console.log("this is the response before the request is being sent ", response)
            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                setIsAuthError(error?.response?.data);
            }
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        if (!isAuthError) return;
        logoutUser(isAuthError);
    }, [isAuthError]);
    return (

        <ProtectedContext.Provider
            value={{
                logoutUser,
            }}
        >
            <div
                ref={constraintsRef}
            >

                <OnlineDetector />
                {isPageLoading && <AppSpinner />}

                {
                    // isPageLoading ? <AppSpinner /> : 

                    <>
                        <motion.div
                            drag
                            dragConstraints={constraintsRef}
                            key="animatecontainer"
                            animate={{
                                scale: [0.7, 1.2, 0.8],
                            }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1],
                                repeat: Infinity,
                                repeatDelay: 1
                            }
                            }
                            className={`bottom-6
          cursor-pointer
          group
      
          left-1/2 
          translate-x-1/2
          lg:hidden
                         fixed 
                        flex-none 
                        shadow-2xl button-add  top-auto
                        ring-blue-300 gold:ring-yellow-300 dark:ring-slate-300
                        bg-blue-400 gold:bg-yellow-500 dark:bg-slate-950
w-[5rem]
h-[5rem] 
rounded-full 
 
right-0
ring-4
z-10  `}
                        >
                            <div
                                onClick={() => {
                                    const currentUserRole = user?.role;
                                    if (currentUserRole == "tickets") navigate("/booking")
                                    else navigate("/mailing")

                                }}
                                className="flex h-full overflow-hidden w-full items-center -scale-animation justify-center ">
                                <AiOutlinePlus
                                    size={30} color="#fff" className="font-black " />
                            </div>
                        </motion.div>
                        <Outlet
                            context={{ user }}
                        />
                    </>
                }
            </div>
            {
                user?.role == "restaurants" && <>
                    <CartModal />
                    <NavFooter />
                </>
            }


        </ProtectedContext.Provider>
    )
}
export default ProtectedRoute