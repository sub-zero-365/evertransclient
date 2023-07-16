import { AiOutlineArrowRight } from 'react-icons/ai'

import {
    Link,
    useSearchParams, useNavigate
} from "react-router-dom"
import { useEffect, useState } from 'react'
import { Heading } from '../components'
import AnimateText from '../components/AnimateText'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
const FindBus = () => {
    const [selected, setSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const [querySearch, setQuerySearch] = useSearchParams();
    const from = querySearch.get("from")
    const to = querySearch.get("to")
    const date = querySearch.get("date")
    const [buses, setBuses] = useState([])
    const [avalaibebuses, setAvalaibeBuses] = useState([])

    const getBuses = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get("/route",
                {
                    params: {
                        from,
                        to,
                        // status: "active",
                        date: new Date(date).toLocaleDateString('en-CA'),
                        getbuses: true
                    }
                }
            )
            setBuses(res.data?.buses)
            if (res.data.nHits == 0) {
                setAvalaibeBuses(res.data.avalaibe_buses)
            }
            console.log(res.data)

        } catch (err) {
            console.log("error : ", err)

        }
        finally {
            // setTimeout(() => {
            setIsLoading(false)
            // }, 5000)
        }

    }
    useEffect(() => {
        getBuses()
    }, [])
    const [bus, setBus] = useState({})
    const handleFilterChange = (key, value = null) => {
        setQuerySearch(preParams => {
            if (value == null) {
                preParams.delete(key)
            } else {
                preParams.set(key, value)
            }
            return preParams
        })

    }
    useEffect(() => {

        if (selected) {
            const currentbus = buses?.find(({ _id }) => _id === selected)
            handleFilterChange("bus", selected)
            setBus(currentbus)
        }

    }, [selected])
    const navigate = useNavigate()
    const Next = async () => {
        if (selected == null) return alert("please selected a bus")
        return navigate(`/bussits/${selected}?${querySearch.toString()}`)

    }
    const BusDetail = ({ _id, name, travel_count, number_of_seats, seat_positions, from, to }) => {
        const avalaibleseats = seat_positions?.filter(({ isTaken, isReserved }) => (isTaken == true || isReserved == true))?.length
        return (
            <div
                onClick={() => {
                    if (selected == _id) return setSelected(null)
                    setSelected(_id)
                }}
                className={`${selected === _id ? "bg-blue-200" : "bg-white"} w-full mx-1 ease duration-700 transition-colors rounded-lg mb-4  shadow-xl shadow-gray-200 pb-5   min-h-[3rem]`}>
                <div className="flex justify-between pt-0.5 px-4 border-b pb-1 ">
                    <p>Plate Number</p>
                    <p>{_id}</p>
                </div>
                <Heading text={name} className="!font-black !mb-0" />
                <div className="grid grid-cols-2 mb-2">
                    <Heading text={"From"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={"Destination"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={from} className="!mb-0 !text-sm" />
                    <Heading text={to} className="!mb-0 !text-sm" />
                </div>
                <div className="grid grid-cols-2 mb-2">
                    <Heading text={"Seats"} className="!mb-0 !text-sm !font-semibold" />
                    <Heading text={"Available"} className="!mb-0 !text-sm !font-semibold" />
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

    if (!from || !to || (isLoading == false && buses?.length == 0)) {
        return (<div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center place-items-center ">
            <AnimateText text={`no bus travelling from ${from} to ${to} \n on the ${new Date(date).toDateString()}
            `
            } className="!text-xl lg:!text-3xl !text-center !mb-0" />
            <Heading text="You may check this buses travelling on the same day" />

            {

                avalaibebuses?.map((arr, index) => {
                    return (
                        <BusDetail {...arr} />
                    )
                })
            }


            <button
                type="submit"
                className="inline-block bg-blue-400 
              w-full rounded bg-primary px-7
              max-w-sm mx-auto
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
                onClick={() => navigate(-1)}

            >
                <AiOutlineArrowRight className="!inline-block !rotate-180" /> go back
            </button>
        </div>)
    }
    return (

        <div className="h-[calc(100vh-60px)] w-full container mx-auto">
            <div className={`md:grid grid-cols-[1fr,30rem]  w-full border-4 h-full   ${selected !== null && "lg:grid-cols-[1fr,30rem,25rem]"}`}>
                <div className="h-full hidden md:block">

                    image here
                </div>
                <div className="h-full pb-24 overflow-y-auto border border-green-400 px-2 lg:px-10 py-10 pt-0">
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

                    {

                        buses.map((arr, index) => {
                            return (
                                <BusDetail {...arr} />
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

                                    className="md:hidden min-h-8
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
                <div className={`hidden ${selected !== null && "lg:block px-4"} `} >
                    <AnimateText text={"selected bus"} className="!text-3xl " />
                    <BusDetail {...bus} />
                    <button
                        type="submit"
                        className="hidden md:inline-block bg-blue-400 
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
                    <p>lorem10 bif a dfisuadhf safjsafh siadgf isdafcgusadg fcukdsg cfsudgfukf usdaf sd</p>
                </div>
            </div>

        </div>
    )
}
export default FindBus