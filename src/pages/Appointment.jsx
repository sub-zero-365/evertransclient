import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineSetting } from 'react-icons/ai';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { default as Select, default as SkipSelect, default as Triptype } from 'react-select';
import ClearFilter from '../components/ClearFilter';
// import formatQuery from "../utils/formatQueryStringParams"
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { components, style } from "../utils/reactselectOptionsStyles";

import { useQuery } from "@tanstack/react-query";

import EmptyModal from "../pages/ShowBuses";

import { AiOutlineSave } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { MdOutlinePriceChange } from 'react-icons/md';
import { VscFolderActive } from 'react-icons/vsc';
import {
    AmountCount,
    BarChart,
    DataDay,
    FormatTable,
    Heading,
    LineChart,
    Loadingbtn,
    NextButton,
    PercentageBar,
    PieChart,
    PrevButton,
    Scrollable,
    TicketCounts
} from '../components';
import AnimatedText from '../components/AnimateText';
import { AreaChart } from '../components/AreaChart';
import UiButton from '../components/UiButton';
import customFetch from '../utils/customFetch';
import { skipOptions, sortTicketStatusOptions } from "../utils/sortedOptions";
import SearchComponent from '../components/SearchBox';

const ticketsQuery = (params = {}) => {
    return ({
        queryKey: ["tickets", { ...params }],
        queryFn: async () => {
            const res = await customFetch.get("/ticket",
                {
                    params
                })
            return res.data
        },
        keepPreviousData: true
    })
}
export const loader = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    try {
        // const { search, page, ticketStatus, triptype,
        //     sort, limit,
        //     daterange, sortBy } = params
        // const formatQuery = {
        //     search: search || "",
        //     page: page ||  1,
        //     daterange: daterange || "",
        //     ticketStatus: ticketStatus || "all",
        //     sortBy: sortBy || "createdAt",
        //     triptype: triptype || "",
        // }
        await queryClient.ensureQueryData(ticketsQuery(params))
        return ({ searchValues: { ...params } })
    } catch (err) {
        return err
    }

}

const Appointment = () => {
    const ref = useRef(null);

    const [toggle,
        setToggle] = useState(false)

    const [querySearch, setQuerySearch] = useSearchParams();


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const { searchValues } = useLoaderData()
    const { data: ticketData,
        isPreviousData,
    } = useQuery(ticketsQuery(searchValues))

    const viewAll = querySearch.get("view");

    const handleSkipChange = (evt) => {
        if (querySearch.get("limit") === evt.value) {
            return
        }

        handleFilterChange("limit", evt.value)
    }


    const handleFilterChange = (key, value = null) => {
        setQuerySearch(preParams => {
            if (value == null) {
                preParams.delete(key)
            } else {
                preParams.set(key, value)
            }
            return preParams
        }, { replace: true })

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




    const handleChange = (evt) => {
        if (querySearch.get("ticketStatus") == evt.value) return
        handleFilterChange("page", 1)
        handleFilterChange("ticketStatus", evt.value)
    }

    const [isOpen, setIsOpen] = useState(false);
    const [chart, setChart] = useState("bar")

    return (
        <div className="pt-4 px-2 max-w-full overflow-x-auto select-none
        max-h-[calc(100vh-4rem)] overflow-y-auto bg-color_light dark:bg-color_dark" >
            <AnimatedText
                className='!text-6xl'
                text="Ticket Stats"
            />
            <EmptyModal
                className="!z-[200]"

                className2={"!w-[min(calc(100%-40px),700px)] max-h-[calc(100%-2.5rem)] !rounded-none !overflow-y-auto"}
                isOpen={toggle}
                setIsOpen={setToggle}
            >

                {
                    ticketData?.monthlyApplications && <>
                        <div
                        ></div>
                        {chart == "bar" && <BarChart chartData={
                            {
                                labels: ticketData?.monthlyApplications?.map(({ date }) => date),
                                datasets: [
                                    {
                                        label: "Number vs Tickets Book",
                                        // data: users?.map((v) => v.total)
                                        data: ticketData?.monthlyApplications?.map(({ count }) => count)
                                        // backgroundColor: ["red", "blue", "green"]
                                    },
                                ]
                            }
                        } />
                        }
                        {chart == "pie" && <PieChart chartData={
                            {
                                labels: ticketData?.monthlyApplications?.map(({ date }) => date),
                                datasets: [
                                    {
                                        label: "Number vs Tickets Book",
                                        // data: users?.map((v) => v.total)
                                        data: ticketData?.monthlyApplications?.map(({ count }) => count)
                                        // backgroundColor: ["red", "blue", "green"]
                                    },
                                ]
                            }
                        } />
                        }
                        {chart == "line" && <LineChart chartData={
                            {
                                labels: ticketData?.monthlyApplications?.map(({ date }) => date),
                                datasets: [
                                    {
                                        label: "Number vs Tickets Book",
                                        // data: users?.map((v) => v.total)
                                        data: ticketData?.monthlyApplications?.map(({ count }) => count)
                                        // backgroundColor: ["red", "blue", "green"]
                                    },
                                ]
                            }
                        } />
                        }
                        {chart == "area" && <AreaChart chartData={
                            {
                                labels: ticketData?.monthlyApplications?.map(({ date }) => date),
                                datasets: [
                                    {
                                        fill: true,
                                        borderColor: 'rgb(53, 162, 235)',
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                        label: "Number vs Tickets Book",
                                        // data: users?.map((v) => v.total)
                                        data: ticketData?.monthlyApplications?.map(({ count }) => count)
                                        // backgroundColor: ["red", "blue", "green"]
                                    },
                                ]
                            }
                        } />
                        }
                        <Scrollable className="flex !mt-6  gap-x-6 !justify-center mb-5">

                            <UiButton
                                onClick={() => setChart("bar")}
                                className={`${chart == "bar" && "!bg-green-900"} !flex justify-center !items-center`}
                                type="button"
                                value="Cash In"
                            >
                                <p>Bar Chart</p>

                            </UiButton>
                            <UiButton
                                onClick={() => setChart("area")}
                                className={`${chart == "area" && "!bg-green-900"} !flex justify-center gap-x-`}
                                type="button"
                                value="CM"
                            >
                                <p>Area Chart </p>


                            </UiButton>
                            <UiButton
                                onClick={() => setChart("pie")}
                                className={`${chart == "pie" && "!bg-green-900"} !flex justify-center gap-x-`}
                                type="button"
                                value="CM"
                            >
                                <p>Pie Chart </p>


                            </UiButton>

                        </Scrollable>

                    </>
                }

                {/* jopajsdf {JSON.stringify(stats)} */}
            </EmptyModal>
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
            {/* <SearchComponent /> */}

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

                            {/* <div className='mt-0 flex-none'>
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
                            </div> */}
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
                            "traveltime,7487",
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
                                            {false ? <Loadingbtn toggle /> : "Filter Tickets"}
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
                                            {false ? <Loadingbtn toggle /> : "Filter Tickets"}
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

                            <UiButton
                                onClick={() => setToggle(c => !c)}
                                className="w-[min(calc(100%-10px),500px)] mx-auto !py-4 !bg-blue-900"
                            >
                                6Months Stats
                            </UiButton>

                        </div>
                    </div>
                </div>

            </div>
            {/* <SearchComponent /> */}
            {console.log("im running")}

            <Heading text={"Recent Regular Booking"} className="!mb-4 !text-center md:text-start first-letter:!text-4xl underline underline-offset-8" />

            <FormatTable
                isPreviousData={isPreviousData}
                tickets={ticketData?.tickets}
                ticketData={ticketData}
                admin

            />



            <div className='mt-10 ' />
            <div ref={ref}
                className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto flex  md:gap-x-2"

            >

            </div>
        </div>
    )

}

export default Appointment