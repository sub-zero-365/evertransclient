import { AnimatePresence, motion } from "framer-motion";

import { FiAlertCircle } from "react-icons/fi";

import { createContext, forwardRef, useContext, useState } from "react";
import AnimatedText from "../components/AnimateText"
import { Link, useParams, useNavigate, redirect, useLoaderData, Form } from 'react-router-dom'
import {
    Heading,
}

    from '../components'
import { toast } from "react-toastify"
import Marquee from 'react-fast-marquee'
import dayjs from "dayjs"
import { useSearchParams } from 'react-router-dom'
import { getBuses } from '../utils/ReactSelectFunction'
import { components, style } from "../utils/reactselectOptionsStyles"
import { useEffect, useRef } from 'react'
import BusSelect from 'react-select/async'
import {
    useQuery, useQueryClient
} from '@tanstack/react-query'
// import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { ToggleSwitch, DisplayUi } from "../components"
import { AiOutlineWarning } from "react-icons/ai"
import { useFilter } from '../Hooks/FilterHooks'
import customFetch from "../utils/customFetch"
import EmptyModal from "../pages/ShowBuses"
import UiButton from "../components/UiButton"
import LoadingButton from "../components/LoadingButton"
import Modal from "./ShowBuses"
import LittleSeat from "../components/LittleSeat"
const singleSeat = (id) => {
    return ({
        queryKey: ["seat", id],
        queryFn: async () => {
            const res = await customFetch.get(`/seat/specific/${id}`)
            return res.data
        }
    })
}
const seatDetails = (id) => {
    return ({
        queryKey: ["seatdetails", id],
        queryFn: async () => {
            const res = await customFetch.get(`/seat/seatdetails/${id}`)
            return res.data
        }
    })
}


export const loader = (queryClient) => async ({ params }) => {
    try {
        await queryClient.ensureQueryData(singleSeat(params.id))
        return params.id
    } catch (err) {
        throw err
    }

}
export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const id = data.id
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    try {
        await customFetch.
            patch(`/seat/update/${id}`
                , data);
        queryClient.invalidateQueries(['seat', id]);
        toast.success('successfully edited seat');
        // return redirect('/dashboard/bus?rd_from=editpage');
        if (params.rd_from == "busseatpage") {
            const formquery = Object.keys(params)
                .filter(y => !(["rd_from", "edited"].includes(y)))
                .map(x => `${x}=${params[x]}&`).join("");
            // alert(formquery)
            return redirect(`/bussits/${id}?${formquery}`)
        }
        return null
    } catch (error) {
        toast.error(error?.response?.data || "some thing went wrong");
        return error;
    }
}



const ExampleWrapper = () => {
    //   const [isOpen, setIsOpen] = useState(false);
    const { isModalOpen, setIsModalOpen, data } = useContext(ModalContext);

    return (
        <div className=" bg-slate-900 grid place-content-center">
            {/* <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
                Open Modal
            </button> */}
            <SpringModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}
                {...data}
            />
        </div>
    );
};

const SpringModal = ({ isOpen, setIsOpen, _id }) => {
    const { id } = useParams()
    // const { data,isLoading, } = useQuery(singleSeat(id));
    const queryClient = useQueryClient();
    const { from, to, traveldate, bus } = queryClient.getQueryData({ queryKey: ["seat", id] })?.seat
    // alert(state?.data.seat.from)
    const [tripType, setTripType] = useState("singletrip");
    const typeBtn = forwardRef((props, ref) => (<UiButton myRef={ref} {...props} />))
    const TypeButton = motion(typeBtn)
    const RiAlertCircle =
        forwardRef((props, ref) => (
            <FiAlertCircle {...props} ref={ref} />
        ))
    // forwardRef((props, ref) => (<FiAlertCircle {...props} ref={ref}  />))
    const FiAlertCircleMotion = motion(RiAlertCircle)
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0, }}
                    onClick={() => setIsOpen(false)}
                    transition={{
                        duration: 0.75
                    }}
                    className={`bg-slate-900/20 group
                    backdrop-blur p-8 fixed inset-0 z-50 grid 
                    place-items-center overflow-y-scroll cursor-pointer ${isOpen && "active"}`}
                >
                    {/* {JSON.stringify(state)} */}
                    <motion.div
                        transition={{
                            duration: .75 * .5
                        }}
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                            y: -50, opacity: 0,
                            transition: {
                                duration: 0.5
                            }
                        }}

                        onClick={(e) => e.stopPropagation()}
                        className={`bg-gradient-to-br  from-violet-600
                        to-indigo-600 text-white p-6 rounded-lg w-full
                        max-w-lg shadow-xl cursor-default relative overflow-hidden 
                        
                        `}
                    >
                        <FiAlertCircleMotion


                            className="text-white/10 
                            
                            group-[.active]:scale-[2]
                            
                            rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
                        <div className="relative z-10 ">
                            <div className="bg-white
                             group-[.active]:animate-bounce
                            w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                                <FiAlertCircleMotion

                                />
                            </div>
                            <h3 className="text-3xl font-bold text-center mb-2">
                                Book Seat From Here!
                            </h3>
                            <h3 className="text-lg  text-center mb-2">
                                you have select seat number({_id + 1})
                            </h3>
                            <h5 className="text-lg font-medium text-center  ">Please select trip type</h5>
                            <div className="relative gap-x-5 my-5  flex justify-center items-center">

                                <TypeButton
                                    onClick={() => {
                                        setTripType("singletrip")
                                    }}
                                    initial={{
                                        backgroundColor: tripType == "singletrip" ? "orange" : "blue",

                                    }}
                                    animate={{
                                        scale: tripType == "singletrip" ? [1, 1.3, 1] : null,

                                    }}

                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.2, 0.5, 0.8, 1],
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }
                                    }
                                >Single</TypeButton>
                                <TypeButton
                                    onClick={() => {
                                        setTripType("roundtrip")
                                    }}
                                    animate={{
                                        scale: tripType == "roundtrip" ? [1, 1.3, 1] : null,

                                    }}
                                    initial={{
                                        // scale: tripType == "roundtrip" ? [1, 2, 1, 3, 0, 1] : null,
                                        backgroundColor: tripType == "roundtrip" ? "orange" : "blue",

                                    }}

                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.2, 0.5, 0.8, 1],
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }
                                    }
                                >round</TypeButton>
                            </div>
                            {/* <p className="text-center mb-6">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                                aperiam vitae, sapiente ducimus eveniet in velit.
                            </p> */}
                            <div className="flex gap-2">
                                <button
                                    // onClick={() => setIsOpen(false)}
                                    onClick={() => {
                                        navigate(`/bussits/${id}?from=${from}&to=${to}&traveldate=${traveldate}&type=singletrip&seatposition=${_id}&seat_id=${id}`)
                                    }}
                                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                                >
                                    Book New
                                </button>
                                <button
                                    onClick={() => {
                                        navigate(`/customer?from=${from}&to=${to}&traveldate=${traveldate}&type=${tripType}&seatposition=${_id}&seat_id=${id}`)
                                    }}

                                    className="bg-white
                                    translate-y-10
                                    group-[.active]:translate-y-0
                                    delay-75
                                    duration-[1s]
                                    hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                                >
                                    Continue as customer
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ModalContext = createContext()

const SeatDetails = () => {
    const queryClient = useQueryClient()
    const id = useLoaderData()
    // const { handleChange: onChange, handleFilterChange } = useFilter()
    // const token = localStorage.getItem("token");
    const [isOpen, setIsOpen] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [timer, setTimer] = useState(null)
    const [isMouseDownTimer, setIsMouseDownTimer] = useState(false);
    const [data, setData] = useState({})
    useEffect(() => {
        if (isMouseDownTimer) {
            setToggle(true)
        }
        // alert("mouse is down")
    }, [isMouseDownTimer])

    const handleMouseDown = (propsData) => {
        const { isTaken, isReserved, _id, index } = propsData
        const _timer = setTimeout(() => {
            // setIsMouseDownTimer(true)
            window.navigator?.vibrate([100])
           
            if (isTaken || isReserved) {
                //   setse
                // seatposition(_id)
                setPos(_id)
                setIsOpen(true)
                return
            }
            setData({
                ...propsData, id
            })
            setIsModalOpen(true)

            clearTimeout(timer)
        }, 1000);
        setTimer(_timer)
    }
    const handleMouseUp = () => {
        clearTimeout(timer)
        setIsMouseDownTimer(false)
        // setData({})
    }


    const ref = useRef(null)
    let downloadbaseurl = null
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        downloadbaseurl = process.env.REACT_APP_LOCAL_URL
    } else {
        downloadbaseurl = process.env.REACT_APP_PROD_URL
    }

    const [querySearch] = useSearchParams();
    const isadminuser = querySearch.get("admin")
    const ticket_seat = querySearch.get("ticket_seat");

    const [activeSeat, setActiveSeat] = useState(ticket_seat);
    const [
        isOpen_,
        setIsOpen_] = useState(querySearch.get("edited") == "true")


    useEffect(() => {
        let timer = null
        ref?.current?.scrollIntoView({ behavior: "smooth" })
        if (activeSeat) {
            timer = setTimeout(() => {
                setActiveSeat(null)
            }, 6000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [activeSeat])

    const tickets = useQuery(seatDetails(id)).data;
    const { seat } = useQuery(singleSeat(id)).data ?? {};
    const navigate = useNavigate()

    const [state, setState] = useState(false);
    const [seatposition, setPos] = useState(null)
    const handleChange = () => {
        setState(true)
        // alert(data._id)
        return customFetch.post("ticket/removeticketfrombus", {
            seat_id: id,
            seatposition: seatposition
        })

    }
    const handleClick = async (index) => {
        return customFetch.get(`/seat/ticket/${id}/${index}`)
    }



    // useEffect(() => {
    //     // if(querySearch.get("edited")=="")
    //     const timer = setTimeout(() => {
    //         handleFilterChange("edited", null)
    //     }, 2000)
    //     return () => clearTimeout(timer)
    //     // if (isOpen_ == true) {
    //     //     handleFilterChange("edited", null)
    //     // }
    // }, [])
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <ModalContext.Provider
            value={{
                isModalOpen, setIsModalOpen, data
            }}
        >
            <ExampleWrapper />

            <Helmet>
                <title>
                    Borderaux Details
                </title>
            </Helmet>
            <Modal isOpen={toggle} setIsOpen={setToggle} className2="!px-2"
                title="You can book a seat straight from this page"
            >
                ask the user if the want to book a seat
                {/* <div className="flex flex-wrap py-4 transition-transform duration-700 ">
                    {Array.from({ length: 10 }, (arr, idx) => {
                        return (

                            <div
                                className="w-1/4 group
                          cursor-pointer hover:bg-green-950- transition duration-300 
                          h-[3.75rem] p-2 px-3 select-none"
                            >


                                <LittleSeat
                                    _id={idx}
                                    isReserved={false}
                                    isTaken={true}
                                    // animate={ === _id}
                                    key={idx}
                                // selected={selected}
                                // onClick={() => checkBusAvailabity(isTaken, isReserved, _id, true)}
                                />
                            </div>
                        )
                    })}
                </div> */}
                <Link
                    to="/customer"
                >Select</Link>
            </Modal>
            <EmptyModal
                title="Transfers a bus Seat"
                isOpen={isOpen_}
                setIsOpen={setIsOpen_}
            >

                <Heading text={"Choose A bus from list to assign to seat"} className="!text-[0.8rem] !text-center !pl-0 !mb-0 uppercase text-slate-400" />
                <div className="flex-none mb-10 w-[min(calc(100%-20px),200px)] mx-auto">
                    <Form
                        method="post"
                    >
                        <BusSelect
                            defaultOptions
                            catcheOptions
                            loadOptions={getBuses}
                            required
                            defaulValues={{
                                value: seat?.bus?._id,
                                label: seat?.bus?.bus,
                            }}
                            styles={{
                                ...style,
                                wdith: "100%",
                                fontSize: 10 + "px"
                            }}
                            // onChange={(e) => 0}
                            name="bus_id"
                            components={components()}
                            className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
                        />
                        <input
                            type="hidden"
                            name="id"
                            value={id}
                        />
                        <LoadingButton
                            className="!w-[min(250px,calc(100%-1rem))] !bg-green-900 !mx-auto line-clamp-1 !py-4 !-mb-4"
                        >
                            Submit
                        </LoadingButton>
                    </Form>
                </div>
            </EmptyModal>
            <div className="!flex-1 h-[calc(100vh-60px)] container mx-auto overflow-y-auto pb-24" >
                <div className={`overlay !h-[100%] group !bg-slate-200/25 !fixed inset-0  bottom-0 ${isOpen ? "active" : null}`} onClick={() => setIsOpen(false)}>

                    <div className="absolute w-[min(400px,calc(100%-60px))]
                    rounded-t-lg
                    md:rounded-b-lg
                    dark:bg-slate-800
                    bg-white left-1/2 
                    -translate-x-1/2 
                    -bottom-full
                    md:-top-full
                    md:!bottom-auto
                    md:group-[.active]:!top-10
                    group-[.active]:bottom-0
                    md:transition-[top] 
                    transition-[bottom] 
                    duration-500
                    pb-10 px-5 pt-2
                    min-h-[100px]"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-center items-center">
                            <Heading text={"Action Box "} className="!text-center !mb-0 !text-rose-600 !font-black underline underline-offset-4 " />
                            <AiOutlineWarning className="text-rose-800 text-xl ml-2" />

                        </div>
                        <div>
                            <ToggleSwitch
                                disabled={state}
                                state={state}
                                onChange={() => toast.promise(
                                    handleChange().then(({ data }) => {
                                        setIsOpen(false)
                                        queryClient.invalidateQueries(["seat", id])
                                    }).finally(() => {
                                        setTimeout(() => {
                                            setState(false)
                                        }, 5000);
                                    })
                                    ,
                                    {
                                        pending: "loading",
                                        success: "finish loading ...",
                                        error: "Something went wrong ,try again later"
                                    }

                                )
                                }

                                initialMessage={"Remove this user from this seat ?"}
                            />
                            <Marquee play pauseOnClick pauseOnHover
                                className=" text-rose-600  py-6 mb-4 text-xs font-extrabold leading-none  px-5  dark:text-white- max-w-5xl">
                                remove this user from this seat position so you can place another user
                            </Marquee>
                        </div>
                    </div>
                </div>
                <nav class="flex mb-5 mt-5 px-5 " aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                            <Link
                                relative="path"
                                to={"../"}
                                href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                Seats
                            </Link>
                        </li>
                        <li>
                            <div class="flex items-center" >
                                <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                                    <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Seats Details</h1>
                                </a>
                            </div>
                        </li>

                    </ol>
                </nav>



                <div className="lg:flex flex-row-reverse lg:flex-row gap-x-6">
                    <div className="flex-none lg:w-[25rem]">
                        <a
                            role='link'
                            aria-disabled
                            href={`${downloadbaseurl}/seat/download/${id}?${querySearch.toString()}`}

                            target="_blank"

                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className={`uppercase
        text-center
                    w-[min(400px,calc(100%-2.5rem))]
                    pt-3.5
                     bottom-0
                     pb-4
                     block
                     min-h-[2rem]
                     mx-auto
                    rounded bg-blue-500   px-2 py-1 text-sm font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-blue-600 gold:bg-yellow-600 dark:bg-slate-950
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                        >
                            download borderaux
                        </a>


                        {/* <Heading text={"Seat Details"} className="!mb-3" /> */}
                        <AnimatedText text={"Seat Details"} className="!uppercase !text-3xl lg:!text-4xl !mb-2" />

                        <h1
                            className="text-3xl font-black text-slate-700 px-5 "
                        >{seat?.bus?.bus}</h1>
                        {/* <h1
                            onClick={() => setIsOpen_(true)}
                            className="text-xl font-medium cursor-pointer my-5 px-5"
                        >Edit Seat</h1> */}

                        <div className="flex justify-between px-2 pb-2">
                            <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                                <span className="w-[10px] mr-1 h-[10px] inline-block bg-green-400 rounded-full "

                                // onClick={scrollElement}
                                ></span>Available</h1>
                            <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                                <span className="w-[10px] mr-1 h-[10px] inline-block bg-blue-400 rounded-full "></span>Rerservation
                            </h1>
                            <h1 className="text-xs lg:text- shadom-lg lg flex-1">
                                <span className="w-[10px] mr-1 h-[10px] inline-block bg-orange-400 rounded-full "></span>
                                Not Available
                            </h1>
                        </div>

                        {/* code here */}
                        <div className="grid gap-x-1 px-4 gap-y-0.5 pt-3 grid-cols-5">

                            {

                                seat?.seat_positions?.map(({ isTaken, isReserved, _id }, index) => {
                                    const itemsProps = activeSeat == index ? { ref: ref } : {};
                                    return (
                                        <motion.button
                                            // ref={activeSeat == index ? ref : null}
                                            {...itemsProps}
                                            animate={{
                                                scale: activeSeat == index ? [0.8, 1, 0.9] : null
                                            }}
                                            transition={{
                                                duration: 1,
                                                ease: "easeInOut",
                                                repeat: Infinity,
                                            }}
                                            onTouchStart={() => handleMouseDown({ isTaken, isReserved, _id, index })}
                                            onTouchEnd={(e) => handleMouseUp(e)}
                                            onMouseDown={() => handleMouseDown({ isTaken, isReserved, _id, index })}
                                            onMouseUp={handleMouseUp}
                                            onClick={() => {
                                                if (isTaken === true || isReserved == true) {
                                                    toast.promise(
                                                        handleClick(_id).then(({ data: { id } }) => {
                                                            navigate(`/${isadminuser ? "dashboard" : "user"}/${id}?${isadminuser && "admin=true"}`)

                                                        })
                                                        , {
                                                            pending: "loading",
                                                            success: "finish loading ...",
                                                            error: "Something went wrong ,try again later"
                                                        }
                                                    )
                                                }
                                            }}
                                            className={`
                                        ${activeSeat == index && "!bg-red-950"}
                ${(isTaken) ? "bg-orange-400" : isReserved ? "!bg-blue-500" : "bg-green-400"}
                 grid items-center 
                justify-center 
                shadow 
                rounded-sm min-h-[60px]
                cursor-pointer
                hover:rounded-lg`}
                                        > {(index + 1)}</motion.button>
                                    )


                                })}


                        </div>



                    </div>
                    <div className="flex-1 lg:max-h-[calc(100vh-60px)] overflow-y-auto px-5">

                        <div>

                        </div>
                        <AnimatedText text={"Passenger manifest"} className="!uppercase !text-3xl lg:!text-4xl !mb-2" />
                        <Heading text={`${seat?.traveldate ? dayjs(seat?.traveldate).format("MMMM D, YYYY") : null} `}
                            className={"!text-center !text-gray-950 dark:!text-white !mb-2"}
                        />
                        <div className="!max-w-sm mx-auto">
                            <DisplayUi from={seat?.from} to={seat?.to} />
                        </div>
                        <div className="lg:mx-2 shadow-sm rounded-sm  lg:mt-10 w-full">
                            {
                                tickets?.tickets?.length == 0 ? <AnimatedText text={"Scan and invalid tickets will appear here"} className="!uppercase !text-gray-700 !text-4xl lg:!text-5xl !mb-2" /> : <div className="relative max-w-full overflow-x-auto
                        bg-white
        shadow-md sm:rounded-lg w-full mb-6 ">
                                    <table className="w-full text-sm text-left text-gray-500 
                  dark:text-gray-400 transition-colors duration-[2s]">
                                        <thead className="text-xs text-gray-700 dark:bg-slate-800 uppercase dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-2 py-3">
                                                    Index
                                                </th>
                                                <th scope="col-span-3"
                                                    className="px-3 py-3">
                                                    Fullname
                                                </th>
                                                <th scope="col" className="px-3 py-3">
                                                    Seat
                                                </th>
                                                <th scope="col" className="px-3 py-3">
                                                    ID Card  Number
                                                </th>
                                                <th scope="col" className="px-3 py-3">
                                                    Sex
                                                </th>

                                            </tr>
                                        </thead>

                                        <tbody
                                            className="pt-4 pb-12 text-xs md:text-sm"
                                        >
                                            {
                                                tickets?.tickets
                                                    ?.sort((a, b) => a.seatposition - b.seatposition)
                                                    ?.map(({ fullname, seatposition, sex, email }, index) => (
                                                        <tr
                                                            key={index}
                                                            className={` ${index % 2 == 0
                                                                ? "bg-slate-100" : "bg-white"}
                                            hover:bg-slate-300
                            dark:hover:bg-slate-500
                    border-slate-100  text-xs
                    border-b-2
                    dark:bg-gray-900
                    dark:border-gray-600
                    `}
                                                        >
                                                            <th className="px-2 py-4  flex items-center justify-center">
                                                                {

                                                                    (index + 1)
                                                                }
                                                            </th>



                                                            <td className="px-3 py-2">
                                                                <span className="font-medium flex items-center justify-center min-w-fit" style={{
                                                                    workBreak: "none"
                                                                }}>{fullname || "n/a"}</span>
                                                            </td>
                                                            <td className="px-3 py-2">
                                                                <span className="font-medium ">{(seatposition + 1)}</span>
                                                            </td>
                                                            <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {email || "n/a"}
                                                            </th>

                                                            <td className="py-0 text-xs flex items-center"
                                                            >
                                                                {sex || "n/a"}
                                                            </td>
                                                        </tr>
                                                    ))
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            }


                        </div>
                    </div>

                </div>


            </div >
        </ModalContext.Provider>
    )

}
// export const useModalContext=()=>useContext(ModalContext)
export default SeatDetails