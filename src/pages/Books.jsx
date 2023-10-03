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
import SelectTime from 'react-select'
import { toast } from 'react-toastify'
import { getBuses } from "../utils/ReactSelectFunction";
import BusSelect from 'react-select/async'
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import { Button, Rounded } from '../components'

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

import { Helmet } from 'react-helmet'
import { getCities } from "../utils/ReactSelectFunction"
import { sortedDateOptions, sortTicketStatusOptions } from "../utils/sortedOptions"
import { useFilter } from '../Hooks/FilterHooks'
import {
    useQuery
} from '@tanstack/react-query'
import customFetch from '../utils/customFetch'
import { CiLogout } from 'react-icons/ci'


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
    // const handleChangeText = (e) => {
    //     handleFilterChange("search", e.target.value)
    // }
    // const { user } = useOutletContext();
    const { logoutUser, user } = useUserLayoutContext()
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

                    <Heading text={"Recent Ticket(3)"} className={"!text-center !mb-2"} />

                    {

                        userData?.tickets?.slice(0, 2).map(({ fullname, traveldate, from, to, _id, createdAt }, i) => {
                            return (
                                <div
                                    key={i}
                                    class="max-w-sm mb-1 dark:text-white 
      bg-white  border  border-gray-200 rounded-lg shadow-xl dark:shadow-sm 
      dark:shadow-black shadow-slate-300 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="grid grid-cols-[1fr,auto] px-2 pt-3
  pb-2
  items-center justify-between border dark:border-slate-400 ">
                                        <Heading text="Tickets Details"
                                            className="!mb-0 !text-xs !text-start !mt-0 !pl-0 !ml-0 
  !font-semibold first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                                        <h4 className='!text-xs text-slate-500 !mb-0 !pb-0'>
                                            {createdAt && (dateFormater(createdAt).date)}
                                        </h4>
                                    </div>


                                    <div class="p-2">
                                        <Heading text="FullName" className="!mb-0 !text-center !text-lg !font-medium first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                                        <Heading text={fullname} className="!mb-2 !text-sm !text-center" />
                                        <div className='grid grid-cols-2'>
                                            <div>
                                                <Heading text="From" className="!mb-0 !text-lg !font-medium  first-letter:!font-semibold !font-montserrat" />
                                                <Heading text={from} className="!mb-2 !text-sm" />
                                            </div>

                                            <div>
                                                <Heading text="To" className="!mb-0 !text-lg !font-medium  first-letter:!font-semibold !font-montserrat" />
                                                <Heading text={to} className="!mb-2 !text-sm" />
                                            </div>

                                        </div>
                                        <Heading text="Travel Date" className="!mb-0 !text-center !text-lg !font-medium  first-letter:!font-semibold !font-montserrat" />
                                        <Heading text={(new Date(traveldate).toLocaleDateString())} className="!mb-2 !text-sm !text-center" />
                                        <div className='grid grid-cols-2 gap-x-1 place-items-center'>

                                            <Button name="view"
                                                className={"!inline-block !mx-0  !w-full"}
                                                href={`${_id}`}
                                            />
                                            <a
                                                target='_blank'
                                                className='
                        w-full
                        font-medium
            shadow
            md:shadow-md
            shadow-blue-200
            dark:shadow-slate-800
            bg-blue-400
            dark:bg-gray-700
            pt-1
            mr-1
            rounded-sm
            text-white
            dark:font-semibold
            px-3
            pb-1.5
            place-items-center  
            hover:bg-blue-700
            ease 
            transition-colors
            duration-700
            hover:underline
            flex
            justify-center 
            items-center
            text-[0.7rem] 
            md:text-sm
            font-montserrat
                        
                        '

                                                href={`${downloadbaseurl}/downloadticket/${_id}`}>download</a>

                                        </div>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
                <div className='flex-1'>
                    <div className="flex  items-center gap-x-4  mb-10  justify-between
        py-2 mx-auto mt-5 w-full max-w-[30rem] rounded-xl shadow bg-white dark:bg-slate-950 px-6 ">
                        <div className="flex-1">
                            <Heading text={"greetingtext"} className="!mb-1 !font-black mt-0 !italic" />
                            <p className="mb-3 text-sm font-montserrat px-6 uppercase italic !font-light">{(user?.fullname || "loading")} </p>
                        </div>

                        <UiButton
                            onClick={() => logoutUser()}
                            className=" hidden- lg:block
                !mx-auto !py-2.5 !my-5 !text-lg !rounded-xl  !bg-red-400"
                        >

                            <div className='flex items-center justify-center gap-x-2 text-xs'>

                                <CiLogout
                                    size={25}
                                /> LogOut
                            </div>

                        </UiButton>

                    </div>
                    <div className="flex items-start  flex-wrap gap-x-4 gap-y-6 justify-center ">

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
                            <div className='mt-0'>
                                <div className="text-[0.8rem]
          text-slate-300 dark:text-white uppercase
          text-center font-semibold mb-1 font-montserrat"> Travel Time </div>
                                <TimeSelect
                                    options={timeOptions}
                                    styles={style}
                                    defaultValue={{
                                        label: querySearch.get("traveltime") || "no time",
                                        value: "no time"
                                    }}
                                    // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                    isSearchable={false}
                                    onChange={(e) => handleChange(e, "traveltime")}

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
            {/* <input
                onChange={e => handleChange({ value: e.target.value }, "search")}
                type="text"
            /> */}
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