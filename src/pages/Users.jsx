import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {  LineChart, Number, AmountCount, Scrollable } from '../components';
import { BiCategory } from 'react-icons/bi';

import { setUsers } from '../actions/adminData';
import { Loader, Button,Heading } from '../components';
import {AiOutlinePlus} from 'react-icons/ai'
import { motion } from 'framer-motion'
import { UserData } from '../Assets/userdata';
const Appointment = () => {

    const token = localStorage.getItem("admin_token");

    const users_ = useSelector(state => state.setAdminData.users);
    const isLoading = useSelector(state => state.setAdminData.loading.users)
    const navigate = useNavigate()

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
        const url = process.env.REACT_APP_LOCAL_URL + "/admin/userticketlength"

        async function fetchData() {
            if (token == null) {
                alert("please login to get token")
            }
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    },
                    params: {
                        search: text
                    }
                })
                setUsers_([...response?.data?.userdetails]);
                setUserData({
                    ...{
                        labels: [...response?.data?.userdetails].map((v) => v.user.fullname),
                        datasets: [
                            {
                                label: "ticket vs user data",
                                data: [...response?.data?.userdetails].map((v) => v.nHits)

                            },
                        ]

                    }

                })
            } catch (err) {
                setUsers_([])
                alert("fail to get users")
                console.log(err)
            }
        }
        fetchData()



    }, [text])








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
            className="max-w-full overflow-auto max-h-[calc(100vh-3rem)] pt-10 " >
            {isLoading && (<Loader toggle dark />)}
            
            <Heading text="Employees OverView"/>
            <div className={`min-h-[12.5rem]-- relative  text-xs mx-0   rounded-lg `}
            >
                <div className="flex items-center  mb-10 mt-5 justify-between py-1 rounded-lg shadow bg-white mx-4">
                    <div className="flex-1">
                        <Heading text="Add A New Employee" className="!mb-2 !font-black mt-0"/>
                        <p className="mb-3 text-sm  px-6">Employees added help to book ticket and give more data</p>
                    </div>
                    <motion.div  onClick={() => navigate("/dashboard/register")}
                        initial={{ x: "-50%" }}
                        animate={{ scale: [0.7, 1.2, 0.8], rotate: [0, 360] }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            times: [0, 0.2, 0.5, 0.8, 1],
                            repeat: Infinity,
                            repeatDelay: 1
                        }

                        }
                        className="bottom-6 flex-none ml-2 shadow-2xl button-add  top-auto bg-blue-400 
w-[2rem] h-[2rem] rounded-full left-1/2 overflow-hidden 
-translate-x-1/2
z-10  "
                    >
                        <div className="flex h-full w-full items-center scale-animation justify-center ">
                            <AiOutlinePlus size={30} color="#fff" className="" />
                        </div>
                    </motion.div>

                </div>

                <LineChart chartData={userData} />
            </div>
            <Scrollable className="mb-10 mt-5">
                <AmountCount
                    className="!bg-blue-400"
                    text="All employees"
                    icon={<BiCategory />}
                    amount={67} />
                <AmountCount
                    className="!bg-blue-400"
                    text="All employees"
                    icon={<BiCategory />}
                    amount={67} />
                <AmountCount
                    className="!bg-blue-400"
                    text="All employees"
                    icon={<BiCategory />}
                    amount={67} />
            </Scrollable>
            
  
            
            <form className="px-4 md:px-6 my-5 " onSubmit={handleSubmit}>
                <div className="flex relative min-h-[40px]">
                    <div className="relative w-full">
                        <input type="search" value={text}
                            onChange={e => setText(e.target.value)} id="search-dropdown" className="block outline-none focus:outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg
                        border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Email address,names etc " required />
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg
                        border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
                                N_print
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
                            users_.map(({ user, nHits }, index) => (<tr key={index} className="bg-white
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
                                <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Number number={nHits} />
                                </th>

                                <td className="px-6 py-4">


                                    {user?.createdAt ?
                                        (new Date(user?.createdAt).toLocaleDateString()) : "n/a"}

                                </td>

                                <td className="px-6 py-4">

                                    {user?._id || "n/a"}

                                </td>


                                <td className="px-0 py-0 text-xs" >
                                    <Button
                                        name="Check User"
                                        href={`/dashboard/details/${user?._id || index}?admin=true&createdBy=${user?._id}`}
                                    ></Button>
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