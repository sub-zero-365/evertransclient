import { DashItem } from '../components'
import { GrStackOverflow } from 'react-icons/gr'
import { useravatar } from '../Assets/images';
import {AiOutlineCheck,AiOutlineClose} from 'react-icons/ai'

import { useSelector, useDispatch } from 'react-redux';
import { setTickets } from '../actions/adminData';
import { Loader } from '../components';
import { BsTicketPerforated } from 'react-icons/bs'
import { BiBus } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from "axios"
function renderEmployees() {

    return (

        <li class="py-3 sm:py-4 overflow-x-auto">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src={useravatar || "/docs/images/people/profile-picture-1.jpg"} alt="Neil image" />
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Neil Sims
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        67201714
                    </p>
                </div>
                <div class="inline-flex items-center text-base font-medium text-gray-900 dark:text-white ">
                    View
                </div>
            </div>
        </li>
    )
}
const DashboardHome = () => {
    const navigate = useNavigate();
    const [ticketsCount,setTicketsCount]=useState(0)
    const dashitemdata = [
        {
            Name: "Employees",
            Counts: 15,
            href: "users",

        },
        {
            Name: "Tickets",
            Counts: 15,
            href: "tickets",
            icon: <BsTicketPerforated className='text-3xl' />
        },
        {
            Name: "Buses",
            Counts: 10,
            href: "buses/23",
            icon: <BiBus className='text-3xl' />
        },
    ]
    const token = localStorage.getItem("admin_token");

    const tickets_ = useSelector(state => state.setAdminData.tickets);
    const isLoading = useSelector(state => state.setAdminData.loading.tickets)
    console.log(tickets_, isLoading)

    const dispatch = useDispatch();
    const setTickets_ = (payload) => {
        return dispatch(setTickets(payload))
    }
    useEffect(() => {
        const url = `${process.env.REACT_APP_LOCAL_URL}/admin/alltickets`

        try {
            async function fetchData() {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                })
                setTickets_([...response?.data?.tickets])
                setTicketsCount([...response?.data?.tickets].length)
            }
            fetchData()

        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div className="w-full pt-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
            <h1 className="text-3xl mb-6 text-gray-700 pl-6 tracking-tight">Overflow <GrStackOverflow className="inline-block pl-2 text-4xl" /></h1>
            <div className="lg:grid gap-4 lg:grid-cols-3 px-4">
                 <DashItem Name={"Employees"} 
                        href={"users"} 
                        Counts={23}
                        icon={<BsTicketPerforated className='text-3xl' />} />
                 <DashItem Name={"Tickets"} 
                        href={"tickets"} 
                        Counts={ticketsCount}
                        icon={<BsTicketPerforated className='text-3xl' />} />
                 <DashItem Name={"Buses"} 
                        href={"buses/23"} 
                        Counts={23}
                        icon={<BiBus className='text-3xl' />} />

            </div>
            <h1 className="text-2xl mb-6 text-gray-700 pl-6 tracking-tight">Recent Book tickets <GrStackOverflow className="inline-block pl-2 text-4xl" /></h1>

            <div className="relative overflow-x-auto shadow-md bg-white sm:rounded-lg w-full mb-6 ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                Index
                            </th>
                            <th scope="col" className="px-3 py-3">
                                full name
                            </th>
                            <th scope="col" className="px-3 py-3">
                                phone
                            </th>
                            <th scope="col" className="px-3 py-3">
                                price
                            </th>
                            <th scope="col" className="px-3 py-3">
                                from
                            </th>
                            <th scope="col" className="px-3 py-3">
                                to
                            </th>
                            <th scope="col" className="px-3 py-3">
                                date
                            </th>
                            <th scope="col" className="px-3 py-3">
                                time
                            </th>
                            <th scope="col" className="px-3 py-3">
                                status
                            </th>
                            <th scope="col" className="px-3 py-3">
                                age
                            </th>
                            <th scope="col" className="px-3 py-3">
                                sex
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            tickets_.slice(0, 10).map((ticket, index) => (<tr key={index} className="bg-white hover:bg-slate-300  text-xs dark:bg-gray-900 dark:border-gray-700"
                            >
                                <td className="px-2 py-4  flex items-center justify-center">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ticket?.fullname || "ako bate emmanuel"}
                                </th>
                                <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ticket?.phone || "n/a"}
                                </th>
                                <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ticket?.price || " 5000frs"}
                                </th>
                                <td className="px-3 py-4">
                                    <span className="font-medium
                                    ">{ticket?.from || " n/a"}</span>

                                </td>
                                <td className="px-3 py-4">
                                    <span className="font-medium ">{ticket?.to || "n/a"}</span>
                                </td>
                                <td className="px-3 py-4">
                                    {ticket?.traveldate ?
                                        (new Date(ticket.traveldate).toLocaleDateString()) : "n/a"}

                                </td>
                                <td className="px-3 py-4">
                                    {ticket?.traveltime
                                        || "n/a"}

                                </td>
                                <td className="px-3 py-4  grid place-items-center">
                {ticket?.active ?
                <span className='w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck/></span>
                  : 
                <span className='w-6 h-6  bg-red-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineClose/></span>
                  
                  }

              </td>

                                <td className="px-3 py-4">
                                    {ticket?.age || "n/a"}

                                </td>
                                <td className="px-3 py-4">
                                    {ticket?.sex || "n/a"}

                                </td>
                                <td className="px-3 py-4 text-xs" onClick={() => navigate(`/dashboard/${ticket?._id || index}?admin=true`)}>
                                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">details</a>
                                </td>
                            </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <h1 className="text-2xl mb-6 text-gray-700 pl-6 tracking-tight">Recent Employees  <GrStackOverflow className="inline-block pl-2 text-4xl" /></h1>

            <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">


                <div class="flow-root- w-full">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            [1, 2, 4, 5, 67, 8,].map((item) => renderEmployees())
                        }
                    </ul>
                </div>
            </div>

        </div>
    )

}
export default DashboardHome