import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heading, Form, NextButton, PrevButton } from '../components'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSearchParams } from 'react-router-dom'
import formatQuery from "../utils/formatQueryStringParams"
import { AnimateError } from '../components'
// import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
// import { FiRefreshCcw } from 'react-icons/fi'
import { components, style } from "../utils/reactselectOptionsStyles"
import { toast } from 'react-toastify'
import { BsSliders2Vertical } from 'react-icons/bs'
import { ToggleSwitch } from '../components'
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

import UiButton, { UiButtonDanger } from '../components/UiButton';
import AnimatedText from '../components/AnimateText';

const token = localStorage.getItem("admin_token");

const BusDetails = () => {
    const navigate = useNavigate()

    const [querySearch, setQuerySearch] = useSearchParams();
    // const [tracking_id, setTracking_id] = useState("")
    const [isLoading, setIsLoading] = useState(false)
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
    // toast.promise(handleDeleteBus().then((data) => {
    //     navigate(-1)
    // }), {
    //     pending: "please wait deleting...",
    //     success: " Done deleting",
    //     error: "Something went wrong ,try again later"

    // })
    const [text, setText] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        toast.promise(handleDeleteBus().
        then((data) => {
            navigate(-1)
        }), {
            pending: "please wait deleting...",
            success: " Done deleting",
            error: "Something went wrong ,try again later"

        })
    }
    const handleDeleteBus = async () => {
        return axios.delete("/bus/" + id, {
            headers: {
                'Authorization': "makingmoney " + token
            },
        })

    }
    const getBus = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get("/bus/" + id,
                {
                    headers: {
                        'Authorization': "makingmoney " + token
                    },
                    // params: formatQuery(querySearch.toString())
                }
            )

            // setCurrentOption(__)
            setBus(res.data)
            // setTickets(res.data?.tickets)
            console.log(res.data)

        } catch (err) {
            console.log("error : ", err)

        }
        finally {
            setIsLoading(false)
        }

    }


    const [togglename, setToggleName] = useState(true);

    useEffect(() => {
        getBus()
    }, [querySearch])
    if (isLoading) return <div>Loading bus Details</div>
    return (
        <div className='!flex-1 h-[calc(100vh-60px)] container mx-auto overflow-y-auto pb-24'>
            <div
                className={`overlay ${isOpen && "active"} transition-[visible] duration-100
      group grid place-items-center `}
                onClick={() => setIsOpen(false)}
            >
                <div
                    onClick={e => e.stopPropagation()}
                    className={`
          -translate-x-[50px]
          md:translate-x-0
          md:translate-y-[50px]
          group-[.active]:translate-x-0
          duration-700
          ease 
          transition-all
          opacity-60
          md:group-[.active]:translate-y-0
          group-[.active]:opacity-100
          bg-white
          dark:bg-slate-800
          shadow-sm
          rounded-lg
          w-[min(calc(100%-40px),400px)]
          
            py-5 pb-10`}>

                    <AnimatedText text="change password "
                        className='!mb-1 !text-lg !text-rose-600 !text-center capitalize' />
                    <p className="text-lsm !font-montserrat !text-center mb-6">Enter Bus name to delete Bus: <span className="!text-sm !text-rose-600">{bus?.bus?.name}</span></p>
                    <form
                        onSubmit={handleSubmit}
                        className='px-5'
                    >

                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                value={text}
                                onChange={e => setText(e.target.value)}
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
                                id="text"
                                placeholder="text" required />
                            <label
                                htmlFor="text"
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
                                Enter Bus Name
                            </label>
                        </div>
                        <UiButtonDanger
                            disabled={
                                (text !== bus?.bus?.name)
                            }
                            name="DELETE BUS" className="" />



                    </form>
                </div>
            </div>
            <AnimatedText text={"Bus Details "} className='!text-3xl !text-center lg:!text-4xl w-full' />
            <div className='flex flex-col lg:flex-row w-full'>
                <div className='mb-10 '>
                    <Heading text={"Properties"} className={"!font-black"} />
                    <div className='px-5 space-y-2 lg:w-[40rem] p'>
                        <div className="flex justify-between items-center  flex-wrap pb-0.5 dark:border-slate-400 border-b-2">
                            <Heading text={"Name "} className={"!font-black !pl-0 !mb-0  "} />
                            <p>{bus?.bus?.name || "n/a"}</p>
                        </div>
                        <div className="flex justify-between items-center  flex-wrap pb-0.5 dark:border-slate-400 border-b-2">
                            <Heading text={"Capacity"} className={"!font-black !pl-0 !mb-0  "} />
                            <p>{bus?.bus?.number_of_seats || "n/a"}</p>
                        </div>
                        <div className="flex justify-between items-center  flex-wrap pb-0.5 dark:border-slate-400 border-b-2">
                            <Heading text={"Plate Number"} className={"!font-black !pl-0 !mb-0  "} />
                            <p>{bus?.bus?.plate_number || "n/a"}</p>
                        </div>
                        <div className="flex justify-between items-center  flex-wrap pb-0.5 dark:border-slate-400 border-b-2">
                            <Heading text={"Trip Completed"} className={"!font-black !pl-0 !mb-0  "} />
                            <p>{bus?.seats || "n/a"}</p>
                        </div>

                    </div>
                    <div className='grid place-items-center mt-3 '>
                        <Heading text={"Caution!!!"}
                            className={"!mb-2 !pl-0"} />
                        <UiButtonDanger
                            name={"Delete Bus"}
                            onClick={() => setIsOpen(true)}
                            className={"!scroll-px-10 !px-12"} />
                    </div>
                </div>
                <div className='lg:w-full mx-4 mb-10 shadow pb-10 lg:mr-5  bg-white dark:bg-slate-900 py-7 rounded-sm px-6'>
                    <div className="flex items-center">
                        <Heading text={"Bus Setting"} className={"!font-black mr-1 !mb-1"} />
                        <BsSliders2Vertical size={20} />
                    </div>
                    <div className='px-5'>
                        <div className="flex 
                        items-center
                        gap-x-4 mb-4">
                            <Heading text={"Edit Bus Name"}
                                className={"!font-medium !text-lg lg:text-xl mr-1  !mb-0 !mt-2"} />
                            <ToggleSwitch
                                state={togglename}
                                initialMessage={"-"}
                                onChange={() => setToggleName(!togglename)} />
                        </div>

                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                disabled={togglename}
                                type="text"
                                className={`peer block min-h-[auto] w-full 
                                ${togglename && "!bg-slate-200 dark:!bg-slate-950 !text-slate-700"}
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
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                id="exampleFormControlInput3"
                                placeholder="Phone Number" required />
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

                            >Phone Number
                            </label>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className='flex flex-col space-y-2  items-start'>
                                <Heading text={"Feature"}
                                    className={"!font-medium !text-sm mr-1 !pl-0  !mb-0 !mt-2"} />
                                <div className="relative mb-6 pt-2" data-te-input-wrapper-init>
                                    <input
                                        type="text"
                                        className={`peer block min-h-[auto] w-full 
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
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                        id="exampleFormControlInput3"
                                        placeholder="Phone Number" required />

                                </div>
                            </div>
                            <div className='flex flex-col space-y-2  items-start'>
                                <Heading text={"Edit Plate Number"}
                                    className={"!font-medium !text-sm mr-1 !pl-0  !mb-0 !mt-2"} />
                                <div className="relative mb-6 pt-2" data-te-input-wrapper-init>
                                    <input
                                        type="text"
                                        className={`peer block min-h-[auto] w-full 
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
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                                        id="exampleFormControlInput3"
                                        placeholder="Phone Number" required />

                                </div>
                            </div>
                        </div>

                    </div>
                    <UiButton
                        name={"Submit !"}
                        className={"!block !text-lg !mx-auto  !mt-10 lg:!mt-20 !py-1 pb-1.5 !w-[min(calc(100%-40px),400px)]"} />
                </div>

            </div>

        </div>
    )
}

export default BusDetails