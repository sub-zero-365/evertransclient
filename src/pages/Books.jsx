// import AnimateText from '../components/AnimateText'
import 'react-datepicker/dist/react-datepicker.css'
// import DatePicker from 'react-datepicker';
import { VscFolderActive } from 'react-icons/vsc'
import { default as Select, default as SelectSortDate, default as SelectTrip } from 'react-select'
// import { useState, useEffect, useRef } from 'react';
import { AiOutlineSave } from 'react-icons/ai'
// import { IoMdClose } from "react-icons/io"
import { Suspense } from "react"
import SearchComponent from '../components/SearchBox'

import {
    Await,
    defer,
    useLoaderData,

    useSearchParams
} from 'react-router-dom'
// import { AiOutlineSetting } from 'react-icons/ai';
// import dateFormater from "../utils/DateFormater"
import { BiCategory } from 'react-icons/bi'
import { MdOutlinePriceChange } from 'react-icons/md'
// import { Autoplay, Navigation, } from 'swiper'
import ClearFilter from '../components/ClearFilter'
// import UiButton from '../components/UiButton'
// import SelectTime from 'react-select'
// import { toast } from 'react-toastify'
// import { getBuses } from "../utils/ReactSelectFunction";
// import BusSelect from 'react-select/async'
// import FromSelect from 'react-select/async'
// import ToSelect from 'react-select/async'
// import { Button, Rounded } from '../components'

import {
    AmountCount,
    FormatTable,
    Heading,

    Scrollable, TicketCounts
} from '../components'

import {
    useIsFetching,
    useQuery
} from '@tanstack/react-query'
import { useFilter } from '../Hooks/FilterHooks'
import SingleTicketErrorElement from '../components/SingleTicketErrorElement'
import TicketDetail from '../components/TicketDetail'
import Modal from "../pages/ShowBuses"
import customFetch from '../utils/customFetch'
import { useState } from 'react'
import { sortTicketStatusOptions, sortedDateOptions } from "../utils/sortedOptions"
import NoItemMatch from './NoItemMatch'
// import { DropdownIndicator } from 'react-select/dist/declarations/src/components/indicators'
import StaggeredDropDown from '../components/DropDown'
// import { BarChart, LineChart, PieChart } from ''

import {
    BarChart,
    LineChart,
    PieChart
} from '../components'
import FilterButton from '../components/FilterButton'
import { useUserBoardLayoutContext, useUserLayoutContext } from './UserBoard'
import BubbleTextHover from '../components/BubbleText'
let downloadbaseurl = null
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    downloadbaseurl = process.env.REACT_APP_LOCAL_URL
    // dev code
} else {
    // production code
    downloadbaseurl = process.env.REACT_APP_PROD_URL
}
const wait = (ms = 5000) => new Promise((r) => setTimeout(() => {
    r()
}, ms))
const allTicketsQuery = (params = {}) => {
    // console.log("this is the params", params)
    const { search, sort, page } = params
    return ({
        queryKey: [
            'tickets',
            // { search: search ?? "", page: page ?? 1, sort: sort ?? "newest" }
            { ...params }
        ],
        queryFn: async () => {
            const { data } = await customFetch.get('/ticket', {
                params,
            });
            return data;
        },
        keepPreviousData: true
    })
};

const style = {
    control: (base, state) => {
        // console.log(state.isFocused)
        return ({
            ...base,
            boxShadow: "none",
            backgroundColor: "transparent",
            borderRadius: 0,
            fontSize: 1 + "rem",
            cursor: "pointer",
            // backgroundColor: state.isSelected ? "red" : "green"
        }
        )
    }


}

export const loader =
    (queryClient) =>
        async ({ request }) => {
            const params = Object.fromEntries([
                ...new URL(request.url).searchParams.entries(),
            ]);
            // await wait();
            // await queryClient.ensureQueryData(allTicketsQuery(params));
            return defer({
                // searchValues: { ...params },
                bookData: queryClient.ensureQueryData(allTicketsQuery(params))
            }
            );
        };


const BookUi = () => {

    const params = Object.fromEntries([
        ...new URL(window.location.href).searchParams.entries(),
    ]);
    const isFetchingBooks = useIsFetching({ queryKey: ['tickets', params] })
    const { handleChange } = useFilter()
    const [querySearch] = useSearchParams();
    const loaderBooks = useQuery(allTicketsQuery(params))?.data || {}
    // const [open, setOpen] = useState(false)
    const { open, setOpen } = useUserBoardLayoutContext()
    const userData = {
        labels: ["Active", "Inactive"],
        datasets: [
            {
                label: "Number vs MailStatus",
                // data: users?.map((v) => v.total)
                data: [
                    loaderBooks?.totalActiveTickets || 0,
                    loaderBooks?.totalInActiveTickets || 0,
                    //   totalRecievedMails,
                ],
                backgroundColor: ["red", "blue"]
            },
        ]

    }
    return <>
        <div
            className='flex w-full md:pl-5 '
        >
            <Modal isOpen={open}
                setIsOpen={setOpen}
                className={"!z-[2000] "}
                className2={" lg:w-[min(calc(100%-40px),600px)] scrollto !max-h-[calc(100%-40px)] overflow-y-auto"}
            >
                <BubbleTextHover text={"6 Months Stats"} />
                <StaggeredDropDown />

                <div
                    className="!max-w-4xl mx-auto  
                    lg:px-5 "
                >
                    {
                        loaderBooks?.monthlyApplications?.length > 1 && <>
                            <div
                            ></div>
                            {
                                querySearch.get("chartOption") == "pie" && <PieChart chartData={
                                    {
                                        labels: loaderBooks?.monthlyApplications?.map(({ date }) => date),
                                        datasets: [
                                            {
                                                label: "Number vs MailStatus",
                                                // data: users?.map((v) => v.total)
                                                data: loaderBooks?.monthlyApplications?.map(({ count }) => count)
                                                // backgroundColor: ["red", "blue", "green"]
                                            },
                                        ]
                                    }
                                } />
                                ||
                                <BarChart chartData={
                                    {
                                        labels: loaderBooks?.monthlyApplications?.map(({ date }) => date),
                                        datasets: [
                                            {
                                                label: "Number vs MailStatus",
                                                // data: users?.map((v) => v.total)
                                                data: loaderBooks?.monthlyApplications?.map(({ count }) => count)
                                                // backgroundColor: ["red", "blue", "green"]
                                            },
                                        ]
                                    }
                                } />

                            }


                        </>
                    }

                    {/* {
                        userData && (
                            querySearch.get("chartOption") == "line" && <LineChart chartData={userData} />
                            ||

                            querySearch.get("chartOption") == "bar" && <BarChart chartData={userData} /> ||
                            querySearch.get("chartOption") == "pie" && <PieChart chartData={userData} />

                        )
                    } */}

                </div>
            
       
            </Modal>
            <div
                className="flex-none md:w-[15rem] lg:w-[18rem] hidden md:block
"
            >
                {/* display the recent tickets when we have 2 or more tickets */}
                {loaderBooks?.tickets?.length > 0 ?<>
                    <Heading text={"Recent Ticket(2)"} className={"!text-center !mb-2"} />
                    {
                        loaderBooks?.tickets?.slice(0, 2).map((ticket, i) => <TicketDetail key={ticket._id}
                            {...ticket}
                        />)
                    }
                </>:"you most work atleast two months to see this chart"}

            </div>
            <div className='flex-1'>

                <div className="flex items-start pt-10 flex-wrap gap-x-4 gap-y-6 justify-center ">

                    <>

                        <Scrollable className={`!px-5 !justify-center !grid !grid-cols-1 md:!grid md:!grid-cols-2 ${true && "!grid md:!grid-cols-2"} !transition-all !duration-[1s] !w-full !max-w-full `}>
                            <TicketCounts counts={loaderBooks?.totalTickets}
                                className="!max-w-lg !mx-auto !w-full "
                                text={"Total Number Of Tickets"}
                                icon={<AiOutlineSave />} />
                            <TicketCounts counts={loaderBooks?.totalActiveTickets}
                                className="!max-w-lg !mx-auto !w-full"
                                text={"Total Number Of active Tickets"}
                                icon={<VscFolderActive />} />
                            <TicketCounts
                                text={"Total Number Of Inactive Tickets"}
                                counts={loaderBooks?.totalInActiveTickets}
                                className="!max-w-lg !mx-auto !w-full" icon={<BiCategory />} />

                        </Scrollable>
                        <Scrollable className={`!px-5 !justify-center !grid-cols-1   !grid !w-full md:!grid md:!grid-cols-2 ${true && "!grid md:!grid-cols-2"} !max-w-full`}>
                            <AmountCount
                                className="!max-w-lg !mx-auto !w-full !bg-blue-400"
                                text="Total cost of all tickets"
                                icon={<MdOutlinePriceChange />}
                                amount={loaderBooks?.totalPrice} />
                            <AmountCount
                                className="!max-w-lg !mx-auto !w-full !bg-green-400"

                                text="Total cost of all active tickets"

                                icon={<BiCategory />} amount={loaderBooks?.totalActivePrice} />
                            <AmountCount
                                className="!max-w-lg !mx-auto !w-full !bg-red-400 !text-black"

                                text="Total cost of all inactive tickets"

                                icon={<BiCategory />} amount={loaderBooks?.totalInActivePrice} />

                        </Scrollable>
                    </>

                    <div className="flex justify-between relative z-[200] lg:justify-center  gap-x-4 gap-y-8 lg:gap-x-6
flex-wrap pr-5 items-start mb-10">


                        <div className='mt-0'>
                            <div className="text-[0.8rem] text-slate-300 dark:text-white uppercase text-center font-semibold mb-1 font-montserrat"> ticket status</div>
                            <Select
                                styles={style}
                                options={sortTicketStatusOptions}
                                defaultValue={{
                                    label: "All tickets",
                                    value: "all"
                                }}
                                isSearchable={false}
                                onChange={(e) => handleChange(e, "ticketStatus")}
                                // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                className='!border-none !h-8 mt-0' />
                        </div>

                        <div className='mt-0'>
                            <div className="text-[0.8rem]
text-slate-300 dark:text-white uppercase
text-center font-semibold mb-1 font-montserrat"> trip type </div>
                            <SelectTrip

                                onChange={(e) => handleChange(e, "triptype")}

                                options={


                                    [
                                        {
                                            label: "all trip",
                                            value: "all"
                                        }, {
                                            label: "singletrip",
                                            value: "singletrip"
                                        }, {
                                            label: "roundtrip",
                                            value: "roundtrip"
                                        }


                                    ]}
                                styles={style}
                                defaultValue={{
                                    label: querySearch.get("triptype") || "all trip",
                                    value: "all"
                                }}
                                // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                isSearchable={false}
                                // onChange={handleSortTime}
                                className='!border-none !h-8 mt-0' />
                        </div>
                        <div className='mt-0'>
                            <div className="text-[0.8rem]
text-slate-300 dark:text-white uppercase
text-center font-semibold mb-1 font-montserrat"> payment method </div>
                            <SelectTrip
                                onChange={(e) => handleChange(e, "paymenttype")}
                                options={
                                    [{ label: "All", value: "all" },
                                    { label: "Cash In", value: "Cash In" },
                                    { label: "CM", value: "CM" },
                                    ]}
                                styles={style}
                                defaultValue={{
                                    label: querySearch.get("paymenttype") || "all",
                                    value: "all"
                                }}
                                // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                isSearchable={false}
                                // onChange={handleSortTime}
                                className='!border-none !h-8 mt-0' />
                        </div>
                        <div className='mt-0'>
                            <div className="text-[0.8rem]
text-slate-300 dark:text-white uppercase
text-center font-semibold mb-1 font-montserrat"> sorted date </div>
                            <SelectSortDate
                                options={sortedDateOptions}
                                styles={style}
                                defaultValue={{
                                    label: querySearch.get("sort") || "createdAt -",
                                    value: "newest"
                                }}
                                // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                isSearchable={false}
                                onChange={(e) => handleChange(e, "sort")}

                                className='!border-none !h-8 mt-0' />
                        </div>
                    </div>


                    <div className='mt-10 ' />

                </div>
            </div>
        </div>

        <ClearFilter keys={[
            "sort,newest",
            "ticketStatus,all",
            "search,*",
            "daterange,*",
            "boardingRange,*",
            "triptype,all",
            "limit,100",
            "sort,newest",
            "_id,xyx",
            "traveltime,no time",
        ]} />
        <SearchComponent />

        {
            loaderBooks.tickets?.length > 0 ?
                <div className='w-full max-w-full'>
                    <FormatTable
                        isPreviousData={isFetchingBooks}
                        ticketData={loaderBooks}
                    />
                </div> : querySearch.get("search") ? <NoItemMatch
                    text={`could find any customer with search value {${querySearch.get("search")}}`}
                /> : <NoItemMatch />
        }
    </>
}
const Books = () => {
    const { bookData } = useLoaderData()
    // const isFetching = useIsFetching()

    // const loaderBooks = useQuery(allTicketsQuery(searchValues))?.data


    return (
        <div>
            <Suspense
                fallback={<div>loading please wait</div>}
            >

                <Await resolve={bookData}
                    errorElement={<SingleTicketErrorElement />}
                >
                    <BookUi />
                </Await>

            </Suspense>
        </div>
    )
}

export default Books