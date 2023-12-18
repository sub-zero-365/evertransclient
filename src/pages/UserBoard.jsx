import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
// import TimeSelect from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AnimateText from '../components/AnimateText'
import { onErrorToast, onSuccessToast } from '../utils/toastpopup'


import { useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiBusSchool } from 'react-icons/bi'
import { MdFastfood, MdOutlineForwardToInbox, MdQueryStats } from 'react-icons/md'
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams
} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import dateFormater from "../utils/DateFormater"

import { toast } from 'react-toastify'
import UiButton from '../components/UiButton'

import {
  CustomDatePicker,
  // AmountCount,
  // FormatTable,
  Heading,
  Loadingbtn
} from '../components'
import { useUserLayoutContext } from "../components/UserLayout"

import {
  useMutation, useQueryClient
} from '@tanstack/react-query'
import dayjs from "dayjs"
import { Helmet } from 'react-helmet'
import { CiLogout } from 'react-icons/ci'
import InputBox from '../components/InputBox'
import { useFilter } from '../Hooks/FilterHooks'
import customFetch from '../utils/customFetch'
import ShowBuses from './ShowBuses'
import getdates from '../utils/getdates'
import useGetdates from '../utils/getdates'

// import { CiLogout } from 'react-icons/ci'
const seats = []

const style = {
  control: (base, state) => {
    // console.log(state.isFocused)
    return ({
      ...base,
      boxShadow: "none",
      backgroundColor: "transparent",
      borderRadius: 0,
      fontSize: 1 + "rem",
      cursor: "pointer",
      // backgroundColor: state.isSelected ? "red" : "green"
    }
    )
  }


}


const Details = () => {
  const constraintsRef = useRef(null);
  // const [active, setActive] = useState(false)
  const { logoutUser } = useUserLayoutContext()
  const location = useLocation()
  const isInUserPage = location.pathname?.slice(1) == "user"
  // console.log("location path", location.pathname,isInUserPage)
  const [querySearch] = useSearchParams();
  const { handleFilterChange } = useFilter()
  const queryClient = useQueryClient()

  const [seatDate, setSeatDate] = useState(new Date())

  let downloadbaseurl = null
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    downloadbaseurl = process.env.REACT_APP_LOCAL_URL
    // dev code
  } else {
    // production code
    downloadbaseurl = process.env.REACT_APP_PROD_URL

  }





  const { user } = useOutletContext();
  const currentUserRole = user?.role



  const onPasswordSuccess = () => toast.success("Password Change Successfully!!", {
    position: toast.POSITION.BOTTOM_CENTER
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isOpen_, setIsOpen_] = useState(false)
  const [isOpen___, setIsOpen___] = useState(false)
  const navigate = useNavigate()

  const [error, setError] = useState("")


  const [loading, setLoading] = useState(false)
  const handleChangePassWord = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {

      await customFetch.post("/user/updatepassword", {
        oldpassword: password1.current.value,
        newpassword: password2.current.value,
        confirmpassword: password3.current.value
      }, {

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
  const { startdate,enddate} = useGetdates("daterange")

  const [startDate, setStartDate] = useState(startdate);
  const [endDate, setEndDate] = useState(enddate);
  // const constraintsRef = useRef(null);
  const password1 = useRef(null);
  const password2 = useRef(null);
  const password3 = useRef(null);

  const [selectedIds, setSelectedIds] = useState({
    seat_id: null,
    bus_id: null
  })

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
  useEffect(() => {
    queryObj.traveldate = dayjs(seatDate).format("YYYY/MM/DD")
  }, [seatDate])
  const [queryObj, setQueryObj] = useState({
    from: null, to: null,
    traveldate: dayjs(seatDate).format("YYYY/MM/DD"),
    traveltime: null,
    bus_id: null

  })
  const handleaddnewroute = () => {
    return customFetch.post("/seat", {
      ...queryObj
    })
  }
  const handleAddNewSeat = () => {
    const { seat_id, bus_id } = selectedIds
    return customFetch.post("/seat", { seat_id, bus_id })
  }
  const Demoadd = useMutation(handleAddNewSeat,

    {
      onSuccess: () => {
        // refetch()
        setShowAdd(false)
        if (showAdd) setShowAdd(false)
        if (slide) setSlide(false)
        onSuccessToast("successfully added new bus to the routes!")
      },
      onError: error => {
        onErrorToast((error.response.data ?? "Oops something bad happen try again later !!"))
      },
      onSettled: () => {
        queryClient.invalidateQueries(["create"])
      }
    })
  const { isLoading: loadingRoute, mutate } = useMutation(handleaddnewroute, {
    onSuccess: data => {
      setShowAdd(false)
      onSuccessToast("successfully added new bus to the routes!")
      if (showAdd) setShowAdd(false)
    },
    onError: error => {
      onErrorToast((error.response.data ?? "something went wrong try again later "))
      console.log("this is the error from the server here ", error)
    },
    onSettled: () => {
      queryClient.invalidateQueries("create")
    }
  })



  const handleFilterSearch = () => {
    if (querySearch.get("boardingRange")) {
      handleFilterChange("boardingRange", null)
    }
    handleFilterChange("daterange", `start=${dayjs(startDate).format("YYYY/MM/DD")},end=${endDate ? dayjs(endDate).format("YYYY/MM/DD") : null}`)
  }


  const [showAdd, setShowAdd] = useState(false)


  const [err, setErr] = useState("")
  const [id, setId] = useState("")
  const [ticket, setTicket] = useState({})
  const [slide, setSlide] = useState(false)
  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsOpen_(true)
    setLoading(true)
    setErr(null)
    try {
      const { data: { ticket } } = await customFetch.post("/public/ticket",
        {
          id
          ,
        }

      )
      setTicket(ticket)
    } catch (err) {
      setErr(err.response.data)
    } finally {
      setLoading(false)
    }


  }


  const [toggle, setToggle] = useState(false);

  const SearchQueryUser = ({ user }) => {
    const role = user?.role
    if (role === "tickets") {
      return (

        <div className="mt-10  md:mb-5">

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
  gold:bg-color_gold
  shadow-sm
  rounded-lg
  w-[min(calc(100%-40px),400px)]
  
  py-5 `}>

            <AnimateText text="Please enter ticket id to get and edit tickett" className='!text-lg' />
            <form
              onSubmit={handleSubmit}
              className='px-5 '
            >
              <div className="relative mb-6" data-te-input-wrapper-init>
                <InputBox
                  value={id}
                  onChange={(e) => setId(e.target.value)
                  }
                  type="text"
                  name="Enter Ticket ID"
                />

              </div>

              <UiButton
                className="!bg-green-800 !py-3 
          !w-[min(calc(100%-0.5rem),400px)]
          mx-auto
          hover:!bg-green-800">
                check ticket details
              </UiButton>


            </form>
          </div>

        </div>
      )
    }
    if (role === "mails" || role === "restaurants") {
      const whichuserlogin = role == "mails"
      return (
        <div>
          <AnimateText text="Please enter Mailing Id to get Mail"
            className='!text-lg' />
          <form
            onSubmit={async (e) => {
              // check if the user is logged in as mailer or restauarant to enable search for tickets 
              const formdata = new FormData(e.target)
              const mailingid = await formdata.get("Enter Mail Id")
              if (whichuserlogin) navigate(`/user/mail/${mailingid}`)
              else navigate(`/user/reciept/${mailingid}`)
            }}
            className='px-5 '
          >
            <div className="relative mb-6" data-te-input-wrapper-init>
              <InputBox
                // value={id}
                type="text"
                name="Enter Mail Id"

              />

            </div>

            <div className="mb-6 flex items-center justify-between  text-sm font-medium md:text-xl text-orange-600">
              <motion.h1
                className="w-fit flex-none mx-auto tracking-[0.4rem] text-center "> </motion.h1>
            </div>

            <UiButton
              className="!bg-green-800 !w-full !py-3.5 hover:!bg-green-800">
              {
                whichuserlogin ? "check ticket details" : "Submit"
              }

            </UiButton>


          </form>
        </div>
      )

    }
    return (<div>nothing to display</div>)


  }
  return (
    <>
      <Helmet>
        <title>
          User Dashboard
        </title>
      </Helmet>
      <div
        className=' overflow-x-hidden 
      mx-auto'
        ref={constraintsRef}>


        <ShowBuses isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Change Password"
        >

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


            <UiButton
              type="submit"
            >
              {loading ? <Loadingbtn /> : "Change Password"}
            </UiButton>


          </form>

        </ShowBuses>
        <ShowBuses
          // title="Ticket"
          isOpen={isOpen_}
          setIsOpen={setIsOpen_}>
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
                        <p className="text-center  text-slate-500 mb-4 grid place-items-center"> {ticket?.active ?


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

                      ticket?.active && (
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
                            navigate(`edit/${ticket?._id}`)
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

        </ShowBuses>

        {/* ticket modal */}

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
w-[3.5rem]
h-[3.5rem] 
-rounded-full 
overflow-hidden 
right-0
z-10  "
        >
          <div className="flex h-full w-full items-center -scale-animation justify-center ">
            <AiOutlineSetting size={20} color="#fff" className="" />
          </div>
        </motion.div>

        <div className={`lg:flex 
        ${false && "lg:flex-row-reverse"}
        h-[calc(100vh-4rem)]
        items-start justify-start gap-4 `}>

          <div className="lg:w-[calc(100%-25rem)] max-h-full overflow-y-auto max-w-full ">
            <div
              // variants={variants}
              animate="show"
              initial="hidden"
              className='max-w-2xl !hidden mx-10 rounded-sm flex- gap-x-3 items-center my-5
             z-10 relative
            sm:mx-auto   px-5 '
            >

              <UiButton
                className="!w-[min(30rem,calc(100%-0.5rem))]
                !mx-auto !py-5 !text-lg !rounded-none
                !bg-[#ffae02] !font-black"
              >
                <NavLink
                  to={currentUserRole == "tickets" ? "/user" : "/user/mails"}
                >
                  {({ isPending }) => <div className="flex items-center gap-x-4">
                    {
                      currentUserRole === "tickets" ? <BiBusSchool
                        size={25}
                      /> :
                        <MdOutlineForwardToInbox
                          size={25}
                        />
                    }

                    {isPending ? "loading please wait " : <p>{currentUserRole == "tickets" ? "Tickets" : "Mails"}</p>}
                  </div>}

                </NavLink>


              </UiButton>
              <UiButton
                className="!w-[min(30rem,calc(100%-0.5rem))] 
                !mx-auto !py-5 !text-lg !rounded-none
                !bg-blue-700 !font-black"
              >
                <NavLink
                  to="/restaurant"
                >
                  {({ isPending }) => <div className="flex items-center gap-x-4">
                    <MdFastfood
                      size={25}
                    />
                    {isPending ? "loading please wait " : <p>Restaurant</p>}
                  </div>}
                </NavLink>
              </UiButton>
            </div>
            <Outlet />
          </div>
          <div className={`flex-none lg:flex-1 
          
        sidebar  lg:rounded-lg shadow rounded-lg  
        ${toggle ? "right-0" : "!-right-full"}
        duration-500
        transition-[right] shadow
        lg:shadow-none  
        lg:!w-[15rem] 
        lg:max-w-full
        text-center bg-white/25
        dark:bg-slate-800/25
        gold:bg-color_gold/25
        rounded-sm right-0 top-0 
            w-screen
           z-[100] fixed 
           lg:!static  
           lg:!top-[4rem] lg:h-[calc(100vh-4rem)]  h-screen
            `}
            onClick={() => setToggle(false)}
          >


            <div
              onClick={e => e.stopPropagation()}
              className='w-[min(calc(100%-3.5rem),300px)] pt-5 bg-white gold:bg-yellow-200 dark:bg-slate-800 ml-auto lg:w-full overflow-y-auto max-h-[calc(100vh-0px)] h-full overflow-x-hidden '
            >

              <Heading text={"Employee Details"} className="!font-semibold !mb-5 underline underline-offset-4--  !text-lg first-letter:text-2xl" />
              <Heading text={"Full Name"} className="!font-semibold !mb-0 !text-lg first-letter:text-2xl" />
              <h4 className='text-lg  text-slate-500 font-black '>{user?.fullname || "n/a"}</h4>
              <Heading text={"Phone Number"} className="!font-semibold !mb-0 !text-lg first-letter:text-2xl" />
              <h4 className='text-sm text-slate-500 font-medium '>{user?.phone || "n/a"}</h4>
              <UiButton
                name="Update Password" className="!mx-auto !rounded-lg !mt-2 !bg-blue-700"
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

              >


                <SwiperSlide className="group">
                  <Heading text={""}
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
                  </div>


                </SwiperSlide>

              </Swiper>
              <SearchQueryUser
                user={user}
              />
              {/* {
                isInUserPage ? <div className="mt-10  md:mb-5">

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
gold:bg-color_gold
shadow-sm
rounded-lg
w-[min(calc(100%-40px),400px)]

py-5 `}>

                    <AnimateText text="Please enter ticket id to get and edit tickett" className='!text-lg' />
                    <form
                      onSubmit={handleSubmit}
                      className='px-5 '
                    >
                      <div className="relative mb-6" data-te-input-wrapper-init>
                        <InputBox
                          value={id}
                          onChange={(e) => setId(e.target.value)
                          }
                          type="text"
                          name="Enter Ticket ID"
                        />

                      </div>

                      <UiButton
                        className="!bg-green-800 !py-3 
                        !w-[min(calc(100%-0.5rem),400px)]
                        mx-auto
                        hover:!bg-green-800">
                        check ticket details
                      </UiButton>


                    </form>
                  </div>

                </div> : <div>
                  <AnimateText text="Please enter Mailing Id to get Mail"
                    className='!text-lg' />
                  <form
                    onSubmit={async (e) => {

                      const formdata = new FormData(e.target)
                      const mailingid = await formdata.get("Enter Mail Id")

                      navigate(`/user/mail/${mailingid}`)
                    }}
                    className='px-5 '
                  >
                    <div className="relative mb-6" data-te-input-wrapper-init>
                      <InputBox
                        // value={id}
                        type="text"
                        name="Enter Mail Id"

                      />

                    </div>

                    <div className="mb-6 flex items-center justify-between  text-sm font-medium md:text-xl text-orange-600">
                      <motion.h1
                        className="w-fit flex-none mx-auto tracking-[0.4rem] text-center "> </motion.h1>
                    </div>

                    <UiButton
                      className="!bg-green-800 hover:!bg-green-800">
                      check ticket details
                    </UiButton>


                  </form>
                </div>
              } */}


              <div>
                <form
                  className='hidden'
                  onSubmit={e => {
                    e.preventDefault()
                    setIsOpen___(true)
                    // refetch()
                  }}>
                  <CustomDatePicker
                    startDate={seatDate}
                    setStartDate={setSeatDate}
                  />


                  <UiButton
                    type="submit"
                    className={"!bg-green-800 w-[min(300px,calc(100%-40px))] !mx-auto px-8 !mb-10 pb-2.5 pt-1.5"}
                    name={"Show buses"}
                    onClick={() => 0}
                  />
                </form>

              </div>
              <UiButton
                // onClick={() => logoutUser()}
                className=" hidden- lg:block w-[min(calc(100%-20px),20rem)]
                !mx-auto !py-2.5 !my-5  !text-lg !rounded-none  !bg-blue-800"
              >
                <div className='flex items-center justify-center gap-x-2 text-sm lg:text-lg'

                  onClick={() => {
                    const currentUserRole = user?.role;
                    if (currentUserRole == "tickets") navigate("/user/stats")
                    else navigate("/user/stats/mails?createdBy=" + user?._id)
                  }}
                >
                  <MdQueryStats
                    size={25}
                  /> User Stats
                </div>

              </UiButton>

              <UiButton
                onClick={() => logoutUser()}
                className="  block w-[min(calc(100%-20px),20rem)]
                !mx-auto !py-2.5 !my-5  !text-lg !rounded-xl  !bg-red-400"
              >

                <div className='flex items-center justify-center gap-x-2 text-xs'>
                  <CiLogout
                    size={25}
                  /> LogOut
                </div>

              </UiButton>


            </div>



          </div>
        </div>



      </div >
    </>
  )
}

export default Details