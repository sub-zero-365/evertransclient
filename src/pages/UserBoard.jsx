import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

import { MdOutlineClose } from 'react-icons/md'
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
import { NavLink, useSearchParams, useNavigate, json } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineSetting } from 'react-icons/ai';
import formatQuery from "../utils/formatQueryStringParams"
import dateFormater from "../utils/DateFormater"
import axios from 'axios'
import { BiCategory } from 'react-icons/bi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MdOutlinePriceChange } from 'react-icons/md'
import { Autoplay, Navigation, Pagination } from 'swiper'
import ClearFilter from '../components/ClearFilter'
import UiButton from '../components/UiButton'
import { useSelector, useDispatch } from 'react-redux'
// import {} from '../components'
import EditTicketModal from '../components/EditTicketModal'

import { toast } from 'react-toastify'

// import {}
import Alert from '../components/Alert'

import { Button } from '../components'
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

  useQuery,
} from '@tanstack/react-query'
import {
  AmountCount,
  BarChart,
  FormatTable,
  Heading
  , PanigationButton, PieChart,
  Scrollable, TicketCounts,
  Loadingbtn,
  BoxModel,
  DataDay
  , Form,
  NextButton,
  PlaceHolderLoader,
  PrevButton,
  PercentageBar
  , ToggleSwitch
} from '../components';
import { Helmet } from 'react-helmet'
import { setUserData as setUserDataFunc } from '../actions/userData'

import { sortedDateOptions, sortTicketStatusOptions } from "../utils/sortedOptions"
const Details = () => {
  let downloadbaseurl = null
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    downloadbaseurl = process.env.REACT_APP_LOCAL_URL
    // dev code
  } else {
    // production code
    downloadbaseurl = process.env.REACT_APP_PROD_URL

  }
  const isUserName = useSelector(state => state.username.username);

  const onPasswordSuccess = () => toast.success("Password Change Successfully!!", {
    position: toast.POSITION.BOTTOM_CENTER
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen_, setIsOpen_] = useState(false)
  const [isOpen__, setIsOpen__] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [toggle_, setToggle_] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChangePassWord = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {

      const res = await axios.post("/user/updatepassword", {
        oldpassword: password1.current.value,
        newpassword: password2.current.value,
        confirmpassword: password3.current.value
      }, {
        headers: {
          'Authorization': "makingmoney " + token
        }
      })
      setIsOpen(false)
      onPasswordSuccess()
    } catch (err) {
      console.log(err)
      setError(err.response.data)
      setTimeout(() => {
        setError(null)
      }, 6000)

    }
    finally {
      setLoading(false)
    }


  }
  const { userData } = useSelector(state => state.userData);


  const setUserData = (data) => {
    dispatch(setUserDataFunc(data))
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
  const constraintsRef = useRef(null);
  const password1 = useRef(null);
  const password2 = useRef(null);
  const password3 = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActiveIndexLoading, setIsActiveIndexLoading] = useState(false)

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


  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(dates)
  };
  useEffect(() => {

    handleFilterChange("view", "all")
    if (!querySearch.get("page")) {
      handleFilterChange("page", 1)

    }
    async function getUserInfo() {
      const url = "/auth/userinfo";
      try {
        const res = await axios.get(url, {
          headers: {
            'Authorization': "makingmoney " + token
          }
        })
        setUserInfo(res.data?.user)


      } catch (err) {
        navigate("/login?message=" + err.response.data)
      }
    }
    getUserInfo()
  }, [])
  const [_userData, _setUserData] = useState({
    labels: ["active tickets", "inactive tickets"],
    datasets: [
      {
        label: "ticket data",
        data: [12, 14],
        backgroundColor: ["green", "orange"]
      }
    ],
    datalabels: {
      backgroundColor: function (context) {
        return context.dataset.backgroundColor;
      },
      borderColor: 'white',
      borderRadius: 25,
      borderWidth: 3,
      color: 'white',
      font: {
        weight: 'bold'
      },
      padding: 6,


    }


  }
  )


  const handleChangeText = (e) => {
    handleFilterChange("search", e.target.value)
  }


  const handleBoardingRangeSearch = () => {
    if (querySearch.get("daterange")) {
      handleFilterChange("daterange", null)
    }
    handleFilterChange("boardingRange", `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`)
  }
  const handleFilterSearch = () => {
    if (querySearch.get("boardingRange")) {
      handleFilterChange("boardingRange", null)
    }
    handleFilterChange("daterange", `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`)
  }
  const checkPages = (index) => {
    if (querySearch.get("page") == index) return
    handleFilterChange("page", index)
  }
  const handleSortTime = (evt) => {
    if (querySearch.get("sort") == evt.value) return
    handleFilterChange("sort", evt.value)
  }
  const handleChange = (evt) => {
    if (querySearch.get("ticketStatus") == evt.value) return
    handleFilterChange("ticketStatus", evt.value)
  }
  const token = localStorage.getItem("token");
  const { loading: isLoading } = useSelector(state => state.userData)

  const [userInfo, setUserInfo] = useState({});
  const config = {
    headers: {
      'Authorization': "makingmoney " + token
    },
    params: formatQuery(querySearch.toString())
  }
  async function getData() {

    const url = "/ticket"
    setIsActiveIndexLoading(true)

    try {
      const res = await axios.get(url, config)
      setUserData(res.data)

    } catch (err) {
      setToggle_(true)
      console.log(err)
      setMessage(err.response.data)
      console.log(err)
      // alert(err.response.data)
    }
    setIsActiveIndexLoading(false)

  }

  useEffect(() => {
    getData();
  }, [querySearch]);
  const _view = JSON.parse(localStorage.getItem("__view")) == true ? true : false
  const [__view, __setView] = useState(_view)
  const [greetingtext, setGreetingText] = useState("GOOD MORNING")
  useEffect(() => {
    const timer = setInterval(() => {
      const hour = new Date().getHours()
      if (hour < 13) {
        setGreetingText("GOOD MORNING")
      } else if (hour < 17) {
        setGreetingText("GOOD AFTERNOON")
      } else {

        setGreetingText("GOOD EVENING")
      }
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  }, [])
  // const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const [id, setId] = useState("")
  const [ticket, setTicket] = useState({})

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsOpen_(true)
    setLoading(true)
    setErr(null)
    try {
      const { data: { ticket } } = await axios.post("/public/ticket",
        {
          id
          ,
        })
      setTicket(ticket)
      console.log("enter here ")
    } catch (err) {
      console.log(err)
      setErr(err.response.data)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }


  }


  const [toggle, setToggle] = useState(false);

  const selectRef = useRef(null)
  const LoadingBox = ({ }) => {


    return (
      <div role="status" class="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">


        <div class="flex items-center justify-between">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>

    )

  }
  return (
    <>
      <Helmet>
        <title>
          User Dashboard
        </title>
      </Helmet>
      <motion.div
        className='pt-4 px-2 max-w-full overflow-x-auto select-none lg:px-10 
      mx-auto
    max-h-[calc(100vh-4rem)] overflow-y-auto bg-color_light dark:bg-color_dark'
        ref={constraintsRef}>
        {
          (ticket) && (<EditTicketModal
            className="!z-[100]"
            isOpen={isOpen__}
            setIsOpen={setIsOpen__}
            ticket={ticket} />)
        }
        <div
          className={`overlay ${isOpen && "active"} transition-[visible] duration-100
      group grid place-items-center `}
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className={`
          -translate-x-[50px]
          md:translate-x-0
          md:translate-y-[50px]
          group-[.active]:translate-x-0
          duration-700
          ease 
          transition-all
          opacity-60
          md:group-[.active]:translate-y-0
          group-[.active]:opacity-100
          bg-white
          dark:bg-slate-800
          shadow-sm
          rounded-lg
          w-[min(calc(100%-40px),400px)]
          
            py-5 pb-10`}>

            <AnimateText text="change password " className='!text-lg' />
            <form
              onSubmit={handleChangePassWord}
              className='px-5'
            >
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input ref={password1}
                  type="text"
                  className="peer block min-h-[auto] w-full 
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="password1"
                  placeholder="Password" required />
                <label
                  htmlFor="password1"
                  className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-white
              peer-valid:bg-white
              dark:peer-focus:bg-slate-800
              dark:peer-valid:bg-slate-800
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"

                >
                  Old Passowrd
                </label>
              </div>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input ref={password2}
                  type="password"
                  className="peer block min-h-[auto] w-full 
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="password2"
                  placeholder="New Password" required />
                <label
                  htmlFor="password2"
                  className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-white
              peer-valid:bg-white
              dark:peer-focus:bg-slate-800
              dark:peer-valid:bg-slate-800
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"

                >
                  New Password
                </label>
              </div>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input ref={password3}
                  type="password"
                  className="peer block min-h-[auto] w-full 
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="password3"
                  placeholder="Email address" required />
                <label
                  htmlFor="password3"
                  className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-white
              peer-valid:bg-white
              dark:peer-focus:bg-slate-800
              dark:peer-valid:bg-slate-800
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"

                >Confirm Password
                </label>
              </div>


              <div className="mb-6 flex items-center justify-between  text-sm font-medium md:text-xl text-orange-600">
                <motion.h1
                  animate={{
                    opacity: error ? 1 : 0,
                    y: error ? 0 : -40,
                    x: error ? 0 : -1000

                  }}


                  className="w-fit flex-none mx-auto tracking-[0.4rem] text-center ">  {error}</motion.h1>
              </div>


              <button
                type="submit"
                className="inline-block bg-blue-400
            w-full rounded bg-primary px-7
            pb-2.5 pt-3 text-sm font-medium
            uppercase leading-normal
            text-white
            shadow-[0_4px_9px_-4px_#3b71ca]
            transition duration-150
            ease-in-out hover:bg-primary-600
            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            focus:bg-primary-600 
            focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
            focus:outline-none focus:ring-0 active:bg-primary-700 
            active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
            dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                disabled={isLoading}
                data-te-ripple-init
                data-te-ripple-color="light">
                {loading ? <Loadingbtn /> : "Change Password"}
              </button>


            </form>
          </div>
        </div>
        {/* ticket modal */}
        <div
          className={`overlay
                !fixed
                ${isOpen_ && "active"} transition-[visible] duration-100
      group grid place-items-center `}
          onClick={() => setIsOpen_(false)}
        >

          <div
            onClick={e => e.stopPropagation()}
            className={`
    lg:max-h-[calc(100%-100px)]
    max-h-[calc(100%-60px)]
    overflow-auto
-translate-x-[50px]
md:translate-x-0
md:translate-y-[50px]
group-[.active]:translate-x-0
duration-700
ease 
transition-all
opacity-60
md:group-[.active]:translate-y-0
group-[.active]:opacity-100
bg-white
dark:bg-slate-800
shadow-sm
rounded-lg
w-[min(calc(100%-40px),400px)]

py-5 pb-10`}>
            {
              loading ? <AnimateText text="loading please wait ..." className="!text-2xl" /> : (
                err ? <>
                  <Heading text={err} className="!text-rose-600" />
                  <p className="mb-4 px-4 text-center lg:text-start text-sm">contact customer service if something is wrong </p>
                  <UiButton name="Contact Customer Services" className="!pb-2.5 !pt-1.5 w-[min(400px,calc(100%-60px))] !mx-auto" />
                </>
                  : (
                    <div>
                      <h1 className="text-center font-semibold  font-montserrat text-xl mt-4 md:text-2xl tracking-tighter leading-10 oblique text-blue-900">Ticket Details</h1>
                      <h2 className="text-center  text-lg md:text-xl font-medium  "> Ticket id</h2>
                      <p className="text-center text-slate-500 mb-4 "> {ticket?._id}</p>

                      <h2 className="text-center  text-lg md:text-xl font-medium  "> Traveler Name</h2>
                      <p className="text-center text-slate-500 mb-4 ">{ticket?.fullname || "n/a"}</p>

                      <h2 className="text-center  text-lg md:text-xl font-medium  ">Travel Date </h2>
                      <p className="text-center text-slate-500 mb-4 "> {ticket?.traveldate ? dateFormater(ticket?.traveldate).date : "n/a"}</p>
                      <h2 className="text-center  text-lg md:text-xl font-medium  ">travel time </h2>
                      <p className="text-center text-slate-500 mb-4 "> {ticket?.traveltime || "n/a"}</p>
                      <div className="grid grid-cols-2">

                        <div>
                          <h2 className="text-center  text-lg md:text-xl font-medium  "> From</h2>
                          <p className="text-center text-slate-500 mb-4 ">{ticket?.from || "n/a"} </p>

                        </div>
                        <div>
                          <h2 className="text-center  text-lg md:text-xl font-medium  "> To</h2>
                          <p className="text-center text-slate-500 mb-4 ">{ticket?.to || "n/a"}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">

                        <div>

                          <h2 className="text-center  text-lg md:text-xl font-medium  "> sex</h2>
                          <p className="text-center text-slate-500 mb-4 ">{ticket?.sex || "n/a"} </p>
                        </div>
                        <div>
                          <h2 className="text-center  text-lg md:text-xl font-medium  "> status</h2>
                          <p className="text-center sidebar text-slate-500 mb-4 grid place-items-center"> {ticket?.active ?


                            ticket?.type == "roundtrip" ? <div className="flex gap-x-1">
                              {ticket?.doubletripdetails[0]?.active ? <span className='w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span> : <span className='w-6 h-6  bg-red-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineClose /></span>}
                              {ticket?.doubletripdetails[1]?.active ? <span className='w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span> : <span className='w-6 h-6  bg-red-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineClose /></span>}
                            </div> : <span className='w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span>

                            :
                            <span className='w-6 h-6  bg-red-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineClose /></span>

                          }</p>
                        </div>
                      </div>
                      <h2 className="text-center  text-lg md:text-xl font-medium  "> this ticket was created at </h2>
                      <p className="text-center text-slate-500 mb-10 ">{dateFormater(ticket?.createdAt).date + " at " + dateFormater(ticket?.createdAt).time || "n/a"} </p>
                      <h2 className="text-center  text-lg md:text-xl font-medium  "> price of the ticket</h2>
                      <p className="text-center text-slate-500 " >{ticket?.price + "frs" || "n/a"} </p>
                     {
                     
                     ticket?.active&&(
                      <UiButton
                        name="Edit Ticket"
                        className="!block 
                        w-[min(300px,calc(100%-2.5rem))]
                        !mx-auto
                        !pb-2.5
                        !pt-2
                        !mb-5
                        "
                        onClick={() => {
                          setToggle(false)
                          setIsOpen__(true)
                          setIsOpen_(false)
                        }}
                      />
                     
                     )
                     }
                      <a
                        href={`${downloadbaseurl}/downloadticket/${ticket?._id}?payload=79873ghadsguy&requ`}
                        target="_blank"
                        className="inline---block 
                        w-[min(300px,calc(100%-2.5rem))]
                         bottom-0
                         pb-2.5
                         block
                         min-h-[2rem]
                         mx-auto
                         pt-2
                         text-center
                        rounded bg-green-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-green-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-green-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        Download ticket
                      </a>
                    </div>
                  )

              )

            }
          </div>

        </div>

        <Alert message={message}
          duration="30000"
          className={`
      ${toggle_ && "!top-1/2 -translate-y-1/2"}
      `}
          toggle={toggle_}
          // confirmFunc={() =>0}
          setToggle={() => 0}

        />
        <motion.div
          onClick={() => setToggle(true)}
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
          className="bottom-1/2 lg:hidden
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
        <nav class="flex mb-5 mt-5 px-5 lg:hidden" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <NavLink to={"/booking"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                Booking
              </NavLink>
            </li>
            <li>
              <div class="flex items-center" >
                <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                  <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Employee Details</h1>
                </a>
              </div>
            </li>

          </ol>
        </nav>
        <div className={`lg:flex ${__view && "lg:flex-row-reverse"}  items-start justify-start gap-4 `}>
          <div
            className="flex-none w-[18rem] hidden lg:block
          "

          >

            <Heading text={"Recent Ticket(3)"} className={"!text-center !mb-2"} />

            {
              isLoading ? <>
                <LoadingBox />
                <LoadingBox />


              </> :
                userData?.tickets?.slice(0, 3).map(({ fullname, traveldate, from, to, _id, createdAt }, i) => {
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
          <div className="flex-1   mb-6 ">
            <div className="flex  items-center  mb-10  justify-between
        py-2 mx-auto mt-5 max-w-sm rounded-xl shadow bg-white dark:bg-slate-950 px-6 ">
              <div className="flex-1">
                <Heading text={greetingtext} className="!mb-1 !font-black mt-0 !italic" />
                <p className="mb-3 text-sm font-montserrat px-6 uppercase italic !font-light">{(isUserName || "loading")} </p>
              </div>

              <UiButton
                name="change view"
                className="!hidden lg:!block !rounded-xl !text-sm capitalize lg:!ml-2"
                onClick={() => {
                  if (__view == true) {
                    __setView(false)
                    localStorage.setItem("__view", JSON.stringify(__view))
                  } else {
                    __setView(true)
                    localStorage.setItem("__view", JSON.stringify(__view))
                  }

                }}
              />

            </div>
            <div className="flex items-start  flex-wrap gap-x-4 gap-y-6 justify-center ">

              <div className='md:hidden'>
                <Swiper className='md:hidden max-w-sm w-full'
                  slidesPerView={1}
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                  }}
                >
                  <SwiperSlide>
                    <PercentageBar
                      className={`${true && "!min-w-[8rem]"}`}
                      percent={userData?.percentageActive}
                      n={userData?.totalActiveTickets}
                      price={userData?.totalActivePrice}
                      text="Active  Ratio" />

                  </SwiperSlide>
                  <SwiperSlide>
                    <PercentageBar
                      className={`${true && "!min-w-[8rem]"}`}
                      stroke="red"
                      n={userData?.totalInActiveTickets}
                      price={userData?.totalInActivePrice}
                      percent={userData?.percentageInActive}
                      text="InActive  Ratio" />

                  </SwiperSlide>
                </Swiper>
              </div>

              <Scrollable className={`!mb-10 mx-auto hidden
            md:!hidden
             !justify-center 
            md:!grid-cols-2 gap-y-5 !transition-all 
            !duration-[1s]`}>
                <PercentageBar
                  className={`${true && "!min-w-[8rem]"}`}
                  percent={userData?.percentageActive}
                  n={userData?.totalActiveTickets}
                  price={userData?.totalActivePrice}
                  text="Active  Ratio" />
                <PercentageBar
                  className={`${true && "!min-w-[8rem]"}`}
                  stroke="red"
                  n={userData?.totalInActiveTickets}
                  price={userData?.totalInActivePrice}
                  percent={userData?.percentageInActive}
                  text="InActive  Ratio" />
              </Scrollable>
              {
                isLoading ?
                  <PlaceHolderLoader />

                  :
                  <>

                    <Scrollable className={`!px-5 ${true && "!grid md:!grid-cols-2"} !transition-all !duration-[1s] `}>
                      <TicketCounts counts={userData?.totalTickets}
                        text={"Total Number Of Tickets"}
                        icon={<AiOutlineSave />} />
                      <TicketCounts counts={userData?.totalActiveTickets}
                        text={"Total Number Of active Tickets"}
                        icon={<VscFolderActive />} />
                      <TicketCounts
                        text={"Total Number Of Inactive Tickets"}
                        counts={userData?.totalInActiveTickets} icon={<BiCategory />} />
                      <TicketCounts
                        className="!bg-rose-200"
                        counts={userData?.totalEditedTicket}
                        text={"Total Edited  Tickets"}
                        icon={<AiOutlineSave />} />
                    </Scrollable>
                    <Scrollable className={`!px-5 ${true && "!grid md:!grid-cols-2"}`}>
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
                      <AmountCount
                        className="!bg-red-400 !text-black"

                        text="Total cost of all edited tickets"

                        icon={<BiCategory />} amount={userData?.totalSumOfEditedTicket} />
                    </Scrollable>
                  </>
              }


            </div>
          </div>
          <div className={`flex-none py-5
        sidebarr m lg:rounded-lg shadow rounded-lg  overflow-y-auto--
        ${toggle ? "right-0" : "!-right-full"}
        duration-500
        transition-[right] shadow
        lg:shadow-none lg:max-w-sm lg:w-[22rem] 
        text-center bg-white
        dark:bg-slate-800 rounded-sm right-0 top-0 h-fit
           w-[calc(100vw-3.5rem)] max-w-sm
           z-20 fixed   lg:static px-4 `}>
            <span className="absolute w-[3.125rem] h-[3.125rem] top-0 
       text-red-700 hover:bg-orange-500 rounded-e-md transition-all lg:hidden duration-500 
       -left-[3.125rem] z-10 rounded-none flex items-center justify-center  font-black border-black"
              onClick={() => setToggle(false)}
            >
              <IoMdClose size={25} />
            </span>
            {

              isLoading ?
                <div role="status" class="animate-pulse">
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                  <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-3"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                  <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-3"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                  <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-3"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                  <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-3"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                  <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-3"></div>
                  <div class="flex items-center justify-center mt-4">
                    <svg class="w-8 h-8 text-gray-200 dark:text-gray-700 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div class="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
                    <div class="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <span class="sr-only">Loading...</span>
                </div>

                :
                <div
                  className=' overflow-y-auto max-h-[calc(100vh-0px)] lg:max-h-fit overflow-x-hidden '
                >
                  {querySearch.get("account_block") && "account restricted"}
                  <Heading text={"Employee Details"} className="!font-semibold !mb-5 underline underline-offset-4--  !text-lg first-letter:text-2xl" />
                  <Heading text={"Phone Number"} className="!font-semibold !mb-0 !text-lg first-letter:text-2xl" />
                  <h4 className='text-sm text-slate-500 font-medium '>{userInfo?.phone || "n/a"}</h4>
                  <UiButton
                    name="Update Password" className="!mx-auto !rounded-lg !mt-2"
                    onClick={() => {
                      setIsOpen(true)
                    }} />
                  <Swiper
                    className='my-6
                            px-4 
                            w-full
                            lg:w-full 
                            !relative
                          
                            '
                    slidesPerView={1}
                    onSlideChange={(e) => console.log(e)}
                    modules={[Autoplay, Navigation]}
                    navigation={{
                      prevEl: ".arrow__left",
                      nextEl: ".arrow__right",
                    }}
                  >
                    <PrevButton className="!left-1.5" />
                    <NextButton className="!right-1.5" />

                    <SwiperSlide className="group ">
                      <Heading text={"Query  Travel At"} className="!font-black !text-sm underline !underline-offset-4 !mb-2 !text-center" />


                      <div

                        className="flex flex-col
                        items-center w-full justify-center group-[.swiper-slide-active]:!translate-y-0 
                         translate-y-[50px] ease duration-[1s] transition-all">
                        <DatePicker
                          selected={startDate}
                          onChange={onChange}
                          startDate={startDate}
                          endDate={endDate}
                          selectsRange
                          inline
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
                        className=" !text-sm !text-slate-500 !font-semibold !underline-offset-4 !mb-2 !text-center" />


                      <div

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

                  <div className="mt-10 mb-10 md:mb-5">

                    <div
                      onClick={e => e.stopPropagation()}
                      className={`
                        mx-auto
          md:translate-x-0
          group-[.active]:translate-x-0
          duration-700
          ease 
          transition-all
          md:group-[.active]:translate-y-0
          group-[.active]:opacity-100
          bg-white
          dark:bg-slate-800
          shadow-sm
          rounded-lg
          w-[min(calc(100%-40px),400px)]
          
            py-5 pb-10`}>

                      <AnimateText text="Please enter ticket id to get and edit tickett" className='!text-lg' />
                      <form
                        onSubmit={handleSubmit}
                        className='px-5 pb-5'
                      >
                        <div className="relative mb-6" data-te-input-wrapper-init>
                          <input
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            type="text"
                            className="peer block min-h-[auto] w-full 
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="ticket_id"
                            placeholder="Password" required />
                          <label
                            htmlFor="ticket_id"
                            className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-white
              peer-valid:bg-white
              dark:peer-focus:bg-slate-800
              dark:peer-valid:bg-slate-800
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"
                          >
                            Enter Ticket Id
                          </label>
                        </div>

                        <div className="mb-6 flex items-center justify-between  text-sm font-medium md:text-xl text-orange-600">
                          <motion.h1
                            className="w-fit flex-none mx-auto tracking-[0.4rem] text-center "> </motion.h1>
                        </div>


                        <button
                          type="submit"
                          className="inline-block bg-blue-400
            w-full rounded bg-primary px-7
            pb-2.5 pt-3 text-sm font-medium
            uppercase leading-normal
            text-white
            shadow-[0_4px_9px_-4px_#3b71ca]
            transition duration-150
            ease-in-out hover:bg-primary-600
            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            focus:bg-primary-600 
            focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
            focus:outline-none focus:ring-0 active:bg-primary-700 
            active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
            dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          // disabled={loading}
                          data-te-ripple-init
                          data-te-ripple-color="light">
                          {/* {loading ? <Loadingbtn /> : "Change Password"}
                            */}
                          {"check ticket details"}
                        </button>


                      </form>
                    </div>

                  </div>

                </div>
            }

          </div>
        </div>

        <div className="flex justify-between lg:justify-center  gap-x-4 gap-y-2 lg:gap-x-6
      flex-wrap pr-5 items-start mb-10">
          <h1 className="text-2xl mt-4 
        text-gray-700 pl-6
        dark:text-white
        flex tracking-tight">All tickets <span className="text-xs ring-2 ring-gray-700  grid place-items-center
        ml-1 w-5 h-5 bg-gray-500 text-white
        mb-4 rounded-full border">{userData?.totalTickets || 0} </span> </h1>

          <div className='mt-0'>
            <div className="text-[0.8rem] text-slate-300 dark:text-white uppercase text-center font-semibold mb-1 font-montserrat"> ticket status</div>
            <Select
              styles={style}
              options={sortTicketStatusOptions}
              defaultValue={{
                label: "All tickets",
                value: "all"
              }}
              ref={selectRef}
              isSearchable={false}
              onChange={handleChange}
              className='!border-none !h-8 mt-0' />
          </div>

          <div className='mt-0'>
            <div className="text-[0.8rem]
          text-slate-300 dark:text-white uppercase
          text-center font-semibold mb-1 font-montserrat"> trip type </div>
            <SelectTrip
              onChange={
                evt => {
                  if (querySearch.get("triptype") == evt.value) return
                  handleFilterChange("triptype", evt.value)
                }
              }

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

              isSearchable={false}
              onChange={handleSortTime}
              className='!border-none !h-8 mt-0' />
          </div>


        </div>
        <ClearFilter keys={[
          "sort,newest"
          ,
          "ticketStatus,all",
          "search,*",
          "daterange,*",
          "boardingRange,*",
          "triptype,all",
          "limit,100",
          "sort,newest",
          "_id,xyx",
        ]} />

        <Form
          handleChangeText={handleChangeText}
          params={querySearch} />
        {

          !isLoading && (<FormatTable
            ticketData={userData}
            // skip={querySearch.get("limit")}
            // currentPage={querySearch.get("page")} 
            
            />)
        }

        {
          isLoading && (
            <PlaceHolderLoader />
          )
        }
        <div className='mt-10 ' />
        {/* <Scrollable className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto">
          {Array.from({
            length: userData?.numberOfPages
          }, (_, index) => {
            return <PanigationButton
              text={index + 1}
              active={activeIndex}
              loading={isActiveIndexLoading}
              index={index} onClick={() => {
                setActiveIndex(index)
                checkPages(index + 1)
              }} />
          })}
        </Scrollable> */}

      </motion.div>
    </>
  )
}

export default Details