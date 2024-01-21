import {
  useQuery
} from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineSave, AiOutlineSetting } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { IoMdClose } from "react-icons/io";
import { MdOutlinePriceChange } from 'react-icons/md';
import { VscFolderActive } from 'react-icons/vsc';
import { NavLink, redirect, useLoaderData, useSearchParams } from 'react-router-dom';
import { default as Select, default as SelectSortDate, default as SelectTrip } from 'react-select';
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  AmountCount,
  Form,
  FormatTable,
  Heading,
  Loadingbtn,
  NextButton,
  PercentageBar,
  PlaceHolderLoader,
  PrevButton,
  Scrollable, TicketCounts,
  ToggleSwitch
} from '../components';
import dateFormater from "../utils/DateFormater";
import customFetch from "../utils/customFetch";
import { sortTicketStatusOptions, sortedDateOptions } from "../utils/sortedOptions";
import RestrictUser from '../components/RestrictUser';
const singleUserQuery = (id) => {
  return ({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await customFetch.get("/ticket?createdBy=" + id)
      return res.data
    }
  })
}

export const loader = (queryClient) => async ({ params: P, request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {

    await queryClient.ensureQueryData(singleUserQuery(P.id))
    return ({
      id: P.id,
      searchValues: params
    })
  } catch (error) {
    toast.error(error?.response?.data || error?.message || "something went wrong")
    return redirect("/dashboard/users");
  }
}

const Details = () => {
  const { id, searchValues } = useLoaderData()
  const userData = useQuery(singleUserQuery(id)).data || {}
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
  // const [currentUser, setCurrentUser] = useState({})
  const currentUser = useQuery({
    // queries: [
    // {
    queryKey: ["current-user", id], queryFn: async () => {
      try {
        const { data } = await customFetch.get("users/current-user/" + id);
        // console.log(data)
        return data?.user || {}
      } catch (err) {
        console.log("this is the error here", err)

      }
    },
    staleTime: Infinity
    // }
    // ]
  })?.data
  const [isUserBlock,
    setIsUserBlock] = useState(true
    )

  const { refetch, isLoading } = useQuery({
    // queries: [
    // {
    queryKey: ["current-user-status", id], queryFn: async () => {
      try {
        await customFetch.get("/restricted/" + id);
        // console.log(data)
        setIsUserBlock(true)

      } catch (err) {
        setIsUserBlock(false)
        console.log("this is the error here", err)

      }
    },

  })
  const { refetch: AddRestrictedUser, isFetching: addFetching } = useQuery({
    // queries: [
    // {
    queryKey: ["addrestricteduser", id], queryFn: async () => {
      try {
        await customFetch.post("/restricted", {
          user_id: id
        });

      } catch (err) {
        // setIsUserBlock(false)
        console.log("this is the error here", err)

      } finally {
        refetch()
      }
    },
    // staleTime: Infinity,
    enabled: false
    // }
    // ]
  })
  const { refetch: removeRestrictedUser, isFetching: rmFetching } = useQuery({
    // queries: [
    // {
    queryKey: ["rmrestricteduser", id], queryFn: async () => {
      try {
        await customFetch.delete("/restricted/" + id, {});
        // console.log(data)
        // setIsUserBlock(true)

      } catch (err) {
        // setIsUserBlock(false)/
        console.log("this is the error here", err)

      }
      finally {
        refetch()
      }
    },
    enabled: false
    // staleTime: Infinity
    // }
    // ]
  })
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const constraintsRef = useRef(null)
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

  const viewAll = querySearch.get("view");


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

  const handleSortTime = (evt) => {
    if (querySearch.get("sort") == evt.value) return
    handleFilterChange("sort", evt.value)
  }
  const handleChange = (evt) => {
    if (querySearch.get("ticketStatus") == evt.value) return
    handleFilterChange("ticketStatus", evt.value)
  }



  // const userData = {}






  const [toggle, setToggle] = useState(false);

  const selectRef = useRef(null)
  return (
    <motion.div
      className='pt-4 px-2 max-w-full overflow-x-auto select-none container mx-auto
    max-h-[calc(100vh-4rem)] overflow-y-auto bg-color_light dark:bg-color_dark' ref={constraintsRef}>
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
      <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NavLink to={"/dashboard/users"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              Users
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
      <div className="lg:flex items-start justify-start gap-4">
        <div className="flex-1   mb-6">
          <div className="flex items-start  flex-wrap gap-x-4 gap-y-6 justify-center ">

            <Scrollable className={`!mb-10 !justify-center ${viewAll && "!grid md:!grid-cols-2 gap-y-5"} !transition-all !duration-[1s]`}>
              <PercentageBar
                className={`${viewAll && "!min-w-[8rem]"}`}
                percent={userData?.percentageActive} text="Active Ticket Ratio" />
              <PercentageBar
                className={`${viewAll && "!min-w-[8rem]"}`}
                stroke="red"
                percent={userData?.percentageInActive} text="InActive Ticket Ratio" />
            </Scrollable>
            {
              false ?
                <PlaceHolderLoader />

                :
                <>
                  <div className='underline  mb-2 underline-offset-8 w-[400px] mx-auto text-center max-w-3xl md:hidden- font-medium text-slate-700 capitalize' onClick={() => {

                    if (querySearch.get("view")) {
                      handleFilterChange("view")
                    } else {
                      handleFilterChange("view", "all")
                    }

                  }} >{viewAll == "all" ? "view less" : "view all"}</div>
                  <Scrollable className={`!px-5 ${viewAll && "!grid md:!grid-cols-2"} !transition-all !duration-[1s] `}>
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
                  <Scrollable className={`!px-5 ${viewAll && "!grid md:!grid-cols-2"}`}>
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
        duration-500 transition-[right] shadow lg:shadow-none lg:max-w-sm lg:w-[22rem] 
        text-center bg-white dark:bg-slate-800 rounded-sm right-0 top-12 h-fit
           w-[calc(100vw-3.5rem)] max-w-sm  z-20 fixed   lg:static px-4 `}>
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
            {querySearch.get("account_block") && "account restricted"}
            <Heading text={"Employee Details"} className="!font-semibold !mb-5 underline underline-offset-4  !text-lg first-letter:text-2xl" />
            <Heading text={"Full Name"} className="!font-semibold !mb-0 !text-lg first-letter:text-2xl" />
            <h4 className='text-sm text-slate-500 font-medium '
            >{currentUser?.fullname || "n/a"}</h4>

            <Heading text={"Phone Number"} className="!font-semibold !mb-0 !text-lg first-letter:text-2xl" />
            <h4 className='text-sm text-slate-500 font-medium '>{currentUser?.phone || "n/a"}</h4>
            <Heading text={"Created At"} className="!font-semibold !mb-0 !text-lg first-letter:text-2xl" />
            <h4 className='text-sm text-slate-500 font-medium '>{currentUser?.createdAt && (dateFormater().date) || "n/a"}</h4>
            {/* <ToggleSwitch
              onChange={() => {
                if (isUserBlock) {
                  removeRestrictedUser()
                  // refetch()
                } else {
                  AddRestrictedUser()
                }

              }}
              message={"User is block from printing tickets"}
              initialMessage={"user is block from priinting tickets"}
              state={isUserBlock}
              disabled={(addFetching || rmFetching)}
            /> */}
            <RestrictUser
              id={id} />
            <Swiper
              className='my-6
                            px-4 
                            w-full
                            lg:w-full 
                            !relative'
              slidesPerView={1}
              modules={[Autoplay, Navigation]}
              navigation={{
                prevEl: ".arrow__left",
                nextEl: ".arrow__right",
              }}
            >
              <PrevButton className="!left-1.5" />
              <NextButton className="!right-1.5" />

              <SwiperSlide>
                <Heading text={"Query  Travel At"} className="!font-black !text-sm underline !underline-offset-4 !mb-2 !text-center" />

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
                      {false ? <Loadingbtn toggle /> : "Filter Tickets"}
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
                  </motion.div>
                </AnimatePresence>

              </SwiperSlide>
              <SwiperSlide>
                <Heading text={"Query  Created At"}
                  className="!font-black !text-sm underline !underline-offset-4 !mb-2 !text-center" />

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
                      {false ? <Loadingbtn toggle /> : "Filter Tickets"}
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
                  </motion.div>
                </AnimatePresence>

              </SwiperSlide>

            </Swiper>





          </div>

        </div>
      </div>

      <div className="flex justify-between gap-4 ppl-4
      flex-wrap pr-5 items-start mb-10">
        <h1 className="text-2xl mt-4 
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
            ref={selectRef}
            isSearchable={false}
            onChange={handleChange}
            className='!border-none !h-8 mt-0' />
        </div>

        <div className='mt-0'>
          <div className="text-[0.8rem]
          text-slate-300 uppercase
          text-center font-semibold mb-1 font-montserrat"> trip type </div>
          <SelectTrip
            onChange={
              evt => {
                if (querySearch.get("triptype") == evt.value) return
                // if (params.evt == evt.value) return
                handleFilterChange("triptype", evt.value)
                // setParams(pre => {
                //   return {
                //     ...pre,
                //     triptype: evt.value,
                //     page: 1
                //   }
                // })


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
              label: "all trip",
              value: "all"
            }}

            isSearchable={false}
            // onChange={handleSortTime}
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


      </div>
      <AnimatePresence >

        {
          querySearch.get("daterange") && <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-xs
            tracking-tighter
        font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

            <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
              onClick={() => {
                handleFilterChange("daterange")
              }}

            >Clear Filter</span>
            Date filter is on and query is from <span> {new Date(startDate).toLocaleDateString()}</span>
            <span> {endDate !== null ? "to " + new Date(endDate).toLocaleDateString() : null}</span> </motion.div>
        }
        {
          querySearch.get("search") && <motion.div

            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}

            className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
        font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

            <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
              onClick={() => {
                handleFilterChange("search")
                // const temp = params;
                // if (temp.search) delete temp.search;
                // setParams({ ...temp })

              }}

            >Clear Filter</span>
            Text Filter is On  </motion.div>
        }
        {
          querySearch.get("sort") && querySearch.get("sort") !== "newest" && <motion.div

            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}

            className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
        font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>
            <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
              onClick={() => {
                handleFilterChange("sort")
              }}

            >Clear Filter</span>
            Text Filter is On  </motion.div>
        }
        {
          querySearch.get("ticketStatus") && querySearch.get("ticketStatus") !== "all" && <motion.div

            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}

            className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
        font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

            <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
              onClick={() => {
                handleFilterChange("ticketStatus")
              }}

            >Clear Filter</span>
            Ticket are set to <span className='px-2 bg-red-300 text-black text-xs rounded-lg mx-4 ring-1 ring-red-900'>{querySearch.get("ticketStatus")}</span> Filter is On  </motion.div>
        }
      </AnimatePresence>

      <Form handleChangeText={handleChangeText} params={querySearch} />


      {

        !false && <FormatTable
          isPreviousData={false}
          ticketData={userData}
          admin


        />
      }

      {
        false && (
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
  )
}

export default Details