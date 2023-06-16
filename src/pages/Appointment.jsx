import { useState, useEffect } from 'react'
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css'

import DatePicker from 'react-datepicker';
import { AnimatePresence, motion } from 'framer-motion'
import SkipSelect from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { setTickets } from '../actions/adminData';
import {
    AmountCount, FormatTable,
    Loader, Scrollable,
    TicketCounts,
    PanigationButton,
    Loadingbtn, Form
} from '../components';
import { AiOutlineSave } from 'react-icons/ai';
import { VscFolderActive } from 'react-icons/vsc';
import { BiCategory } from 'react-icons/bi';
import { MdOutlinePriceChange } from 'react-icons/md';

const Appointment = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isActiveIndexLoading, setIsActiveIndexLoading] = useState(false)
    const [totalTickets, setTotalTickets] = useState()
    const [activeTicketCount, setActiveTicketCount] = useState(0);
    const [loading, setLoading] = useState(false)
    const [totalActivePrice,setTotalActivePrice]=useState(0)
    const [totalInActivePrice,setTotalInActivePrice]=useState(0)
    const [userData,setUserData]=useState({})
    const [params, setParams] = useState({
        page: 1,
        limit: 100
    })

    const tickets_ = useSelector(state => state.setAdminData.tickets);
    const isLoading = useSelector(state => state.setAdminData.loading.tickets)
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
        // setToggle(true)
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

    const skipOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 15, value: 15 },
        { label: 25, value: 25 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
        { label: 200, value: 200 },

    ]
    const token = localStorage.getItem("admin_token");

    const url = `${process.env.REACT_APP_LOCAL_URL}/admin/alltickets`
    
    useEffect(() => {
        fetchData()
    }, [params])

    // const [numberOfPages, setNumberOfPages] = useState()
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
            // setActiveTicketCount(response?.data?.totalActiveTickets);
            // setTotalActivePrice(response?.data?.totalActivePrice);
            // setTotalInActivePrice(response?.data?.totalInActivePrice);
            // setTotalTickets(response?.data?.totalTickets);
            // setNumberOfPages(response?.data?.numberOfPages)
            setUserData(response?.data)
        } catch (err) {
            console.log(err);
        }
        setIsActiveIndexLoading(false)
        if (loading) {
            setLoading(false)
        }
        

    }


    return (
        <div className="max-w-full h-[calc(100vh-3rem)] overflow-auto" >
            {isLoading && (<Loader toggle dark />)}
            <div className=" md:flex  justify-between items-start">
                <h1 className='text-2xl text-center mt-6'>Book tickets</h1>
                <div className="flex flex-col mx-auto justify-center  items-center">
                    <h2 className='uppercase text-lg md:text-lg mb-4'>Filter Data By</h2>

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
                            <span

                                onClick={handleFilterSearch}

                                className='max-w-[min(calc(100%-2.5rem),400px)]
            flex items-center
            justify-center
             pb-2 px-8
            text-medium
            pt-1.5 font-medium rounded-sm
            text-gray-200
            shadow-2xl
             mx-auto bg-blue-600 mt-4  rounded-4'

                            >  {loading ? <Loadingbtn toggle /> : "Filter Tickets"}</span>
                            {
                                params.daterange && <span
                                    onClick={() => {
                                        const temp = params;
                                        if (temp.daterange) delete temp.daterange;
                                        setParams({ ...temp })
                                        setLoading(true)

                                    }}
                                    className='max-w-[min(calc(100%-2.5rem),400px)]
          flex items-center
          justify-center
           pb-2 px-8
          text-medium
          pt-1.5 font-medium rounded-sm
          text-gray-200
          shadow-2xl
           mx-auto bg-orange-600 mt-4  rounded-4'

                                > Clear filter</span>
                            }
                        </motion.div>
                    </AnimatePresence>
                </div>


            </div>

            <Scrollable className={"!px-5"}>
                <TicketCounts counts={userData?.totalTickets ||userData?.totalTickets===0&&"0" || <span className='text-xs font-black '>loading ...</span> }
                    text={"Total Number Of Tickets"}
                    icon={<AiOutlineSave />} />
                <TicketCounts counts={userData?.totalActivePrice ||userData?.totalActivePrice===0&&"0" || <span className='text-xs font-black '>loading ...</span>}
                    text={"Total Number Of active Tickets"}

                    icon={<VscFolderActive />} />
                <TicketCounts
                    text={"Total Number Of Inactive Tickets"}
                    counts={userData?.totalInActivePrice ||totalInActivePrice===0&&"0" || <span className='text-xs font-black '>loading ...</span> } icon={<BiCategory />} />
            </Scrollable>
            <Scrollable className={"!px-5"}>
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

            <div className='w-[min(calc(100%-2.5rem),10rem)] ml-auto mr-2'>
                <h1 className="text-sm text-center text-gray-400 mb-1 ">Show N coloumn</h1>
                <SkipSelect
                    defaultValue={{
                        label: 5, value: 5
                    }}
                    className="block max-w-[3rem] ml-auto"
                    isSearchable={false}
                    options={skipOptions}
                    onChange={handleSkipChange} />

            </div>

            <Form handleChangeText={handleChangeText} params={params} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-transparent ">
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