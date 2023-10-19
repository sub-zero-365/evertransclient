import { PanigationButton, Scrollable, TicketCounts } from "../components"
import { AiOutlineSave } from "react-icons/ai"
import { VscFolderActive } from 'react-icons/vsc'
import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams, useLoaderData } from 'react-router-dom'
import { Heading } from '../components'
import { useSearchParams } from 'react-router-dom'
import {
    timeOptions
} from "../utils/sortedOptions"
// import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"
import dateFormater from '../utils/DateFormater'
import ClearFilter from '../components/ClearFilter'

import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import TimeSelect from "react-select"
import { getCities } from "../utils/ReactSelectFunction"
import { components, style } from "../utils/reactselectOptionsStyles"
import DatePicker from 'react-datepicker';
import { PlaceHolderLoader } from '../components'
import { Helmet } from 'react-helmet'
import customFetch from '../utils/customFetch'
import {
    useQuery,
} from '@tanstack/react-query'
import { motion } from "framer-motion"
import AnimateText from "../components/AnimateText"
import UiButton from "../components/UiButton"
import { MdOutlineClose } from "react-icons/md"
import { AiOutlinePlus } from "react-icons/ai"
import InputBox from "../components/InputBox"
import LoadingButton from "../components/LoadingButton"
const seatsQuery = (params = {}) => ({
    queryKey: ["seats"],
    queryFn: async () => {
        const res = await customFetch.get("/seat", {
            params: {
                ...params
            }
        })
        return res.data
    }
})
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

    // const isInView = useInView(ref)



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

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const handleChange = ({ value, label }, query) => {
        if (querySearch.get(query) == value) return
        handleFilterChange("page", 1)
        handleFilterChange(query, value)
    }
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

            <div className="h-[calc(100vh-60px)] container mx-auto !flex-1 w-full overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="flex  items-center  mb-10 mt-5 justify-between py-1 rounded-lg shadow
                    bg-white dark:bg-slate-800 mx-4">
                        <div className="flex-1">
                            <Heading text="hey you can add a new route " className="!mb-2 !font-black mt-0" />
                            <p className="mb-3 text-sm  px-6">they more the route the more the buses</p>
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
            flex-col lg:flex-row
            lg:mt-10 lg:px-8 max-w-full rounded-sm shadow-sm lg:mx-10
            py-10 items-start justify-between lg:mb-14">

                        <div className="
                flex-none lg:w-[20rem]
                w-full 
                px-2 lg:px-0">
                            <Scrollable className={`
                    !px-5 
                    !mb-10 
                    !grid
                    !grid-cols-1 gh
                    !transition-all 
                    !duration-[1s]`}>
                                <TicketCounts counts={nHits || 0 === 0 && "0" || <span className='text-xs font-black '>loading ...</span>}
                                    text={"Total Travels"}
                                    icon={<AiOutlineSave />} />
                                <TicketCounts counts={routes_count || 0 === 0 && "0" || <span className='text-xs font-black '>loading ...</span>}
                                    text={"Total Routes"}
                                    icon={<VscFolderActive />}
                                />
                            </Scrollable>
                        </div>

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
                                name="query"
                                className="!mx-auto !block !px-10 !mt-1 lg:px-10" />
                        </div>
                        <div className={`
            ${isOpen ? "visible opacity-100 pointer-events-all " : "invisible opacity-0 pointer-events-none"}
            fixed 
            lg:static
            lg:opacity-100
            lg:visible
            lg:!pointer-events-auto
            transition-[opacity]
            left-1/2
            -translate-x-1/2
            w-[min(calc(100%-2.5rem),25rem)]
            min-h-[10rem]
            bg-white
            dark:bg-slate-800
            dark:shadow-sm
            dark:shadow-dark
            z-20
            rounded-2xl
            top-1/2
            -translate-y-1/2
            lg:translate-x-0
            lg:translate-y-0
            shadow-xl
            shadow-slate-400
            py-5 pb-10`}>
                            <span
                                className='absolute lg:hidden
                    w-8 h-8  hover:ring-red-500
           
            md:h-10 md:w-10 rounded-full
            grid place-items-center
            text-xs
            hover:shadow-xl
            mx-4
            mt-2
            bg-slate-100
            hover:bg-red-400
            ease duration-500
            transition-colors
            right-0 top-0 '
                                onClick={() => setIsOpen(false)}
                            >
                                <MdOutlineClose
                                    classNae="text-sm" />
                            </span>
                            <AnimateText text="create new employee" className='!text-lg' />
                            <form

                                className='px-5'
                            >
                                <InputBox

                                    name={"Full Names"}
                                />



                                <LoadingButton >
                                    add a new route here
                                </LoadingButton>

                            </form>
                        </div>

                    </div>
                    <Scrollable className="
                    !overflow-visible
                    !gap-x-4 
                    !items-start 
                    !flex-wrap
                        !justify-center 
                        !gap-y-5
                        md:!justify-center">
                        <div className="flex-none">
                            <Heading text={"From"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />
                            <FromSelect
                                defaultOptions
                                catcheOptions
                                loadOptions={getCities}
                                required
                                styles={{
                                    ...style,
                                    wdith: "100%",
                                    fontSize: 10 + "px"
                                }}
                                onChange={(e) => handleChange(e, "from")}
                                components={components()}
                                className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                            />
                        </div>
                        <div className="flex-none ">
                            <Heading text={"Destination"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />
                            <ToSelect
                                defaultOptions
                                catcheOptions
                                loadOptions={getCities}
                                required
                                styles={{
                                    ...style,
                                    wdith: "100%",
                                    fontSize: 10 + "px"
                                }}
                                components={components()}
                                onChange={(e) => handleChange(e, "to")}
                                className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                            />
                        </div>
                        <div className="flex-none">
                            <Heading text={"Time"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />
                            <TimeSelect
                                onChange={(e) => handleChange(e, "traveltime")}
                                isSearchable={false}
                                options={timeOptions}
                                styles={{
                                    ...style,
                                    wdith: "100%",
                                    fontSize: 10 + "px"
                                }}
                                components={components()}
                                className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                            />
                        </div>
                    </Scrollable>

                    <ClearFilter keys={[
                        "sort,newest",
                        "to,all",
                        "from,all",
                        "daterange,*",
                        "boardingRange,*",
                        "traveltime,all",
                        "limit,100",
                    ]} />
                    {
                        false ? <PlaceHolderLoader /> : (

                            <>

                                <div className="relative xl:container 4xlmax-w- mx-auto overflow-x-auto
                    bg-white
    shadow-md sm:rounded-lg w-full mb-6 ">
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
                                                <th scope="col" className="px-3 py-3">
                                                    Departure Date
                                                </th>

                                                <th scope="col" className="px-3 py-3">
                                                    Departure Time
                                                </th>
                                                <th scope="col" className="px-3 py-3">
                                                    Bus
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
                                                    traveltime,
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
                                                        <td className="px-3 py-2 ">
                                                            {traveltime ?
                                                                traveltime : "n/a"}
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