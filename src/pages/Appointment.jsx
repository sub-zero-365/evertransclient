import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { setTickets } from '../actions/adminData';
import { Loader } from '../components';
const Appointment = () => {
    const tickets_ = useSelector(state => state.setAdminData.tickets);
    const isLoading = useSelector(state => state.setAdminData.loading.tickets)
    console.log(tickets_,isLoading)

    const dispatch = useDispatch();
    const setTickets_ = (payload) => {
        return dispatch(setTickets(payload))
    }
    const navigate = useNavigate();
    const text = useRef(null)
    const options = [
        { label: "fullname", value: "fullname" },
        { label: "phone", value: "phone" },
        { label: "sex", value: "sex" },
        { label: "email", value: "email" },

    ]
    const [option, setOption] = useState("")
    // const [tickets, setTickets] = useState([]);
    const token = localStorage.getItem("admin_token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseUrl = `${process.env.REACT_APP_LOCAL_URL}/admin/alltickets?${option}=${text.current.value.toLowerCase()}`
        try {
            const response = await axios.get(baseUrl, {
                headers: {
                    'Authorization': "makingmoney " + token
                }
            })
            // console.log(response?.data?.tickets);
            setTickets_([...response?.data?.tickets])
        }

        catch (err) {
            console.log(err)
        }
    }
    const url = `${process.env.REACT_APP_LOCAL_URL}/admin/alltickets`
    useEffect(() => {
        try {
            async function fetchData() {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                })
                // console.log(response?.data?.tickets);
                setTickets_([...response?.data?.tickets])
            }
            fetchData()

        } catch (err) {
            console.log(err)
        }
    }, [])


    return (
        <div className="max-w-full h-[calc(100vh-3rem)] overflow-auto" >
            {isLoading&&(<Loader toggle dark />)}
            <h1 className='text-2xl text-center'>Recent Book tickets</h1>

            <form className="px-4 md:px-3 my-5 " onSubmit={handleSubmit}>
                <div className="flex relative min-h-[40px]">
                    <Select options={options} onChange={e => setOption(e.value)} required />
                    <div className="relative w-full">
                        <input type="search" ref={text} id="search-dropdown" className="block outline-none focus:outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Email address ,phone number,names etc " required />
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
                            tickets_.map((ticket, index) => (<tr key={index} className="bg-white  text-xs dark:bg-gray-900 dark:border-gray-700"
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
                                    <span href={`https://wa.me/237672301714`} className="font-medium cursor:pointer text-blue-500 dark:text-blue-500 hover:underline">{ticket?.from || " n/a"}</span>

                                </td>
                                <td className="px-3 py-4">
                                    <span href={`mailto:bateemma14@gmail.com`} className="font-medium cursor:pointer text-blue-500 dark:text-blue-500 hover:underline">{ticket?.to || "n/a"}</span>


                                </td>
                                <td className="px-3 py-4">

                                    {ticket?.traveldate ?
                                        (new Date(ticket.traveldate).toLocaleDateString()) : "n/a"}

                                </td>
                                <td className="px-3 py-4">
                                    {ticket?.traveltime
                                        || "n/a"}

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

        </div>
    )

}

export default Appointment