// import { Document, Page } from 'react-pdf';
// import "core-js/features/array/at";
// import { pdfjs } from 'react-pdf';
import AnimatedText from "../components/AnimateText"
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
    Heading,
    // PrevButton,
    // NextButton
}

    from '../components'
import { toast } from "react-toastify"

import { useSearchParams } from 'react-router-dom'
// import samplePDF from "../Assets/afrique-con boarding passs.pdf"
import { getBuses } from '../utils/ReactSelectFunction'
// import DownloadSelect from "react-select"
import { components, style } from "../utils/reactselectOptionsStyles"
import { useState, useEffect, useRef } from 'react'
import BusSelect from 'react-select/async'
import axios from 'axios'
import {
    useQuery,
} from '@tanstack/react-query'
import { motion } from 'framer-motion'
// import UiButton from '../components/UiButton'
const SeatDetails = () => {
    const ref = useRef(null)
    let downloadbaseurl = null
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        downloadbaseurl = process.env.REACT_APP_LOCAL_URL
        // dev code
    } else {
        // production code
        downloadbaseurl = process.env.REACT_APP_PROD_URL

    }

    const [querySearch, setQuerySearch] = useSearchParams();
    const isadminuser = querySearch.get("admin")
    let ticket_seat = querySearch.get("ticket_seat") || false;
    const [activeSeat, setActiveSeat] = useState((ticket_seat || null));
    const scrollElement = () => {
            ref.current?.scrollIntoView({
                "behavior": "smooth"
            })
    }
    useEffect(() => {
        let timer = null

        if (activeSeat) {

            timer = setTimeout(() => {
                setActiveSeat(null)
            }, 6000)

        }
        
        return () => {
            clearTimeout(timer)
        }
    }, [activeSeat])

    const [loading, setLoading] = useState(false)
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
    const onChange = ({ value }, key) => {
        if (querySearch.get(key) === value) {
            return
        }
        handleFilterChange(key, value);
    }
    const { data: ticketData, isLoading, error } = useQuery({
        queryKey: ['seatdetailstickets'],
        queryFn: async () => axios.get(`/seat/seatdetails/${id}`),
    });
    const { id } = useParams()
    const [seats, setSeats] = useState({})
    const navigate = useNavigate()



    const handleClick = async (index) => {

        return axios.get(`/seat/ticket/${id}/${index}`)


    }
    const getSeats = async () => {
        setLoading(true)
        try {
            const res = await axios.get("/seat/specific/" + id, {}, {});
            setSeats(res.data)
            console.log(res.data.seat.bus.bus)
            if (res.data?.seat?.bus?.bus !== "demobus") {
                onChange({ value: res.data?.seat?.bus?._id }, "bus_id")
            }
        } catch (err) {
            console.log(err)
            alert("fail to get seat" + err.response.data)
        } finally {
            scrollElement()
        
            setLoading(false)
        }
    }
    useEffect(() => {
        getSeats()
    }, [])

    if (loading) return <div>Loading ....</div>

    return (
        <div className="!flex-1 h-[calc(100vh-60px)] container mx-auto overflow-y-auto pb-24">
            <nav class="flex mb-5 mt-5 px-5 lg:hidden" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <Link
                            relative="path"
                            to={"../"}
                            href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            Seats
                        </Link>
                    </li>
                    <li>
                        <div class="flex items-center" >
                            <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Seats Details</h1>
                            </a>
                        </div>
                    </li>

                </ol>
            </nav>



            <div className="lg:flex flex-row-reverse lg:flex-row gap-x-6">
                <div className="flex-none lg:w-[25rem]">

                    <div className="flex-none w-[min(calc(100%-20px),200px)] mx-auto">
                        <Heading text={"Assign a bus to seat"} className="!text-[0.8rem] !text-center !pl-0 !mb-0 uppercase text-slate-400" />
                        <BusSelect
                            defaultOptions
                            catcheOptions
                            loadOptions={getBuses}
                            required
                            defaulValues={{
                                value: seats?.seat?.bus?._id,
                                label: seats?.seat?.bus?.bus,
                            }}
                            styles={{
                                ...style,
                                wdith: "100%",
                                fontSize: 10 + "px"
                            }}
                            onChange={(e) => onChange(e, "bus_id")}
                            components={components()}
                            className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                        />
                    </div>
                    {
                        querySearch.get("bus_id") !== null && (
                            <a
                                role='link'
                                aria-disabled
                                href={`${downloadbaseurl}/seat/download/${id}?${querySearch.toString()}`}

                                target="_blank"

                                data-te-ripple-init
                                data-te-ripple-color="light"
                                className={`
        text-center
                    w-[min(400px,calc(100%-2.5rem))]
                     bottom-0
                     pb-2
                     block
                     min-h-[2rem]
                     mx-auto
                    rounded bg-blue-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-blue-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                            >
                                download borderaux
                            </a>
                        )
                    }

                    <Heading text={"Seat Details"} className="!mb-3" />

                    <div className="flex justify-between px-2 pb-2">
                        <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                            <span className="w-[10px] mr-1 h-[10px] inline-block bg-green-400 rounded-full "

                            // onClick={scrollElement}
                            ></span>Available</h1>
                        <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                            <span className="w-[10px] mr-1 h-[10px] inline-block bg-blue-400 rounded-full "></span>Rerservation
                        </h1>
                        <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                            <span className="w-[10px] mr-1 h-[10px] inline-block bg-orange-400 rounded-full "></span>
                            Not Available
                        </h1>
                    </div>

                    {/* code here */}
                    <div className="grid gap-x-1 px-4 gap-y-0.5 pt-3 grid-cols-5">

                        {

                            seats?.seat?.seat_positions?.map(({ isTaken, isReserved, _id }, index) => {
                                return (
                                    <motion.button
                                        ref={activeSeat == index ? ref : null}
                                        animate={{
                                            scale: activeSeat == index ? [0.8, 1, 0.9] : null
                                        }}
                                        transition={{
                                            duration: 1,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                        }}
                                        onClick={() => {
                                            if (isTaken === true || isReserved == true) {
                                                toast.promise(
                                                    handleClick(_id).then(({ data: { id } }) => {
                                                        navigate(`/${isadminuser ? "dashboard" : "user"}/${id}?${isadminuser && "admin=true"}`)

                                                    })
                                                    , {
                                                        pending: "loading",
                                                        success: "finish loading ...",
                                                        error: "Something went wrong ,try again later"
                                                    }
                                                )
                                            }
                                        }}
                                        className={`
                                        ${activeSeat == index && "!bg-red-950"}
                ${(isTaken) ? "bg-orange-400" : isReserved ? "!bg-blue-500" : "bg-green-400"}
                 grid items-center 
                justify-center 
                shadow 
                rounded-sm min-h-[60px]
                cursor-pointer
                hover:rounded-lg`}
                                    > {(index + 1)}</motion.button>
                                )


                            })}


                    </div>



                </div>
                <div className="flex-1 lg:max-h-[calc(100vh-60px)] overflow-y-auto px-5">
                    {error ? "some error occurs" : null}
                    <div>

                    </div>
                    <AnimatedText text={"Passenger manifest"} className="!uppercase !text-3xl lg:!text-4xl !mb-2" />
                    <div className="lg:mx-2 shadow-sm rounded-sm  lg:mt-10 w-full">
                        <div className="relative max-w-full overflow-x-auto
                    bg-white
    shadow-md sm:rounded-lg w-full mb-6 ">
                            <table className="w-full text-sm text-left text-gray-500 
              dark:text-gray-400 transition-colors duration-[2s]">
                                <thead className="text-xs text-gray-700 dark:bg-slate-800 uppercase dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-2 py-3">
                                            Index
                                        </th>
                                        <th scope="col-span-3"
                                            className="px-3 py-3">
                                            Fullname
                                        </th>
                                        <th scope="col" className="px-3 py-3">
                                            Seat
                                        </th>
                                        <th scope="col" className="px-3 py-3">
                                            ID Card  Number
                                        </th>
                                        <th scope="col" className="px-3 py-3">
                                            Sex
                                        </th>

                                    </tr>
                                </thead>

                                <tbody
                                    className="pt-4 pb-12 text-xs md:text-sm"
                                >
                                    {
                                        ticketData?.data?.tickets?.map(({ fullname, seatposition, sex, email }, index) => (
                                            <tr
                                                key={index}
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



                                                <td className="px-3 py-2">
                                                    <span className="font-medium flex items-center justify-center min-w-fit" style={{
                                                        workBreak: "none"
                                                    }}>{fullname || "n/a"}</span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span className="font-medium ">{seatposition || "singletrip"}</span>
                                                </td>
                                                <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {email || "n/a"}
                                                </th>

                                                <td className="py-0 text-xs flex items-center"
                                                >
                                                    {sex || "n/a"}
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>


        </div >
    )

}

export default SeatDetails