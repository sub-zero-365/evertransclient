import {
    Button,
    DeactiveStatusButton,
    ActiveStatusButton,
    PrevButton
    , NextButton
} from './'
import emptybox from "../Assets/images/empty-box.gif"
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Heading, Scrollable, PanigationButton } from './'
import axios from "axios"
import { getCities } from "../utils/ReactSelectFunction";

import { CustomDatePicker, ToggleSwitch } from './'
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import AnimateError from './AnimateError'
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
import { motion, AnimatePresence } from 'framer-motion'
import UiButton from './UiButton'
import AnimatedText from './AnimateText'
import { useSearchParams, useNavigate } from 'react-router-dom'
import TimeSelect from 'react-select'
import { timeWithClearOptions as timeOptions } from '../utils/sortedOptions'
import { style, components } from '../utils/reactselectOptionsStyles'
const EditTicketModal = ({ isOpen, setIsOpen, ticket, className }) => {
   
    const token = localStorage.getItem("token");
    let [upgrade, setUpgrade] = useState(false)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const goto = searchParams.get("admin") || false
    let { from, to, type, seat_id } = ticket
    if (type == "roundtrip") {
        const [first, second] = ticket?.doubletripdetails
        if (first.active == false && second.active == true && ticket.active == true) {
            let tmp = from;
            from = to;
            to = tmp;
        }

    }
    const [data, setData] = useState({})
    const [show, setShow] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        page: 1,
    })
    const [selectseat, setSelectseat] = useState(ticket.seatposition)
    const [next, setNext] = useState(false)
    useEffect(() => {
        setParams((pre) => ({
            ...pre,
            daterange: `start=${new Date(startDate).toLocaleDateString('en-ZA')},end=null`,
            from,
            to
        }))
    }, [startDate, isOpen, show])
    const [err, setErr] = useState("")

    useEffect(() => {
        if (!isOpen) {
            setNext(false)
            if (upgrade) setUpgrade(false)
            if (show) setShow(false)
        }
        setSelectseat(ticket?.seatposition)
    }, [isOpen])
    const handleChange = ({ value }, key) => {
        setParams((pre) => ({
            ...pre,
            [key]: value
        }))
    }

    const getData = async () => {
        setLoading(true)
        try {
            console.log("params", params)
            const res = await axios.get("/seat",
                {
                    params
                })
            setData(res.data)
        } catch (err) {
            console.log("err", err)
        } finally {
            setLoading(false)
            setNext(true)

        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        getData()

    }
    const [submitloading, setSubmitLoading] = useState(false)
    const [time, setTime] = useState("")
    const handleEditMeta = async (seat__id, seatposition, traveltime, traveldate) => {
        console.log(seat__id, seatposition)
        setSubmitLoading(true)
        if (seat__id == null) alert("select seat")
        try {
            const res = await axios.patch("/ticket/updateticket/" + ticket._id, {
                seatposition,
                seat_id: seat__id,
                traveltime, traveldate,
                ...params
            }, {

                headers: {
                    'Authorization': "makingmoney " + token
                },
            });
            setIsOpen(false)
            if (!goto) return navigate(`${ticket?._id}`)
            navigate(`/dashboard/${ticket?._id}`)
        } catch (err) {
            console.log(err);
            setErr(err.response.data);
            setTimeout(() => {
                setErr(null)
            },
                5000)
        }
        finally {
            setTimeout(() => {
                setSubmitLoading(false)
            }, 5000)
        }
    }
    const getNextDay = (date = new Date()) => {
        const next = new Date(date.getTime());
        next.setDate(date.getDate() + 1);
        return next.toLocaleDateString("en-CA")
    }

    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`
            ${className}
            fixed inset-0 z-[2] ${isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"}
w-screen h-screen 
bg-slate-600/50 flex items-center justify-center`}>
            <motion.div
                onClick={e => e.stopPropagation()}
                className={`
relative
flex-none
transition-[opacity]
z-50
w-[min(calc(100%-2.5rem),30rem)]
bg-white
dark:bg-slate-800
rounded-2xl
 max-h-[calc(100vh-100px)]
shadow-xl
dark:shadow-sm 
dark:shadow-black
shadow-slate-400 
 pb-2`}
            >
                <AnimatePresence>
                    {
                        next ? (
                            <motion.div
                                initial={{ scale: "0", opacity: 0 }}
                                animate={{ scale: "1", opacity: 1 }}
                                exit={{ scale: "0", opacity: 0 }}

                                className={` w-full z-[30] rounded-lg bg-white/95 dark:bg-slate-800 inset-0 `}>
                                <div className="flex gap-x-3 items-center">
                                    <span
                                        onClick={() => setNext(!next)}
                                        className='hover:bg-slate-300 
                                w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full '
                                    >
                                        <AiOutlineArrowLeft size={20}
                                            className="flex-none pl-1 " />

                                    </span>
                                    <Heading text={"Select Seat"} className="!inline-block !flex-1 !text-lg !pl-0 !text-center !mb-0 !ml-1">select bus</Heading>
                                    <Heading text={`Travel Date: ${(new Date(startDate).toLocaleDateString())}`} className="!inline-block !text-xs !flex-1 !italic !text-gray-800 !font-bold dark:!text-white !pl-0 !mb-0 !ml-1">select bus</Heading>


                                </div>
                                <div className='w-[min(100px,calc(100%-20px))] mx-auto !text-xs relative z-[200]'>
                                    <TimeSelect
                                        options={timeOptions}
                                        styles={style}
                                        components={components()}
                                        isSearchable={false}

                                        onChange={(e) => {
                                            setTime(e.value)
                                        }}
                                    // menuPlacement="top"

                                    />

                                </div>
                                <Swiper
                                    slidesPerView={1}
                                    className="relative"
                                    modules={[Navigation]}
                                    navigation={{
                                        prevEl: ".arrow__left",
                                        nextEl: ".arrow__right",
                                    }}
                                >
                                    <PrevButton className="!left-1.5 arrow__left" />
                                    <NextButton className="!right-1.5  arrow__right" />
                                    {
                                        data?.seats.length >= 1 ?
                                            data?.seats?.filter(({ traveltime }) => ((time == "") || traveltime == time))
                                                ?.map(({ seat_positions,
                                                    traveltime,
                                                    traveldate, bus,
                                                    _id: seat__id }, index) => {
                                                    const isClassic = (ticket?.seatposition < 20 && ticket?.price <= 6500&&(!ticket?.updatePrice) &&
                                                        (bus?.feature == undefined || bus?.feature == null || bus?.feature == "vip")
                                                    )
                                                    return (
                                                        <SwiperSlide key={index}>
                                                            {
                                                                (ticket?.seatposition > 19) && (
                                                                    <div className="">
                                                                        <div className="flex justify-center ">
                                                                            <Heading className="!mb-0 !text-sm !text-red-600 !text-semibold !text-center" text="Upgrade to Vip Seat!" />
                                                                        </div>
                                                                        <ToggleSwitch
                                                                            initialMessage={"upgrade user"}
                                                                            message={"caution you want to upgrade!"}
                                                                            state={upgrade
                                                                            }
                                                                            onChange={() => setUpgrade(!upgrade)} /></div>
                                                                )
                                                            }
                                                            <div>
                                                                <Heading text={`Bus Name:   ${bus?.bus}`} className="!mb-1 !text-lg !text-center !text-gray-500 dark:!text-white" />
                                                                <Heading text={`Departure time:   ${traveltime}`} className="!mb-1 !text-lg !text-center" />
                                                                <Scrollable
                                                                    className="!gap-x-1 !justify-center !mb-1
                                                            !gap-y-0.5 !flex-wrap px-2">
                                                                    {
                                                                        seat_positions?.slice(
                                                                            ...(
                                                                                (((ticket?.seatposition + 1) <= 20) || upgrade) ? [0, 20] : [20]
                                                                            )
                                                                        )?.
                                                                            filter(({ isTaken, isReserved }) => {
                                                                                if (isReserved === false && isTaken == false) return true
                                                                                return false
                                                                            }
                                                                            )
                                                                            ?.map(({ _id, bus }) => (<
                                                                                PanigationButton
                                                                                className={`${(_id == selectseat) && "!border-2 !border-"}`}
                                                                                onClick={() => setSelectseat(_id)}
                                                                                text={(_id + 1)}
                                                                                index={(_id + 1)}
                                                                                active={selectseat + 1}
                                                                                key={_id}
                                                                            />))
                                                                    }
                                                                </Scrollable>
                                                                <AnimateError
                                                                    error={err}
                                                                    errorMessage={err} />
                                                                {
                                                                    isClassic && (
                                                                        <motion.p
                                                                            className='px-3 text-center text-rose-500 pb-1'
                                                                            initial={{ y: 20 }}
                                                                            animate={{ y: 0 }}
                                                                        >
                                                                            you need to collect money to upgrade ticket cause is a classic ticket
                                                                        </motion.p>
                                                                    )
                                                                }
                                                                {

                                                                  isClassic&&<ToggleSwitch
                                                                    initialMessage={"upgrade user"}
                                                                    message={"caution you want to upgrade!"}
                                                                    state={upgrade
                                                                    }
                                                                    onChange={() => setUpgrade(!upgrade)} />
                                                                    
                                                                }
                                                                {selectseat !== null &&(isClassic==false || upgrade)&& (<UiButton
                                                                    disabled={submitloading}
                                                                    onClick={() => handleEditMeta(seat__id,
                                                                        selectseat, traveltime, traveldate)} name={
                                                                            submitloading ? "Please wait ..." : "Submit"
                                                                        }
                                                                    className="!px-10 !pb-2 !pt-1.5 !mx-auto !mb-5 !bg-green-500" />
                                                                )}
                                                                
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                }) : <>
                                                <AnimatedText text="oops no Available  Seat found on this day"
                                                    className="!text-center  !mb-0 !font-semibold 
                                                    !text-xl !pl-0 !absolute z-10 !text-black !top-14 !left-4" />
                                                <img src={emptybox} className="h-full w-[calc(100%-10px)] object-cover overflow-hidden max-h-[20rem] dark:grayscale-[100%] 
                                                dark:invert-0 mx-auto dark:blur-[2px]" />
                                            </>

                                    }
                                </Swiper>


                            </motion.div>
                        ) : (
                            isOpen && <motion.form
                         
                                className="px-6" onSubmit={handleSubmit}>
                                <CustomDatePicker
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    maxDate={getNextDay()}
                                />
                                <div className="mb-1">
                                    <ToggleSwitch
                                        message="edit the travel path is open"
                                        state={type == "singletrip" ? true : show}
                                        disabled={type == "singletrip" ? true : ticket?.doubletripdetails[0].active}
                                        onChange={() => setShow(!show)}
                                        initialMessage="edit travel path" />
                                </div>
                                {
                                    show && (
                                        <div className="lg:px-2 mb-2">
                                            <div className="flex-none">
                                                <Heading text={"From"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />
                                                <FromSelect
                                                    defaultOptions
                                                    catcheOptions
                                                    loadOptions={getCities}
                                                    required
                                                    styles={{
                                                        ...style,
                                                        wdith: "100%",
                                                        fontSize: 10 + "px"
                                                    }}
                                                    onChange={(e) => handleChange(e, "from")}
                                                    components={components()}
                                                    className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                                                />
                                            </div>
                                            <div className="flex-none">
                                                <Heading text={"Destination"} className="!text-[0.8rem] !pl-0 !mb-0 uppercase text-slate-400" />
                                                <ToSelect
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
                                                    onChange={(e) => handleChange(e, "to")}
                                                    className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                                                />
                                            </div>
                                        </div>
                                    )

                                }
                                <button
                                    disabled={false}
                                    type="submit"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    className={`inline-block 
                    rounded 
                    ${loading ? "bg-slate-500" : "bg-blue-500"}
                    
               w-fulll
               mx-auto
               w-full
                  pb-1.5
                  group-disabled:bg-slate-400
                pt-2 text-sm
                font-montserrat font-medium uppercase
        leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] ml-0
        transition duration-150 ease-in-out hover:bg-primary-600
        hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
        focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
        focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                                >
                                    {loading ? "Please wait" : "Find Avalaible Seat"}
                                </button>
                            </motion.form>
                        )
                    }
                </AnimatePresence>
            </motion.div>
        </div >
    )
}
export default EditTicketModal