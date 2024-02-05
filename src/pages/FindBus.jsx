import { AiOutlineArrowRight } from 'react-icons/ai'
import {
    useQuery,
} from '@tanstack/react-query'
import {
    Link,
    useSearchParams, useNavigate, useLoaderData,
    defer, Await, useAsyncValue, useRouteError, useAsyncError
} from "react-router-dom"
import { Suspense, useEffect, useState } from 'react'
import { Heading, Scrollable } from '../components'
import AnimateText from '../components/AnimateText'
import LoadingButton from '../components/LoadingButton'

import {
    motion,
    AnimatePresence
} from 'framer-motion'
import dayjs from 'dayjs'
import customFetch from "../utils/customFetch"
import { ThreeDCardDemo } from '../components/3DEffect'
import UiButton from '../components/UiButton'
// import { dateSortedOption } from '../utils/sortedOptions'
// import FilterButton from '../components/FilterButton'
const priceQuery = (params) => {
    // console.log("this is the params oject here", params)
    return {
        queryKey: ["price", params],
        queryFn: async () => {
            const res = await customFetch.get("/routes/get", {
                params: params
            })
            console.log("this is the price in the loader function", res.data, params)
            return res.data
        }

    }
}
const busQuery = params => ({
    queryKey: ["buses", { params }],
    queryFn: async () => {
        const { data } = await customFetch.get('/seat/getstatic', {
            params: {
                ...params
            },
        });
        return data;
    },

})
const RenderBusPage = () => {
    // const { nHits, seats } = useAsyncValue();
    // const [querySearch] = useSearchParams();
    const [querySearch] = useSearchParams();
    const [selected, setSelected] = useState(querySearch.get("bus"));
    // const { searchValues } = useLoaderData()
    // const { seats, nHits } = useQuery(busQuery(searchValues))?.data || {};
    const [bus, setBus] = useState({})

    const navigate = useNavigate()
    const Next = async () => {
        return navigate(`/bussits/${selected}?${querySearch.toString()}`)
    }
    const BusDetail = (props) => {
        const { _id, number_of_seats, seat_positions, from, to, bus, traveltime, traveldate } = props
        const busType = bus?.feature && bus.feature == "Normal Bus" || bus?.feature == "classic"
        const avalaibleseats = seat_positions?.filter(({ isTaken, isReserved }) => (isTaken == true || isReserved == true))?.length
        return (
            <div
                onClick={() => {
                    if (selected == _id) {
                        setSelected(null)
                        setBus(null)
                        return
                    }
                    setSelected(_id)
                    setBus(props)

                }}
                className={`${selected === _id ? "bg-blue-200  dark:bg-slate-950" : busType ? "bg-rose-100 dark:bg-slate-600" : "bg-white dark:bg-slate-800"}
               border gold:border-none dark:text-white pt-5 px-3 w-full mx-1 ease duration-700 transition-colors rounded-lg mb-4
                dark:shadow-sm dark:shadow-black  shadow shadow-white pb-5   min-h-[3rem] gold:bg-color_gold/25`}>

                <h2 className='font-black !text-2xl capitalize leading-9 px-5 py-5'>
                    {bus?.bus}
                </h2>
                <div className="grid grid-cols-2 mb-2">
                    <Heading text={"From"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={"Destination"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={from} className="!mb-0 !text-sm" />
                    <Heading text={to} className="!mb-0 !text-sm" />
                </div>
                <div className="grid grid-cols-2 mb-2">
                    <Heading text={"Travel time"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={"Travel Date"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={traveltime ?? ""} className="!mb-0 !text-sm" />
                    <Heading text={dayjs(traveldate).format("DD/MM/YY")} className="!mb-0 !text-sm" />
                </div>
                <div className="grid grid-cols-2 mb-2">
                    <Heading text={"Capacity"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={"Seat Consumed"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={number_of_seats} className="!mb-0 !text-sm" />
                    <Heading text={avalaibleseats} className="!mb-0 !text-sm" />
                </div>
            </div>
        )
    }

    const { searchValues } = useLoaderData();
    const { nHits, seats } = useQuery(busQuery(searchValues))?.data || {};
    return (<>

        <AnimateText text={`Available Cars (${nHits})`} className="!text-2xl " />
        <AnimateText text={dayjs(new Date(querySearch.get("traveldate")))
            .format("dddd, MMMM D, YYYY")} className="!text-lg " />


        <div className="flex flex-col gap-y-2">
            {

                seats?.map((arr, index) => {
                    return (
                        // <ThreeDCardDemo>
                        <BusDetail {...arr} key={index} />
                        /* </ThreeDCardDemo> */
                    )
                })
            }
        </div>
        <AnimatePresence>
            {
                selected !== null && (
                    <motion.div
                        initial={
                            {
                                y: 10,
                                opacity: 0
                            }

                        }
                        animate={{
                            y: 0,
                            opacity: 1
                        }}
                        exit={{
                            y: 10,
                            opacity: 0
                        }}
                        transitions={{ duration: 2 }}

                        className="lg:hidden min-h-8
    flex items-center justify-center mt-5 fixed left-0 bottom-8 w-full">
                        <LoadingButton onClick={Next}
                            className="!w-[min(30rem,calc(100%-2.5rem))] !mx-auto !py-3.5 !text-lg !rounded-none"
                        >
                            Next <AiOutlineArrowRight size={20} className="!inline-block -rotate-45 ml-2 " />
                        </LoadingButton>

                    </motion.div>
                )
            }
        </AnimatePresence>
        {/* </div> */}
        <div className={`hidden overflow-hidden ${selected !== null && "lg:block px-4"} `} >

            <LoadingButton onClick={Next}
                className="!w-[min(30rem,calc(100%-2.5rem))] !mx-auto !py-3.5 !text-lg !rounded-none"
            >
                Next <AiOutlineArrowRight size={20} className="!inline-block -rotate-45 ml-2 " />
            </LoadingButton>
        </div>
    </>)
}
export const loader = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    params.time = params.traveltime
    params.date = params.traveldate
    delete params.traveltime
    delete params.traveldate
    try {
        const prices = await queryClient.ensureQueryData(priceQuery({ from: params.from, to: params.to }));
        return defer({
            BusQuery: queryClient.ensureQueryData(busQuery(params)),
            searchValues: { ...params },
            prices
        })
    } catch (err) {
        throw err
    }

    // await queryClient.ensureQueryData(busQuery(params));


    //   return { searchValues: { ...params } }
}
const ErrorFindBus_ = () => {
    const [searchQuery] = useSearchParams()
    const error = useRouteError();
    const isAsyncError = useAsyncError()
    const errorMessage = error?.response?.data || error?.message || isAsyncError?.response?.data || isAsyncError?.message || "something went wrong try again later "
    // error element when bus loader throws an error ..

    return <div className='min-h-screen flex-none max-w-lg w-full'>
        <div className='space-y-5'>
            <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png"
                className="mx-auto max-w-lg"
            />
            <p className='text-lg sm:text-xl text-center text-rose-700 pt-10 italic px-10'>
                {errorMessage}
            </p>
            <UiButton className="!text-center !italic !rounded-md !text-lg !bg-green-500 !mt-10 w-[min(200px,calc(100%-40px))] !mx-auto !py-4">
                <Link to={`/booking?${searchQuery.toString()}`}>
                    Go Back
                </Link>
            </UiButton>
        </div>
    </div>
}
const FindBus = () => {
    const { BusQuery } = useLoaderData()

    return (

        <div className="h-[calc(100vh-60px)] w-full container mx-auto">
            <div className={`md:grid grid-cols-[1fr,30rem]  w-full  h-full   `}>
                <div className="h-full hidden md:block">

                    <img
                        src='https://png.pngtree.com/png-vector/20221020/ourmid/pngtree-passengers-waiting-for-bus-in-city-png-image_6329327.png'
                        className="h-full w-full" alt="bus pic" />
                </div>
                <div className="h-full pb-24 overflow-y-auto  px-2 lg:px-10 py-10 pt-0">
                    <nav className="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link to={"/"} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li className="inline-flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <Link to={"/booking"} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    Booking
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                        <h1 className="text-slate-400  font-medium text-xl ">Select Car </h1>
                                    </a>
                                </div>
                            </li>

                        </ol>
                    </nav>
                    <Suspense
                        fallback={<div>loading please wait </div>}
                    >
                        <Await
                            resolve={BusQuery}
                            errorElement={<ErrorFindBus_ />}>
                            <RenderBusPage />
                        </Await>

                    </Suspense>
                </div>
            </div>
        </div>
    )
}
export const ErrorFindBus = () => ErrorFindBus_();
export default FindBus