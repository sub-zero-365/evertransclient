import { useState, useEffect } from 'react'
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css'
import {useSearchParams} from 'react-router-dom'
import DatePicker from 'react-datepicker';
import { AnimatePresence, motion } from 'framer-motion'
import SkipSelect from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { setTickets } from '../actions/adminData';
import Select from 'react-select';
import SelectSortDate from 'react-select';
import { AiOutlineSetting } from 'react-icons/ai';

import {
    AmountCount, FormatTable,
    Loader, Scrollable,
    TicketCounts,
    PanigationButton,
    Loadingbtn, Form, Heading, UserRanking, PercentageBar, AnimatePercent
} from '../components';
import { AiOutlineSave } from 'react-icons/ai';
import { VscFolderActive } from 'react-icons/vsc';
import { BiCategory } from 'react-icons/bi';
import { MdOutlinePriceChange } from 'react-icons/md';
import { sortedDateOptions, sortTicketStatusOptions, skipOptions } from "../utils/sortedOptions"

const Appointment = () => {



    const [querySearch, setQuerySearch] = useSearchParams()

    const style = {
        control: base => ({
            ...base,
            border: 0,
            boxShadow: "none",
            background: "transparent",
            color: "red"
        }
        )

    }
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isActiveIndexLoading, setIsActiveIndexLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})
    const [params, setParams] = useState({
        page: 1,
        limit: 100
    })

    const tickets_ = useSelector(state => state.setAdminData.tickets);
    const isLoading = useSelector(state => state.setAdminData.loading.tickets)
  const viewAll = querySearch.get("viewAll");
  const setViewAll = () => {
    const temp = querySearch;
    if (temp.get("viewAll") && temp.get("viewAll") === "all") {
      setQuerySearch({ "viewAll": "one" })

    } else {
      setQuerySearch({ "viewAll": "all" })

    }

  }
    const handleSkipChange = (evt) => {
        const temp = params;
        if (temp.limit === evt.value) return;
        temp.page = 1
        setActiveIndex(0)
        temp.limit = evt.value
        setParams({
            ...temp
        })
        navigator.vibrate([100])
    }
    const handleChangeText = (e) => {
        const temp = params;
        temp.search = e.target.value;
        setParams({
            ...temp
        })

    }
    const handleFilterSearch = () => {
        const temp = params;
        temp.page = 1
        temp.daterange = `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`
        setParams({ ...temp });
        setLoading(true)
    }
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        console.log(dates)
    };

    const dispatch = useDispatch();
    const setTickets_ = (payload) => {
        return dispatch(setTickets(payload))
    }

    const token = localStorage.getItem("admin_token");

    const url = `${process.env.REACT_APP_LOCAL_URL}/admin/alltickets`

    useEffect(() => {
        fetchData()
    }, [params])

    const checkPages = (index) => {
        const temp = params;
        if (temp.page === index) {
            return
        }
        temp.page = index
        setParams({
            ...temp
        })

    }
    const handleSortTime = (evt) => {

        const temp = params;
        if (params.sort == evt.value) return
        temp.sort = evt.value
        temp.page = 1
        setParams({ ...temp })



    }
    const handleChange = (evt) => {
        const temp = params;
        if (params.ticketStatus == evt.value) return

        temp.ticketStatus = evt.value
        temp.page = 1
        setParams({ ...temp })
    }
    const [isOpen, setIsOpen] = useState(false);
    async function fetchData() {
        setIsActiveIndexLoading(true);

        try {

            const response = await axios.get(url, {
                headers: {
                    'Authorization': "makingmoney " + token
                },
                params
            })
            setTickets_([...response?.data?.tickets])
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
        <div className="max-w-full h-[calc(100vh-3rem)] overflow-auto" >
            {isLoading && (<Loader toggle dark />)}
            <motion.div
                onClick={() => setIsOpen(true)}
                // initial={{ x: "-50%" }}
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
            <div className="flex items-start ">
                <div className="flex-1 pt-10">
                    <div className="flex justify-between px-4">

                        <Heading text="OverView" />

                        <span onClick={() => setViewAll()} >{viewAll == "all" ? "view less" : "view all"}</span>
                    </div>
                    <Scrollable className={`!mb-10 !justify-center ${viewAll === "one" && "!grid md:!grid-cols-2 gap-y-5"} !transition-all !duration-[1s]`}>

                        <PercentageBar
                        className={`${viewAll === "one" && "!min-w-[8rem]"}`}
                        
                        percent={userData?.percentageActive} text="Active Ticket Ratio" />
                        <PercentageBar
                        className={`${viewAll === "one" && "!min-w-[8rem]"}`}
                        stroke="red"
                        percent={userData?.percentageInActive} text="InActive Ticket Ratio" />
                    </Scrollable>
                    {/* <AnimatePercent percent={66}/> */}
                    <Scrollable className={`!px-5 !mb-10 ${viewAll === "one" && "!grid md:!grid-cols-2"} !transition-all !duration-[1s]`}>
                        <TicketCounts counts={userData?.totalTickets || userData?.totalTickets === 0 && "0" || <span className='text-xs font-black '>loading ...</span>}
                            text={"Total Number Of Tickets"}
                            icon={<AiOutlineSave />} />
                        <TicketCounts counts={userData?.totalActiveTickets || userData?.totalActiveTickets === 0 && "0" || <span className='text-xs font-black '>loading ...</span>}
                            text={"Total Number Of active Tickets"}

                            icon={<VscFolderActive />} />
                        <TicketCounts
                            text={"Total Number Of Inactive Tickets"}
                            counts={userData?.totalInActiveTickets || userData?.totalInActiveTickets === 0 && "0" || <span className='text-xs font-black '>loading ...</span>} icon={<BiCategory />} />
                    </Scrollable>
                    <Scrollable className={`!px-5 ${viewAll === "one" && "!grid md:!grid-cols-2"} !transition-all !duration-[1s]`}>
                        <AmountCount
                            className="!bg-blue-400"
                            text="Total coset of all tickets"
                            icon={<MdOutlinePriceChange />}
                            amount={userData?.totalPrice} />
                        <AmountCount
                            className="!bg-green-400"

                            text="Total coset of all active tickets"

                            icon={<BiCategory />}
                            amount={userData?.totalActivePrice} />
                        <AmountCount
                            className="!bg-red-400 !text-black"

                            text="Total coset of all inactive tickets"

                            icon={<BiCategory />}
                            amount={userData?.totalInActivePrice} />
                    </Scrollable>
                    <div className="my-10" />

                    <div className="flex justify-between
      flex-wrap pr-5 items-start mb-10">
                        <h1 className="md:text-xl text-sm font-bold  mt-4 
        text-gray-700 pl-6
        
        flex tracking-tight">All tickets <span className="text-xs ring-2 ring-gray-700  grid place-items-center
        ml-1 w-5 h-5 bg-gray-500 text-white
        mb-4 rounded-full border">{userData?.totalTickets || 0} </span> </h1>

                        <div className='mt-0'>
                            <div className="text-[0.8rem] text-slate-300 uppercase text-center font-semibold mb-1 font-montserrat"> ticket status</div>
                            <Select
                                styles={style}
                                options={sortTicketStatusOptions}
                                defaultValue={{
                                    label: "All tickets",
                                    value: "all"
                                }}
                                // ref={selectRef}
                                isSearchable={false}
                                onChange={handleChange}
                                className='!border-none !h-8 mt-0' />
                        </div>

                        <div className='mt-0'>
                            <div className="text-[0.8rem]
          text-slate-300 uppercase
          text-center font-semibold mb-1 font-montserrat"> sorted date </div>
                            <SelectSortDate
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
                        <div>


                            <h1 className="text-slate-300 uppercase text-xs mt-4
          text-center font-semibold mb-1 font-montserrat">N coloumn</h1>
                            <SkipSelect
                                defaultValue={{
                                    label: 100, value: 100
                                }}
                                styles={style}
                                className="block max-w-[3rem] ml-auto"
                                isSearchable={false}
                                options={skipOptions}
                                onChange={handleSkipChange} />
                        </div>

                    </div>

                    <AnimatePresence >

                        {
                            params?.daterange && <motion.div

                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}

                                className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

                                <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
                                    onClick={() => {
                                        const temp = params;
                                        if (temp.daterange) delete temp.daterange;
                                        setParams({ ...temp })

                                    }}

                                >Clear Filter</span>
                                Date filter is on  </motion.div>
                        }
                        {
                            params?.search && <motion.div

                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}

                                className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

                                <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
                                    onClick={() => {
                                        const temp = params;
                                        if (temp.search) delete temp.search;
                                        setParams({ ...temp })

                                    }}

                                >Clear Filter</span>
                                Text Filter is On  </motion.div>
                        }
                        {
                            params?.sort && params.sort !== "newest" && <motion.div

                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}

                                className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

                                <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
                                    onClick={() => {
                                        const temp = params;
                                        if (temp.sort) delete temp.sort;
                                        setParams({ ...temp })

                                    }}

                                >Clear Filter</span>
                                Text Filter is On  </motion.div>
                        }
                        {
                            params?.ticketStatus && params.ticketStatus !== "all" && <motion.div

                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}

                                className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

                                <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
                                    onClick={() => {
                                        const temp = params;
                                        if (temp.ticketStatus) delete temp.ticketStatus;
                                        setParams({ ...temp });
                                        // selectRef?.current?.select?.clearValue()
                                    }}

                                >Clear Filter</span>
                                Ticket are set to <span className='px-2 bg-red-300 text-black text-xs rounded-lg mx-4 ring-1 ring-red-900'>{params.ticketStatus}</span> Filter is On  </motion.div>
                        }

                    </AnimatePresence>
                </div>

                <div
                    onClick={() => setIsOpen(false)}
                    className={`flex-none
                    
                fixed 
                z-10
                right-0
                top-0
                w-full
                h-[calc(100%-0px)]
                overflow-y-auto
                lg:h-auto
                ${isOpen ? "visible opacity-100" : "invisible "}
                lg:static lg:w-[20rem]
                group
                lg:visible
                sidebar bg-slate-500/50  lg:bg-white shadow 
                lg:ml-2   lg:py-10 `}>

                    <div
                        onClick={e => e.stopPropagation()}
                        className="
                        absolute top-0
                        md:static
                        group-[.visible]:right-0
                        group-[.invisible]:-right-full
                        transition-all
                        duration-[1s]
                        ease
                        
                             pt-10
                             h-[calc(100%-0px)]
                             lg:h-full 
                             bg-white
                             shadow
                             w-[min(25rem,calc(100vw-4rem))]">

                        <Heading text="Date Query" className="!font-black" />

                        <AnimatePresence className="mt-10">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, duration: 2 }}
                                className="flex flex-col items-center w-full justify-center">
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
                                    params.daterange && <button
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        className="inline-block  rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                                        onClick={() => {
                                            const temp = params;
                                            if (temp.daterange) delete temp.daterange;
                                            setParams({ ...temp })

                                        }}

                                    >
                                        Clear Filter Query
                                    </button>
                                }
                            </motion.div>
                        </AnimatePresence>
                        <div className="mb-10" />
                        <Heading text="User Ranking " className="!font-bold" />
                        <UserRanking />



                    </div>
                </div>
            </div>

            <Form handleChangeText={handleChangeText} params={params} />

            <div className="relative max-w-full overflow-x-auto
      shadow-md sm:rounded-lg w-full mb-6 ">
                <table className="w-full text-sm text-left text-gray-500 
                dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase 
                    bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                Index
                            </th>
                            <th scope="col" className="px-3 py-3">
                                full name
                            </th>
                            <th scope="col" className="px-3 py-3">
                                phone
                            </th>
                            <th scope="col" className="px-3 py-3">
                                price
                            </th>
                            <th scope="col" className="px-3 py-3">
                                from
                            </th>
                            <th scope="col" className="px-3 py-3">
                                to
                            </th>
                            <th scope="col" className="px-3 py-3">
                                date
                            </th>
                            <th scope="col" className="px-3 py-3">
                                createdAt
                            </th>
                            <th scope="col" className="px-3 py-3">
                                time
                            </th>
                            <th scope="col" className="px-3 py-3">
                                status
                            </th>
                            <th scope="col" className="px-3 py-3">
                                age
                            </th>
                            <th scope="col" className="px-3 py-3">
                                sex
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <FormatTable tickets={tickets_} admin
                        skip={params.limit}
                        currentPage={params.page} />
                </table>
            </div>
            <div className='mt-10 ' />
            <Scrollable className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto">
                {Array.from({
                    length: userData?.numberOfPages
                }, (text, index) => {
                    return <PanigationButton
                        text={index + 1}
                        active={activeIndex}
                        loading={isActiveIndexLoading}
                        index={index} onClick={() => {
                            setActiveIndex(index)
                            checkPages(index + 1)
                        }} />
                })}
            </Scrollable>
        </div>
    )

}

export default Appointment