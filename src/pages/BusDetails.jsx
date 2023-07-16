import { useParams, Link } from 'react-router-dom'
import { Heading, Form, NextButton, PrevButton } from '../components'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSearchParams } from 'react-router-dom'
import formatQuery from "../utils/formatQueryStringParams"
import { components, style } from "../utils/reactselectOptionsStyles"
import { AnimateError } from '../components'
import { toast } from 'react-toastify'
import { Scrollbar, Pagination, Navigation } from 'swiper'
import { motion } from 'framer-motion'
import { FiRefreshCcw } from 'react-icons/fi'
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
import Currenttrip from 'react-select'
import Categories from 'react-select'
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import { MdOutlineClose } from 'react-icons/md'
import AnimateText from '../components/AnimateText'
import ErrorAlert from '../components/Alert'
const token = localStorage.getItem("admin_token");

const BusDetails = () => {
    const focusRef = useRef(null)
    const [busDat, setBusData] = useState({


    })
    async function getCities(inputValue = "") {
        const url = "/admin/allcities";
        try {
            const res = await axios.get(url, {
                headers: {
                    'Authorization': "makingmoney " + token
                },
                params: {
                    search: (inputValue || "")
                }
            })

            return res?.data?.cities
        } catch (err) {
            console.log(err)
            alert("some error occurs")
        }

    }
    const [querySearch, setQuerySearch] = useSearchParams();
    const [tracking_id, setTracking_id] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDisable, setIsAble] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [err, setErr] = useState(null)
    const [currentOpt, setCurrentOption] = useState([])
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

    const { id } = useParams();
    const [bus, setBus] = useState([])
    const [tickets, setTickets] = useState([])

    const getBus = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get("/bus/" + id,
                {
                    headers: {
                        'Authorization': "makingmoney " + token
                    },
                    params: formatQuery(querySearch.toString())
                }
            )
            const __ = res.data?.bus?.trips?.map(({ tracking_id }, index) => {

                return (
                    {
                        label: index + 1,
                        value: tracking_id
                    }

                )

            })
            setCurrentOption(__)
            setBus(res.data?.bus)
            // setTracking_id(res.data?.bus?.tracking_id);
            setTickets(res.data?.tickets)
            console.log(res.data)

        } catch (err) {
            console.log("error : ", err)

        }
        finally {
            setIsLoading(false)
        }

    }

    const handleResetBus = async (e) => {
        e.preventDefault()
        try {
            await axios.patch("/bus/reset/" + bus._id, busDat,
                {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                }
            )
            setIsOpen(false)

        } catch (err) {
            setErr(err.response.data)
            setTimeout(() => {
                setErr("")
            }, 5000)
            console.log(err)
        }
        finally {
            console.log("done ")
        }
    }

    useEffect(() => {
        getBus()
    }, [querySearch])
    const handleChange = (e) => {
        handleFilterChange("tracking_id", e.value)
        // setTracking_id(e.value);

    }
    const Text = ({ text }) => <Heading text={text} className="!mb-0 !text-xs !pl-0 line-clamp-1" />
    return (
        <div className='w-full !float-none h-[calc(100vh-60px)] overflow-y-auto'>


            <div className={` border border-slate-500
            ${isOpen ? "visible opacity-100 pointer-events-all " : "invisible opacity-0 pointer-events-none"}
            fixed 
           
            z-[100]
            lg:!pointer-events-auto
            lg:opacity-100
            lg:visible
            flex-none
            transition-[opacity]
            left-1/2
            -translate-x-1/2
            w-[min(calc(100%-2.5rem),25rem)]
            min-h-[10rem]
            bg-white
            rounded-2xl
            top-1/2
            -translate-y-1/2
            shadow-xl
            shadow-slate-400
            py-5 pb-10`}>
                <span
                    className='absolute
                    w-8 h-8  hover:ring-red-500
           
            md:h-10 md:w-10 rounded-full
            grid place-items-center
            text-xs
            hover:shadow-xl
            lg:hidden
            mx-4
            mt-2
            bg-slate-100
            hover:bg-red-400
            ease duration-500
            transition-colors
            right-0 top-0 '
                    onClick={() => setIsOpen(false)}
                >
                    <MdOutlineClose
                        classNae="text-sm" />
                </span>
                <AnimateText text="reset bus " className='!text-lg uppercase' />

                <form onSubmit={handleResetBus} className="px-6">
                    <div className="mb-6 flex items-center justify-center select-none ">
                        <div className="px-2 w-fit mt-4 flex gap-2">
                            <div className="flex
                                !text-sm
                                flex-col items-center">
                                <Heading text="From" className="!text-sm !text-slate-400  !mb-1" />
                                <FromSelect
                                    onChange={e => setBusData((prev) => ({
                                        ...prev,
                                        from: e.value
                                    }))}
                                    defaultOptions
                                    catcheOptions
                                    loadOptions={getCities}
                                    required

                                    styles={{
                                        ...style,
                                        wdith: "100%",
                                        fontSize: 10 + "px"
                                    }}
                                    components={components()}

                                />
                            </div>
                            <div className="flex !text-sm
                                flex-col items-center">
                                <Heading text="To" className="!text-sm !text-slate-400  !mb-1" />
                                <ToSelect
                                    defaultOptions
                                    catcheOptions
                                    loadOptions={getCities}
                                    // options={seatOptions}
                                    onChange={e => setBusData((prev) => ({
                                        ...prev,
                                        to: e.value
                                    }))}

                                    required
                                    // isSearchable={false}
                                    styles={{
                                        ...style,
                                        wdith: "100%",
                                        fontSize: 10 + "px"
                                    }}
                                    components={components()}

                                />
                            </div>

                        </div>

                    </div>

                    {err && (<AnimateError error={err}
                        errorMessage={err} />)}
                    <button
                        disabled={isDisable}
                        type="submit"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className={`inline-block 
                        rounded 
                        ${isDisable ? "bg-slate-500" : "bg-red-500"}
                        
                   w-fulll
                   mx-auto
                   w-full
                      pb-1.5
                      group-disabled:bg-slate-400
                    pt-2 text-lg
                    !text-capitalize
                    font-montserrat font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] ml-0
  transition duration-150 ease-in-out hover:bg-red-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                    >
                        {isDisable ? "Please wait" : "Reset Bus "}
                    </button>


                </form>
            </div>

            <motion.div
                // drag
                // dragConstraints={constraintsRef}
                onClick={() => getBus()

                }
                animate={{
                    scale: [0.7, 1.2, 0.8],
                    rotate: isLoading ? [0, 360] : null
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    // times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: isLoading ? Infinity : null,
                    // repeatDelay: 1
                }
                }
                className="bottom-1/2
                        -translate-y-1/2 fixed 
                        flex-none 
                        shadow-2xl button-add  top-auto bg-blue-400 
w-[2.5rem]
h-[2.5rem] 
rounded-full 
overflow-hidden 
right-0
z-10  "
            >
                <div className="flex h-full w-full items-center -scale-animation justify-center ">
                    <FiRefreshCcw size={20} color="#fff" className="!rounded-full" />
                </div>
            </motion.div>
            <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <Link
                        to={".."}
                        relative='path'
                        class="inline-flex items-center">
                        <span
                            class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            Bus
                        </span>
                    </Link>
                    <li>
                        <div class="flex items-center">
                            <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Bus details</h1>
                            </a>
                        </div>
                    </li>

                </ol>
            </nav>


            <div className="w-full flex flex-col-reverse lg:flex-row gap-2 items-start lg:px-10 px-4  mb-10">

                <div className="lg:flex-1 w-full lg:w-[calc(100%-25rem)]">
                    <Swiper className="w-full"
                        slidesPervView={1}
                        modules={[Pagination, Navigation]}
                        pagination={{
                            clickable: true
                        }}
                        navigation={{
                            prevEl: ".arrow__left",
                            nextEl: ".arrow__right",
                        }}
                    >
                        <PrevButton className="!left-1.5 arrow__left" />
                        <NextButton className="!right-1.5 arrow__right" />

                        <SwiperSlide>
                            <div className="grid-flow ">
                                {tickets?.map(({
                                    fullname, _id: id, sex, age, email
                                }, index) => {

                                    // const { fullname, _id: id, sex, age, email } = tickets.find(({ seatposition }) => seatposition === _id)
                                    return (
                                        <div
                                            // to={`/dashboard/${id}?admin=true`}
                                            className='py-2 px-1 capitalize
                        line-clamp-1
                        rounded-sm
                        shadow-md
                        bg-white
                        text-center 
                        min-h-[5rem]
                        items-center
                        justify-center
                        '
                                            key={index}
                                        >

                                            <Text text={(index + 1)} />
                                            <Text text={fullname} />
                                            <div className="grid grid-cols-2">
                                                <Text text={"Sex"} />
                                                <Text text={"Age"} />
                                                <Text text={sex} />
                                                <Text text={age} />
                                            </div>

                                            <Text text={"ID CARD N_0"} />
                                            <Text text={email} />

                                        </div>
                                    )
                                }

                                )}

                            </div>

                        </SwiperSlide>

                    </Swiper>


                </div>


                {/* section serctin */}
                <div className="w-full lg:w-[25rem]
                bg-white  shadow-lg shadow-slate-300 pb-5 pt-10 rounded-sm 
                min-h-[10rem]">
                    <Heading text="bus Name" className="uppercase !mb-0 !text-center !text-lg  !font-medium" />
                    <Heading text={bus?.name || "n/a"} className="uppercase !font-[400] !mb-0 !text-center !text-sm" />
                    <Heading text="completed trip" className="uppercase !mb-0 !text-center !text-lg  !font-medium" />
                    <Heading text={bus?.travel_count || "n/a"} className="uppercase !font-[400] !mb-0 !text-center !text-sm" />
                    <Heading text="current trip" className="uppercase !mb-0 !text-center !text-lg  !font-semibold" />
                    <div className="max-w-[10rem] mx-auto w-full">

                        <Currenttrip
                            menuPlacement="top"
                            isSearchable={false}
                            className="w-full"
                            onChange={handleChange}

                            styles={{
                                ...style,
                                wdith: "100%",
                                fontSize: 10 + "px",
                                textAlign: "center"
                            }}
                            components={components()}

                            options={currentOpt} />
                    </div>


                    {/* <Heading text="2" className="uppercase !mb-0 !text-center !text-sm" /> */}
                    <Heading text="Trip Date" className="uppercase !mb-0 !text-center !text-lg  !font-semibold" />
                    <Heading text="12/34/22" className="uppercase !mb-0 !text-center !text-sm" />

                    <a
                        href={`${process.env.REACT_APP_LOCAL_URL}/bus/download/${(querySearch.get("tracking_id") || bus?.tracking_id)}`}

                        target="_blank"

                        // href={process.env.REACT_}
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="
                        text-center
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
                    >
                        download borderaux
                    </a>

                    {

                        true && (


                            <button
                                target="_blank"
                                onClick={() => {
                                    setIsOpen(true)
                                    setTimeout(() => {
                                        focusRef?.current?.focus()
                                    }, 500)

                                }}
                                // href={process.env.REACT_}
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                className=" mt-5
                        text-center
                                    w-[min(400px,calc(100%-2.5rem))]
                                     bottom-0
                                     pb-2
                                     block
                                     min-h-[2rem]
                                     mx-auto
                                    rounded bg-orange-500   px-2 py-1 text-xs font-montserrat font-medium 
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
  transition duration-150 ease-in-out hover:bg-orange-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-orange-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                                reset bus
                            </button>

                        )

                    }
                </div>
            </div>


        </div>
    )
}

export default BusDetails