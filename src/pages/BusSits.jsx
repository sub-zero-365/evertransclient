import { useState, useEffect } from "react"
import { Modal, DisplayUi, DateUi, PrevButton, NextButton, Heading } from "../components"
import { useLoaderData, useNavigate } from "react-router-dom"
import { NavLink, useSearchParams, useParams, Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { TbArmchair2, TbArmchairOff } from 'react-icons/tb'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Scrollbar,
  Pagination,
  Navigation,

} from 'swiper/modules'
import Alert from "../components/Alert"
import { Helmet } from 'react-helmet'
import axios from 'axios'
import GenderSelect from 'react-select'
import Marquee from 'react-fast-marquee'
import AnimateText from '../components/AnimateText'
import PaymentType from 'react-select'
// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/pagination"
// import "swiper/css/autoplay"
// import "swiper/css/a11y"
// import "swiper/css/scrollbar"
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
import formatQuery from "../utils/formatQueryStringParams"
import { paymentOptions } from '../utils/sortedOptions'
// import Loader from '../components/Load'
import customFetch from "../utils/customFetch"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import UiButton from "../components/UiButton"
import { RiSteering2Line } from "react-icons/ri"
// import CustomerPage from "./CustomerPage"
const singleSeat = (id) => {
  return ({
    queryKey: ["seat", id],
    queryFn: async () => {
      const res = await customFetch.get("/seat/specific/" + id, {

      })
      return res.data
    }
  })
}
const errorToast = (msg = "Please select a seat and continue !!!") => toast.warning(msg)

export const loader = (queryClient) => async ({ params }) => {
  const id = params.id;
  console.log("seat id here", id)
  await queryClient.ensureQueryData(singleSeat(id))
  return id

}

const
  BusSits = () => {
    const [queryParameters] = useSearchParams()

    const id = useLoaderData()

    const { seat } = useQuery(singleSeat(id)).data;
    const avalaibleseats = seat?.seat_positions?.filter(({ isTaken, isReserved }) => (isTaken == true || isReserved == true))?.length

    const [userInfo, setUserInfo] = useState({
      ...formatQuery(queryParameters.toString()),
      gender: (formatQuery(queryParameters.toString()).gender || "male"),
      type: (formatQuery(queryParameters.toString()).type || "singletrip"),
    })
    console.log(userInfo)

    const navigate = useNavigate()
    const [selected, setSelected] = useState(queryParameters.get("seatposition"))
    const [shouldAnimate, setShoultAnimate] = useState(true)
    const checkBusAvailabity = (isTaken, isReserved, id, flag = null) => {
      // if (flag) setFlag("classic")
      if (0 == id && isTaken == false && isReserved == false) {
        setSelected(0)
        return
      }
      if (isTaken == true || isReserved == true) {
        errorToast()
        return
      } else {
        setSelected(id)

        return
      }
    }
    const proccedCheckout = (e) => {
      e.preventDefault()
      if (selected === 0) {
        gotoCheckOut()
        return
      }
      if (!selected) {
        errorToast()
        return
      }
      gotoCheckOut()
    }
    const gotoCheckOut = () =>
      navigate(`/information?seatposition=${selected}&fullname=${userInfo.fullname}&age=${userInfo.age}&sex=${userInfo.gender}&phone=${userInfo.phone}&email=${userInfo.email}&from=${userInfo.from}&to=${userInfo.to}&traveldate=${userInfo.traveldate}&traveltime=${userInfo.traveltime}&type=${userInfo.type}&seat_id=${id}&paymenttype=${(userInfo?.paymenttype ?? "Cash In")}`)

    return (
      <>
        <Helmet>
          <title>
            Bus Seat
          </title>
        </Helmet>
        <div
          className="min-h-screen"
        >

          <div className="flex container mx-auto">
            <div className="flex-1 hidden lg:block max-h-[calc(100vh-60px)]">
              <img src="https://img.freepik.com/free-vector/turn-people-transport-flat-illustration_1284-58398.jpg?size=626&ext=jpg&ga=GA1.2.848633073.1641348984&semt=ais" alt="bus " className="h-full w-full object-cover" />

            </div>
            <div className="flex-none cal-width mx-auto shadow-lg mt-6 py-6 pt-0 pb-20 max-h-[calc(100vh-60px)] overflow-y-auto"
              style={{ "--w": "500px" }}>
              <nav className="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <NavLink to={"/"} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                      Home
                    </NavLink>
                  </li>
                  <li className="inline-flex items-center">
                    <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <NavLink to={"/bus?" + queryParameters?.toString()} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                      FindBus
                    </NavLink>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                      <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                        <h1 className="text-slate-400  font-medium text-xl ">Checkout</h1>
                      </a>
                    </div>
                  </li>

                </ol>
              </nav>
              <DisplayUi from={queryParameters.get("from")} to={queryParameters.get("to")} />
              <DateUi
                date={queryParameters.get("traveldate")}
                time={queryParameters.get("traveltime")} />
              <AnimateText text="Please Select Seat"
                className={"!text-lg md:!text-lg lg:!text-2xl !text-center"} />
              <div className="flex justify-between px-6 pb-2">
                <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                  <span className="w-[10px] mr-1 h-[10px] inline-block bg-green-400 rounded-full "></span>Available</h1>
                <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                  <span className="w-[10px] mr-1 h-[10px] inline-block bg-blue-400 rounded-full "></span>Rerservation
                </h1>
                <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                  <span className="w-[10px] mr-1 h-[10px] inline-block bg-orange-400 rounded-full "></span>
                  Not Available
                </h1>
              </div>
              <div className="grid grid-cols-2 mb-2 px-5">
                <Heading text={"Capacity"} className="!mb-0 !text-sm !font-semibold" />
                <Heading text={"Seat Consumed"} className="!mb-0 !text-sm !font-semibold" />
                <Heading text={seat?.number_of_seats} className="!mb-0 !text-sm" />
                <Heading text={avalaibleseats} className="!mb-0 !text-sm" />
              </div>
              <Swiper
                className="relative"
                modules={[Pagination, Navigation]}
                pagination={{
                  clickable: true
                }}

                navigation={{
                  prevEl: ".arrow__left",
                  nextEl: ".arrow__right",
                }}
              >
                <SwiperSlide className="group--">
                  <motion.div className="flex flex-wrap py-4 transition-transform duration-700 ">
                    <div className="w-2/4 p-4">
                      <div className="bg-red-400-  w-fit  mx-auto ">

                        <RiSteering2Line
                          size={50}
                        />
                        <h1>Driver Seat</h1>

                      </div>
                    </div>
                    {
                      seat?.seat_positions?.map(({ isTaken, isReserved, _id }, i) => {
                        return (
                          <div className="w-1/4 group
                          cursor-pointer hover:bg-green-950- transition duration-300 
                          h-[3.75rem] p-2 px-3 select-none"
                            key={_id}
                          >
                            <motion.div
                              animate={{ scale: selected == _id ? [0.8, 1, 0.9] : null }}
                              onClick={() => checkBusAvailabity(isTaken, isReserved, _id, true)}
                              initial={false}
                              transition={{
                                duration: 1,
                                ease: "easeInOut",
                                repeat: Infinity,
                              }
                              }
                              className={`${(isTaken) ? "bg-orange-400 group-hover:bg-orange-800" : isReserved ? "!bg-blue-500 group-hover:bg-blue-800" : "bg-green-500 group-hover:bg-green-800"} peer
                ${selected == _id ? "border-2 border-black dark:border-white gold:border-color_gold/50" : ""} transition duration-200  group w-full h-full  relative max-w-[4.5rem] mx-auto
                rounded-lg flex items-center justify-center`}>
                              <motion.div
                                initial={false}
                                animate={{ y: selected == _id ? "1.3rem" : 0 }}
                                className={`absolute group-hover:!translate-y-[1.3rem] transition-all duration-300 top-[-10px] bg-color_light text-[12px] dark:bg-color_dark gold:bg-color_gold  shadow-lg
                px-2 rounded-sm `}>{_id + 1}</motion.div>
                              {isTaken ? (<div><TbArmchairOff size={30} /></div>) : <div><TbArmchair2 size={30} /></div>}
                            </motion.div>
                          </div>
                        )
                      })
                    }
                  </motion.div>
                </SwiperSlide>


              </Swiper>
              <motion.div
                className="my-5"
                onTouchStart={() => setShoultAnimate(false)}
                onTouchEnd={() => setShoultAnimate(true)}
                onMouseEnter={() => setShoultAnimate(false)}
                onMouseLeave={() => setShoultAnimate(true)}
                animate={{ scale: shouldAnimate ? [0.8, 1, 0.9] : null }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <UiButton
                  onClick={() => {
                    if (selected == 0 || selected != null) {
                      navigate(`/customer?seatposition=${selected}&seat_id=${id}&${queryParameters.toString()}`)
                      return
                    }
                    errorToast()
                  }}
                  className="!w-[min(30rem,calc(100%-0.5rem))] 
                  !ring-4
                  ring-blue-300 !mx-auto !py-3.5 !text-lg 
                  !font-medium
                  !font-bricolage
                  gold:ring-color_gold
                  !rounded-xl
                  
                  gold:text-color_gold"
                >
                  Continue as Customer
                </UiButton>
              </motion.div>
              <form onSubmit={proccedCheckout} className="md:px-3">
                <Marquee play pauseOnClick pauseOnHover
                  className="capitalize text-red-500 dark:text-red-500 py-2  mb-4 text-sm
                  font-extrabold leading-none  px-5 text-gray-900- md:text-lg lg:text-xl dark:text-white- max-w-5xl">
                  please  take your time to fill in the information
                </Marquee>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    defaultValue={userInfo.fullname}
                    value={decodeURIComponent((userInfo.fullname || ""))}
                    onChange={e => setUserInfo({ ...userInfo, fullname: e.target.value })}
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
                    id="fullname"
                    placeholder="Full Names" required />
                  <label
                    htmlFor="fullname"
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
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                  >
                    Full Names
                  </label>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input


                    value={userInfo.phone}

                    onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })}
                    type="tel"
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
                    id="phonenumber"
                    placeholder="Phone number" required />
                  <label
                    htmlFor="phonenumber"
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
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                  >
                    Phone Number
                  </label>
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input

                    value={userInfo.email}
                    onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
                    type="number"
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
                    id="exampleFormControlInput3"
                    placeholder="Id Card N0" required />
                  <label
                    htmlFor="exampleFormControlInput3"
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
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                  >

                    Id Card N0
                  </label>
                </div>
                <div className="mb-6 flex items-center justify-between select-none ">
                  <div className="mb-[0.125rem] pb-0
                                block min-h-[50px]  border-2 mr-4  relative pl-[1.5rem] flex-1">
                    <span className="absolute left-[15px] px-2
                                    rounded-sm h-[30px] bg-color_light
                                dark:bg-color_dark top-[-15px]">
                      user gender
                    </span>
                    <div className="z-[100] max-w-[14rem]">
                      <GenderSelect
                        onChange={e => {
                          setUserInfo({ ...userInfo, gender: e.value })
                          console.log(e.value)

                        }}
                        isSearchable={false}

                        defaultValue={{
                          label: "male",
                          value: "male"
                        }}
                        required
                        menuPlacement="top"
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        styles={{
                          control: base => ({
                            ...base,
                            border: 0,
                            borderBottom: "0px solid black",
                            boxShadow: "none",
                            background: "transparent",
                            color: "red",
                            borderRadius: 0,
                            fontSize: 1 + "rem",
                            zIndex: 1000
                          }
                          )

                        }}
                        options={
                          [
                            {
                              label: "male",
                              value: "male"
                            },
                            {
                              label: "female",
                              value: "female"
                            }

                          ]
                        }
                      />


                    </div>

                  </div>
                  <div className="mb-[0.125rem] pb-0
                                block min-h-[50px]  border-2 mr-4  relative pl-[1.5rem] flex-1">
                    <span className="absolute left-[15px] px-2
                                    rounded-sm h-[30px] bg-color_light
                                dark:bg-color_dark top-[-15px]">
                      Payment type
                    </span>
                    <div className="z-[100] max-w-[14rem]">
                      <PaymentType
                        onChange={e => {
                          setUserInfo({ ...userInfo, paymenttype: e.value })
                          console.log(e.value)

                        }}
                        defaultValue={{
                          label: "Cash In",
                          value: "Cash In"
                        }}
                        isSearchable={false}
                        required
                        menuPlacement="top"
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        styles={{
                          control: base => ({
                            ...base,
                            border: 0,
                            borderBottom: "0px solid black",
                            boxShadow: "none",
                            background: "transparent",
                            color: "red",
                            borderRadius: 0,
                            fontSize: 1 + "rem",
                            zIndex: 1000
                          }
                          )

                        }}
                        options={
                          paymentOptions
                        }
                      />


                    </div>

                  </div>


                </div>
                <UiButton
                  className="!w-[min(30rem,calc(100%-1.5rem))]  hidden md:block !mx-auto !py-3.5 !text-lg !rounded-xl"
                >
                  CHECKOUT
                </UiButton>

                <div className="md:hidden  h-[2.7rem] flex left-0 
                            items-center justify-center mt-5 fixed z-20 bottom-8 w-full">
                  <UiButton
                    className="!w-[min(30rem,calc(100%-1.5rem))]  !mx-auto !py-3.5 !text-lg !rounded-xl"
                  >
                    CHECKOUT
                  </UiButton>

                </div>

              </form>



            </div>        </div >
        </div >
      </>
    )
  }

export default BusSits