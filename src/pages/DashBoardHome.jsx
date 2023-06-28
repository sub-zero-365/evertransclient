import { DashItem, Button, Heading, FormatTable } from '../components'
// import { GrStackOverflow } from 'react-icons/gr'
// import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
// import { storeCities } from "../actions/userCity"
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';
import { setTicketData } from '../actions/adminData';
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
    const [ticketsCount, setTicketsCount] = useState(0)
    const token = localStorage.getItem("admin_token");
    const tickets_ = useSelector(state => state.setAdminData.tickets);
    const cities = useSelector(state => state.userCity.cities);
    const dispatch = useDispatch();
    const setTickets_ = (payload) => {
        // return dispatch(setTickets(payload))
    }
    useEffect(() => {
        const url = `${process.env.REACT_APP_LOCAL_URL}/admin/alltickets`
        
        // try {
        //     async function fetchData() {
        //         const response = await axios.get(url, {
        //             headers: {
        //                 'Authorization': "makingmoney " + token
        //             }, params: {
        //                 limit: 10
        //             }
        //         })


        //         setTickets_([...response?.data?.tickets])
        //         setTicketsCount(response?.data?.totalTickets);
        //     }
        //     fetchData()

        // } catch (err) {
        //     console.log(err)
        // }
    }, [])

    return (
        <div className="w-full pt-6 pb-24 max-h-[calc(100vh-3rem)] overflow-y-auto">
            <Heading text="OverFlow" className="!font-black underline underline-offset-8 uppercase" />
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
                <DashItem Name={"Cities"}
                    href={"cities"}
                    Counts={23}
                    icon={<BiBus className='text-3xl' />} />

            </div>
            <Heading text="Recent Book Tickets" className="!font-black first-letter:!text-4xl !text-xl underline underline-offset-8 uppercase" />

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
                    <FormatTable tickets={tickets_} admin />

                </table>
            </div>
            <div className="md:grid grid-cols-2 items-start space-y-5 container mx-auto px-5 md:px-14">

                <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <Heading text="Recent Employees" className="!font-black first-letter:!text-4xl !text-xl underline underline-offset-8 uppercase" />

                    <div class="w-full max-w-[3orem]">
                        {
                            [1, 2, 4, 5, 67, 8,].map((item) => renderEmployees())
                        }
                    </div>
                </div>
                <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <Heading text="Recent  Cities" className="!font-black !text-xl first-letter:!text-4xl underline underline-offset-8 uppercase" />

                    {
                        cities.map((item, index) => (

                            <motion.div
                                key={index}

                                className='flex gap-4 justify-between px-5 max-w-4xl mb-4 pb-1 items-center border-b-2' >
                                <div>
                                    {index + 1}
                                </div>
                                <div className='flex-1  justify-between flex'>
                                    <h1>{item.value} </h1>

                                </div>
                            </motion.div>
                        ))
                    }

                </div>
            </div>


        </div>
    )

}
export default DashboardHome