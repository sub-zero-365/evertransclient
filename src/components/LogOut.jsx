import { useQueryClient } from "@tanstack/react-query"
import React, { useState } from 'react'
import { CiLogout } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import customFetch from '../utils/customFetch'
import UiButton from './UiButton'
// import { useUserLayoutContext } from './UserLayout'

const LogOut = ({ error = "", className, dont_show_logout_icon }) => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    // const wait = async (ms = 10000) => new Promise((r) => setTimeout(() => { r() }, ms))

    const logoutUser = async () => {
        setLoading(true);
        // console.log("enter here ")
        try {
            navigate('/login');
            const res = await customFetch.get('https://apis.ontracklogix.com/api/v1/auth/logout');
            queryClient.invalidateQueries();
            toast.success('Logging out...');
            console.log("this is the res : ", res)
        } catch (err) {
            console.log("this is the fail response here", err.response?.data);
        } finally {
            setLoading(false);
        }
    };
    return (

        <UiButton
            onClick={() => logoutUser()}
            disabled={loading}
            className={`${className} block w-[min(calc(100%-20px),20rem)]
        !mx-auto !py-2.5 !my-5  !text-lg !rounded-xl  !bg-red-400`}
        >

            <div className='flex items-center justify-center gap-x-2 text-xs'>
                {loading ? "logging out" : <>
                    {!dont_show_logout_icon && <CiLogout
                        size={25}
                    />}


                    LogOut
                </>}
            </div>

        </UiButton>
    )
}

export default LogOut