import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { BsFillPersonFill } from 'react-icons/bs';
import { GrStackOverflow } from 'react-icons/gr';
import {VscFolderActive} from 'react-icons/vsc'
import Select from 'react-select';
import Select2 from 'react-select';
import { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineSave } from 'react-icons/ai';
import { IoMdClose } from "react-icons/io"
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { motion } from 'framer-motion';
import { BsTicketPerforated, BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import axios from 'axios'
import { BiCategory } from 'react-icons/bi'
import { Swiper, SwiperSlide } from 'swiper/react'
import {MdOutlinePriceChange} from 'react-icons/md'
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
const Details = () => {
  const id = useParams().id
  const [activeSlide, setctiveSlide] = useState(0);

  const token = localStorage.getItem("admin_token");
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTicketCount, setActiveTicketCount] = useState(0);
  useEffect(() => {

    async function getData() {
      const url = process.env.REACT_APP_LOCAL_URL + "/admin/alltickets/?" + `createdBy=${id}`;
      try {
        const res = await axios.get(url, {
          headers: {
            'Authorization': "makingmoney " + token
          }
        })
        setTickets(res?.data?.tickets);
        const acttic = res?.data?.tickets.filter((arr) => arr.active).length
        setActiveTicketCount(acttic)
        // console.log(res?.data?.tickets)
      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
    }
    getData()
  }, [window.location.href])
  const skip = 10;

  const navigate = useNavigate();
  const [i, setI] = useState(0)
  const [j, setJ] = useState(skip)
  const next_pre = (state) => {
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
  const drawTab = () => {

    return (
      <>
        <motion.tbody
          key={j}
          initial={{ x: 100, opacity: 0.1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}

        >
          {
            tickets.slice(i, j).map((ticket, index) => (<tr key={index} className={` ${index % 2 == 0 ? "bg-slate-100" : "bg-white"} hover:bg-slate-300  text-xs dark:bg-gray-900 dark:border-gray-700`}
            >
              <td className="px-2 py-4  flex items-center justify-center">
                {index + 1}
              </td>
              <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {ticket?.fullname || "n/a"}
              </th>
              <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {ticket?.phone || "n/a"}
              </th>
              <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {ticket?.price || " 5000frs"}
              </th>
              <td className="px-3 py-4">
                <span className="font-medium
                                    ">{ticket?.from || " n/a"}</span>

              </td>
              <td className="px-3 py-2">
                <span className="font-medium ">{ticket?.to || "n/a"}</span>
              </td>
              <td className="px-3 py-2">
                {ticket?.traveldate ?
                  (new Date(ticket.traveldate).toLocaleDateString()) : "n/a"}

              </td>
              <td className="px-3 py-2">
                {ticket?.traveltime
                  || "n/a"}

              </td>
              <td className="px-3 py-4  grid place-items-center">
                {ticket?.active ?
                  <span className='w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span>
                  :
                  <span className='w-6 h-6  bg-red-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineClose /></span>

                }

              </td>

              <td className="px-3 py-4">
                {ticket?.age || "n/a"}

              </td>
              <td className="px-3 py-4">
                {ticket?.sex || "n/a"}

              </td>
              <td className="py-0 text-xs" onClick={() => navigate(`/dashboard/${ticket?._id || index}?admin=true`)}>
                <span className="font-medium grid bg-green-400 pr-2 py-1 mx-1 rounded-lg text-white place-items-center  hover:underline">details</span>
              </td>
            </tr>
            ))
          }

        </motion.tbody>
      </>
    )


  }

  const dashitemdata = [
    {
      Name: "Employees",
      Counts: 15,
      href: "users",

    },
    {
      Name: "Tickets",
      Counts: 15,
      href: "tickets",
      icon: <BsTicketPerforated className='text-3xl' />
    }
  ]
  const [toggle, setToggle] = useState(false)
  const options = [
    { label: "all", value: "all" },
    { label: "today", value: "today" },
    { label: "yesterday", value: "last" },
    { label: "last week", value: "la" },

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
                    <CircularProgressbar
                      background
                      strokeWidth={8}
                      initialAnimation
                      circleRatio={0.6}
                      className='!w-[18.5rem] !max-w-[calc(100vw-3rem)] mx-auto'
                      styles={{

                        path: {
                          stroke: `rgba(62,154,199,${66 / 100})`

                        },
                        trail: {
                          stroke: "green"
                        },
                      }}

                      percentage={66} text={"66%"} />


                  </motion.div>
                </SwiperSlide>))


                }
              </Swiper>
              {/* iohiohaiosdhfiohsad */}

              <Select2 options={options} className='!border-none !h-8 mt-4' />


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
                <div className='flex flex-nowrap overflow-x-auto lg:flex-nowrap  gap-x-4 md:gap-x-2 '>
                  <div
                    className="shadow-lg shadow-slate-300 flex-none  mt-4
    flex relative group bg-white py-6 mb-6   overflow-hidden  px-8 rounded-xl">
                    <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
                    <div className="w-10 h-10 rounded-full
   grid place-content-center
   bg-blue-300 hover:bg-blue-200  overflow-hidden">
                      <AiOutlineSave />
                    </div>
                    <div className="ml-2">
                      <h1 className="font-semibold  text-lg leading-none mb-1">{tickets.length}</h1>
                      <p className='text-sm font-montserrat text-gray-500 font-medium '>Total Tickekts</p>
                    </div>
                  </div>
                  <div
                    className="shadow-lg shadow-slate-300 flex-none  mt-4
    flex relative group bg-white py-6 mb-6   overflow-hidden  px-8 rounded-xl">
                    <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
                    <div className="w-10 h-10 rounded-full
   grid place-content-center
   bg-green-300 hover:bg-green-200  overflow-hidden">
                      <VscFolderActive />
                    </div>
                    <div className="ml-2">
                      <h1 className="font-semibold  text-lg leading-none mb-1">{activeTicketCount}</h1>
                      <p className='text-sm font-montserrat text-gray-500 font-medium '>Active Tickets</p>
                    </div>
                  </div>
                  <div
                    className="shadow-lg shadow-slate-300 flex-none  mt-4
    flex relative group bg-white py-6 mb-6   overflow-hidden  px-8 rounded-xl">
                    <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
                    <div className="w-10 h-10 rounded-full
   grid place-content-center
   bg-red-300 hover:bg-red-200  overflow-hidden">
                      <BiCategory />
                    </div>
                    <div className="ml-2">
                      <h1 className="font-semibold  text-lg leading-none mb-1">{tickets.length - activeTicketCount}</h1>
                      <p className='text-sm font-montserrat text-gray-500 font-medium '>InActive Tickets</p>
                    </div>
                  </div>
                </div>

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
                <div className='flex flex-nowrap overflow-x-auto lg:flex-nowrap  gap-x-4 md:gap-x-2 '>
                  <div
                    className="shadow-none shadow-slate-500 flex-none  mt-4
    flex relative group bg-slate-800 text-white py-3 mb-6 flex-col gap-y-2
    overflow-hidden  px-8 rounded-none">
                    <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
                    <div className="w-12 h-12 rounded-full
   grid place-content-center
   bg-orange-300 hover:bg-orange-200  mx-auto  overflow-hidden">
                      <MdOutlinePriceChange />
                    </div>
                    <div className="ml-2">
                      <p className='text-sm font-montserrat text-white font-medium mb-2'>Total Cost of All Tickets</p>
                      <h1 className="font-semibold  text-lg leading-none mb-1">{tickets.length * 6500} <sup className='text-blue-400'>frs</sup> </h1>
                    </div>
                  </div>
                  <div
                    className="shadow-none shadow-slate-500 flex-none  mt-4
    flex relative group bg-blue-800 text-white py-3 mb-6 flex-col gap-y-2
    overflow-hidden  px-8 rounded-none">
                    <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
                    <div className="w-12 h-12 rounded-full
   grid place-content-center
   bg-purple-300 hover:bg-purple-200  mx-auto  overflow-hidden">
                      <BiCategory />
                    </div>
                    <div className="ml-2">
                      <p className='text-sm font-montserrat text-white font-medium mb-2'>Total Cost of Active Tickets</p>
                      <h1 className="font-semibold  text-lg leading-none mb-1">{activeTicketCount * 6500} <sup className='text-blue-400'>frs</sup> </h1>
                    </div>
                  </div>
                  <div
                    className="shadow-none shadow-slate-500 flex-none  mt-4
    flex relative group bg-orange-300 text-black py-3 mb-6 flex-col gap-y-2
    overflow-hidden  px-8 rounded-none">
                    <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
                    <div className="w-12 h-12 rounded-full
   grid place-content-center
   bg-green-300 hover:bg-green-200  mx-auto  overflow-hidden">
                      <BiCategory />
                    </div>
                    <div className="ml-2">
                      <p className='text-sm font-montserrat text-white- font-medium mb-2'>Total Cost of InActive Tickets</p>
                      <h1 className="font-semibold  text-lg leading-none mb-1">{(tickets.length - activeTicketCount) * 6500} <sup className='text-blue-400'>frs</sup> </h1>
                    </div>
                  </div>

                </div>

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
            <h4 className='text-sm text-slate-500 font-medium '>Ako Bate Emmanuel</h4>

            <h1 className='text-lg  font-medium leading-6 mb-1'>Employee Id:</h1>
            <h4 className='text-sm text-slate-500 font-medium '>2uy4yyt7873</h4>

            <h1 className='text-lg  font-medium leading-6 mb-1'>Phone Number:<span className="px-2 text-white mb-4 rounded-xl text-xs bg-green-400 ml-1">call</span></h1>
            <h4 className='text-sm text-slate-500 font-medium '>12345678</h4>
            <h1 className='text-lg  font-medium leading-6 mb-1'>ID Card N-o: <span className="px-2 text-white mb-4 rounded-xl text-xs bg-green-400 hidden">new</span></h1>
            <h4 className='text-sm text-slate-500 font-medium '>1234567</h4>
            <h1 className='text-lg  font-medium leading-6 mb-1'>Account created At: <span className="px-2 text-white mb-4 rounded-xl text-xs bg-green-400">new</span></h1>
            <h4 className='text-sm text-slate-500 font-medium '>12/12/29</h4>

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
        <Select options={options} className='!border-none !h-8 mt-4' />

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

            !isLoading && drawTab()
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
        <div className={`${i <= 0 ? "opacity-40" : "opacity-100"} w-10 text-lg rounded-lg  h-10 shadow bg-lime-50 hover:bg-slate-300 duration-300 transition-all grid place-items-center `} onClick={() => next_pre(-1)}>
          <BsChevronLeft className='text-black  font-black' />

        </div>
        <div className={`${j >= tickets.length ? "opacity-40" : "opacity-100"} w-10 text-lg rounded-lg  h-10 shadow bg-lime-50 hover:bg-slate-300 duration-300 transition-all grid place-items-center `} onClick={() => {
          next_pre(1)
        }}>
          <BsChevronRight className='text-black  font-black' />

        </div>


      </div>


    </div>
  )
}

export default Details