import { useravatar } from '../Assets/images';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect, useRef } from 'react';
import { BsChevronDown } from 'react-icons/bs'
import "swiper/css"
import { motion, AnimatePresence, useInView } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert'
import { storeTicket, setLoading } from "../actions/userticket"
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { BiSupport } from 'react-icons/bi'
import { Footer, FormatTable, PanigationButton, Scrollable } from "../components"
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
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from "../components"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Loadingbtn } from '../components'
const UserBoard = () => {

    const [params, setParams] = useState({
        page: 1,
        limit: 5
    })
    const [activeIndex, setActiveIndex] = useState(0);
    const [isActiveIndexLoading, setIsActiveIndexLoading] = useState(false);
    const [numberOfPages, setNumberOfPages] = useState();
    const [activeTicketCount, setActiveTicketCount] = useState(0);
    const [totalTickets, setTotalTickets] = useState()

    const [message, setMessage] = useState("please login to continue")
    const [showDatePicker, setShowDatePicker] = useState(false);
    const token = localStorage.token
    const [toggle, setToggle] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [isLoading, setIsloading] = useState(false)
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        console.log(dates)
    };
    const handleFilterDate = async () => {

        setIsloading(true);
        const url = process.env.REACT_APP_LOCAL_URL + "/ticket?" + `filter=${startDate},${endDate}`;
        try {
            const res = await axios.get(url, {
                headers: {
                    'Authorization': "makingmoney " + token
                },
                params
            })
            userTicket(res?.data?.tickets)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
        setIsloading(false)
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [tab, setTab] = useState(0);
    const handleChangeTab = (index) => {
        const temp = params;

        // if (temp.page === index+1) {
        //     return
        // }
        setTab(index)

        // alert(index)
        temp.page = 1;
        if (index === 0) {
            temp.ticketStatus = "all"
        }
        if (index === 1) {
            temp.ticketStatus = "active"
            // alert("entr hee")
        }
        if (index === 2) {
            temp.ticketStatus = "inactive"
        }
        setParams({
            ...temp
        })

    }
    const userTicket = (load) => {
        return dispatch(storeTicket(load))

    }
    const setLoading_ = (state) => {

        return dispatch(setLoading(state))

    }
    const tickets_ = useSelector(state => state.userTicket.tickets);
    const loading = useSelector(state => state.userTicket.loading);
    const ref = useRef(null);
    const isInView = useInView(ref)
    useEffect(() => {


    }, [isInView])
    useEffect(() => {
        if (!token) {
            setToggle(true)
            setTimeout(() => {
                navigate("/login")
            }, 4000);
        }
        async function getData() {
            setIsActiveIndexLoading(true)

            const url = process.env.REACT_APP_LOCAL_URL + "/ticket";
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    },
                    params
                })
                userTicket(res?.data?.tickets)
                setNumberOfPages(res?.data?.numberOfPages);
                setActiveTicketCount(res?.data?.totalTickets);
                setTotalTickets(res?.data?.alltickets);

            } catch (err) {
                console.log(err)
            }
            setIsActiveIndexLoading(false)

            if (loading) {
                setLoading_(false)
            }
        }
        getData()

    }, [params])
    const checkPages = (index) => {
        const temp = params;
        // if (temp.page === index) {
        //     return
        // }
        temp.page = index
        setParams({
            ...temp
        })

    }
    const [activeSlide, setctiveSlide] = useState(0);
    const isUserName = useSelector(state => state.username.username);
    return (
        <div className="max-w-5xl  mx-auto min-h-screen">

            {
                loading && <Loader dark toggle />
            }
            <Alert toggle={toggle} setToggle={setToggle} message={message} />
            <div className="flex  justify-between px-4 my-2 py-2">
                <div className="leading-2">
                    <h2 className="text-lg leading-5">welcome back</h2>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">{isUserName}</h1>
                </div>
                <img src={useravatar} alt="user" className='shadow w-[2.5rem] h-[2.5rem] rounded-full ' />
            </div>
            <div className="flex items-start  flex-wrap gap-x-4 gap-y-6 justify-center ">
                <div>
                    <Swiper

                        className='my-6 px-4 max-w-sm lg:max-w-lg '
                        slidesPerView={1}
                        onSlideChange={(e) => setctiveSlide(e.activeIndex)}
                        modules={[Autoplay, Pagination, Navigation]}
                        navigation={true}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 25000,
                            disableOnInteraction: false
                        }}
                    >
                        <SwiperSlide >
                            <motion.div className={`min-h-[12.5rem]-- relative  text-xs mx-0 ${activeSlide == 0 ? "bg3-orange-500" : "bg-oran3ge-200"}  rounded-lg `}
                                animate={{
                                    y: activeSlide == 0 ? [40, 0] : null, scale: activeSlide == 0 ? [1, 1.06, 1] : null,
                                }}
                            >

                                <h1 className="text-xl text-slate-700
                                mb-6 text-montserrat font-medium text-center uppercase mt-2">Percentage of active to inactive ticket</h1>
                                <CircularProgressbar
                                    background
                                    strokeWidth={8}
                                    initialAnimation
                                    circleRatio={((tickets_.filter(({ active }) => active == true).length / tickets_.length))}
                                    className='!w-[18.5rem] !max-w-[calc(100vw-3rem)] mx-auto'
                                    styles={{
                                        path: {
                                            stroke: `rgba(62,154,199,60%)`
                                        },
                                        trail: {
                                            stroke: "green"
                                        },
                                    }}
                                    percentage={tickets_.filter(({ active }) => active == true).length / tickets_.length} text={Math.floor((tickets_.filter(({ active }) => active == true).length / tickets_.length) * 100) + "%"} />
                            </motion.div>
                        </SwiperSlide>
                        {/* <SwiperSlide>
                    <BarChart chartData={userData} />
                        </SwiperSlide> */}
                    </Swiper>
                </div>

            </div>
            <span className='w-[min(calc(100%-2.5rem),300px)] px-5
            flex items-center justify-center mb-10 pb-1.5 text-white pt-1 font-medium rounded-sm
             mx-auto bg-blue-400
             shadow-sm
             shadow-blue-500
             rounded-4' onClick={() => setShowDatePicker(!showDatePicker)}>filter Ticket data
                <BsChevronDown className="text-2xl ml-5" /></span>

            <AnimatePresence>
                {showDatePicker &&
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
                        <span className='max-w-[min(calc(100%-2.5rem),400px)]
            flex items-center justify-center mb-10 pb-2 px-8
            text-black pt-1.5 font-medium rounded-sm
            shadow-2xl
             mx-auto bg-blue-300 mt-4  rounded-4'
                            onClick={handleFilterDate}

                        >  {isLoading ? <Loadingbtn toggle /> : "filter tickets"}</span>
                    </motion.div>
                }
            </AnimatePresence>
            {
                tickets_.length > 0 ?
                    <>
                        <h2 className='text-xl px-2  mb-4 text-center md:text-start'>Recent Book Tickets</h2>
                        <div className="flex items-center justify-between px-4 mb-4 "
                            ref={ref}>
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                className={`select-none capitalize relative before:content-[" "] before:absolute before:bottom-0
                        before:left-0  before:h-[1px] min-h-[1.4rem] before:bg-gray-500 flex items-center
                        
                        hover:font-black ${0 == tab ? "font-medium before:w-full" : ""}`}
                                onClick={() => handleChangeTab(0)}>All  <span className='text-xs ml-0.5 w-4 h-4 rounded-full border
                                bg-green-400 grid place-items-center shadow'>{totalTickets || 1}</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                className={`select-none capitalize relative before:content-[" "] before:absolute before:bottom-0
                        before:left-0  before:h-[1px] min-h-[1.4rem] before:bg-gray-500
                        flex items-center
                        hover:font-black ${1 == tab ? "font-medium before:w-full" : ""}`}
                                onClick={() => handleChangeTab(1)}>Active <span className='text-xs w-4 h-4 rounded-full 
                                border bg-blue-400 grid place-items-center shadow'></span> </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                className={`select-none capitalize relative before:content-[" "] before:absolute before:bottom-0
                        before:left-0  before:h-[1px] min-h-[1.4rem] before:bg-gray-500
                        flex items-center
                        
                        hover:font-black ${2 == tab ? "font-medium before:w-full" : ""}`}
                                onClick={() => handleChangeTab(2)}>Inactive
                                <span className='text-xs w-4 h-4 rounded-full border
                                bg-red-400 grid place-items-center shadow'></span>
                            </motion.div>
                        </div>
                        <div className="relative max-w-full overflow-x-auto  shadow-md sm:rounded-lg w-full mb-6 ">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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

                                <FormatTable tickets={tickets_}
                                    currentPage={params.page} />
                            </table>
                        </div>
                        <Scrollable className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto">
                            {Array.from({
                                length: numberOfPages
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

                    </> : (
                        <div className="min-h-[300px]">
                            <h1 className="mb-6 text-2xl font-montserrat text-center leading-5 font-medium  dark:text-orange-100 px-4 mt-4">It appears that this users hasnot book a ticket</h1>
                            <div className="">
                                <button
                                    type="button"
                                    a data-te-ripple-init
                                    data-te-ripple-color="light"
                                    className="flex justify-center items-center gap-2 tracking-6 w-[min(calc(100vw-2.5rem),400px)] font-montserrat z-10 relative bg-blue-700 -mb-12 px-6 pb-2 pt-2.5  my-4 mt-0 text-xs font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
ease-in-out hover:bg-primary-600 mx-auto
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700
active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    onClick={() => {
                                        navigate("/booking")
                                    }}
                                >
                                    go booking page
                                </button>
                                <img src="https://media.tenor.com/Y3c23UQQ3MIAAAAC/empty-box.gif" alt="box" className="max-w-full mx-auto" />

                            </div>
                            <h1 className="mb-6 text-xl font-montserrat text-center leading-5 font-medium  dark:text-orange-100 px-4 mt-4">If you think something went wrong contact customer service </h1>
                            <motion.button
                                initial={{ y: 20, opacity: 0.2 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                type="button"
                                a data-te-ripple-init
                                data-te-ripple-color="light"
                                className="flex justify-center items-center gap-2  tracking-6 w-[min(calc(100vw-2.5rem),400px)]  font-montserrat z-10 relative bg-blue-900 mb-2 px-6 pb-2 pt-2.5  my-4 mt-0 text-xs font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
ease-in-out hover:bg-primary-600 mx-auto
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700
active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                onClick={() => {
                                    navigate("/contact-us")
                                }}
                            >
                                <span> Contact-Us</span> <BiSupport size={25} />
                            </motion.button>
                            <motion.button

                                initial={{ y: 20, opacity: 0.2 }}
                                whileInView={{ y: 0, opacity: 1 }}

                                type="button"
                                a data-te-ripple-init
                                data-te-ripple-color="light"
                                className="flex justify-center items-center gap-2 rounded tracking-6 w-[min(calc(100vw-2.5rem),400px)]  font-montserrat z-10 relative bg-green-700  px-6 pb-2 pt-2.5  my-4 mt-0 text-xs font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
ease-in-out hover:bg-primary-600 mx-auto
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700
active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                onClick={() => {
                                    // navigate("/contact-us")
                                }}
                            >
                                whatsapp-us <AiOutlineWhatsApp size={25} className="inline-block" />
                            </motion.button>
                            <Footer />
                        </div>

                    )
            }



        </div>

    )
}

export default UserBoard