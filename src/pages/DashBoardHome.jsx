import {
    DashItem,
    Heading, FormatTable
    ,
    PieChart

} from '../components'
import { useSelector, useDispatch } from 'react-redux';
import { setTicketData } from '../actions/adminData';
import { BsTicketPerforated } from 'react-icons/bs'
import { BiBus } from 'react-icons/bi'
import { useState, useEffect, useRef } from 'react'
import axios from "axios"


const DashboardHome = () => {
    // const [users, setUsers] = useState([])
    const token = localStorage.getItem("admin_token");
    const ticketData = useSelector(state => state.setAdminData.ticketdata);
    // const cities = useSelector(state => state.userCity.cities);
    const dispatch = useDispatch();
    const setTicketDataFunction = (payload) => {
        return dispatch(setTicketData(payload))
    }
    const [e_count, setE_count] = useState(null)
    const [b_count, setB_count] = useState(null)
    useEffect(() => {
        const getBuses = async () => {

            try {
                const { data: { nHits } } = await axios.get("/bus")
                setB_count(nHits)

            } catch (err) {
                console.log("error : ", err)

            }
            finally {

            }

        }

        getBuses()
        const getUsers = async () => {
            try {
                const { data: { nHits } } = await axios.get("/users/user-stats", {
                })
                setE_count(nHits)
            } catch (err) {
                console.log(err)
            }
        }
        (async function () {
            const url = `/ticket`
            try {
                const response = await axios.get(url, {
               
                    params: { limit: 20 }
                })
                setTicketDataFunction({ ...response?.data })
            } catch (err) {
                console.log(err);
            }
        }())

        getUsers()

    }, [])

    return (
        <div className="w-full pt-6 pb-24 max-h-[calc(100vh-3rem)] overflow-y-auto">
            <Heading text="OverFlow" className="!font-black underline underline-offset-8 uppercase" />
            <div className="md:grid md:grid-cols-2 gap-4 lg:grid-cols-3 px-4">
                <DashItem Name={"Employees"}
                    href={"users"}
                    Counts={e_count}
                    icon={<BsTicketPerforated className='text-3xl' />} />
                <DashItem Name={"Tickets"}
                    href={"tickets"}
                    Counts={ticketData.totalTickets}
                    icon={<BsTicketPerforated className='text-3xl' />} />
                <DashItem Name={"Cars"}
                    href={"bus"}
                    Counts={b_count}
                    icon={<BiBus className='text-3xl' />} />
                <DashItem Name={"Cities"}
                    href={"cities"}
                    Counts={2}
                    icon={<BiBus className='text-3xl' />} />

            </div>
            <Heading text="Tickets Stats" className="!font-black first-letter:!text-2xl !text-lg underline underline-offset-8 uppercase" />
            <div className="lg:grid grid-cols-2 justify-center pb-10 items-center">

                <div className="flex items-center justify-center   text-gray-800 p-10 pt-0 bg-gray-200--">
                    <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
                        <div className="flex w-full max-w-sm flex-none items-center p-4 bg-white rounded">
                            <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                                <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-grow flex flex-col ml-4">
                                <span className="text-xl font-bold">{ticketData?.totalPrice || "loading"}</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full max-w-sm flex-none items-center p-4 bg-white rounded">
                            <div className="flex flex-shrink-0 items-center justify-center rotate-180 bg-blue-200 h-16 w-16 rounded">
                                <svg className="w-6 h-6 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-grow flex flex-col ml-4">
                                <span className="text-xl font-bold">{ticketData?.totalActivePrice || "loading"}</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Inactive</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center w-full max-w-sm flex-none p-4 bg-white rounded">
                            <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                                <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-grow flex flex-col ml-4">
                                <span className="text-xl font-bold">{ticketData?.totalInActivePrice || "loading"}</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Inactive</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="max-w-[calc(100%-2.5rem)] flex justify-center  border-orange-400 mx-auto items-center w-[25rem]">
                    <PieChart
                        chartData={{
                            labels: ["Active Pirce,InaAcive Price"],
                            datasets: [
                                {
                                    label: "ticket data",
                                    data: [ticketData?.totalActivePrice, ticketData?.totalInActivePrice]

                                },
                            ]

                        }}
                    />

                </div>
            </div>


            <Heading text="Recent Book Tickets" className="!font-black first-letter:!text-2xl !text-lg underline underline-offset-8 uppercase" />

            <FormatTable
                ticketData={ticketData}
                hidePanigation
                // skip={10}
                // currentPage={1}
                admin />




        </div>
    )

}
export default DashboardHome