import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react'
import { setUserName } from "../actions/userName"
import Alert from '../components/Alert'
import AnimatedText from './AnimateText';

const ProtectedRoute = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState("")
    const location = useLocation()
    const navigate = useNavigate()

    const setuserName = (username) => {
        dispatch(setUserName(username))

    }

    const dispatch = useDispatch();
    const token = localStorage.getItem("token") || localStorage.getItem("assistant_token")

    // || localStorage.getItem("admin_token")
    useEffect(() => {
        if (!token) return
        async function getData() {
            const url = "/auth/userinfo";
            try {

                const res = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                })
                console.log(res)
                setuserName(res?.data?.user?.fullname);
                return res.data.user

            } catch (err) {
                console.log(err)
                if (err.toJSON().message == "Network Error") {
                    // alert("no internt connections")
                } else {
                    navigate("/login?message=" + "something broke login again ")
                }
            }
        }
        getData().then(async ({ _id }) => {
            const url = `/restricted/${_id}`
            try {
                const res = await axios.get(url);
                setToggle(true)
                setMessage(res.data.message)
            } catch (err) {

            }

        })
    }, [location.pathname])
    useEffect(() => {
        function onlineHandler() {
            setIsOnline(true);
        }

        function offlineHandler() {
            setIsOnline(false);
        }

        window.addEventListener("online", onlineHandler);
        window.addEventListener("offline", offlineHandler);


        return () => {
            window.removeEventListener("online", onlineHandler);
            window.removeEventListener("offline", offlineHandler);
        };
    }, []);

    if (!token) {
        return <Navigate to="/login?message=hello user please login to access this protected route" replace />
    }
    return (
        <>
            <Alert message={message}
                duration="30000"
                className={`
      ${toggle && "!top-1/2 -translate-y-1/2"}
      `}
                toggle={toggle}
                setToggle={() => 0}
            />
            <div className='flex flex-col h-screen'>
                {
                    !isOnline && (
                        <div class="bg-red-100 container flex-none mx-auto border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong class="font-bold">No internet connection!</strong>
                            <span class="block sm:inline">Youre are currently offline !</span>
                            <span class="absolute hidden top-0 bottom-0 right-0 px-4 py-3">
                                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </span>
                        </div>

                    )
                }
                <div className='flex-1'>
                
                <Outlet />
                </div>

            </div>

        </>
    )
}
export default ProtectedRoute