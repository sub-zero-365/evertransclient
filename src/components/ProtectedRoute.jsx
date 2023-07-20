import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react'
import { setUserName } from "../actions/userName"
import Alert from '../components/Alert'

const ProtectedRoute = () => {
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState("")
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
                return res.data.user

            } catch (err) {
                navigate("/login?message=" + "something broke login again ")
            }
        }
        getData().then(async({ _id }) => {
                const url = `/restricted/${_id}`
                try {
                    const res = await axios.get(url);
                    setToggle(true)
                    setMessage(res.data.message)
                } catch (err) {

                }
    
        })
    }, [location.pathname])

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
        setToggle={()=>0}
      />
       
       <Outlet /></>
    )
}
export default ProtectedRoute