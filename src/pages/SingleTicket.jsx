
import UiButton from '../components/UiButton'
import EditTicketModal from '../components/EditTicketModal'
import { useSearchParams, useParams, NavLink, Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import Alert from '../components/Alert'
import ReOrderBooking from '../components/Alert'
import {
  Loader, Heading, ActiveStatusButton,
  DeactiveStatusButton
} from '../components'
import dayjs from 'dayjs'
import dateFormater from '../utils/DateFormater'
import axios from 'axios'
import Marquee from 'react-fast-marquee'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Loadingbtn } from '../components'
import { MdOutlineReportOff } from 'react-icons/md'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import QRCode from "react-qr-code";
import { BsChevronCompactUp } from 'react-icons/bs'
import succcesssound from '../utils/successsound.mp3'
import { Helmet } from 'react-helmet'
const User = () => {
  const ref = useRef(null);
  const [isOpen_, setIsOpen_] = useState(false);
  const location = useLocation();
  const loadState = location?.state?._id
  const isInView = useInView(ref)
  useEffect(() => {
    if (isInView) {
      setIsOpen(true)
    } else {
      if (isOpen) {
        setIsOpen(false)
      }
    }

  }, [isInView])
  // const getStatus = (obj, value = "roundtrip") => {
  //   return obj?.type === value && obj?.doubletripdetails?.some(x => x.active == true)
  // }
  const [redirect, setRedirect] = useState(false);
  let downloadbaseurl = null
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    downloadbaseurl = process.env.REACT_APP_LOCAL_URL
    // dev code
  } else {
    // production code
    downloadbaseurl = process.env.REACT_APP_PROD_URL

  }
  const navigate = useNavigate();
  const previousPage = () => navigate(-1)
  const [active, setActive] = useState(null);
  const [queryParameters] = useSearchParams()
  const [ticket, setTicket] = useState(location.state)
  const [isLoading, setIsloading] = useState(loadState ? false : true);
  const [loadbtn, setLoadbtn] = useState(false)
  const [message, setMessage] = useState("")
  const [ticketData, setTicketData] = useState(location.state)
  const id = useParams().id
  const [params, setParams] = useState({
  })
  const [toggle, setToggle] = useState(false)
  const showDeactivateButton = queryParameters.get("xyz") ? true : false
  // const showDeactivateButton = true
  var token = undefined, url = ""
  const isadminuser = queryParameters.get("admin");
  const audio = new Audio(succcesssound);
  const readonly = (queryParameters.get("readonly") === "7gu8dsutf8asdf" || false)
  async function getData() {
    if (readonly) {
      token = localStorage.getItem("assist_token");
      console.log("enter here ")
      url = `/assistant/ticket/${id}`
    } else {
      if (isadminuser == null) {
        token = localStorage.getItem("token")
        url = `/ticket/${id}`
      } else {
        token = localStorage.getItem("admin_token");
        url = `/admin/staticticket/${id}`;
      }
    }
    try {
      console.log("in try block")
      const res = await axios.get(url, {
        headers: {
          'Authorization': "makingmoney " + token
        },
      }

      )
      console.log(res.data)
      setTicket(res.data.ticket)
      setTicketData(res.data.ticket)

      const lettodaydate = dateFormater(new Date()).date;
      const ticketTravelDate = dateFormater(res.data.ticket?.traveldate).date;
      if ((dayjs(ticketTravelDate).diff(lettodaydate, "day")) < 0 && ticket?.active == true) {
        setRedirect(true)
        setMessage(`this ticket travel date is on the ${ticketTravelDate} but the traveller arrived on the  ${lettodaydate}`)
      }

      if (res.data?.ticket?.active === true) {
        try {
          if (window.navigator.vibrate) {
            window?.navigator?.vibrate([500])
          }
          audio.play()

        } catch (err) {
          console.log("err: ", err)
        }


      }
      if (!res.data?.ticket) {
        setToggle(true)
      }
      if (isLoading) {
        setIsloading(false);
      }
      setLoadbtn(false)
      console.log("not here ")

    } catch (err) {
      // console.log(err)
      setIsloading(false)
      setToggle(true)
      setMessage(err.response.data)
    }
  }

  useEffect(() => {
    getData()
  }
    , []
  )


  const redeemTicket = async () => {
    let token = null
    setLoadbtn(true)
    setIsloading(true)
    let url = ""
    if (readonly) {
      url = `/assistant/edit/${id}`
      token = localStorage.getItem("assist_token");

    } else {
      if (isadminuser) {
        url = `/admin/edit/${id}`
        token = localStorage.getItem("admin_token");
      } else {
        url = `/ticket/edit/${id}`
        token = localStorage.getItem("token");

      }

    }

    try {
      const res = await axios.post(url, {}, {
        headers: {
          'Authorization': "makingmoney " + token
        },
        params
      }
      )
      console.log(res)
      setTicket(res.data?.updateTicket)
      setTicketData(res.data?.updateTicket)
      setMessage("successfull edited ticket")
    } catch (err) {
      setMessage(err.response.data);
      setLoadbtn(false)
    }
    finally {
      setToggle(true)
      setIsloading(false)

    }
  }
  const handleChangeParams = (index) => {
    setActive(index);
    setIsloading(true)
    setParams(prev => {
      return (
        {
          ...prev,
          index
        }
      )
    })



  }
  const getActiveStatus = (index, someother, value = "roundtrip") => {
    if (![0, 1].some(x => x == index)) return false
    return ticketData?.type === value && ticketData?.doubletripdetails[index][someother]
  }
  useEffect(() => {
    if (Object.keys(params).length === 0) {
      return
    }
    redeemTicket()
  }, [params])
  const [isOpen, setIsOpen] = useState(false);
  if (isLoading) return <Loader toggle />
  return (
    <>
      <Helmet>
        <title>
          Single Ticket
        </title>
      </Helmet>
      <div className={`max-w-3xl  justify-center  flex-none lg:px-10 !w-full md:px-5 mx-auto  h-[calc(100vh-60px)] pb-64 overflow-y-auto ${!isadminuser && "container"}`}>
        {/* {
          (ticket && readonly == false) && (<EditTicketModal isOpen={isOpen_} setIsOpen={setIsOpen_} ticket={ticket} />)
        } */}
        <ReOrderBooking
          duration="30000"
          className={`${redirect && "!top-1/2 -translate-y-1/2"}`}
          toggle={redirect}
          confirmFunc={() => 0}
          // navigate(`/user?assing_new_seat=true&_id=${id}&from=${ticket?.from}&fullname=${ticket?.fullname}&to=${ticket?.to}&type=${ticket?.type}`)
          setToggle={setRedirect}
          message={message} />
        <Alert message={message}
          duration="30000"
          className={`
      ${toggle && "!top-1/2 -translate-y-1/2"}
      `}
          toggle={toggle}
          confirmFunc={() => setToggle(false)}
          setToggle={setToggle}

        />
        {
          isadminuser ? (
            <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                  <span
                    onClick={previousPage}
                    class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    DashBoard
                  </span>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                      <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Ticket details</h1>
                    </a>
                  </div>
                </li>

              </ol>
            </nav>

          ) : (
            <nav class="flex mb-5 mt-5 px-5 w-full " aria-label="Breadcrumb">
              <ol class="flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center flex-none">
                  <span
                    onClick={previousPage}
                    class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    User
                  </span>
                </li>
                <li className="flex-1">
                  <div class="flex items-center flex-1">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                      <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Ticket details</h1>
                    </a>
                  </div>
                </li>


              </ol>
            </nav>

          )
        }
        <div className="lg:flex flex flex-col lg:flex-row items-center lg:items-start !w-full  justify-center">
          <div className="flex-1 lg:flex-none w-full max-w-sm">
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>


              <QRCode
                size={400}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`https://ntaribotaken.vercel.app/assistant/${id}?sound=true&xyz=secret&readonly=7gu8dsutf8asdf&render_9368&beta47`}
                viewBox={`0 0 256 256`}
              />
            </div>
            {/* {
              (ticket?.active && readonly == false) && (
                <UiButton
                  className="!mx-auto !mt-5"
                  name="edit this ticket" onClick={() => setIsOpen_(true)} />

              )

            } */}

            <Marquee play pauseOnClick pauseOnHover className="capitalize text-red-500 dark:text-red-500 py-6 mb-4 text-xs font-extrabold leading-none  px-5 text-gray-900- md:text-lg lg:text-xl dark:text-white- w-full !max-w-2xl">
              this ticket is valid for a period of 1month
            </Marquee>
            <h1 className="text-center font-semibold  font-montserrat text-xl mt-4 md:text-2xl tracking-tighter leading-10 oblique text-blue-900">Ticket Details</h1>
            <h2 className="text-center  text-lg md:text-xl font-medium  "> Ticket id</h2>
            <p className="text-center text-slate-500 mb-4 "> {id}</p>

            <h2 className="text-center  text-lg md:text-xl font-medium  "> Traveler Name</h2>
            <p className="text-center text-slate-500 mb-4 ">{ticket?.fullname || "n/a"}</p>
            <div className="grid grid-cols-2">
              <div>
                <h2 className="text-center  text-lg md:text-xl font-medium  ">Travel Date </h2>
                <p className="text-center text-slate-500 mb-4 "> {ticket?.traveldate ? dateFormater(ticket?.traveldate).date : "n/a"}</p>
              </div>
              <div>
                <h2 className="text-center  text-lg md:text-xl font-medium  ">travel time </h2>
                <p className="text-center text-slate-500 mb-4 "> {ticket?.traveltime || "n/a"}</p>
              </div>
            </div>

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
            <h2 className="text-center  text-lg md:text-xl font-medium  "> Created At </h2>
            <p className="text-center text-slate-500 mb-10 ">{dateFormater(ticket?.createdAt).date + " at " + dateFormater(ticket?.createdAt).time || "n/a"} </p>
            <div className='grid  grid-cols-2'>
              <div>
                <h2 className="text-center  text-lg md:text-xl font-medium  "> Price</h2>
                <p className="text-center text-slate-500 mb-10 " >{ticket?.price + "frs" || "n/a"} </p>
              </div>
              <div>
                <h2 className="text-center  text-lg md:text-xl font-medium  ">Seat</h2>
                <p className="text-center text-slate-500 mb-10 " >{ticket?.seatposition !== null ? Number(ticket?.seatposition) + 1 : "n/a"} </p>
              </div>

            </div>


            {
              (ticket) && (
                <Link
                  className="lg:hidden"
                  to={`/${isadminuser ? "dashboard/seat" : "seat"}/${ticket?.seat_id}?rd_from=assistant&ticket_id=${ticket?._id}&ticket_seat=${ticket.seatposition}&${isadminuser ? "admin=true" : null}`}
                >
                  <UiButton
                    className="!bg-green-600 !mt-5 !text-sm !mx-auto !w-[min(100%,calc(100%-60px))]"
                    name="Locate Borderaux"
                  />
                </Link>

              )

            }

            <div ref={ref} className="mt-56" />
          </div>
          {/*  */}


          <div className="lg:static lg:flex-none lg:py-10 
                                     bottom-0
                                     fixed
                                     w-full
                                     flex flex-col
                                     -translate-x-1/2
                                     lg:translate-x-0
                                     left-1/2
                                     md:w-[min(25rem,calc(100%-1rem))]
                                     md:left-[calc(5rem+50%)]
                                     lg:w-[20rem]
                                     
      ">
            <button
              data-te-ripple-init
              data-te-ripple-color="light"
              className="inline---block 
                                    w-[min(400px,calc(100%-2.5rem))]
                                     bottom-0
                                     pb-2
                                     block
                                     min-h-[2rem]
                                     mx-auto
                                    rounded bg-blue-500   px-2 py-1 text-xs font-montserrat font-medium 
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
  transition duration-150 ease-in-out hover:bg-blue-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"


              onClick={() => {
                setIsOpen(!isOpen)

              }}
            >
              <span

                className={`absolute 
                                shadow
                                z-[23]
                                left-1/2 
                                     -top-8
                                     bg-slate-400/75 
                                     px-2
                                     rounded-sm
                                     pt-1
                                     pb-1.5
                                     !font-black
                                     h-fit lg:hidden
                                     -translate-x-1/2
                                     
          ${isOpen ? "rotate-180" : " "}
                                     
                                     
                                     `}> <BsChevronCompactUp size={20} /></span>
              {ticketData?.type === "roundtrip" ? "roundtrip" : "singletrip"}
            </button>
            <motion.div
              className={`mx-auto
          ${isOpen ? "max-h-screen py-5" : "max-h-0 "}
          overflow-hidden
          lg:max-h-screen
          transition-[max-height]
           duration-300
w-[min(25rem,calc(100%-1rem))]
bg-white
dark:bg-slate-800
mb-5
rounded-lg
shadow-xl
lg:py-10
`}

            >

              <div className="flex justify-center gap-x-2 flex-wrap">

                <Heading text="Created By :" className="text-center !text-lg underline  underline-offset-8 !font-black !mb-0" />


                <Heading text={(ticketData?.username || "loading ...")}
                  className="text-center capitalize !text-lg !font-manrope !mb-5 !font-medium !text-slate-600 dark:!text-white" />
              </div>


              {
                ticketData?.type === "roundtrip" ? (
                  showDeactivateButton && <div className="grid grid-cols-1 md:grid-cols-1 justify-center md:justify-between px-4">
                    <div className="flex justify-center flex-col">
                      <div className="flex mb-1 items-center justify-center">
                        <Heading text="First Trip" className="text-center first-letter:!text-2xl !pl-0 !text-xs !font-black !mb-1 mr-2" />
                        {getActiveStatus(0, "active") ? <ActiveStatusButton className="!w-4 !ring-2 !h-4" /> : <DeactiveStatusButton className="!w-4 !ring-2 !h-4" />}
                      </div>
                      {getActiveStatus(0, "active") ? (
                        active == 1 && isLoading
                          ? <>
                            <button

                              data-te-ripple-init
                              data-te-ripple-color="light"
                              className="inline---block 
                         bottom-0
                         pb-2
                         block
                         min-h-[2rem]
                         mx-auto
                        rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                              <Loadingbtn toggle />
                            </button>

                          </> : <button
                            onClick={() => {
                              handleChangeParams(1)
                            }}
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="inline---block 
                         bottom-0
                         pb-2
                         block
                         min-h-[2rem]
                         mx-auto
                        rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            Deactive
                          </button>
                      ) :
                        <>
                          <Heading text="This ticket was redeem on the " className="!text-xs !text-center !mb-1" />
                          <div className="flex gap-2 justify-center">
                            <Heading
                              className="!text-xs !inline  !text-center !text-slate-600 !mb-1 !font-black underline underline-offset-4 "
                              text={getActiveStatus(0, "updatedAt") && (dateFormater(getActiveStatus(0, "updatedAt")).date) || ticket?.updatedAt || "n/a"} />
                            <span>at</span>
                            <Heading
                              className="!text-xs !pl-0 !inline !text-slate-600  !text-center !mb-1 !font-black underline underline-offset-4 "
                              text={getActiveStatus(0, "updatedAt") && (dateFormater(getActiveStatus(0, "updatedAt")).time) || ticket?.updatedAt || "n/a"} />
                          </div>


                        </>
                      }


                    </div>
                    <div className="flex justify-center flex-col">
                      <div className="flex justify-center mb-1 items-center">
                        <Heading text="Return Trip" className="text-center first-letter:!text-2xl !pl-0 !text-xs !font-black !mb-1 mr-2" />
                        {
                          getActiveStatus(1, "active") ? <ActiveStatusButton className="!w-4 !ring-2 !h-4" /> : <DeactiveStatusButton className="!w-4 !ring-2 !h-4" />
                        }
                      </div>
                      {getActiveStatus(1, "active") ? (
                        active == 2 && isLoading
                          ? <button

                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="inline---block 
                       bottom-0
                       pb-2
                       block
                       min-h-[2rem]
                       mx-auto
                      rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            <Loadingbtn toggle />
                          </button> : <button
                            onClick={() => {
                              handleChangeParams(2)

                            }}
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="inline---block 
                         bottom-0
                         pb-2
                         block
                         min-h-[2rem]
                         mx-auto
                        rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            Deactive
                          </button>
                      ) :
                        <>
                          <Heading text="This ticket was redeem on the " className="!text-xs !text-center !mb-1" />
                          <div className="flex gap-2 justify-center">
                            <Heading
                              className="!text-xs !inline  !text-center !text-slate-600 !mb-1 !font-black underline underline-offset-4 "
                              text={getActiveStatus(1, "updatedAt") && (dateFormater(getActiveStatus(1, "updatedAt")).date) || ticket?.updatedAt || "n/a"} />
                            <span>at</span>
                            <Heading
                              className="!text-xs !pl-0 !inline !text-slate-600  !text-center !mb-1 !font-black underline underline-offset-4 "
                              text={getActiveStatus(1, "updatedAt") && (dateFormater(getActiveStatus(1, "updatedAt")).time) || ticket?.updatedAt || "n/a"} />
                          </div>


                        </>
                      }
                    </div>


                  </div>

                )
                  : (
                    showDeactivateButton && <AnimatePresence>
                      {
                        ticket?.active ?
                          <motion.button
                            disabled={redirect}
                            animate={{ opacity: [0, 1], bottom: ["-2rem", "4rem", "2rem"] }}
                            exit={{ opacity: 0, bottom: "-2rem" }}

                            onClick={() => {
                              redeemTicket()
                            }}
                            className="
                        // --max-w-[min(calc(100%-2.5rem),400px)]
                        w-fit
                        pb-2
                        flex
                        min-h-[2rem]
                        mx-auto
                        
                       rounded bg-red-500   px-6
                       pt-2
                       py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                  ">{!loadbtn ? <> Remove validatility <MdOutlineReportOff className="text-2xl text-gray-900 ml-2" /> </> : <Loadingbtn toggle />}</motion.button>


                          : <>
                            <DeactiveStatusButton className="mx-auto mb-2 !text-xs !w-5 !h-5" />
                            <Heading text="This ticket isnot valid cause it was redeem on the " className="!text-xs !text-center !mb-1" />
                            <div className="flex gap-2 justify-center  mb-5">
                              <Heading
                                className="!text-xs !inline  !text-center !text-slate-600 !mb-1 !font-black underline underline-offset-4 "
                                text={(dateFormater(ticket?.updatedAt).date) || "n/a"} />
                              <span>at</span>
                              <Heading
                                className="!text-xs !pl-0 !inline !text-slate-600  !text-center !mb-1 !font-black underline underline-offset-4 "
                                text={(dateFormater(ticket?.updatedAt).time) || "n/a"}
                              />
                            </div>


                          </>

                      }
                    </AnimatePresence>

                  )
              }
              {

                ticket?.active && (
                  <Marquee play pauseOnClick pauseOnHover className="capitalize text-red-500 dark:text-red-500 py-6 mb-4 text-xs font-extrabold leading-none  px-5   dark:text-white-">
                    caution this action are not reversible
                  </Marquee>
                )
              }
              {
                !readonly && (
                  <a
                    href={`${downloadbaseurl}/downloadticket/${id}?payload=79873ghadsguy&requ`}
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
                )

              }


            </motion.div>
            {
              (ticket) && (
                <Link
                  className="hidden lg:block"
                  to={`/${isadminuser ? "dashboard/seat" : "seat"}/${ticket?.seat_id}?rd_from=assistant&ticket_seat=${ticket?.seatposition}&${isadminuser ? "admin=true" : null}`}
                >
                  <UiButton
                    className="!bg-green-600 !mt-5 !text-sm !mx-auto !w-[min(100%,calc(100%-60px))]"
                    name="Locate Borderaux"
                  />
                </Link>

              )

            }
          </div>
        </div>




      </div>
    </>

  )
}

export default User