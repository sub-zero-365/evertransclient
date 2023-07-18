import {
    Button,
    DeactiveStatusButton,
    ActiveStatusButton,
    PrevButton
    , NextButton
} from './'
import { useState, useEffect } from 'react'
import { Heading, Scrollable, PanigationButton } from './'
import axios from "axios"
import { components, style } from "../utils/reactselectOptionsStyles"
import { CustomDatePicker, ToggleSwitch } from './'
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Pagination, Navigation } from 'swiper'
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
import { MdOutlineArrowLeft } from 'react-icons/md'
import { getCities } from "../utils/ReactSelectFunction"
import { motion, AnimatePresence } from 'framer-motion'
import UiButton from './UiButton'
const EditTicketModal = ({ isOpen, setIsOpen, ticket }) => {
    const { from, to } = ticket
    const [data, setData] = useState({})
    const [show, setShow] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        page: 1,
    })
    const [next, setNext] = useState(false)
    useEffect(() => {
        setParams((pre) => ({
            ...pre,
            daterange: `start=${new Date(startDate).toLocaleDateString('en-ZA')},end=null`
        }))
    }, [startDate])
    useEffect(() => {
        if (params.from) delete params.from
        if (params.to) delete params.to
    }, [show])
    useEffect(() => {
        if (!isOpen) {
            setNext(false)
        }
    }, [isOpen])
    const handleChange = ({ value }, key) => {
        setParams((pre) => ({
            ...pre,
            [key]: value
        }))
    }

    const getData = async () => {
        setLoading(true)
        if (!params.from) {
            params.from = from

        }
        if (!params.to) {
            params.to = to
        }
        try {
            const res = await axios.get("/seat",
                {
                    params
                })
            console.log(res.data)
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

    const getNextDay = (date = new Date()) => {
        const next = new Date(date.getTime());
        next.setDate(date.getDate() + 1);
        return next.toLocaleDateString("en-CA")
    }

    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 z-[2] ${isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"}
w-screen h-screen 
bg-slate-600/50 flex items-center justify-center`}>

            <div
                onClick={e => e.stopPropagation()}
                className={`
relative

flex-none
transition-[opacity]
z-20
w-[min(calc(100%-2.5rem),25rem)]
bg-white
rounded-2xl
 max-h-[calc(100vh-100px)]
overflow-y-auto
lg:overflow-y-visible
shadow-xl
shadow-slate-400
py-5 pb-10`}

            >
                <AnimatePresence>

                    {

                        next && (
                            <motion.div
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={{ x: "0px", opacity: 1 }}
                                exit={{ x: "-100%", opacity: 0 }}
                                className={`h-full absolute   w-full z-[30] bg-white/95 inset-0 `}>
                                <div className="flex gap-x-3">
                                    <MdOutlineArrowLeft size={20} onClick={() => setNext(!next)} />
                                    <Heading text={"Select Bus"} className="!inline-block !mb-0 !ml-1">select bus</Heading>
                                </div>
                                <Swiper
                                slidesPerView={1}
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
                                    <PrevButton className="!left-1.5 arrow__left" />
                                    <NextButton className="!right-1.5 arrow__right" />
                                    {
                                        data?.seats?.map(({ seat_positions, traveltime }) => {
                                            return (
                                                <SwiperSlide>
                                                    <div>
                                                        <Heading text={traveltime} className="!mb-1" />

                                                        <Scrollable
                                                            className="!gap-x-1 !mb-1 !gap-y-0.5 !flex-wrap px-2">
                                                            {
                                                                seat_positions?.
                                                                    filter(({ isTaken, isReserved }) => {
                                                                        if (isTaken == false) {
                                                                            return true
                                                                        }
                                                                        // if (isReserved == false) {
                                                                        //     return true
                                                                        // }

                                                                    })?.map(({ _id },
                                                                        index) => (<PanigationButton
                                                                            onClick={() => 0}
                                                                            text={(_id + 1)}
                                                                            index={(_id + 1)} />))
                                                            }
                                                        </Scrollable>
                                                        <UiButton onClick={() => 0} name="Submit"
                                                            className="!px-8 !mx-auto !mb-5 !bg-green-500" />
                                                    </div>
                                                </SwiperSlide>
                                            )


                                        })

                                    }



                                </Swiper>

                            </motion.div>
                        )

                    }
                </AnimatePresence>

                <form className="px-6" onSubmit={handleSubmit}>
                    <CustomDatePicker
                        startDate={startDate}
                        setStartDate={setStartDate}
                        maxDate={getNextDay()}
                    />
                    <div className="mb-1">
                        <ToggleSwitch
                            message="edit the travel path is open"
                            state={show}
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
            ${false ? "bg-slate-500" : "bg-blue-500"}
            
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


                </form>
            </div>


        </div>

    )


}
export default EditTicketModal