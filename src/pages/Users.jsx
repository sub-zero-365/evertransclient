import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, LineChart } from '../components';

import { setUsers } from '../actions/adminData';
import { Loader } from '../components';
import Select from 'react-select';
import { motion } from 'framer-motion'
import { UserData } from '../Assets/userdata';
const Appointment = () => {
    const token = localStorage.getItem("admin_token");

    const users_ = useSelector(state => state.setAdminData.users);
    const isLoading = useSelector(state => state.setAdminData.loading.users)
    const navigate = useNavigate()
    const options = [
        { label: "phone", value: "phone" },
        { label: "name", value: "name" },
        { label: "age", value: "age" },
        { label: "ticket number", value: "ticket number" },

    ]
    const dispatch = useDispatch();
    const setUsers_ = (payload) => {
        return dispatch(setUsers(payload))
    }
    const [text, setText] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        return

    }



    useEffect(() => {
        const url = process.env.REACT_APP_LOCAL_URL + "/admin/allusers"

        async function fetchData() {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                })
                setUsers_([...response?.data?.users])
                // console.log(response?.data?.users, "enter here")
            } catch (err) {
                setUsers_([])
                alert("fail to get users")
                console.log(err)
            }
        }
        fetchData()



    }, [])








    const [userData, setUserData] = useState({
        labels: UserData.map((v) => v.id),
        labels: UserData.map((v) => v.year),
        datasets: [
            {
                label: "users gain",
                data: UserData.map((v) => v.userGain),


            },
            {
                label: "users lost",
                data: UserData.map((v) => v.userLost)

            },
        ]

    })
    return (
        <motion.div
            className="max-w-full overflow-auto max-h-[calc(100vh-3rem)] " >
            {isLoading && (<Loader toggle dark />)}
            <h1 className='text-2xl text-center'>Users page</h1>
            <div className={`min-h-[12.5rem]-- relative  text-xs mx-0   rounded-lg `}
            >
                <LineChart chartData={userData} />
            </div>

            <form className="px-4 md:px-6 my-5 " onSubmit={handleSubmit}>
                <div className="flex relative min-h-[40px]">
                    <Select options={options} required />
                    <div className="relative w-full">
                        <input type="search" value={text} onChange={e => setText(e.target.value)} id="search-dropdown" className="block outline-none focus:outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Email address ,phone number,names etc " required />
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>



            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                Index
                            </th>
                            <th scope="col" className="px-6 py-3">
                                full name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                createdAt
                            </th>


                            <th scope="col" className="px-6 py-3">
                                user_id
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users_.map((user, index) => (<tr key={index} className="bg-white
                            dark:bg-gray-900 dark:border-gray-700 hover:bg-slate-200"
                            >
                                <td className="px-2 py-4  flex items-center justify-center">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user?.fullname || "n/a"}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user?.phone || "n/a"}
                                </th>

                                <td className="px-6 py-4">


                                    {user?.createdAt ?
                                        (new Date(user?.createdAt).toLocaleDateString()) : "n/a"}

                                </td>

                                <td className="px-6 py-4">

                                    {user?._id || "n/a"}

                                </td>


                                <td className="px-6 py-0 text-xs" onClick={() => navigate(`/dashboard/details/${user?._id || index}?admin=true`)}>
                                    <button type="button" class="text-blue-700 hover:text-white
                                border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                focus:ring-blue-300 font-medium rounded-lg  px-5 py-1
                                text-center text-xs
                                dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Details</button>
                                </td>
                            </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </motion.div>
    )

}

export default Appointment