import { useRef, useState } from "react"
import { Form, redirect, useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { CustomDatePicker, Heading, PanigationButton, Scrollable } from "../components"
// import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"
import ClearFilter from '../components/ClearFilter'
import dateFormater from '../utils/DateFormater'

import {
    useQuery,
} from '@tanstack/react-query'
import { motion } from "framer-motion"
import DatePicker from 'react-datepicker'
import { Helmet } from 'react-helmet'
import { AiOutlinePlus } from "react-icons/ai"
import { PlaceHolderLoader } from '../components'
import UiButton from "../components/UiButton"
import EmptyModal from "../pages/ShowBuses"
import customFetch from '../utils/customFetch'
// import day from dayjs
import dayjs from "dayjs"
// import { useMemo } from "react"
import FilterButton from "../components/FilterButton"
import useGetdates from "../utils/getdates"
const seatsQuery = (params = {}) => ({
    queryKey: ["seats",
        params],
    queryFn: async () => {
        const res = await customFetch.get("/seat", {
            params: {
                ...params
            }
        })
        return res.data
    }
})
export const action = async ({ request }) => {
    const formdata = await request.formData()
    const date = await formdata.get("date")
    return redirect(`new?date=${dayjs(date || new Date()).format("YYYY/MM/DD")}`)
}
export const loader = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(seatsQuery(params))
    return { searchValues: params }
}

const Seats = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { searchValues } = useLoaderData()
    const { seats, nHits, numberOfPages, routes_count } = useQuery(seatsQuery(searchValues)).data
    let downloadbaseurl = null
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        downloadbaseurl = process.env.REACT_APP_LOCAL_URL
        // dev code
    } else {
        // production code
        downloadbaseurl = process.env.REACT_APP_PROD_URL

    }
    const ref = useRef(null);
    // const routesQuery = useMemo(() => [...new Set([...seats?.map(({ from, to }) => `${from.toLowerCase()}-${to.toLowerCase()}`)])], [searchValues])
    // const isInView = useInView(ref)
    const routesQuery = [...new Set([...seats?.map(({ from, to }) => `${from?.toLowerCase()}-${to?.toLowerCase()}`)])]
    // console.log(routesQuery)


    const [querySearch, setQuerySearch] = useSearchParams();
    const isadminuser = querySearch.get("admin")
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
    const { startdate,enddate} = useGetdates("daterange")
    const [startDate, setStartDate] = useState(startdate);
    const [endDate, setEndDate] = useState(enddate);
    // ending here
    const [seatDate, setSeatDate] = useState(new Date())
    const handleDateRangeChange = () => {
        handleFilterChange("daterange", `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`)
        handleFilterChange("page", 1)
    }
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    // const 
    const navigate = useNavigate()


    const skip = querySearch.get("limit") || 100
    const currentPage = querySearch.get("page") || 1
    const [activeIndex, setActiveIndex] = useState((querySearch.get("page") - 1));
    const checkPages = (index) => {
        if (querySearch.get("page") == index) return
        handleFilterChange("page", index)
    }
    return (
        <>
            <Helmet>
                <title>
                    Borderaux
                </title>
            </Helmet>
            <EmptyModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <Form
                    method="post"
                >
                    <CustomDatePicker
                        startDate={seatDate}
                        setStartDate={setSeatDate}
                    />
                    <input
                        type="hidden"
                        name="date"
                        value={seatDate}
                    />
                    <UiButton
                        className="!w-[min(400px,calc(100%-1rem))] !mx-auto line-clamp-1 !py-4 !-mb-4"
                    >
                        Show Available Seat for selected Date
                    </UiButton>

                </Form>
            </EmptyModal>
            <div className="h-[calc(100vh-60px)] container mx-auto !flex-1 w-full overflow-y-auto">
                <div className="max-w-4xl mx-auto ">
                    <div className="flex p-4 items-center  mb-10 mt-5 justify-between py-1 rounded-lg shadow
                    bg-white dark:bg-slate-800 mx-4">
                        <div className="flex-1">
                            <Heading text="hey you can add a new route " className="!mb-2 !font-black mt-0" />
                            <p className="mb-3 text-sm  px-6">create a new route and add a car</p>
                        </div>
                        <motion.div onClick={() => setIsOpen(c => !c)}
                            initial={{ x: "-50%" }}
                            animate={{ scale: [0.7, 1.2, 0.8], rotate: [0, 360] }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1],
                                repeat: Infinity,
                                repeatDelay: 1
                            }

                            }
                            className="bottom-6 flex-none ml-2 shadow-2xl button-add  top-auto bg-blue-400 
w-[2rem] h-[2rem] rounded-full left-1/2 overflow-hidden 
-translate-x-1/2
z-10  "
                        >
                            <div className="flex h-full w-full items-center scale-animation justify-center ">
                                <AiOutlinePlus size={30} color="#fff" className="" />
                            </div>
                        </motion.div>

                    </div>
                    <div className="flex
            flex-col lg:flex-row justify-center
            lg:mt-10 lg:px-8 max-w-full rounded-sm shadow-sm lg:mx-10
            py-10 items-start justify-between-- lg:mb-14">



                        <div className="flex-none flex flex-col my-6 lg:my-0 items-center w-full  lg:w-fit hidden- lg:block flex-end px-5 ">
                            <DatePicker
                                wrapperClassName="!w-full !bg-orange !border-none !outline-none "
                                className="!w-full  !mt-5 min-h-[2rem] !mx-auto  !border-2 !text-center   !outline-none "
                                containerClassName="!w-full !border-none !outline-none !shadow-none"
                                selected={startDate}
                                onChange={onChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                inline
                                containerStyle={{
                                    width: "100%"
                                }}
                            />
                            <UiButton onClick={handleDateRangeChange}
                                name="Date Query"
                                className="!mx-auto !block  !py-3 !px-10 w-[min(calc(100%-0.5rem),200px)] !mt-1 lg:px-10" />
                        </div>


                    </div>
                    <Scrollable className="!justify-start scrollto  !max-w-full !w-fit !mx-auto px-4 pb-5">
                        <FilterButton className="!shadow-none"
                            value={null}
                            label={`All`}
                            name="routequery"

                        />
                        {routesQuery?.map((route) => <FilterButton className="!shadow-none"
                            value={`${route}`}
                            label={`${route}`}
                            name="routequery"


                        />)}



                        {/* ) */}


                        {/* } */}

                    </Scrollable>

                    <ClearFilter keys={[
                        "sort,newest",
                        "to,all",
                        "from,all",
                        "daterange,*",
                        "boardingRange,*",
                        "traveltime,all",
                        "limit,100",
                        "routequery,*"
                    ]} />
                    {
                        false ? <PlaceHolderLoader /> : (

                            <>

                                <div className="relative xl:container 4xlmax-w- mx-auto overflow-x-auto
                    bg-white
 w-full mb-6 ">
                                    <table className="w-full text-sm text-left text-gray-500 
              dark:text-gray-400 transition-colors duration-[2s]">
                                        <thead className="text-xs text-gray-700 dark:bg-slate-800 uppercase dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-2 py-3">
                                                    Index
                                                </th>
                                                <th scope="col" className="px-3 py-3">
                                                    From
                                                </th>
                                                <th scope="col" className="px-3 py-3">
                                                    to
                                                </th>
                                                {/* <th scope="col" className="px-3 py-3">
                                                    Departure Date
                                                </th> */}

                                                <th scope="col" className="px-3 py-3">
                                                    Departure Time
                                                </th>
                                                <th scope="col" className="px-3 py-3">
                                                    car_name
                                                </th>

                                                <th scope="col" className="px-3 py-3">
                                                    Action
                                                </th>

                                            </tr>
                                        </thead>

                                        <tbody
                                            className="pt-4 pb-12 text-xs md:text-sm"

                                        >
                                            {
                                                seats?.map(({ from,
                                                    to,
                                                    bus,
                                                    traveldate,
                                                    _id
                                                }, index) => (
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

                                                                (index + 1) + skip * (currentPage - 1)
                                                            }
                                                        </th>


                                                        <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {from || "n/a"}
                                                        </th>


                                                        <td className="px-3 py-4">
                                                            <span className="font-medium
                              ">{to || " n/a"}</span>
                                                        </td>

                                                        <td className="px-3 py-2">
                                                            {traveldate ?
                                                                dateFormater(traveldate).date : "n/a"}
                                                        </td>

                                                        <td className="px-3 py-2">
                                                            {bus ?
                                                                bus.bus : "n/a"}
                                                        </td>

                                                        <td className="py-0 text-xs flex items-center"
                                                        >
                                                            <UiButton
                                                                className={"!bg-green-800"}
                                                                onClick={() => navigate(`${_id}?${isadminuser && "admin=true"}`)} name="details" />

                                                            {
                                                                bus?.bus !== "Demo Car" ?
                                                                    <UiButton
                                                                        className={"!bg-blue-900"}
                                                                    // onClick={() => navigate(`${_id}?${isadminuser && "admin=true"}`)} 
                                                                    >
                                                                        <a
                                                                            role='link'
                                                                            aria-disabled
                                                                            href={`${downloadbaseurl}/seat/download/${_id}`}
                                                                            target="_blank"
                                                                            className="w-full"

                                                                        >Download</a>
                                                                    </UiButton> :
                                                                    <UiButton
                                                                        className={"!bg-blue-950"}
                                                                        title="Edit"
                                                                        onClick={() => navigate(`${_id}?${isadminuser && "admin=true"}&edited=true`)}  />


                                                            }

                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>

                                </div>
                                <div
                                    className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto flex  md:gap-x-2"
                                >
                                    {Array.from({
                                        length: numberOfPages
                                    }, (text, index) => {
                                        return <PanigationButton
                                            text={index + 1}
                                            active={activeIndex}
                                            // loading={isActiveIndexLoading}
                                            index={index}

                                            onClick={() => {
                                                setActiveIndex(index)
                                                checkPages(index + 1)
                                            }} />
                                    })}
                                </div>
                            </>
                        )

                    }


                </div>
            </div>
        </>
    )
}

export default Seats