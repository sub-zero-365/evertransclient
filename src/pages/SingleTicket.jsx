
import UiButton from '../components/UiButton'
import { useSearchParams, useParams, NavLink, Link, useNavigate, useLocation, useLoaderData } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import {
  Heading, ActiveStatusButton,
  DeactiveStatusButton,
  Scrollable
} from '../components'
import dayjs from 'dayjs'
import dateFormater from '../utils/DateFormater'
import { toast } from "react-toastify"
import Marquee from 'react-fast-marquee'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Loadingbtn } from '../components'
import { MdOutlineReportOff } from 'react-icons/md'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import QRCode from "react-qr-code";
import { BsChevronCompactUp } from 'react-icons/bs'
import succcesssound from '../utils/successsound.mp3'
import { Helmet } from 'react-helmet'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import customFetch from '../utils/customFetch'

const singleTicket = (url, id) => {
  return ({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await customFetch.get(url)
      return res.data
    }

  })

}
export const loader = (queryClient) => async ({ request, params }) => {
  const searchParams = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    var url = ""
    const showDeactivateButton = searchParams.xyz === "secret"
    const isadminuser = searchParams.admin === "true";
    const readonly = searchParams.readonly === "7gu8dsutf8asdf" || false
    if (readonly) {
      url = `/assistant/ticket/${params.id}`
    } else {
      if (isadminuser) {
        url = `/admin/staticticket/${params.id}`
      } else {
        url = `/ticket/${params.id}`
      }

    }
    // try to get the previous page from user being
    const { ticket: { active } } = await queryClient.ensureQueryData(singleTicket(url, params.id));
    const audio = new Audio(succcesssound)
    if (active) {
      audio.play()
    }
    return {
      id: params.id,
      url,
      isadminuser,
      readonly,
      showDeactivateButton
    }
  } catch (err) {
    throw err
  }

}

const User = () => {
  const location = useLocation()
  const { searchParams } = location.state ?? { searchParams: "" }

  // const [querySearch] = useSearchParams()

  const queryClient = useQueryClient()
  const ref = useRef(null);
  const isInView = useInView(ref)
  const { id, url, readonly, isadminuser, showDeactivateButton } = useLoaderData()
  const { ticket } = useQuery(singleTicket(url, id)).data
  useEffect(() => {
    if (isInView) {
      setIsOpen(true)
    } else {
      if (isOpen) {
        setIsOpen(false)
      }
    }

  }, [isInView])

  let downloadbaseurl = null
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    downloadbaseurl = process.env.REACT_APP_LOCAL_URL
    // dev code
  } else {
    // production code
    downloadbaseurl = process.env.REACT_APP_PROD_URL

  }
  const [active, setActive] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [loadbtn, setLoadbtn] = useState(false)
  const [params, setParams] = useState({})
  const redeemTicket = async () => {
    setLoadbtn(true)
    setIsloading(true)
    try {
      await customFetch.post("/assistant/edit/" + id, {}, {
        params
      }
      )
      queryClient.invalidateQueries(["ticket", id])

    } catch (err) {
      const errorMessage = err?.response?.data || err?.message || "something went wrong "
      toast.error(errorMessage)
      setLoadbtn(false)
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
    return ticket?.type === value && ticket?.doubletripdetails[index][someother]
  }
  useEffect(() => {
    if (Object.keys(params).length === 0) {
      return
    }
    redeemTicket()
  }, [params])
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>
          Single Ticket
        </title>
      </Helmet>
      <div className={`max-w-3xl  justify-center  scrollto  flex-none lg:px-10 !w-full md:px-5 mx-auto  h-[calc(100vh-4rem)] pb-64 overflow-y-auto ${!isadminuser && "container"}`}>


        <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <Link to={`..?${searchParams}`}
                relative='path'
                class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                DashBoard
              </Link>
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


            <Marquee play pauseOnClick pauseOnHover className="capitalize text-red-500 dark:text-red-500 py-6 mb-4 text-xs font-extrabold leading-none  px-5 text-gray-900- md:text-lg lg:text-xl dark:text-white- w-full !max-w-2xl">
              this ticket is valid for a period of 1month
            </Marquee>
            <h1 className="text-center font-semibold  font-montserrat text-xl mt-4 md:text-2xl tracking-tighter leading-10 oblique text-blue-900">Ticket Details</h1>
            <h2 className="text-center  text-lg md:text-xl font-medium  "> Ticket id</h2>
            <p className="text-center text-slate-500 mb-4 "> {(ticket?._id ?? id)}</p>

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
            <Heading text="Car Details" className={"!text-center !font-bold italic"} />
            <div className='grid  grid-cols-2-- text-center'>
              <div>
                <h2 className="text-center  text-lg md:text-xl font-medium  ">Name</h2>
                <p className="text-center text-slate-500 mb-10 " >{ticket?.busdetails?.bus || "n/a"} </p>
              </div>


            </div>
            <Heading text="Edited History" className={"!text-center !font-bold italic"} />

            <ol class="relative border-l border-gray-200 dark:border-gray-700">

              {
                ticket?.editedBy?.map(({ full_name,
                  user_id,
                  date,
                  action,
                  transferseatdetail
                }) => {
                  const isSeatTransfer = action?.toLowerCase()?.includes("transfer") && transferseatdetail?.previousSeatId;
               
                  return (<li class="ml-4 mb-4" key={user_id}>
                    <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{dayjs(date).format("dddd, MMMM D, YYYY h:mm A")}</time>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edited By:{full_name}</h3>
                    <p class="text-base font-normal text-gray-500 dark:text-gray-400">Action:{action}</p>
                    {isSeatTransfer&&
                    <div className="py-2">
                      <UiButton
                        className="!bg-rose-400"
                      >
                        <Link
                          to={`/seat/${transferseatdetail?.previousSeatId}`}
                        >
                          Previous Seat
                        </Link>
                      </UiButton>
                      <UiButton
                        className="!bg-green-400 mt-2"
                      >
                        <Link
                          to={`/seat/${transferseatdetail?.currentSeatId}?rd_from=assistant&ticket_id=${ticket?._id}&ticket_seat=${ticket.seatposition}`}
                        >
                          Transfer Seat
                        </Link>
                      </UiButton>

                    </div>
                    }
                  </li>)
                })
              }

            </ol>

            <Scrollable>

            </Scrollable>


            {
              (!readonly) && (
                <Link
                  className="hidden-"
                  to={`/${isadminuser ? "dashboard/seat" : "seat"}/${ticket?.seat_id}?rd_from=assistant&ticket_id=${ticket?._id}&ticket_seat=${ticket.seatposition}&${isadminuser ? "admin=true" : null}`}
                >
                  <UiButton
                    className="!bg-green-600 !py-3 dark:!bg-slate-950 dark:!text-white gold:!bg-yellow-500 gold:text-black !mt-5 !text-sm !mx-auto !w-[min(100%,calc(100%-60px))]"
                    name="Locate Borderaux"
                  />
                </Link>

              )

            }

            <div ref={ref} className="mt-56" />
          </div>
          {/*  */}


          <div className="lg:sticky lg:top-[4rem] lg:flex-none lg:py-10 
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
                                     min-h-[3rem]
                                     mx-auto
                                    rounded bg-blue-500 gold:bg-yellow-500 gold:text-black  px-2 py-1 text-xs font-montserrat font-medium 
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
              {ticket?.type === "roundtrip" ? "roundtrip" : "singletrip"}
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
gold:bg-yellow-200
mb-5
rounded-lg
shadow-xl
lg:py-10
`}

            >

              <div className="flex justify-center gap-x-2 flex-wrap">

                <Heading text="Created By :" className="text-center !text-lg underline  underline-offset-8 !font-black !mb-0" />


                <Heading text={(ticket?.username || "loading ...")}
                  className="text-center capitalize !text-lg !font-manrope !mb-5 !font-medium !text-slate-600 dark:!text-white" />
              </div>


              {
                ticket?.type === "roundtrip" ? (
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
                            disabled={false}
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
                    dark:!bg-slate-950 dark:!text-white
                    gold:bg-yellow-600 gold:!text
                        w-[min(300px,calc(100%-2.5rem))]
                         bottom-0
                         py-3.5
                         block
                         min-h-[2rem]
                         mx-auto
                         
                         text-center
                        rounded bg-green-500   px-2  text-xs font-montserrat font-medium 
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

          </div>
        </div>




      </div>
    </>

  )
}

export default User