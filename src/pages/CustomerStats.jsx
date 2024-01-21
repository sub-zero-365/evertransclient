import { useQuery } from "@tanstack/react-query"
import { BarChart, LineChart, PieChart, Scrollable, TicketCounts } from "../components"
import AnimatedText from "../components/AnimateText"
import { useLoaderData, useSearchParams } from "react-router-dom"
import customFetch from "../utils/customFetch"
import {
    dateSortedOption
    , chatsOptions
} from "../utils/sortedOptions"
import FilterButton from "../components/FilterButton"
import { useEffect, useState } from "react"
import { AreaChart } from "../components/AreaChart"
import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
import UiButton from "../components/UiButton"

const topRankedQuery = (params) => {
    return (
        {
            queryKey: ["rankedusers", params],
            queryFn: async () => {
                const res = await customFetch.get("/ranked-users", {
                    params: {
                        ...params
                    }
                })
                return res.data
            },
            keepPreviousData: true
        }
    )
}
export const loader = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ])
    await queryClient.ensureQueryData(topRankedQuery(params))
    return {
        searchValues: params
    }
}

const CustomerStats = () => {
    const [searchParams] = useSearchParams({
        chartOption: "bar"
    })
    // const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [swiperRef, setSwiperRef] = useState(null);

    // const [chats, setChats] = useState(true)
    const nextSlide = () => {
        swiperRef.slideNext();
    };
    const prevSlide = () => {
        swiperRef.slidePrev();
    };
    const { searchValues } = useLoaderData()
    const { rankUsers, nHits } = useQuery(topRankedQuery(searchValues))?.data || []
    const [customers, setCustomerData] = useState(null)
    useEffect(() => {
        if (!rankUsers) return
        setCustomerData({
            ...{
                labels: rankUsers?.map((v) => v.fullname),
                datasets: [
                    {
                        label: "ticket vs user data",
                        data: rankUsers?.map((v) => v.total)

                    },
                ]

            }

        })
    }, [rankUsers])
    return (
        <div
            className="pt-4 
        !flex-1
      z-10
    pb-24
        max-w-full 
        overflow-x-auto
        select-none
        max-h-[calc(100vh-4rem)] 
        h-screen overflow-y-auto
        bg-color_light-
        dark:bg-color_dark"

        >
            <button onClick={nextSlide}>next</button>
            <button onClick={prevSlide}>pre</button>
            <div className="flex justify-center items-center gap-x-6">
                <UiButton
                    onClick={prevSlide}
                >
                    Ticket Customer Stats
                </UiButton>
                <UiButton
                    onClick={nextSlide}

                >
                    Mails Customer Stats
                </UiButton>

            </div>
            <>
                <Swiper
                    // loop
                    
                    speed={1000}
                    onSwiper={setSwiperRef}
                    effect={'flip'}
                    grabCursor={true}
                    // pagination={true}
                    navigation={true}
                    modules={[EffectFlip, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div
                            className="max-w-4xl mx-auto bg-orange-300-- p-4"
                        >
                            <Scrollable>
                                <TicketCounts
                                    className="!rounded-none"
                                    counts={nHits}
                                    text="Number of unique customers"
                                />
                            </Scrollable>
                            <Scrollable className="!justify-start !max-w-full !w-fit !mx-auto px-4 pb-5 scrollto">
                                {
                                    chatsOptions.map((query) => <FilterButton
                                        name="chartOption"
                                        {...query} key={query} />)
                                }

                            </Scrollable>


                            {
                                customers && customers?.labels?.length > 0 ? (
                                    searchParams.get("chartOption") == "line" && <LineChart chartData={customers} />
                                    ||

                                    searchParams.get("chartOption") == "bar" && <BarChart chartData={customers} /> ||
                                    searchParams.get("chartOption") == "pie" && <PieChart chartData={customers} /> ||
                                    searchParams.get("chartOption") == "area" && <AreaChart chartData={{
                                        ...customers,
                                        datasets: [
                                            {
                                                fill: true,
                                                borderColor: 'rgb(53, 162, 235)',
                                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                                label: "ticket vs user data",
                                                data: rankUsers?.map((v) => v.total)

                                            },
                                        ]
                                    }} />

                                )
                                    : <AnimatedText
                                        className="!text-4xl"
                                        text="Nothing to display here "
                                    />
                            }


                            <Scrollable className="!justify-start !max-w-full !w-fit !mx-auto px-4 pb-5 scrollto">
                                {
                                    dateSortedOption.map((query) => <FilterButton
                                        name="quickdatesort"
                                        {...query} key={query} />)
                                }

                            </Scrollable>

                            <div className={`relative max-w-full overflow-x-auto
                    bg-white
    shadow-md sm:rounded-lg w-full mb-6  `}>
                                <table className="w-full text-sm text-left text-gray-500 
              dark:text-gray-400 transition-colors duration-[2s]">
                                    <thead className="text-xs text-gray-700 dark:bg-slate-800 uppercase dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-2 py-3">
                                                Index
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                full name
                                            </th>


                                            <th scope="col" className="px-3 py-3">
                                                TotalBooks
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                Phone Number
                                            </th>





                                            <th scope="col" className="px-3 py-3">
                                                Gender
                                            </th>
                                            <th scope="col" className="px-3 py-3 hidden-- lg:block">
                                                Id
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody
                                        className="pt-4 pb-12 text-xs md:text-sm"
                                    // key={currentPage}

                                    >
                                        {
                                            rankUsers?.map((user, index) => (
                                                <tr key={index}
                                                    className={` ${index % 2 == 0
                                                        ? "bg-slate-100" : "bg-white"}
                                        hover:bg-slate-300
                        dark:hover:bg-slate-500
                border-slate-100  text-xs
                border-b-2
                dark:bg-gray-900
                dark:border-gray-600
                
                `}
                                                >
                                                    <th className="px-2 py-4  flex items-center justify-center">
                                                        {

                                                            (index + 1)
                                                        }
                                                    </th>


                                                    <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {user?.fullname || "n/a"}
                                                    </th>


                                                    <td className="px-3 py-4">
                                                        <span className="font-medium
                              ">{user?.total || " n/a"}</span>
                                                    </td>
                                                    <td className="px-3 py-4">
                                                        <span className="font-medium
                              ">{user?.phone || " n/a"}</span>
                                                    </td>
                                                    <td className="px-3 py-4">
                                                        <span className="font-medium
                              ">{user?.sex || " n/a"}</span>
                                                    </td>
                                                    <td className="px-3 py-4">
                                                        <span className="font-medium
                              ">{user?.idcardnumber || " n/a"}</span>
                                                    </td>

                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            className="max-w-4xl mx-auto bg-orange-300-- p-4"
                        >
                            <Scrollable>
                                <TicketCounts
                                    className="!rounded-none"
                                    counts={nHits}
                                    text="Number of unique customers"
                                />
                            </Scrollable>
                            <Scrollable className="!justify-start !max-w-full !w-fit !mx-auto px-4 pb-5 scrollto">
                                {
                                    chatsOptions.map((query) => <FilterButton
                                        name="chartOption"
                                        {...query} key={query} />)
                                }

                            </Scrollable>


                            {
                                customers && customers?.labels?.length > 0 ? (
                                    searchParams.get("chartOption") == "line" && <LineChart chartData={customers} />
                                    ||

                                    searchParams.get("chartOption") == "bar" && <BarChart chartData={customers} /> ||
                                    searchParams.get("chartOption") == "pie" && <PieChart chartData={customers} /> ||
                                    searchParams.get("chartOption") == "area" && <AreaChart chartData={{
                                        ...customers,
                                        datasets: [
                                            {
                                                fill: true,
                                                borderColor: 'rgb(53, 162, 235)',
                                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                                label: "ticket vs user data",
                                                data: rankUsers?.map((v) => v.total)

                                            },
                                        ]
                                    }} />

                                )
                                    : <AnimatedText
                                        className="!text-4xl"
                                        text="Nothing to display here "
                                    />
                            }


                            <Scrollable className="!justify-start !max-w-full !w-fit !mx-auto px-4 pb-5 scrollto">
                                {
                                    dateSortedOption.map((query) => <FilterButton
                                        name="quickdatesort"
                                        {...query} key={query} />)
                                }

                            </Scrollable>

                            <div className={`relative max-w-full overflow-x-auto
                    bg-white
    shadow-md sm:rounded-lg w-full mb-6  `}>
                                <table className="w-full text-sm text-left text-gray-500 
              dark:text-gray-400 transition-colors duration-[2s]">
                                    <thead className="text-xs text-gray-700 dark:bg-slate-800 uppercase dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-2 py-3">
                                                Index
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                full name
                                            </th>


                                            <th scope="col" className="px-3 py-3">
                                                TotalBooks
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                Phone Number
                                            </th>





                                            <th scope="col" className="px-3 py-3">
                                                Gender
                                            </th>
                                            <th scope="col" className="px-3 py-3 hidden-- lg:block">
                                                Id
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody
                                        className="pt-4 pb-12 text-xs md:text-sm"
                                    // key={currentPage}

                                    >
                                        {
                                            rankUsers?.map((user, index) => (
                                                <tr key={index}
                                                    className={` ${index % 2 == 0
                                                        ? "bg-slate-100" : "bg-white"}
                                        hover:bg-slate-300
                        dark:hover:bg-slate-500
                border-slate-100  text-xs
                border-b-2
                dark:bg-gray-900
                dark:border-gray-600
                
                `}
                                                >
                                                    <th className="px-2 py-4  flex items-center justify-center">
                                                        {

                                                            (index + 1)
                                                        }
                                                    </th>


                                                    <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {user?.fullname || "n/a"}
                                                    </th>


                                                    <td className="px-3 py-4">
                                                        <span className="font-medium
                              ">{user?.total || " n/a"}</span>
                                                    </td>
                                                    <td className="px-3 py-4">
                                                        <span className="font-medium
                              ">{user?.phone || " n/a"}</span>
                                                    </td>
                                                    <td className="px-3 py-4">
                                                        <span className="font-medium
                              ">{user?.sex || " n/a"}</span>
                                                    </td>
                                                    <td className="px-3 py-4">
                                                        <span className="font-medium
                              ">{user?.idcardnumber || " n/a"}</span>
                                                    </td>

                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </SwiperSlide>


                </Swiper>
            </>
            <AnimatedText
                className="!text-3xl "
                text="Customer Stats"
            />


        </div>
    )
}

export default CustomerStats