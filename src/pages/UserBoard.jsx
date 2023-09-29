import { AiOutlineArrowLeft, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { timeOptions } from '../utils/sortedOptions'
import TimeSelect from 'react-select'
import { onSuccessToast, onErrorToast, onWarningToast } from '../utils/toastpopup'
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
import { NavLink, useSearchParams, useNavigate, Link, useOutletContext, useLoaderData } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineSetting } from 'react-icons/ai';
import dateFormater from "../utils/DateFormater"
import { BiCategory } from 'react-icons/bi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MdOutlinePriceChange } from 'react-icons/md'
import { Autoplay, Navigation, Pagination } from 'swiper'
import ClearFilter from '../components/ClearFilter'
import UiButton from '../components/UiButton'
import { useDispatch } from 'react-redux'
import SelectTime from 'react-select'
import EditTicketModal from '../components/EditTicketModal'
import { toast } from 'react-toastify'
import { getBuses } from "../utils/ReactSelectFunction";
import BusSelect from 'react-select/async'
import Alert from '../components/Alert'
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import { Button, Rounded } from '../components'
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
import { useUserLayoutContext } from "../components/UserLayout"
import {
  AmountCount,
  FormatTable,
  Heading
  ,
  Scrollable, TicketCounts,
  Loadingbtn,
  Form,
  NextButton,
  PlaceHolderLoader,
  PrevButton,
  PercentageBar
  , CustomDatePicker
} from '../components';

import dayjs from "dayjs"
import { Helmet } from 'react-helmet'
import { getCities } from "../utils/ReactSelectFunction"

import { sortedDateOptions, sortTicketStatusOptions } from "../utils/sortedOptions"
import { useFilter } from '../Hooks/FilterHooks'
import ShowBuses from './ShowBuses'
import Marquee from 'react-fast-marquee'
import {
  useQuery, useMutation, useQueryClient
} from '@tanstack/react-query'
import customFetch from '../utils/customFetch'
import { CiLogout } from 'react-icons/ci'
const seats = []
const allTicketsQuery = (params) => {
  const { search, sort, page } = params;
  return {
    queryKey: [
      'tickets',
      { search: search ?? "", page: page ?? 1, sort: sort ?? "newest" }
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/ticket', {
        params,
      });
      return data;
    },
  };
};
const style = {
  control: base => ({
    ...base,
    boxShadow: "none",
    background: "transparent",
    borderRadius: 0,
    fontSize: 1 + "rem",
    cursor: "pointer"
  }
  )

}
export const loader =
  (queryClient) =>
    async ({ request }) => {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);
      await queryClient.ensureQueryData(allTicketsQuery(params));
      return { searchValues: { ...params } };
    };

const Details = () => {

  const [querySearch] = useSearchParams();
  const { handleFilterChange, handleChange } = useFilter()
  const queryClient = useQueryClient()
  const { searchValues } = useLoaderData()
  const userData = useQuery(allTicketsQuery(searchValues))?.data
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

  const { logoutUser } = useUserLayoutContext()


  const onPasswordSuccess = () => toast.success("Password Change Successfully!!", {
    position: toast.POSITION.BOTTOM_CENTER
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isOpen_, setIsOpen_] = useState(false)
  const [isOpen__, setIsOpen__] = useState(false)
  const [isOpen___, setIsOpen___] = useState(false)
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [toggle_, setToggle_] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const viewAll = querySearch.get("viewall")
  const handleChangePassWord = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {

      const res = await customFetch.post("/user/updatepassword", {
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



  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const constraintsRef = useRef(null);
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
    console.log("this is the seat date here ", seatDate)
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
      onSuccess: data => {
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
      // refetch()
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


  const [showAdd, setShowAdd] = useState(false)
  const _view = JSON.parse(localStorage.getItem("__view")) == true ? true : false
  const [__view, __setView] = useState(_view)
  const [greetingtext, setGreetingText] = useState("GOOD MORNING")

  const getCount = ({ from, to, traveltime, _id }, arr) => {
    const count = arr?.filter((item) => item.from == from && item.to == to && item.traveltime == traveltime)
    return count.length
  }
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
  const makeUnique = (array = [], keys = []) => {
    if (!keys.length || !array.length) return [];

    return array.reduce((list, item) => {
      const hasItem = list.find(listItem =>
        keys.every(key => listItem[key] === item[key])
      );
      if (!hasItem) list.push(item);
      return list;
    }, []);
  };

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
        <ShowBuses isOpen={isOpen___}
          className2="!w-[min(40rem,calc(100%-30px))]"
          setIsOpen={setIsOpen___}
          title={(slide ? "Select bus" : "Avalible Buses")}
        >
          < >
            {
              slide ? (<div
                key="ihsiadhfp"

              >
                <Rounded
                  className={`!w-8 !h-8 !ml-4`}
                  onClick={() => setSlide(false)}>
                  <AiOutlineArrowLeft size={20}
                    className="flex-none pl-1 " />
                </Rounded>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  Demoadd.mutate()

                }} >
                  <div className='mx-auto mb-6 w-[min(300px,calc(100%-2.5rem))]'>
                    <BusSelect
                      defaultOptions
                      catcheOptions
                      loadOptions={
                        async () => {

                          const data = await getBuses()
                          const formateddata = data?.map(({ label, value, feature }) => {
                            return ({
                              label: `Name : ${label}----Feature: ${feature}`,
                              value: value,
                            })

                          })
                          return formateddata

                        }

                      }
                      required
                      isSearchable={false}
                      onChange={(e) => {
                        setSelectedIds((pre) => {
                          return ({
                            ...pre,
                            bus_id: e.value

                          })

                        })
                      }}

                      className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                    />


                  </div>
                  <Marquee play pauseOnClick pauseOnHover className="italic text-blue-600 dark:text-blue-500 py-6 mb-4 text-xs font-extrabold leading-none  px-5   max-w-5xl">
                    go to bus detail page to check bus specification
                  </Marquee>
                  <UiButton
                    disabled={Demoadd.isLoading}
                    name={Demoadd.isLoading ? "creating ..." : "Submit  "}
                    className={`!block !bg-purple-900 ${Demoadd.isLoading && "!bg-black !text-white"}
                    w-[min(200px,calc(100%-2.5rem))]
                    !mx-auto
                    !pb-2.5
                    !pt-2
                    !mb-5`}

                  />
                </form>
              </div>) : (
                <div
                  key="jiofhsa f"
                  className={` `}>
                  <div>
                    {
                      makeUnique(seats, ["traveltime", "from", "to"])?.map(({ traveltime, from, to, _id: seat_id }, idx) => {
                        const count = getCount({
                          from, to, traveltime
                        }, seats)
                        return (
                          <div className='flex justify-between  flex-col  md:flex-row px-4 space-x-6 items-center border-b border-slate-200 pb-2 mb-1'>
                            <div className='flex-none flex space-x-5 space-y-2 items-center'>
                              <div className="flex-none">
                                {from}
                              </div>
                              <div className="flex-none">
                                {to}
                              </div>
                              <div className="flex-none">
                                {traveltime}
                              </div>
                            </div>
                            <div className="flex-1 flex  space-x-2 items-center">
                              {
                                Array.from({ length: count }, (arr, index) => {
                                  return (
                                    <Link to={`/seat/${seat_id}?from=`}

                                      className='h-10 w-10 border border-green-900 grid 
                        place-items-center rounded-md shadow-lg text-sm 
                        ml-4 hover:bg-green-800
                        '
                                    >
                                      {index + 1}
                                    </Link>
                                  )
                                }
                                )

                              }
                              <div
                                onClick={() => {

                                  setSlide(true)
                                  setSelectedIds((pre) => {
                                    return ({
                                      ...pre,
                                      seat_id: seat_id

                                    })

                                  })
                                }
                                }
                                className='h-10 w-10 border border-gray-50 grid 
                        place-items-center rounded-md shadow-lg text-sm
                        ml-4 hover:bg-slate-500
                        
                        '

                              >+</div>
                            </div>
                          </div>

                        )
                      })
                    }
                    <form onSubmit={e => {
                      e.preventDefault()
                      mutate()

                    }}>
                      {

                        showAdd && (

                          <>


                            <Scrollable className="!overflow-visible !justify-center !items-center">
                              <div>
                                <Heading text="From" className={"!mb-1 !mt-2 !text-sm first-letter:text-2xl first-letter:font-black"} />
                                <FromSelect

                                  onChange={(e) => {
                                    setQueryObj(
                                      (prev) => {
                                        return ({
                                          ...prev, from: e.value

                                        })
                                      }
                                    )
                                  }}
                                  menuPlacement='top'
                                  defaultOptions
                                  catcheOptions
                                  loadOptions={getCities}
                                  required

                                  styles={{
                                    ...style,
                                    wdith: "100%",
                                    fontSize: 10 + "px"
                                  }}

                                  // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                  className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                                // onChange={evt => setFromCities(evt.value)}
                                />

                              </div>
                              <div>
                                <Heading text="To" className={"!mb-1 !mt-2 !text-sm first-letter:text-2xl first-letter:font-black"} />
                                <ToSelect
                                  onChange={(e) => {
                                    setQueryObj(
                                      (prev) => {
                                        return ({
                                          ...prev, to: e.value

                                        })
                                      }
                                    )
                                  }}
                                  defaultOptions
                                  catcheOptions
                                  loadOptions={getCities}
                                  required

                                  styles={{
                                    ...style,
                                    wdith: "100%",
                                    fontSize: 10 + "px"
                                  }}

                                  // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                  className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                                />

                              </div>
                              <div>
                                <Heading text="time" className={"!mb-1 !mt-2 !text-lg first-letter:text-2xl first-letter:font-black"} />
                                <div className='mt-0'>

                                  <SelectTime
                                    options={timeOptions}
                                    styles={style}
                                    defaultValue={{
                                      label: querySearch.get("traveltime") || "no time",
                                      value: "no time"
                                    }}
                                    // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

                                    isSearchable={false}

                                    onChange={(e) => {
                                      setQueryObj(
                                        (prev) => {
                                          return ({
                                            ...prev, traveltime: e.value

                                          })
                                        }
                                      )
                                    }}

                                    className='!border-none !h-8 mt-0' />
                                </div>

                              </div>

                            </Scrollable>
                            <div className='mx-auto mb-6 w-[min(300px,calc(100%-2.5rem))] mt-4'>
                              <BusSelect
                                defaultOptions
                                catcheOptions
                                loadOptions={
                                  async () => {
                                    const data = await getBuses()
                                    const formateddata = data?.map(({ label, value, feature }) => {
                                      return ({
                                        label: `Name : ${label}----Feature: ${feature}`,
                                        value: value,
                                      })

                                    })
                                    return formateddata

                                  }

                                }
                                required
                                isSearchable={false}

                                onChange={(e) => {
                                  setQueryObj(
                                    (prev) => {
                                      return ({
                                        ...prev,
                                        bus_id: e.value

                                      })
                                    }
                                  )
                                }}
                                className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                              />


                            </div>
                          </>
                        )
                      }
                      {

                        showAdd && <>
                          <UiButton name={loadingRoute ? "please wait " : "continue "} disabled={loadingRoute}
                            className={"!w-[min(400px,calc(100%-30px))] !mx-auto !pb-2 pt-1.5 !mt-5 !bg-green-900"}
                          />
                          <p

                            className='text-blue-700 px-10 text-center !text-sm pt-2'
                            onClick={() => setShowAdd(false)}> go back </p>
                        </>

                      }


                    </form>
                    {!showAdd && <>
                      <UiButton
                        type="button"

                        name="choose another route " onClick={() => setShowAdd(!showAdd)}
                        className={"!w-[min(400px,calc(100%-30px))] !mx-auto !pb-2 pt-1.5 !mt-5 !bg-blue-900"}
                      />
                    </>}
                  </div>

                </div>
              )
            }


          </>



        </ShowBuses>
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
              disabled={false}
              data-te-ripple-init
              data-te-ripple-color="light">
              {loading ? <Loadingbtn /> : "Change Password"}
            </button>


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
        <div className='flex justify-between items-center px-5'>
          <nav class="flex mb-5 mt-5 px-5 pl-0 lg:hidden" aria-label="Breadcrumb">
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
          <div>
            <span
              onClick={() => {
                if (viewAll) {
                  // code her
                  handleFilterChange("viewall")
                }
                else {
                  // code here
                  handleFilterChange("viewall", "all")

                }
              }
              }
              className='lg:hidden text-blue-400 underline underline-offset-2 text-sm'>view {viewAll ? "all" : "less"}</span>
          </div>
        </div>
        <div className={`lg:flex ${__view && "lg:flex-row-reverse"}  items-start justify-start gap-4 `}>
          <div
            className="flex-none w-[18rem] hidden lg:block
          "

          >

            <Heading text={"Recent Ticket(3)"} className={"!text-center !mb-2"} />

            {

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
                <p className="mb-3 text-sm font-montserrat px-6 uppercase italic !font-light">{(user?.fullname || "loading")} </p>
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
                      className={`${viewAll && "!min-w-[8rem]"}`}
                      percent={userData?.percentageActive}
                      n={userData?.totalActiveTickets}
                      price={userData?.totalActivePrice}
                      text="Active  Ratio" />

                  </SwiperSlide>
                  <SwiperSlide>
                    <PercentageBar
                      className={`${viewAll && "!min-w-[8rem]"}`}
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
                  className={`${viewAll && "!min-w-[8rem]"}`}
                  percent={userData?.percentageActive}
                  n={userData?.totalActiveTickets}
                  price={userData?.totalActivePrice}
                  text="Active  Ratio" />
                <PercentageBar
                  className={`${viewAll && "!min-w-[8rem]"}`}
                  stroke="red"
                  n={userData?.totalInActiveTickets}
                  price={userData?.totalInActivePrice}
                  percent={userData?.percentageInActive}
                  text="InActive  Ratio" />
              </Scrollable>


              <>

                <Scrollable className={`!px-5 md:!grid md:!grid-cols-2 ${viewAll && "!grid md:!grid-cols-2"} !transition-all !duration-[1s] `}>
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
                <Scrollable className={`!px-5 md:!grid md:!grid-cols-2 ${viewAll && "!grid md:!grid-cols-2"}`}>
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

                </Scrollable>
              </>


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

            <div
              className=' overflow-y-auto max-h-[calc(100vh-0px)] lg:max-h-fit overflow-x-hidden '
            >

              <UiButton

                onClick={() => logoutUser()}
                className="!w-[min(30rem,calc(100%-1.5rem))] !mx-auto !py-3.5 !my-5 !text-lg !rounded-xl lg:hidden !bg-red-400"
              >

                <div className='flex items-center gap-x-2 text-xs'>

                  <CiLogout
                    size={25}
                  /> LogOut
                </div>

              </UiButton>


              <Heading text={"Employee Details"} className="!font-semibold !mb-5 underline underline-offset-4--  !text-lg first-letter:text-2xl" />
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
                // onSlideChange={(e) => console.log(e)}
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
              <div>
                <form onSubmit={e => {
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
                <UiButton
                  onClick={() => logoutUser()}
                  className="!w-[min(30rem,calc(100%-1.5rem))] hidden lg:block
                !mx-auto !py-3.5 !my-5 !text-lg !rounded-xl  !bg-red-400"
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
        </div>

        <div className="flex justify-between lg:justify-center  gap-x-4 gap-y-8 lg:gap-x-6
      flex-wrap pr-5 items-start mb-10">


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
              onChange={(e) => handleChange(e, "ticketStatus")}
              // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

              className='!border-none !h-8 mt-0' />
          </div>

          <div className='mt-0'>
            <div className="text-[0.8rem]
          text-slate-300 dark:text-white uppercase
          text-center font-semibold mb-1 font-montserrat"> trip type </div>
            <SelectTrip

              onChange={(e) => handleChange(e, "triptype")}

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
              // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

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
              // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

              isSearchable={false}
              onChange={(e) => handleChange(e, "sort")}

              className='!border-none !h-8 mt-0' />
          </div>
          <div className='mt-0'>
            <div className="text-[0.8rem]
          text-slate-300 dark:text-white uppercase
          text-center font-semibold mb-1 font-montserrat"> Travel Time </div>
            <TimeSelect
              options={timeOptions}
              styles={style}
              defaultValue={{
                label: querySearch.get("traveltime") || "no time",
                value: "no time"
              }}
              // components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

              isSearchable={false}
              onChange={(e) => handleChange(e, "traveltime")}

              className='!border-none !h-8 mt-0' />
          </div>


        </div>
        <ClearFilter keys={[
          "sort,newest",
          "ticketStatus,all",
          "search,*",
          "daterange,*",
          "boardingRange,*",
          "triptype,all",
          "limit,100",
          "sort,newest",
          "_id,xyx",
          "traveltime,no time",
        ]} />

        <Form
          handleChangeText={handleChangeText}
          params={querySearch} />
        <FormatTable
          ticketData={userData}


        />

        <div className='mt-10 ' />


      </motion.div >
    </>
  )
}

export default Details