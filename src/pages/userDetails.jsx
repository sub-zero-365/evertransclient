import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { GrStackOverflow } from 'react-icons/gr';
import { VscFolderActive } from 'react-icons/vsc'
import Select from 'react-select';
import Select2 from 'react-select';
import { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineSave } from 'react-icons/ai';
import { IoMdClose } from "react-icons/io"
import {  useParams, NavLink } from 'react-router-dom';
// import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { motion } from 'framer-motion';
import {  BsChevronRight, BsChevronLeft } from 'react-icons/bs'
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
import { AmountCount, BarChart, FormatTable, PieChart, Scrollable, TicketCounts } from '../components';
// import { UserData } from "../Assets/userdata";
const Details = () => {
  const [tickets, setTickets] = useState([])
  const [activeTicketCount, setActiveTicketCount] = useState(0);

  const id = useParams().id
  const [filter, setFilter] = useState("null")
  const [data, setData] = useState([12, 26])
  const [userData, setUserData] = useState({
    labels: ["active tickets", "inactive tickets"],
    datasets: [
      {
        label: "ticket data",
        data: data,
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

  const token = localStorage.getItem("admin_token");
  const [isLoading, setIsLoading] = useState(false)

  const [userInfo, setUserInfo] = useState({})
  const config = {
    headers: {
      'Authorization': "makingmoney " + token
    }
  }

  async function getData() {
    setIsLoading(true)
    const url = process.env.REACT_APP_LOCAL_URL + "/admin/alltickets/?" + `createdBy=${id}&createdAt=${filter}`;
    try {
      const res = await axios.get(url, config)
      setTickets(res?.data?.tickets);
      const acttic = res?.data?.tickets.filter((arr) => arr.active).length
      setActiveTicketCount(acttic)
      setData([77, 89])
      setUserData({
        labels: ["active tickets", "inactive tickets"],
        datasets: [
          {
            label: "ticket data",
            data: [acttic,res?.data?.tickets.length-acttic],
            backgroundColor: ["skyblue", "orange"]
          }
        ]})
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }
  const handleOnChange = (evt) => {
    setFilter(evt.value)
  }
  useEffect(() => {
    getData()
  }, [filter]);



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
  const skip = 10;

  // const navigate = useNavigate();
  const [i, setI] = useState(0)
  const [j, setJ] = useState(skip)
  const next_pre = (state, tickets) => {
    if (state === 1) {
      if (!(j > tickets.length - 1)) {
        setI(j)
        setJ(j + skip);
      }
    }
    if (state == -1) {
      if (!((i - skip) < 0)) {
        setI(i - skip);
        setJ(j - skip)
      }
    }

  }


  const [toggle, setToggle] = useState(false)
  const options = [
    { label: "all", value: "null" },
    { label: "today", value: 1 },
    { label: "yesterday", value: 2 },
    { label: "last week", value: 7 },
    { label: "last month", value: 31 },

  ]
  const sortOptions = [
    { label: "Price", value: "price" },
    { label: "fullname", value: "fullname" },
    { label: "sex", value: "sex" },

  ]
  return (
    <div className='pt-4 px-2 max-w-full overflow-x-auto select-none max-h-[calc(100vh-4rem)] overflow-y-auto'>
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
      <div className='hover:bg-slate-300 fixed right-0 md:right-[8rem]
      top-12
      lg:hidden w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={() => setToggle(true)}>
        <AiOutlineMenu size={25} />
      </div>
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
                {[1, 2, 3
                ].map((item, index) => (<SwiperSlide >
                  <motion.div className={`min-h-[12.5rem]-- relative  text-xs mx-0 ${activeSlide == index ? "bg3-orange-500" : "bg-oran3ge-200"}  rounded-lg `}
                    animate={{
                      y: activeSlide == index ? [40, 0] : null, scale: activeSlide == index ? [1, 1.06, 1] : null,
                    }}
                  >

                    <h1 className="text-xl mb-4 text-montserrat font-medium text-center uppercase mt-2">total user {item}</h1>
                    <PieChart chartData={userData} />
                  </motion.div>
                </SwiperSlide>))


                }
              </Swiper>
              <Select2 options={options}
                onChange={handleOnChange}

                className='!border-none !h-8 mt-4' />
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
                <Scrollable>
                  <TicketCounts total counts={tickets.length} icon={<AiOutlineSave />} />
                  <TicketCounts active counts={activeTicketCount} icon={<VscFolderActive />} />
                  <TicketCounts
                    inactive
                    counts={tickets.length - activeTicketCount} icon={<BiCategory />} />
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
                <Scrollable  >
                  <AmountCount
                    className="!bg-blue-400"

                    total icon={<MdOutlinePriceChange />} amount={tickets.length * 6500} />
                  <AmountCount
                    className="!bg-green-400"

                    active icon={<BiCategory />} amount={activeTicketCount * 6500} />
                  <AmountCount

                    className="!bg-red-400 !text-black"

                    inactive icon={<BiCategory />} amount={(tickets.length - activeTicketCount) * 6500} />
                </Scrollable>
              )

            }
          </div>


        </div>
        <div className={`flex-none py-5 sidebarr lg:rounded-lg shadow   ${toggle ? "right-0" : "!-right-full"}
        duration-500 transition-[right] shadow lg:shadow-none lg:max-w-sm lg:w-[20rem] 
        text-center bg-slate-200 rounded-sm right-0 top-12 h-fit
           w-[calc(100vw-3.5rem)] max-w-sm  z-[6] fixed   lg:static px-4 `}>
          <div className='flex justify-between items-start'>
            <span className='w-5 h-5 bg-white rounded-full'></span><span className='w-5 h-5 bg-white rounded-full'></span>
          </div>
          <span className="absolute w-[3.125rem] h-[3.125rem] top-0 
       text-red-700 hover:bg-orange-500 rounded-e-md transition-all lg:hidden duration-500 
       -left-[3.125rem] z-10 rounded-none flex items-center justify-center  font-black border-black"
            onClick={() => setToggle(false)}
          >
            <IoMdClose size={25} />
          </span>
          <div
            className='pb-10 overflow-y-auto lg:max-h-screen'
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

            <div className='grid place-items-center my-5'>
              <CircularProgressbar
                background
                strokeWidth={10}
                initialAnimation
                circleRatio={0.2}
                className='!w-[8rem] '
                styles={{

                  path: {
                    stroke: `rgba(62,154,199,${66 / 100})`

                  },
                  trail: {
                    stroke: "green"
                  },
                }}

                percentage={66} text={"66%"} />
              {/* <Select2 options={options} className='!border-none !h-8 mt-4' /> */}


            </div>

          </div>
          <div className='flex justify-between items-start'>
            <span className='w-5 h-5 bg-white rounded-full'></span><span className='w-5 h-5 bg-white rounded-full'></span>
          </div>
        </div>
      </div>

      <div className="flex justify-between pr-5">
        <h1 className="text-2xl mt-4 mb-6 text-gray-700 pl-6  tracking-tight">All tickets <GrStackOverflow className="inline-block pl-2 text-4xl" /></h1>
        <Select options={sortOptions} className='!border-none !h-8 mt-4' />

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
          {

            !isLoading && <FormatTable tickets={tickets} i={i} j={j} />
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
      <div className="flex mb-10 select-none gap-4">
        <div className={`${i <= 0 ? "opacity-40" : "opacity-100"} w-10 text-lg rounded-lg  h-10 shadow bg-lime-50 hover:bg-slate-300 duration-300 transition-all grid place-items-center `} onClick={() => next_pre(-1, tickets)}>
          <BsChevronLeft className='text-black  font-black' />

        </div>
        <div className={`${j >= tickets.length ? "opacity-40" : "opacity-100"} w-10 text-lg rounded-lg  h-10 shadow bg-lime-50 hover:bg-slate-300 duration-300 transition-all grid place-items-center `} onClick={() => {
          next_pre(1, tickets)
        }}>
          <BsChevronRight className='text-black  font-black' />

        </div>


      </div>


    </div>
  )
}

export default Details