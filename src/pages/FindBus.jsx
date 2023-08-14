import { AiOutlineArrowRight } from 'react-icons/ai'
import {
    useQuery,
} from '@tanstack/react-query'
import {
    Link,
    useSearchParams, useNavigate
} from "react-router-dom"
import { useEffect, useState } from 'react'
import { Heading } from '../components'
import AnimateText from '../components/AnimateText'
import {
    motion,
    AnimatePresence
} from 'framer-motion'
import axios from 'axios'
import dayjs from 'dayjs'
import Marquee from 'react-fast-marquee'
import { useFilter } from '../Hooks/FilterHooks'
const FindBus = () => {
    const { handleFilterChange } = useFilter()
    // const [isLoading, setIsLoading] = useState(true)
    const [querySearch] = useSearchParams();
    const [selected, setSelected] = useState(querySearch.get("bus"));
    const from = querySearch.get("from")
    const to = querySearch.get("to")
    const date = querySearch.get("date")
    const time = querySearch.get("time")

    const getBuses = async () => {

        try {
            const res = await axios.get("/seat/getstatic", {
                params: {
                    from,
                    traveldate: date,
                    to,
                    traveltime: time
                }
            })
            console.log(res.data)
            return res.data

        } catch (err) {
            console.log("error : ", err)
        }


    }

    const { loading, data, error, isError, isLoading } = useQuery({
        queryKey: ["findbus", {
            from, to, date
        }
        ],
        queryFn: getBuses
    })

    const [bus, setBus] = useState({})

    useEffect(() => {

        if (selected) {
            const currentbus = data?.seats?.find(({ _id }) => _id === selected)
            handleFilterChange("bus", selected)
            setBus(currentbus)
        }

    }, [selected])
    const navigate = useNavigate()
    const Next = async () => {
        if (selected == null) return alert("please selected a bus")
        return navigate(`/bussits/${selected}?${querySearch.toString()}`)

    }
    const BusDetail = ({ _id, number_of_seats, seat_positions, from, to, bus }) => {
        const busType = bus?.feature && bus.feature == "Normal Bus" || bus?.feature == "classic"
        const avalaibleseats = seat_positions?.filter(({ isTaken, isReserved }) => (isTaken == true || isReserved == true))?.length
        return (
            <div
                onClick={() => {
                    if (selected == _id) return setSelected(null)
                    setSelected(_id)
                }}
                className={`${selected === _id ? "bg-blue-200 py-10 dark:bg-slate-950" : busType ? "bg-rose-100 dark:bg-slate-600" : "bg-white dark:bg-slate-800"} dark:text-white w-full mx-1 ease duration-700 transition-colors rounded-lg mb-4 dark:shadow-sm dark:shadow-black shadow-lg shadow-white pb-5   min-h-[3rem]`}>

                {

                    (selected === _id) && (
                        <Marquee>
                            select seat
                        </Marquee>
                    )}
                <div className="flex justify-between pt-0.5 px-4 border-b pb-1 ">
                    <p>Plate Number</p>
                    <p>{_id}</p>
                </div>
                <div className="grid grid-cols-2 mb-2">
                    <Heading text={"From"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={"Destination"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={from} className="!mb-0 !text-sm" />
                    <Heading text={to} className="!mb-0 !text-sm" />
                </div>
                <div className="grid grid-cols-2 mb-2">
                    <Heading text={"Bus Name"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={"Bus Type"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={bus?.bus ?? "vip"} className="!mb-0 !text-sm" />
                    <Heading text={bus?.feature && (bus.feature == "Normal Bus" || bus.feature == "classic") ? "Classic" : "Vip Bus"} className="!mb-0 !text-sm" />
                </div>
                <div className="grid grid-cols-2 mb-2">
                    <Heading text={"Seats"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={"Consumed"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={number_of_seats} className="!mb-0 !text-sm" />
                    <Heading text={avalaibleseats} className="!mb-0 !text-sm" />
                </div>
            </div>
        )
    }
    if (isLoading) {
        return <div className="min-h-screen bg-slate-50 grid items-center text-3xl lg:text-4xl text-center"
        >Loading buses </div>
    }
    if (isError) {
        return <div className="min-h-screen bg-slate-50 grid items-center text-3xl lg:text-4xl text-center"
        >Oops Something Went wrong </div>
    }


    return (

        <div className="h-[calc(100vh-60px)] w-full container mx-auto">
            <div className={`md:grid grid-cols-[1fr,30rem]  w-full  h-full   ${selected !== null && "lg:grid-cols-[1fr,30rem,25rem]"}`}>
                <div className="h-full hidden md:block">

                    image here
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
                                        <h1 className="text-slate-400  font-medium text-xl ">Select Bus</h1>
                                    </a>
                                </div>
                            </li>

                        </ol>
                    </nav>
                    <AnimateText text="Select Bus" className="!text-2xl " />
                    <AnimateText text={dayjs().format("DD-MM-YYYY")} className="!text-lg " />


                    {

                        data?.seats?.map((arr, index) => {
                            return (
                                <BusDetail {...arr} key={index} />
                            )
                        })
                    }
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
                                    <button

                                        onClick={Next}
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        class="inline-block  rounded bg-blue-500 cal-width [--w:400px]  pb-2 pt-2.5 text-sm font-montserrat font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-primary-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        Next <AiOutlineArrowRight className="!inline-block " />
                                    </button>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
                <div className={`hidden overflow-hidden ${selected !== null && "lg:block px-4"} `} >
                    <AnimateText text={"selected bus"} className="!text-3xl " />
                    <motion.div
                        key={selected}
                        initial={{ y: 60, opacity: 0.5 }}
                        animate={{ y: 0, opacity: 1 }}

                    >
                        <BusDetail {...bus} />

                    </motion.div>
                    <button
                        type="submit"
                        className="hidden lg:inline-block bg-blue-400 
              w-full rounded bg-primary px-7
              pb-2.5 pt-3 text-sm font-medium
              uppercase leading-normal
              text-white
              shadow-[0_4px_9px_-4px_#3b71ca]
              transition duration-150
              ease-in-out hover:bg-primary-600
              hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
              focus:bg-primary-600 
              focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
              focus:outline-none focus:ring-0 active:bg-primary-700 
              active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
              dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
              dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
              dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
              dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={Next}
                    >
                        Next <AiOutlineArrowRight className="!inline-block " />
                    </button>
                </div>
            </div>

        </div>
    )
}
export default FindBus