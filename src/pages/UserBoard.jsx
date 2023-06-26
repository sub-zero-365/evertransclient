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
import { useParams, NavLink, useSearchParams } from 'react-router-dom';
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
  , Form, NextButton,
  PlaceHolderLoader, PrevButton
} from '../components';
const Details = () => {
  const [querySearch, setQuerySearch] = useSearchParams()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const constraintsRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActiveIndexLoading, setIsActiveIndexLoading] = useState(false)
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
  const [activeSlide, setctiveSlide] = useState(0);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false)

  const [userInfo, setUserInfo] = useState({});
  const [userData, setUserData] = useState({ test: 1 })
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
    const url = process.env.REACT_APP_LOCAL_URL + "/ticket"
    setIsActiveIndexLoading(true)

    try {
      const res = await axios.get(url, config)
      setUserData(res?.data || {})
      console.log(res.data)
      _setUserData({
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

  useEffect(() => {
    getData();
  }, [params]);
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
      const url = process.env.REACT_APP_LOCAL_URL + "/auth/userinfo";

      try {
        const { data } = await axios.get(url, config);
        setUserInfo(data?.user)


      } catch (err) {
        console.log(err)
      }

    }


    getData()
    getUserInfo()
  }, [window.location.href])

  const [toggle, setToggle] = useState(false);

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

  const viewAll = querySearch.get("viewAll");
  const setViewAll = () => {
    // alert(viewAll)
    const temp = querySearch;
    if (temp.get("viewAll") && temp.get("viewAll") === "all") {
      setQuerySearch({ "viewAll": "one" })

    } else {
      setQuerySearch({ "viewAll": "all" })

    }

  }
  const handleChangeSearchParams = (key, value) => {
    setQuerySearch(prevState => {
      if (value == null) {
        prevState.delete(key)
      } else {
        prevState.set(key, value)
      }
      return prevState
    })

  }
  // handleChangeSearchParams("name", "john joe")
  const handleChange = (evt) => {
    const temp = params;
    if (params.ticketStatus == evt.value) return
    // if (querySearch.get("ticketStatus") && querySearch.get("ticketStatus") === evt.value) return
    // handleChangeSearchParams("ticketStatus", evt.value)

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
  const selectRef = useRef(null)
  return (
    <motion.div
      className='pt-4 px-2 max-w-full overflow-x-auto select-none
    max-h-[calc(100vh-4rem)] overflow-y-auto bg-color_light dark:bg-color_dark' ref={constraintsRef}>
      <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NavLink to={"/booking"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              Booking
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
      top-14 bg-white dark:bg-slate-400
      z-[10]
      lg:hidden w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={() => setToggle(true)}>
        <AiOutlineMenu size={25} />
      </motion.div>
      <div className="lg:flex container mx-auto items-start justify-start gap-4">
        <div className="flex-1   mb-6">
          <div className="flex items-start  flex-wrap gap-x-4 gap-y-6 justify-center ">
            <div>
              <Swiper
                className='my-6 px-4 w-full max-w-[calc(100vw-2.5rem)] lg:max-w-lg relative'
                slidesPerView={1}
                onSlideChange={(e) => setctiveSlide(e.activeIndex)}
                modules={[Autoplay, Pagination, Navigation]}
                navigation={{
                  prevEl: ".arrow__left",
                  nextEl: ".arrow__right",
                }}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 25000,
                  disableOnInteraction: false
                }}
              >
                <PrevButton className="!left-1.5" />
                <NextButton className="!right-1.5" />
                {
                  userData?.totalTickets ? <SwiperSlide >
                    <motion.div
                      className={`min-h-[12.5rem]--  relative  text-xs mx-0   rounded-lg `}
                    >

                      <h1 className="text-xl mb-4  text-montserrat font-medium text-center uppercase mt-2">Active to Inactive ticket ratio</h1>
                      {
                        userData?.totalTickets ? <PieChart chartData={_userData} /> : "no data to display cause the query returns 0"
                      }


                    </motion.div>
                  </SwiperSlide>:null
                }

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
                        strokeWidth={8}
                        initialAnimation
                        circleRatio={0.6}
                        className='!w-[10rem] md:!w-[10rem]
                        !max-w-[calc(100%-3rem)] mx-auto !font-black !tracking-tight '
                        styles={{
                          path: {
                            stroke: `transparent`
                          },
                          trail: {
                            stroke: "blue"
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



                    </div>
                  </motion.div>
                </SwiperSlide>


              </Swiper>
            </div>
            {
              isLoading ?
                <PlaceHolderLoader />

                :
                <>
                  <div className='underline  mb-2 underline-offset-8 w-[400px] mx-auto text-center max-w-3xl md:hidden- font-medium text-slate-700 capitalize' onClick={() => setViewAll()} >{viewAll == "all" ? "view less" : "view all"}</div>
                  <Scrollable className={`!px-5 ${viewAll === "one" && "!grid md:!grid-cols-2"} !transition-all !duration-[1s] `}>
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
                  <Scrollable className={`!px-5 ${viewAll === "one" && "!grid md:!grid-cols-2"}`}>
                    <AmountCount
                      className="!bg-blue-400"
                      text="Total coset of all tickets"
                      icon={<MdOutlinePriceChange />}
                      amount={userData?.totalPrice} />
                    <AmountCount
                      className="!bg-green-400"

                      text="Total coset of all active tickets"

                      icon={<BiCategory />} amount={userData?.totalActivePrice} />
                    <AmountCount
                      className="!bg-red-400 !text-black"

                      text="Total coset of all inactive tickets"

                      icon={<BiCategory />} amount={userData?.totalInActivePrice} />
                  </Scrollable>
                </>
            }


          </div>


        </div>
        <div className={`flex-none py-5
        
        sidebarr m lg:rounded-lg shadow rounded-lg  overflow-y-auto--
        ${toggle ? "right-0" : "!-right-full"}
        duration-500 transition-[right] shadow lg:shadow-none lg:max-w-sm lg:w-[20rem] 
        text-center bg-white rounded-sm right-0 top-14 h-fit
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
              <Swiper

                className='my-6 px-4 max-w-sm lg:max-w-lg relative'
                slidesPerView={1}
                // onSlideChange={(e) => setctiveSlide(e.activeIndex)}
                modules={[Autoplay, Pagination, Navigation]}
                navigation={{

                  prevEl: ".arrow__left",
                  nextEl: ".arrow__right",


                }}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false
                }}
              >
                <NextButton className="!right-1.5 !h-8" />
                <PrevButton className="!h-8 !left-1.5" />
                <SwiperSlide>
                  <h1 className='font-semibold mb-2 text-slate-500'>Active  percentage </h1>

                  <CircularProgressbar
                    strokeWidth={10}
                    initialAnimation
                    circleRatio={userData?.percentageActive ? (userData?.percentageActive / 100) : 0}
                    className='!w-[10rem] md:!w-[10rem]
                                    !max-w-[calc(100%-3rem)] mx-auto !font-black '
                    styles={{
                      path: {
                        stroke: `transparent`

                      },
                      trail: {
                        stroke: "blue"
                      },
                    }}
                    text={(userData?.percentageActive || 0).toFixed(1) + "%"}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <h1 className='font-semibold mb-2 text-slate-500'>Inactive ratio percentage </h1>
                  <CircularProgressbar
                    // background
                    strokeWidth={10}
                    initialAnimation
                    circleRatio={userData?.percentageInActive ? (userData?.percentageInActive / 100) : 0}
                    className='!w-[10rem] md:!w-[10rem]
                                    !max-w-[calc(100%-3rem)] mx-auto !font-black  '
                    styles={{
                      path: {
                        stroke: `transparent`
                        // stroke: `${userData?.percentageInActive?"red":"transparent"}`

                      },
                      trail: {
                        stroke: "red"
                      },
                    }}
                    text={(userData?.percentageInActive || 0).toFixed(1) + "%"}
                  />
                </SwiperSlide>

              </Swiper>



              <BoxModel activeCount={userData?.totalActiveTickets}
                inActiveCount={userData?.totalInActiveTickets} />

            </div>

          </div>

        </div>
      </div>

      <div className="flex justify-between
      flex-wrap pr-5 items-start mb-10">
        <h1 className="text-2xl mt-4 
        text-gray-700 pl-6
        
        flex tracking-tight">All tickets <span className="text-xs ring-2 ring-gray-700  grid place-items-center
        ml-1 w-5 h-5 bg-gray-500 text-white
        mb-4 rounded-full border">{userData?.totalTickets || 0} </span> <GrStackOverflow className="inline-block- pl-2 text-4xl hidden md:inline-block" /></h1>

        <div className='mt-0'>
          <div className="text-[0.8rem] text-slate-300 uppercase text-center font-semibold mb-1 font-montserrat"> ticket status</div>
          <Select
            styles={style}
            options={sortOptions}
            defaultValue={{
              label: "All tickets",
              value: "all"
            }}
            ref={selectRef}
            isSearchable={false}
            // key={params.ticketStatus}
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
            Sort Filter is On  </motion.div>
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
                selectRef?.current?.select?.clearValue()
              }}

            >Clear Filter</span>
            Ticket are set to <span className='px-2 bg-red-300 text-black text-xs rounded-lg mx-4 ring-1 ring-red-900'>{params.ticketStatus}</span>  </motion.div>
        }
      </AnimatePresence>

      <Form handleChangeText={handleChangeText} params={params} />

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

            !isLoading && <FormatTable tickets={userData?.tickets}
              currentPage={params.page} />
          }
        </table>
      </div>
      {

        isLoading && (

          <PlaceHolderLoader />

        )
      }
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

    </motion.div>
  )
}

export default Details