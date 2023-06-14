import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker';
import "react-circular-progressbar/dist/styles.css";
import { GrStackOverflow } from 'react-icons/gr';
import { VscFolderActive } from 'react-icons/vsc'
import Select from 'react-select';
import SelectSortDate from 'react-select';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineMenu, AiOutlineSave } from 'react-icons/ai';
import { IoMdClose } from "react-icons/io"
import { useParams, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios'
import { BiCategory } from 'react-icons/bi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MdOutlinePriceChange } from 'react-icons/md'
import { Autoplay, Navigation, Pagination } from 'swiper'
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
  AmountCount, BarChart, ActiveStatusButton, FormatTable,
  DeactiveStatusButton
  , PanigationButton, PieChart, Scrollable, TicketCounts, Loadingbtn, AnimatePercent, BoxModel
} from '../components';
const Details = () => {
  // const ActiveValue=useM
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const constraintsRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActiveIndexLoading, setIsActiveIndexLoading] = useState(false)
  const [totalTickets, setTotalTickets] = useState()
  const [tickets, setTickets] = useState([])
  const [activeTicketCount, setActiveTicketCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const id = useParams().id;
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
  const [params, setParams] = useState({
    page: 1,
    limit: 50,
    createdBy: id
  })
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(dates)
  };
  useEffect(() => {
    setIsLoading(true)
  }, [])
  const [userData, setUserData] = useState({
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
  const [activeSlide, setctiveSlide] = useState(0);
  const [sum, setSum] = useState(0)
  const [activeSum, setAcitveSum] = useState(0)
  const [inActiveSum, setInAcitveSum] = useState(0)
  const token = localStorage.getItem("admin_token");
  const [isLoading, setIsLoading] = useState(false)

  const [userInfo, setUserInfo] = useState({})
  const config = {
    headers: {
      'Authorization': "makingmoney " + token
    },
    params
  }
  const handleChangeText = (e) => {
    const temp = params;
    temp.search = e.target.value;
    setParams({
      ...temp
    })

  }
  async function getData() {
    const url = process.env.REACT_APP_LOCAL_URL + "/admin/alltickets"
    setIsActiveIndexLoading(true)

    try {
      const res = await axios.get(url, config)
      setTickets(res?.data?.tickets);

      setActiveTicketCount(res?.data?.totalActiveTickets);
      setTotalTickets(res?.data?.totalTickets);
      setNumberOfPages(res?.data?.numberOfPages)
      setAcitveSum(res?.data?.totalActivePrice)

      setSum(res?.data?.totalPrice)
      setInAcitveSum(res?.data?.totalInActivePrice)
      setUserData({
        labels: ["active tickets", "inactive tickets"],
        datasets: [
          {
            label: "ticket data",
            data: [res?.data?.totalActiveTickets, res?.data?.tickets.length - res?.data?.totalActiveTickets],
            backgroundColor: ["skyblue", "orange"]
          }
        ]
      })
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
    setIsActiveIndexLoading(false)

  }
  // const handleOnChange = (evt) => {
  //   return
  // }

  useEffect(() => {
    getData();
  }, [params]);
  const [numberOfPages, setNumberOfPages] = useState();
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


  useEffect(() => {
    async function getUserInfo() {
      const url = process.env.REACT_APP_LOCAL_URL + "/admin/staticuser/" + `${id}`;

      try {
        const { data } = await axios.get(url, config);
        setUserInfo(data?.user)

        console.log(data)

      } catch (err) {
        console.log(err)
      }

    }


    getData()
    getUserInfo()
  }, [window.location.href])

  const [toggle, setToggle] = useState(false)
  // const options = [
  //   { label: "all", value: "null" },
  //   { label: "today", value: 1 },
  //   { label: "yesterday", value: 2 },
  //   { label: "last week", value: 7 },
  //   { label: "last month", value: 31 },

  // ]
  const handleFilterSearch = () => {
    const temp = params;
    temp.page = 1
    temp.daterange = `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`
    setParams({ ...temp });
    setToggle(false)

  }
  const sortedOptions = [

    {
      label: "CreatedAt-",
      value: "newest"

    },
    {
      label: "CreatedAt+",
      value: "oldest"

    },
    {
      label: "traveldate-",
      value: "new_traveldate"

    },
    {
      label: "traveldate+",
      value: "old_traveldate"

    },
  ]
  const sortOptions = [
    { value: "all", label: "All tickets" },
    { value: "active", label: <span className="flex items-center justify-between">Active tickets <ActiveStatusButton className="" /> </span> },
    { value: "inactive", label: <span className="flex items-center justify-between">InActive tickets <DeactiveStatusButton className="" /> </span> },

  ]
  const handleChange = (evt) => {
    const temp = params;
    if (params.ticketStatus == evt.value) return
    temp.ticketStatus = evt.value
    temp.page = 1
    setParams({ ...temp })
  }
  const handleSortTime = (evt) => {

    const temp = params;
    if (params.sort == evt.value) return
    temp.sort = evt.value
    temp.page = 1
    setParams({ ...temp })



  }
  const movex = {


    animate: {
      width: ["0%", (activeTicketCount / (totalTickets)) * 100 + "%"],
      transition: {
        duration: 1,
        delay: 0.2
      }
    }

  }
  return (
    <motion.div
      className='pt-4 px-2 max-w-full overflow-x-auto select-none
    max-h-[calc(100vh-4rem)] overflow-y-auto bg-color_light' ref={constraintsRef}>
      <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NavLink to={"/dashboard/users"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              Users
            </NavLink>
          </li>
          <li>
            <div class="flex items-center">
              <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Employee Details</h1>
              </a>
            </div>
          </li>

        </ol>
      </nav>
      <motion.div

        drag
        dragConstraints={constraintsRef}
        className='hover:bg-slate-300 fixed right-0 md:right-[8rem]
      top-12 bg-white dark:bg-slate-400
      z-[10]
      lg:hidden w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={() => setToggle(true)}>
        <AiOutlineMenu size={25} />
      </motion.div>
      <div className="lg:flex items-start justify-start gap-4">
        <div className="flex-1   mb-6">
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
                  <motion.div
                    className={`min-h-[12.5rem]-- relative  text-xs mx-0   rounded-lg `}
                  >

                    <h1 className="text-xl mb-4 text-montserrat font-medium text-center uppercase mt-2">Active to Inactive ticket ratio</h1>
                    <PieChart chartData={userData} />
                  </motion.div>
                </SwiperSlide>
                <SwiperSlide >
                  <motion.div
                    className={`min-h-[12.5rem]-- relative  text-xs mx-0   rounded-lg `}
                  >
                    <div className="mb-10 md:mb-5">

                      <h2 className="text-start 
                        text-color_dark  mt-2 ml-1
                         tracking-tight text-lg
                        font-medium">User Book Vs System Book </h2>
                      <span className="mb-5 w-14 ml-2 h-1 bg-blue-700 block rounded-lg"></span>
                      <CircularProgressbar
                        background
                        strokeWidth={8}
                        initialAnimation
                        circleRatio={0.6}
                        className='!w-[10rem] md:!w-[10rem]
                        !max-w-[calc(100%-3rem)] mx-auto'
                        styles={{
                          path: {
                            stroke: `rgba(62,154,199,60%)`
                          },
                          trail: {
                            stroke: "green"
                          },
                        }}
                        percentage={66.5 + "%"}
                        text="66%"
                      />
                      <BoxModel activeCount={7476}
                        className="!bg-white"
                        inActiveCount={62549}
                        text1="User"
                        text2="System"
                        text={""}
                      />

                      {/* <AnimatePercent
                        variants={movex}
                        percent={Math.floor((activeTicketCount / (totalTickets)) * 100)}
                      /> */}

                    </div>
                  </motion.div>
                </SwiperSlide>


              </Swiper>
            </div>
            {
              isLoading ? (
                <div role="status" class="space-y-2.5 animate-pulse max-w-lg grid grid-cols-3 gap-2">
                  <div class="flex items-center w-full space-x-2 max-w-[480px]">
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                  <div class="flex items-center w-full space-x-2 max-w-[480px]">
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>

                  <div class="flex items-center w-full space-x-2 max-w-[480px]">
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                  <div class="flex items-center w-full space-x-2 max-w-[400px]">
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  </div>
                  <div class="flex items-center w-full space-x-2 max-w-[480px]">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                  <span class="sr-only">Loading...</span>
                </div>

              ) : (

                <Scrollable className={"!px-5"}>
                  <TicketCounts counts={totalTickets}
                    text={"Total Number Of Tickets"}
                    icon={<AiOutlineSave />} />
                  <TicketCounts counts={activeTicketCount}
                    text={"Total Number Of active Tickets"}
                    icon={<VscFolderActive />} />
                  <TicketCounts
                    text={"Total Number Of Inactive Tickets"}
                    counts={totalTickets - activeTicketCount} icon={<BiCategory />} />
                </Scrollable>
              )

            }
            {
              isLoading ? (
                <div role="status" class="space-y-2.5 animate-pulse max-w-lg grid grid-cols-3 gap-2">
                  <div class="flex items-center w-full space-x-2 max-w-[480px]">
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                  <div class="flex items-center w-full space-x-2 max-w-[480px]">
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                  <div class="flex items-center w-full space-x-2 max-w-[480px]">
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                  <div class="flex items-center w-full space-x-2 max-w-[400px]">
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  </div>
                  <div class="flex items-center w-full space-x-2 max-w-[480px]">
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  </div>
                  <span class="sr-only">Loading...</span>
                </div>

              ) : (
                <Scrollable className={"!px-5"}>
                  <AmountCount
                    className="!bg-blue-400"
                    text="Total coset of all tickets"
                    icon={<MdOutlinePriceChange />}
                    amount={sum} />
                  <AmountCount
                    className="!bg-green-400"

                    text="Total coset of all active tickets"

                    icon={<BiCategory />} amount={activeSum} />
                  <AmountCount
                    className="!bg-red-400 !text-black"

                    text="Total coset of all inactive tickets"

                    icon={<BiCategory />} amount={inActiveSum} />
                </Scrollable>
              )

            }
          </div>


        </div>
        <div className={`flex-none py-5
        
        sidebarr m lg:rounded-lg shadow rounded-lg  overflow-y-auto--
        ${toggle ? "right-0" : "!-right-full"}
        duration-500 transition-[right] shadow lg:shadow-none lg:max-w-sm lg:w-[20rem] 
        text-center bg-white rounded-sm right-0 top-12 h-fit
           w-[calc(100vw-3.5rem)] max-w-sm  z-[6] fixed   lg:static px-4 `}>

          <span className="absolute w-[3.125rem] h-[3.125rem] top-0 
       text-red-700 hover:bg-orange-500 rounded-e-md transition-all lg:hidden duration-500 
       -left-[3.125rem] z-10 rounded-none flex items-center justify-center  font-black border-black"
            onClick={() => setToggle(false)}
          >
            <IoMdClose size={25} />
          </span>
          <div
            className=' overflow-y-auto max-h-[calc(100vh-5rem)] lg:max-h-fit overflow-x-hidden '
          >
            <h1 className='text-lg  font-medium leading-6 mb-1'>Employee Name :</h1>
            <h4 className='text-sm text-slate-500 font-medium '>{userInfo?.fullname || "n/a"}</h4>
            <h1 className='text-lg  font-medium leading-6 mb-1'>Employee Id:</h1>
            <h4 className='text-sm text-slate-500 font-medium '>{userInfo?._id || "n/a"}</h4>
            <h1 className='text-lg  font-medium leading-6 mb-1'>Phone Number:<span className="px-2 text-white mb-4 rounded-xl text-xs bg-green-400 ml-1">call</span></h1>
            <h4 className='text-sm text-slate-500 font-medium '>{userInfo?.phone || "n/a"}</h4>
            <h1 className='text-lg  font-medium leading-6 mb-1'>ID Card N-o: <span className="px-2 text-white mb-4 rounded-xl text-xs bg-green-400 hidden">new</span></h1>
            <h4 className='text-sm text-slate-500 font-medium '>1234567</h4>
            <h1 className='text-lg  font-medium leading-6 mb-1'>Account created At: <span className="px-2 text-white mb-4 rounded-xl text-xs bg-green-400">new</span></h1>
            <h4 className='text-sm text-slate-500 font-medium '>{userInfo?.createdAt || "n/a"}</h4>

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

                >  {isLoading ? <Loadingbtn toggle /> : "Filter Tickets"}</span>
                {
                  params.daterange && <span
                    onClick={() => {
                      const temp = params;
                      if (temp.daterange) delete temp.daterange;
                      setParams({ ...temp })

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
            <div className="mt-10 mb-10 md:mb-5">

              <h2 className="text-start 
                                    text-color_dark  mt-2 ml-1
                                     tracking-tight 
                                    font-medium">Booking OverView </h2>
              <span className="mb-5 w-14 ml-2 h-1 bg-blue-700 block rounded-lg"></span>
              <CircularProgressbar
                // background
                strokeWidth={10}
                initialAnimation
                circleRatio={(activeTicketCount / (totalTickets))}
                className='!w-[10rem] md:!w-[10rem]
                                    !max-w-[calc(100%-3rem)] mx-auto '
                styles={{
                  path: {
                    stroke: `rgba(62,154,199,60%)`
                  },
                  trail: {
                    stroke: "green"
                  },
                }}
                percentage={(activeTicketCount / (totalTickets)) * 100 + "%"}
                text={Math.floor((activeTicketCount / (totalTickets)) * 100) + "%"}
              />
              {/* <AnimatePercent
                variants={movex}
                percent={Math.floor((activeTicketCount / (totalTickets)) * 100)}
              /> */}

              <BoxModel activeCount={activeTicketCount} inActiveCount={totalTickets - activeTicketCount} />

            </div>

          </div>
          {/* <div className='flex justify-between items-start'>
            <span className='w-5 h-5 bg-white rounded-full'></span><span className='w-5 h-5 bg-white rounded-full'></span>
          </div> */}
        </div>
      </div>

      <div className="flex justify-between
      flex-wrap pr-5 items-start mb-10">
        <h1 className="text-2xl mt-4 
        text-gray-700 pl-6
        
        flex tracking-tight">All tickets <span className="text-xs ring-2 ring-gray-700  grid place-items-center
        ml-1 w-5 h-5 bg-gray-500 text-white
        mb-4 rounded-full border">{totalTickets} </span> <GrStackOverflow className="inline-block- pl-2 text-4xl hidden md:inline-block" /></h1>

        <div className='mt-0'>
          <div className="text-[0.8rem] text-slate-300 uppercase text-center font-semibold mb-1 font-montserrat"> ticket status</div>
          <Select
            styles={style}
            options={sortOptions}
            defaultValue={{
              label: "All tickets",
              value: "all"
            }}
            isSearchable={false}
            onChange={handleChange}
            className='!border-none !h-8 mt-0' />
        </div>

        <div className='mt-0'>
          <div className="text-[0.8rem]
          text-slate-300 uppercase
          text-center font-semibold mb-1 font-montserrat"> sorted date </div>
          <SelectSortDate
            options={sortedOptions}
            styles={style}
            defaultValue={{
              label: "createdAt -",
              value: "newest"
            }}

            isSearchable={false}
            onChange={handleSortTime}
            className='!border-none !h-8 mt-0' />
        </div>


      </div>
      <form className="px-4 md:px-6 my-5 " onSubmit={(e) => e.preventDefault()}>
        <div className="flex relative min-h-[40px]">
          <div className="relative w-full">
            <input type="search" value={params.search || ""}
              onChange={e => handleChangeText(e)} id="search-dropdown" className="block outline-none focus:outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg
                        border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Email address,names etc " required />
            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg
                        border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <div className="relative max-w-full overflow-x-auto
      shadow-md sm:rounded-lg w-full mb-6 ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
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
          {

            !isLoading && <FormatTable tickets={tickets} admin
              currentPage={params.page} />
          }
        </table>
      </div>
      {

        isLoading && (

          <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
            <div class="flex items-center w-full space-x-2">
              <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <div class="flex items-center w-full space-x-2 max-w-[480px]">
              <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            </div>
            <div class="flex items-center w-full space-x-2 max-w-[400px]">
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <div class="flex items-center w-full space-x-2 max-w-[480px]">
              <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            </div>
            <div class="flex items-center w-full space-x-2 max-w-[440px]">
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            </div>
            <div class="flex items-center w-full space-x-2 max-w-[360px]">
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
              <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <span class="sr-only">Loading...</span>
          </div>

        )
      }
      {/* <div className="flex mb-10 select-none gap-4">
        <div className={`${i <= 0 ? "opacity-40" : "opacity-100"} w-10 text-lg rounded-lg  h-10 shadow bg-lime-50 hover:bg-slate-300 duration-300 transition-all grid place-items-center `} onClick={() => next_pre(-1, tickets)}>
          <BsChevronLeft className='text-black  font-black' />

        </div>
        <div className={`${j >= tickets.length ? "opacity-40" : "opacity-100"} w-10 text-lg rounded-lg  h-10 shadow bg-lime-50 hover:bg-slate-300 duration-300 transition-all grid place-items-center `} onClick={() => {
          next_pre(1, tickets)
        }}>
          <BsChevronRight className='text-black  font-black' />

        </div>


      </div> */}
      <div className='mt-10 ' />
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

    </motion.div>
  )
}

export default Details