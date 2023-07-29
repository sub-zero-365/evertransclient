import { Scrollable, TicketCounts } from "../components"
import { AiOutlineSave } from "react-icons/ai"
import { VscFolderActive } from 'react-icons/vsc'
import UiButton,
{ UiButtonDanger } from "../components/UiButton"
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Heading } from '../components'
import { useSearchParams } from 'react-router-dom'
import {
    timeOptions
} from "../utils/sortedOptions"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"
import dateFormater from '../utils/DateFormater'
import ClearFilter from '../components/ClearFilter'
import formatQuery from "../utils/formatQueryStringParams"
import { useSelector, useDispatch } from 'react-redux'
import { setSeats } from "../actions/seatsData"
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import TimeSelect from "react-select"
import { getCities } from "../utils/ReactSelectFunction"
import { components, style } from "../utils/reactselectOptionsStyles"
import DatePicker from 'react-datepicker';
import { useInView } from 'framer-motion'
import { PlaceHolderLoader } from '../components'
const Seats = () => {
    const ref = useRef(null)
    const isInView = useInView(ref)
    const { loading, seats: data } = useSelector(state => state.seatData);
    const [seat,setSeat]=useState([])
    // useEffect(() => {
    //     if (isInView) {
    //         console.log("im in view")

    //         const { numberOfPages, currentPage } = data;
    //         if (currentPage < numberOfPages) {
    //             let i = currentPage;
    //             ++i

    //             handleFilterChange("page", i)
    //             if (i == numberOfPages) {
    //                 ref.current.classList.add("hidden")
    //             }
    //             console.log("page ", i)
    //         }
    //         console.log("im in view")
    //     }
    // }, [isInView])
    // const handleLoadMore = (dir) => {
    //     const { numberOfPages, currentPage } = data;
    //     if (dir === 1) {
    //         if (currentPage < numberOfPages) {
    //             let i = currentPage;


    //             handleFilterChange("page", ++i)

    //             console.log("page ", i)
    //         }
    //     }
    //     if (dir === -1) {
    //         if (currentPage > 1) {
    //             let i = currentPage;


    //             handleFilterChange("page", --i)

    //             console.log("page ", i)
    //         }
    //     }
    //     console.log("im in view")
    // }
    // }
    const dispatch = useDispatch()
    const setData = (payload) => {
        return dispatch(setSeats(payload))
    }
    const [querySearch, setQuerySearch] = useSearchParams();
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

    const navigate = useNavigate()
    const getData = async () => {
        try {
            const res = await axios.get("/seat",
                {
                    params: formatQuery(querySearch.toString())

                })
            console.log(res.data)
            console.log(res.data.routes)
            setData(res.data)
        } catch (err) {
            console.log("err", err)
        } finally {
            console.log("done!")
        }
    }
    useEffect(() => {
        getData()
    }, [querySearch])




    return (
        <div className="h-[calc(100vh-60px)] container mx-auto !flex-1 w-full overflow-y-auto">
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
                        <TicketCounts counts={data?.seats?.length || 0 === 0 && "0" || <span className='text-xs font-black '>loading ...</span>}
                            text={"Total Travels"}
                            icon={<AiOutlineSave />} />
                        <TicketCounts counts={data?.routes_count || 0 === 0 && "0" || <span className='text-xs font-black '>loading ...</span>}
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
                loading ? <PlaceHolderLoader /> : (

                    <div className="w-full max-w-6xl mx-auto mb-24 bg-white dark:bg-slate-800 shadow-lg rounded-sm ">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 
                                    dark:bg-slate-800 bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">index</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">From</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Destination</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Departure Date</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Time</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Bus</div>
                                        </th>

                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">actions</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {

                                        data?.seats?.map(({ from,
                                            to,
                                            bus,
                                            traveldate,
                                            traveltime,
                                            _id
                                        }, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left pl-1">{(index + 1) || "n/a"}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap text-orange-900 dark:text-white">
                                                        <div className="text-left">{from || "n/a"}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left  text-orange-900 dark:text-white">{to}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left  text-orange-900 dark:text-white">{dateFormater(traveldate).date}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left  text-orange-900 dark:text-white">{traveltime}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left  text-orange-900 dark:text-white">{bus?.bus || "n/a"}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap flex lg:grid 
                                                    lg:grid-cols-2 lg:max-w-[15rem]">
                                                        <UiButton onClick={() => navigate(`${_id}`)} name="details" />
                                                        < a
                                                            className={`font-medium
                                                        shadow
                                                        md:shadow-md
                                                        shadow-green-200
                                                        dark:shadow-slate-800
                                                        bg-green-400
                                                        dark:bg-gray-700
                                                        pt-1
                                                        mr-1
                                                        rounded-sm
                                                        text-white
                                                        dark:font-semibold
                                                        px-4
                                                        pb-1.5
                                                        place-items-center  
                                                        hover:bg-green-700
                                                        ease 
                                                        transition-colors
                                                        duration-700
                                                        hover:underline
                                                        flex
                                                        justify-center 
                                                        items-center
                                                        text-[0.7rem] 
                                                        md:text-sm
                                                        font-montserrat`}
                                                            href={`${process.env.REACT_APP_LOCAL_URL}/seat/download/${_id}`} >download</a>
                                                    </td>
                                                </tr>

                                            )
                                        })}

                                </tbody>
                            </table>
                        </div>
<UiButton onClick={()=>0} name="loadmore"/>

                    </div>
                )

            }


        </div>
    )
}

export default Seats