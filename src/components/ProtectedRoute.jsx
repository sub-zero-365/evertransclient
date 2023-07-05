import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { useEffect } from 'react'
import { setUserName } from "../actions/userName"

const ProtectedRoute = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const setuserName = (username) => {
        dispatch(setUserName(username))

    }

    const dispatch = useDispatch();
    const token = localStorage.getItem("token") || localStorage.getItem("admin_token")

    useEffect(() => {
        if (!token) return
        async function getData() {
            const url = process.env.REACT_APP_LOCAL_URL + "/auth/userinfo";
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                })

                setuserName(res?.data?.user?.fullname);
            } catch (err) {
                navigate("/login?message=" + "something broke login again ")
            }
        }
        getData()
    }, [location.pathname])

    if (!token) {
        return <Navigate to="/login?message=hello user please login to access this protected route" replace />
    }
    return (
        <Outlet />
    )
}
export default ProtectedRoute