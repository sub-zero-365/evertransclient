import { AiOutlineArrowLeft, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { timeOptions } from '../utils/sortedOptions'
import TimeSelect from 'react-select'
import { onSuccessToast, onErrorToast, onWarningToast } from '../utils/toastpopup'
import AnimateText from '../components/AnimateText'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker';
import { VscFolderActive } from 'react-icons/vsc'
import Select from 'react-select';
import SelectTrip from 'react-select';
import SelectSortDate from 'react-select';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { IoMdClose } from "react-icons/io"
import {
    NavLink,
    useSearchParams, useNavigate,
    Link, useOutletContext,
    useLoaderData, Outlet
} from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineSetting } from 'react-icons/ai';
import dateFormater from "../utils/DateFormater"
import { BiBusSchool, BiCategory } from 'react-icons/bi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MdOutlineForwardToInbox, MdOutlinePriceChange } from 'react-icons/md'
import { Autoplay, Navigation, } from 'swiper'
import ClearFilter from '../components/ClearFilter'
import UiButton from '../components/UiButton'
// import SelectTime from 'react-select'
import { toast } from 'react-toastify'
import { getBuses } from "../utils/ReactSelectFunction";
import BusSelect from 'react-select/async'
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
// import { Button, Rounded } from '../components'

import { useUserLayoutContext } from "../components/UserLayout"
import {
    AmountCount,
    FormatTable,
    Heading
    ,
    Scrollable, TicketCounts,
    Loadingbtn,
    Form,
    NextButton,
    PrevButton,
    PercentageBar
    , CustomDatePicker
} from '../components';

// import { Helmet } from 'react-helmet'
// import { getCities } from "../utils/ReactSelectFunction"
import { sortedDateOptions, sortTicketStatusOptions } from "../utils/sortedOptions"
import { useFilter } from '../Hooks/FilterHooks'
import {
    useQuery
} from '@tanstack/react-query'
import customFetch from '../utils/customFetch'
import TicketDetail from '../components/TicketDetail'


const allTicketsQuery = (params = {}) => {
    // console.log("this is the params", params)
    const { search, sort, page } = params
    return {
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
    };
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
            
            await queryClient.ensureQueryData(allTicketsQuery(params));
            return { searchValues: { ...params } };
        };

const Books = () => {
    const { handleFilterChange, handleChange } = useFilter()
    const [querySearch] = useSearchParams();
    const { searchValues } = useLoaderData()
    const userData = useQuery(allTicketsQuery(searchValues))?.data
    let downloadbaseurl = null
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        downloadbaseurl = process.env.REACT_APP_LOCAL_URL
        // dev code
    } else {
        // production code
        downloadbaseurl = process.env.REACT_APP_PROD_URL

    }

    return (
        <div>
            <div
                className='flex w-full md:pl-5'
            >
                <div
                    className="flex-none md:w-[15rem] lg:w-[18rem] hidden md:block
          "

                >
                    <Heading text={"Recent Ticket(2)"} className={"!text-center !mb-2"} />
                    {
                        userData?.tickets?.slice(0, 2).map((ticket, i) => <TicketDetail key={ticket._id}
                            {...ticket}
                        />)
                    }
                </div>
                <div className='flex-1'>
                 
                    <div className="flex items-start pt-10 flex-wrap gap-x-4 gap-y-6 justify-center ">

                        <>

                            <Scrollable className={`!px-5 md:!grid md:!grid-cols-2 ${false && "!grid md:!grid-cols-2"} !transition-all !duration-[1s] `}>
                                <TicketCounts counts={userData?.totalTickets}
                                    text={"Total Number Of Tickets"}
                                    icon={<AiOutlineSave />} />
                                <TicketCounts counts={userData?.totalActiveTickets}
                                    text={"Total Number Of active Tickets"}
                                    icon={<VscFolderActive />} />
                                <TicketCounts
                                    text={"Total Number Of Inactive Tickets"}
                                    counts={userData?.totalInActiveTickets} icon={<BiCategory />} />

                            </Scrollable>
                            <Scrollable className={`!px-5 md:!grid md:!grid-cols-2 ${false && "!grid md:!grid-cols-2"}`}>
                                <AmountCount
                                    className="!bg-blue-400"
                                    text="Total cost of all tickets"
                                    icon={<MdOutlinePriceChange />}
                                    amount={userData?.totalPrice} />
                                <AmountCount
                                    className="!bg-green-400"

                                    text="Total cost of all active tickets"

                                    icon={<BiCategory />} amount={userData?.totalActivePrice} />
                                <AmountCount
                                    className="!bg-red-400 !text-black"

                                    text="Total cost of all inactive tickets"

                                    icon={<BiCategory />} amount={userData?.totalInActivePrice} />

                            </Scrollable>
                        </>

                        <div className="flex justify-between lg:justify-center  gap-x-4 gap-y-8 lg:gap-x-6
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

            <Form
                onChange={search => handleFilterChange("search", search)}
            />
            <div className='w-full max-w-full'>
                <FormatTable
                    ticketData={userData}
                />
            </div>

        </div>
    )
}

export default Books