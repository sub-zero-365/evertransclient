import { useEffect, useRef, useState } from 'react';
import { BiBus } from 'react-icons/bi';
import { BsTicketPerforated } from 'react-icons/bs';
import {
    DashItem,
    FormatTable,
    Heading
} from '../components';
import { allMailsQuery, ticketsQuery, useQueryFnc, usersQuery } from "../utils/tenstackqueryfnc";

// import customFetch from "customFetch"
import ChartsOptionsUi from '../components/ChartsOptionsUi';
import customFetch from "../utils/customFetch";
// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import AnimatedText from '../components/AnimateText';


const DashboardHome = () => {
    // const [users, setUsers] = useState([])
    const { mails,
        pendingSum,
        sentSum,
        recievedSum,
        total_mails
    } =
        useQueryFnc(allMailsQuery({}))?.data || {}
    const { nHits: TotalEmployees } = useQueryFnc(usersQuery)?.data || {}
    const { tickets,
        totalActivePrice,
        totalTickets,
        totalInActivePrice, totalPrice,
        monthlyApplications: ticketMonthlyMultiplication } = useQueryFnc(ticketsQuery({ limit: 30 }))?.data || {}
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    // const ticketData = useSelector(state => state.setAdminData.ticketdata);
    // const cities = useSelector(state => state.userCity.cities);
    // const dispatch = useDispatch();
    // const setTicketDataFunction = (payload) => {
    //     return dispatch(setTicketData(payload))
    // }
    // const [e_count, setE_count] = useState(null)
    const [b_count, setB_count] = useState(null)
    useEffect(() => {
        const getBuses = async () => {

            try {
                const { data: { nHits } } = await customFetch.get("/bus")
                setB_count(nHits)

            } catch (err) {
                console.log("error : ", err)

            }
            finally {

            }

        }





        // getUsers()
        getBuses()

    }, [])

    return (
        <div className="w-full pt-6 px-6 pb-24 max-h-[calc(100vh-3rem)] overflow-y-auto">
            <Heading text="OverFlow" className="!font-black underline underline-offset-8 uppercase" />
            <div className="md:grid md:grid-cols-2 gap-4 lg:grid-cols-3 px-4">
                <DashItem Name={"Employees"}
                    href={"users"}
                    Counts={TotalEmployees}
                    icon={<BsTicketPerforated className='text-3xl' />} />
                <DashItem Name={"Tickets"}
                    href={"tickets"}
                    Counts={totalTickets}
                    icon={<BsTicketPerforated className='text-3xl' />} />
                <DashItem Name={"Mails"}
                    href={"mails"}
                    Counts={total_mails}
                    icon={<BsTicketPerforated className='text-3xl' />} />
                <DashItem Name={"Routes"}
                    href={"routes"}
                    Counts={b_count}
                    icon={<BiBus className='text-3xl' />} />
                <DashItem Name={"Cars"}
                    href={"bus"}
                    Counts={b_count}
                    icon={<BiBus className='text-3xl' />} />
                <DashItem Name={"Cities"}
                    href={"cities"}
                    Counts={2}
                    icon={<BiBus className='text-3xl' />} />

            </div>
            <div className="relative hidden lg:!block">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="mySwiper "
                >
                    <SwiperSlide>

                        <Heading text="Tickets Price Stats" className="!font-black first-letter:!text-3xl !pl-4 sm:!text-start text-center !text-2xl underline !mb-3 !mt-6 underline-offset-8 uppercase" />
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
                                            <span className="text-xl font-bold">{totalPrice || "loading"}</span>
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
                                            <span className="text-xl font-bold">{totalActivePrice || "loading"}</span>
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
                                            <span className="text-xl font-bold">{totalInActivePrice || "loading"}</span>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-500">Inactive</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="max-w-[calc(100%-2.5rem)] flex justify-center  border-orange-400 mx-auto items-center w-[25rem]">
                                <ChartsOptionsUi
                                    donot_refresh
                                    btn_position="bottom"
                                    default_chart="pie"
                                    userData={{
                                        labels: ["Active Pirce", "InaAcive Price"],
                                        datasets: [
                                            {
                                                label: "ticket data",
                                                data: [totalActivePrice,
                                                    totalInActivePrice]

                                            },
                                        ]

                                    }}
                                />


                            </div>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide>

                        <Heading text="Mails Price Stats" className="!font-black first-letter:!text-3xl !pl-4 sm:!text-start text-center !text-2xl underline !mb-3 !mt-6 underline-offset-8 uppercase" />
                        <div className="lg:grid grid-cols-2 justify-center pb-10 items-center">

                            <div className="flex items-center justify-center   text-gray-800 p-10 pt-0 bg-gray-200--">
                                <Swiper
                                    modules={[Autoplay, Pagination, Navigation]}

                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    direction="vertical"

                                    className="!max-w-sm flex flex-col justify-center items-center !w-full !mx-auto border-4 !max-h-[400px]"
                                >
                                    <SwiperSlide>
                                        <h1 className="text-3xl  mb-4 leading-loose">Numbers Stats</h1>
                                        <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
                                            <div className="flex w-full max-w-sm flex-none items-center p-4 bg-white rounded">
                                                <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                                                    <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="flex-grow flex flex-col ml-4">
                                                    <span className="text-xl font-bold">{pendingSum || "loading"}</span>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-500">pending</span>
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
                                                    <span className="text-xl font-bold">{sentSum || "loading"}</span>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-500">sent</span>
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
                                                    <span className="text-xl font-bold">{recievedSum || "loading"}</span>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-500">Recieved</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
                                            <div className="flex w-full max-w-sm flex-none items-center p-4 bg-white rounded">
                                                <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                                                    <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="flex-grow flex flex-col ml-4">
                                                    <span className="text-xl font-bold">{pendingSum || "loading"}</span>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-500">pending</span>
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
                                                    <span className="text-xl font-bold">{sentSum || "loading"}</span>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-500">sent</span>
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
                                                    <span className="text-xl font-bold">{recievedSum || "loading"}</span>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-500">Recieved</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </SwiperSlide>
                                </Swiper>

                            </div>
                            <div className="max-w-[calc(100%-2.5rem)] flex justify-center  border-orange-400 mx-auto items-center w-[25rem]">
                                <ChartsOptionsUi
                                    donot_refresh
                                    btn_position="bottom"
                                    default_chart="pie"
                                    userData={{
                                        labels: ["Pending Price", "Sent Price", "Recieved Price"],
                                        datasets: [
                                            {
                                                label: "ticket data",
                                                data: [pendingSum, sentSum, recievedSum,
                                                ]
                                            },
                                        ]

                                    }}
                                />


                            </div>
                        </div>

                    </SwiperSlide>

                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
            </div>

            <Heading text="Tickets Price Stats" className="!font-black lg:hidden first-letter:!text-3xl !pl-4 sm:!text-start text-center !text-2xl underline !mb-3 !mt-6 underline-offset-8 uppercase" />
            <div className=" lg:hidden grid-cols-2 justify-center pb-10 items-center">

                <div className="flex items-center justify-center   text-gray-800 p-10 pt-0 bg-gray-200--">
                    <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
                        <div className="flex w-full max-w-sm flex-none items-center p-4 bg-white rounded">
                            <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                                <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-grow flex flex-col ml-4">
                                <span className="text-xl font-bold">{totalPrice || "loading"}</span>
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
                                <span className="text-xl font-bold">{totalActivePrice || "loading"}</span>
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
                                <span className="text-xl font-bold">{totalInActivePrice || "loading"}</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Inactive</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="max-w-[calc(100%-2.5rem)] flex justify-center  border-orange-400 mx-auto items-center w-[25rem]">
                    <ChartsOptionsUi
                        donot_refresh
                        btn_position="bottom"
                        default_chart="pie"
                        userData={{
                            labels: ["Active Pirce", "InaAcive Price"],
                            datasets: [
                                {
                                    label: "ticket data",
                                    data: [totalActivePrice,
                                        totalInActivePrice]

                                },
                            ]

                        }}
                    />
                    {/* <PieChart
                        chartData={{
                            labels: ["Active Pirce,InaAcive Price"],
                            datasets: [
                                {
                                    label: "ticket data",
                                    data: [totalActivePrice, totalInActivePrice]

                                },
                            ]

                        }}
                    /> */}

                </div>
            </div>


            <Heading text="Recent Book Tickets" className="!font-black first-letter:!text-2xl !text-lg underline underline-offset-8 uppercase" />

            <FormatTable
                ticketData={{ tickets }}
                hidePanigation
                // skip={10}
                // currentPage={1}
                admin />

            {ticketMonthlyMultiplication?.length > 1 &&
                <div className='max-w-4xl mx-auto mb-6 my-10'>
                    <AnimatedText
                        text="Monthly Ticket Stats Grap (5)"
                        className='!text-5xl lg:!text-5xl !mb-6 '
                    />

                    <ChartsOptionsUi
                        donot_refresh
                        btn_position="bottom"
                        default_chart="bar"
                        userData={
                            {
                                labels: ticketMonthlyMultiplication?.map(({ date }) => date),
                                datasets: [
                                    {
                                        label: "Number vs Tickets Book",
                                        data: ticketMonthlyMultiplication?.map(({ count }) => count)
                                    },
                                ]
                            }
                        }
                    />

                </div>
            }

        </div>
    )

}
export default DashboardHome