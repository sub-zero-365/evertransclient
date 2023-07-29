import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css'
import { useSearchParams } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import { AnimatePresence, motion } from 'framer-motion'
import SkipSelect from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { setTicketData } from '../actions/adminData';
import Select from 'react-select';
import Triptype from 'react-select';
import ClearFilter from '../components/ClearFilter'
import SelectSortDate from 'react-select';
import TimeSelect from 'react-select';
import { AiOutlineSetting } from 'react-icons/ai';
import formatQuery from "../utils/formatQueryStringParams"
import { components, style } from "../utils/reactselectOptionsStyles"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper'
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "swiper/css/a11y"
import "swiper/css/scrollbar"
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import {
    AmountCount, FormatTable,
    Scrollable,
    TicketCounts,
    PanigationButton,
    Loadingbtn,
    Form,
    Heading,
    PercentageBar,
    PrevButton,
    NextButton, PlaceHolderLoader,
    DataDay
} from '../components';
import { AiOutlineSave } from 'react-icons/ai';
import { VscFolderActive } from 'react-icons/vsc';
import { BiCategory } from 'react-icons/bi';
import { MdOutlinePriceChange } from 'react-icons/md';
import { sortedDateOptions, sortTicketStatusOptions, skipOptions, timeOptions } from "../utils/sortedOptions"

const Appointment = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (!querySearch.get("limit")) {
            handleFilterChange("limit", 100)
        }
        if (!querySearch.get("page")) {
            handleFilterChange("page", 1)

        }

        if (!querySearch.get("view")) {
            handleFilterChange("view", "all")
        }
        if (ref && ref.current) {
            ref.current.scrollLeft = querySearch.get("page") * 30
        }
    }, [])


    const [querySearch, setQuerySearch] = useSearchParams();


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [activeIndex, setActiveIndex] = useState((querySearch.get("page") - 1));
    const [isActiveIndexLoading, setIsActiveIndexLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})

    const ticketData = useSelector(state => state.setAdminData.ticketdata);

    const isLoading = useSelector(state => state.setAdminData.loading.tickets)
    const viewAll = querySearch.get("view");

    const handleSkipChange = (evt) => {
        if (querySearch.get("limit") === evt.value) {
            return
        }

        handleFilterChange("limit", evt.value)
    }
    const handleChangeText = (e) => {
        handleFilterChange("search", e.target.value)
    }

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

    const handleBoardingRangeSearch = () => {
        if (querySearch.get("daterange")) {
            handleFilterChange("daterange", null)
        }
        handleFilterChange("boardingRange", `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`)
        handleFilterChange("page", 1)

    }
    const handleFilterSearch = () => {
        if (querySearch.get("boardingRange")) {
            handleFilterChange("boardingRange", null)
        }
        handleFilterChange("daterange", `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`)
        handleFilterChange("page", 1)

    }
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        console.log(dates)
    };

    const dispatch = useDispatch();
    const setTicketDataFunction = (payload) => {
        return dispatch(setTicketData(payload))
    }

    const token = localStorage.getItem("admin_token");

    const url = `/admin/alltickets`

    useEffect(() => {
        fetchData()
    }, [querySearch])

    const checkPages = (index) => {
        if (querySearch.get("page") == index) return
        handleFilterChange("page", index)
    }
    const handleSortTime = (evt) => {
        if (querySearch.get("sort") == evt.value) return
        handleFilterChange("page", 1)
        handleFilterChange("sort", evt.value)
    }
    const handleChange = (evt) => {
        if (querySearch.get("ticketStatus") == evt.value) return
        handleFilterChange("page", 1)
        handleFilterChange("ticketStatus", evt.value)
    }
    const handleTimeChange = (evt) => {
        if (querySearch.get("traveltime") == evt.value) return
        handleFilterChange("page", 1)
        handleFilterChange("traveltime", evt.value)
    }
    const [isOpen, setIsOpen] = useState(false);
    async function fetchData() {
        setIsActiveIndexLoading(true);
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': "makingmoney " + token
                },
                params: formatQuery(querySearch.toString())
            })
            setTicketDataFunction({ ...response?.data })
            setUserData(response?.data)
        } catch (err) {
            console.log(err);
        }
        finally {
            setIsActiveIndexLoading(false)
            if (loading) {
                setLoading(false)
            }
            if (isOpen) setIsOpen(false)
        }

    }

    return (
        <div className="pt-4 px-2 max-w-full overflow-x-auto select-none
        max-h-[calc(100vh-4rem)] overflow-y-auto bg-color_light dark:bg-color_dark" >
            <motion.div
                onClick={() => setIsOpen(true)}
                animate={{
                    scale: [0.7, 1.2, 0.8],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                }
                }
                className="bottom-1/2
                        -translate-y-1/2 fixed 
                        lg:hidden
                        flex-none 
                        shadow-2xl button-add  top-auto bg-blue-400 
w-[2.5rem]
h-[2.5rem] 
-rounded-full 
overflow-hidden 
right-0
z-10  "
            >
                <div className="flex h-full w-full items-center -scale-animation justify-center ">
                    <AiOutlineSetting size={20} color="#fff" className="" />
                </div>
            </motion.div>

            <div>
                <div className="lg:flex items-start justify-start gap-4"
                >
                    <div className="flex-1 w-full pt-10 lg:pt-0 container mx-auto">
                        <div className="flex justify-between px-4"
                        >
                            <Heading text="OverView" className=" !font-semibold !pl-0first-letter:!text-3xl" />
                            <span onClick={() => {
                                if (querySearch.get("view")) {
                                    handleFilterChange("view")
                                } else {
                                    handleFilterChange("view", "all")
                                }

                            }} >{viewAll == "all" ? "view less" : "view all"}</span>
                        </div>
                        <Scrollable className={`!mb-10 !justify-center ${viewAll && "!grid md:!grid-cols-2 gap-y-5"} !transition-all !duration-[1s]`}>
                            <PercentageBar
                                className={`${viewAll && "!min-w-[8rem]"}`}
                                percent={ticketData?.percentageActive} text="Active Ticket Ratio" />
                            <PercentageBar
                                className={`${viewAll && "!min-w-[8rem]"}`}
                                stroke="red"
                                percent={ticketData?.percentageInActive} text="InActive Ticket Ratio" />
                        </Scrollable>
                        <Scrollable className={`!px-5 !mb-10 ${viewAll && "!grid md:!grid-cols-2"} !transition-all !duration-[1s]`}>
                            <TicketCounts counts={ticketData?.totalTickets || ticketData?.totalTickets === 0 && "0" || <span className='text-xs font-black '>loading ...</span>}
                                text={"Total Number"}
                                icon={<AiOutlineSave />} />
                            <TicketCounts counts={ticketData?.totalActiveTickets || (ticketData?.totalActiveTickets === 0) && "0" || <span className='text-xs font-black '>loading ...</span>}
                                text={"Active Tickets"}

                                icon={<VscFolderActive />} />
                            <TicketCounts
                                text={"Inactive Tickets"}
                                counts={ticketData?.totalInActiveTickets || (ticketData?.totalInActiveTickets === 0) && "0" || <span className='text-xs font-black '>loading ...</span>} icon={<BiCategory />} />
                        </Scrollable>
                        <Scrollable className={`!px-5 ${viewAll && "!grid md:!grid-cols-2"} !transition-all !duration-[1s]`}>
                            <AmountCount
                                className="!bg-blue-400"
                                text="Total coset of all tickets"
                                icon={<MdOutlinePriceChange />}
                                amount={ticketData?.totalPrice} />
                            <AmountCount
                                className="!bg-green-400"
                                text="Total coset of all active tickets"
                                icon={<BiCategory />}
                                amount={ticketData?.totalActivePrice} />
                            <AmountCount
                                className="!bg-red-400 !text-black"
                                text="Total coset of all inactive tickets"
                                icon={<BiCategory />}
                                amount={ticketData?.totalInActivePrice} />
                        </Scrollable>
                        <div className="my-10" />
                        <Scrollable className="!overflow-visible !gap-x-4 !items-start !flex-wrap
                        !justify-center !gap-y-5 md:!justify-center">

                            <h1 className="md:text-xl text-sm font-bold  mt-4 flex-none justify-center w-full md:w-fit
        text-gray-700 pl-6
        flex tracking-tight"><Heading text="All tickets" className="!mb-0 " /> <span className="text-xs ring-2 ring-gray-700  grid place-items-center
        ml-1 w-5 h-5 bg-gray-500 text-white
        mb-4 rounded-full border">{ticketData?.totalTickets || 0} </span> </h1>
                            <div className='mt-0 flex-none'>
                                <Heading text={"ticket status"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />
                                <Select
                                    components={components()}

                                    styles={style}
                                    options={sortTicketStatusOptions}
                                    defaultValue={{
                                        label: "All tickets",
                                        value: "all"
                                    }}
                                    isSearchable={false}
                                    onChange={handleChange}
                                    className='!border-none !h-8 mt-0' />
                            </div>

                            <div className='mt-0 flex-none'>
                                <Heading text={"sorted date"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />

                                <SelectSortDate
                                    components={components()}

                                    options={sortedDateOptions}
                                    styles={style}
                                    defaultValue={{
                                        label: "createdAt -",
                                        value: "newest"
                                    }}

                                    isSearchable={false}
                                    onChange={handleSortTime}
                                    className='!border-none !h-8 mt-0' />
                            </div>
                            <div className='mt-0 flex-none'>
                                <Heading text={"ticket status"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />
                                <Triptype
                                    styles={{
                                        control: base => ({
                                            ...base,
                                            border: 0,
                                            borderBottom: "1px solid black",
                                            boxShadow: "none",
                                            background: "transparent",
                                            color: "red",
                                            borderRadius: 0,
                                            fontSize: 1 + "rem"
                                        }
                                        )
                                    }

                                    }
                                    components={components()}
                                    options={
                                        [
                                            {
                                                value: "all",
                                                label: "All Trip"
                                            },
                                            {
                                                value: "singletrip",
                                                label: "single trip"

                                            },
                                            {
                                                value: "roundtrip",
                                                label: "double trip"

                                            },

                                        ]

                                    }
                                    defaultValue={{
                                        label: "All Trip",
                                        value: "all"
                                    }}
                                    isSearchable={false}
                                    onChange={
                                        (e) => handleFilterChange("triptype", e.value)
                                    }
                                    className='!border-none !h-8 mt-0' />
                            </div>
                            <div>

                                <Heading text={"N Column"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />

                                <SkipSelect
                                    components={components()}

                                    defaultValue={{
                                        label: 100, value: 100
                                    }}
                                    styles={style}
                                    className="block max-w-[3rem] ml-auto"
                                    isSearchable={false}
                                    options={skipOptions}
                                    onChange={handleSkipChange} />
                            </div>

                        </Scrollable>
                            <ClearFilter keys={[
                            "sort,newest"
                            ,
                            "ticketStatus,all",
                            "search,*",
                            "daterange,*",
                            "boardingRange,*",
                            "triptype,all",
                            "limit,100",
                            ]} />
                         
                    </div>
                    <div
                        onClick={() => setIsOpen(false)}
                        className={`
                    !flex-none
                fixed 
                z-10
                right-0
                top-0
                w-full
                h-[calc(100%-0px)]
                overflow-y-auto
                lg:h-auto
                ${isOpen ? "visible opacity-100" : "invisible "}
                lg:static 
                lg:w-[20rem]
                group
                lg:visible
                sidebarr bg-slate-500/50 
                lg:bg-white
                lg:dark:bg-slate-800
                
                shadow 
                lg:ml-2
                lg:py-10
                lg:mr-10
                lg:rounded-xl
                lg:shadow-xl
                `}>

                        <div
                            onClick={e => e.stopPropagation()}
                            className="
                        absolute
                        top-0
                        lg:static
                        group-[.visible]:right-0
                        group-[.invisible]:-right-full
                        transition-all
                        duration-[1s]
                        ease
                             pt-10
                             lg:pt-0
                             h-[calc(100%-0px)]
                             overflow-auto
                             lg:overflow-visible
                             lg:h-full 
                             bg-white
                             dark:bg-slate-800
                             shadow
                             md:shadow-none
                             w-[min(25rem,calc(100vw-4rem))]
                             lg:w-full
                             ">

                            <Heading text="Date Query" className="!font-black" />
                            <Swiper
                                className='my-6
                            px-4 
                            w-full
                            lg:w-full 
                            !relative'
                                slidesPerView={1}
                                modules={[Autoplay, Navigation]}
                                navigation={{
                                    prevEl: ".arrow__left",
                                    nextEl: ".arrow__right",
                                }}
                            >
                                <PrevButton className="!left-1.5" />
                                <NextButton className="!right-1.5" />

                                <SwiperSlide className="group">
                                    <Heading text={"Query  Travel At"} className="!font-black !text-sm underline !underline-offset-4 !mb-2 !text-center" />

                        
                                        <div
                                         
                                            className="flex flex-col items-center w-full justify-center  group-[.swiper-slide-active]:!translate-y-0 
                                            translate-y-[50px] ease duration-[1s] transition-all">
                                            <DatePicker
                                                wrapperClassName="!w-full !bg-orange !border-none !outline-none "
                                                className="!w-full !bg-orange-500 !border-none !outline-none "
                                                containerClassName="!w-full !border-none !outline-none !shadow-none"
                                                selected={startDate}
                                                onChange={onChange}
                                                startDate={startDate}
                                                endDate={endDate}
                                                selectsRange
                                                inline
                                                rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}
                                                containerStyle={{
                                                    width: "100%"
                                                }}
                                            // maxDate={new Date()}
                                            />
                                            <button
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                className="inline-block  rounded bg-blue-500   px-2 py-1 text-xs font-montserrat font-medium 
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
  transition duration-150 ease-in-out hover:bg-blue-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                                                onClick={handleBoardingRangeSearch}

                                            >
                                                {isLoading ? <Loadingbtn toggle /> : "Filter Tickets"}
                                            </button>

                                            {
                                                querySearch.get("boardingRange") && <button
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light"
                                                    className="inline-block  rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                                                    onClick={() => {

                                                        handleFilterChange("boardingRange")
                                                    }}
                                                >
                                                    Clear Travel
                                                </button>
                                            }
                                        </div>
                            

                                </SwiperSlide>
                                <SwiperSlide className="group">
                                    <Heading text={"Query  Created At"}
                                        className="!font-black !text-sm underline !underline-offset-4 !mb-2 !text-center" />

                     
                                        <div
                                          
                                            exit={{ opacity: 0, duration: 2 }}
                                            className="flex flex-col items-center w-full justify-center  group-[.swiper-slide-active]:!translate-y-0 
                                            translate-y-[50px] ease duration-[1s] transition-all">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={onChange}
                                                startDate={startDate}
                                                endDate={endDate}
                                                selectsRange
                                                inline
                                                maxDate={new Date()}
                                            />
                                            <button
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                className="inline-block  rounded bg-blue-500   px-2 py-1 text-xs font-montserrat font-medium 
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
  transition duration-150 ease-in-out hover:bg-blue-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                                                onClick={handleFilterSearch}

                                            >
                                                {isLoading ? <Loadingbtn toggle /> : "Filter Tickets"}
                                            </button>

                                            {
                                                querySearch.get("daterange") && <button
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light"
                                                    className="inline-block  rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                    onClick={() => {
                                                        handleFilterChange("daterange")
                                                    }}
                                                >
                                                    Clear Filter Query
                                                </button>
                                            }
                                        </div>
                           

                                </SwiperSlide>

                            </Swiper>


                            <div className="mb-10" />

                            {
                                querySearch.get("daterange") && (
                                    <div>
                                        <Heading text="Ticket/Time " className="!font-bold" />
                                        <DataDay data={ticketData?.tickets} />
                                    </div>
                                )
                            }
                         


                        </div>
                    </div>
                </div>

            </div>
            <Form handleChangeText={handleChangeText} params={querySearch} />
            <Heading text={"Recent Regular Booking"} className="!mb-4 !text-center md:text-start first-letter:!text-4xl underline underline-offset-8" />
            {
                isLoading ? (<PlaceHolderLoader />) : (
                    <FormatTable tickets={ticketData?.tickets}
                        admin
                        skip={querySearch.get("limit")}
                        currentPage={querySearch.get("page")} />
                )

            }


            <div className='mt-10 ' />
            <div ref={ref}
                className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto flex  md:gap-x-2"

            >
                {Array.from({
                    length: ticketData?.numberOfPages
                }, (text, index) => {
                    return <PanigationButton
                        text={index + 1}
                        active={activeIndex}
                        loading={isActiveIndexLoading}
                        index={index}

                        onClick={() => {
                            setActiveIndex(index)
                            checkPages(index + 1)
                        }} />
                })}
            </div>
        </div>
    )

}

export default Appointment