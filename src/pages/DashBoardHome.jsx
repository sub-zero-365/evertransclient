import { DashItem,Button } from '../components'
import { GrStackOverflow } from 'react-icons/gr'
// import { useravatar } from '../Assets/images';
import {AiOutlineCheck,AiOutlineClose} from 'react-icons/ai'

import { useSelector, useDispatch } from 'react-redux';
import { setTickets } from '../actions/adminData';
import { BsTicketPerforated } from 'react-icons/bs'
import { BiBus } from 'react-icons/bi'
import { useState, useEffect, useRef } from 'react'
import axios from "axios"
function renderEmployees() {

    return (
    <div className=''>
    coding this user section for later dates
    
    </div>
    )
}
const DashboardHome = () => {
    const [ticketsCount,setTicketsCount]=useState(0)
    const token = localStorage.getItem("admin_token");
    const tickets_ = useSelector(state => state.setAdminData.tickets);
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
            <h1 className="text-3xl mb-6 text-gray-700 pl-6 tracking-tight dark:text-white">Overflow <GrStackOverflow className="inline-block pl-2 text-4xl" /></h1>
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
            <h1 className="text-2xl mb-6 text-gray-700 dark:text-white pl-6 tracking-tight">Recent Book tickets <GrStackOverflow className="inline-block pl-2 text-4xl" /></h1>

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
                                <td className="px-0 py-1 text-xs" 
                                // onClick={() => navigate(`/dashboard/${ticket?._id || index}?admin=true`)}
                                >
                                    {/* <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">details</a> */}
<Button
name="view"
href={`/dashboard/${ticket?._id || index}?admin=true`}
/>
                                </td>
                            </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <h1 className="text-2xl mb-6 text-gray-700 pl-6 tracking-tight dark:text-white">Recent Employees  <GrStackOverflow className="inline-block pl-2 text-4xl" /></h1>

            <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                <div class="w-full max-w-[3orem]">
                        {
                            [1, 2, 4, 5, 67, 8,].map((item) => renderEmployees())
                        }
                </div>
            </div>

        </div>
    )

}
export default DashboardHome