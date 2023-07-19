import { motion } from 'framer-motion'
import { AiOutlinePlus } from 'react-icons/ai'
import { Form, Heading, ToggleSwitch } from '../components'
import AnimateText from '../components/AnimateText'
import { useState, useEffect, useRef, forwardRef } from 'react'
import { components, style } from "../utils/reactselectOptionsStyles"
import axios from 'axios'
import { AnimateError } from '../components'
import Seats from 'react-select'
import Features from 'react-select'
import { FiRefreshCcw } from 'react-icons/fi'
import { MdOutlineClose } from 'react-icons/md'
import Alert from '../components/Alert'
import Categories from 'react-select'
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
const token = localStorage.getItem("admin_token");

const Bus = () => {

    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div
            className="w-full
            max-w-[10rem]
          border-b
          mt-[20px]
          mx-auto
          shadow-sm border-black 
          gap-2
          p-1 
          rounded-0
          bg-transparent my-1  "
            onClick={onClick} ref={ref}>

            <div className="flex-1">
                <Heading text="Boarding Date" className="!text-sm !text-slate-400  !mb-1" />
                <p className="text-xs md:text-lg text-center text-slate-500 font-[500]">{value && (new Date(value).toDateString())}</p>
            </div>
        </div>
    ));

    const newbustoast = () => toast.success("Add bus successfully  !", {
        position: toast.POSITION.BOTTOM_CENTER
    })
    const [activeIndex, setActiveIndex] = useState(null)
    const BusDetail = ({ number_of_seats, feature, name, _id, seat_positions, active, from, to,time }) => {
        const counter = seat_positions?.filter((x) => x.isTaken == true)?.length
        return (
            <div
                key={_id}
                onClick={() => navigate(`${_id}`)}
                class={`max-w-sm border  border-gray-200 rounded-lg shadow  ${counter == number_of_seats ? "bg-slate-300" : "bg-white"} dark:bg-gray-800 dark:border-gray-700`}>
                <div className="grid grid-cols-[1fr,auto] px-2 pt-3
    pb-2
    items-center place-items-center border">
                    <Heading text="Bus Details"
                        className="!mb-0 !text-lg !text-start !mt-0 !pl-0 !ml-0 
    !font-semibold first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                    <h4 className='!text-xs text-slate-500 !mb-0 !pb-0'>
                        {_id}
                    </h4>
                </div>


                <div class="p-2">
                    <Heading text="Name" className="!mb-0 !text-lg !font-medium first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                    <Heading text={name} className="!mb-2 !text-sm" />
                    <div className='grid grid-cols-2'>
                        <div>
                            <Heading text="Total Seats" className="!mb-0 !text-lg !font-medium first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                            <Heading text={number_of_seats} className="!mb-2 !text-sm" />
                        </div>

                        <div>
                            <Heading text="Consume" className="!mb-0 !text-lg !font-medium first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                            <Heading text={(
                                counter
                            )} className="!mb-2 !text-sm" />
                        </div>

                    </div>
             
                    <div className='grid grid-cols-2'>
                        <div>
                            <div className='flex'>
                                <Heading text="Bus Type" className="!mb-0 !text-lg !font-medium first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                            </div>
                            <Heading text={active == true ? "true" : "false"}
                                className="!mb-2 !text-sm" />
                        </div>
                        <div>
                            <div className='flex items-center'>
                                <Heading text="active" className="!mb-0 !text-lg !font-medium first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                                {
                                    (activeIndex == _id) && (
                                        <span className="w-4 h-4  ml-1
                                rounded-full bg-transparent border-t-2 border-r-2 border-transparent border-2
                                border-t-orange-400
                                border-r-orange-400
                                animate-spin
                                "></span>
                                    )


                                }
                            </div>
                            <ToggleSwitch

                                onChange={() => {
                                    toast.promise(handleSetActive(_id), {
                                        pending: "Promise is pending",
                                        success: "promise  loaded",
                                        error: "oops something happen"
                                    })


                                }}
                                message="active"
                                disabled={activeIndex == _id ? true : false}
                                state={active} />
                        </div>

                    </div>

                </div>
            </div>


        )

    }


    const focusRef = useRef(null)
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("")
    const constraintsRef = useRef(null)
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState("")
    const [selected, setSelected] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [querySearch, setQuerySearch] = useSearchParams();

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

    const catOptions = [

        {
            label: "All Types",
            value: "all"
        },
        {
            label: "Normal Bus",
            value: "Normal Bus"
        },
        {
            label: "Vip Bus",
            value: "Vip Bus"
        },
        {
            label: "Vip+ Bus",
            value: "Vip+ Bus"
        },

    ]
    const [isDisable, setIsAble] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [err, setErr] = useState(null)
    const [buses, setBuses] = useState([])
    const [cat, setCat] = useState("all")
    const handleChangeCat = (e) => {
        if (e.value === cat) return
        setCat(e.value)

    }

    // const [cities, setCities] = useState([])

    const getBuses = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get("/bus",
                {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }, params: {
                        search: searchText,
                        feature: cat
                    }
                }
            )
            setBuses(res.data?.buses)
            console.log(res.data)

        } catch (err) {
            console.log("error : ", err)

        }
        finally {
            setIsLoading(false)
        }

    }

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
            // setCities(res?.data?.cities)
            // console.log(res.data)
            return res?.data?.cities
        } catch (err) {
            console.log(err)
            alert("some error occurs")
        }

    }
    useEffect(() => {
        getBuses()
    }, [searchText, cat])

    const [busDat, setBusData] = useState({
        name: null,
        number_of_seats: 49,
        feature: "small bus",
        date: startDate

    })
    // const handleResetBus = async (id, _id) => {
    //     try {
    //         axios.patch("/bus/reset/" + id, {},
    //             {
    //                 headers: {
    //                     'Authorization': "makingmoney " + token
    //                 }
    //             }
    //         )
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     finally {
    //         console.log("done ")
    //     }
    // }
    const handleSetActive = async (id) => {
        setActiveIndex(id)
        try {
            const data = await axios.patch("/bus/active/" + id, {},
                {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                }
            )
            getBuses()
            return data
        } catch (err) {
            console.log(err)
            return err
        } finally {
            setActiveIndex(null)
        }

    }
    const handleAddNewBus = async (e) => {
        e.preventDefault()
        setIsAble(true)
        try {
            const data = await axios.post("/bus",
                busDat
                ,
                {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                }
            )
            setIsOpen(false);
            // console.log(data)
            setBusData({
                name: "",
                number_of_seats: 49
                ,
                feature: "small bus",
                date: startDate

            })
            newbustoast()
            getBuses()

        } catch (err) {
            setErr(err.response.data)
            console.log(err)
        }
        finally {
            setIsAble(false)
            setTimeout(() => {
                setErr(null)
            }, 5000)
        }


    }
    const seatOptions = [
        ...Array.from({ length: 12 }, (arr, i) => (
            {
                label: 48 + i,
                value: 48 + i
            }))

    ]
    const featureOptions = [
        {
            label: "Normal Bus",
            value: "Normal Bus"
        },
        {
            label: "Vip Bus",
            value: "Vip Bus"
        },
        {
            label: "Vip+ Bus",
            value: "Vip+ Bus"
        }
    ]

    return (
        <div

            ref={constraintsRef}
            className="pt-4 
        !flex-1
      z-10
    pb-24
        max-w-full 
        overflow-x-auto
        select-none
        max-h-[calc(100vh-4rem)] 
        h-screen overflow-y-auto
        bg-color_light-
        dark:bg-color_dark">

            <Alert
                toggle={toggle}
                setToggle={setToggle}
                duration="30000"
                className={`
     ${toggle && "!top-1/2 -translate-y-1/2"} group
     `}
                confirmFunc={() => setToggle(false)}
                message={message} />
            <motion.div
                drag
                dragConstraints={constraintsRef}
                onClick={() => getBuses()

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
            {/*  */}
            <div className="md:flex lg:px-10"
            >

                <div className="flex-1 ">
                    <div className="flex px-5  items-center  mb-10 mt-5 justify-between py-1 rounded-lg shadow bg-white mx-4">
                        <div className="flex-1 ">
                            <Heading text="Hey Add A New Bus" className="!mb-0 !pl-0 !font-black mt-0" />
                            <AnimateText text="Hello admin add new buses to the app"
                                className={"!text-sm leading-tight md:!text-lg lg:!text-xl !font-light !text-start"} />
                        </div>
                        <motion.div onClick={() => {
                            setIsOpen(true)
                            setTimeout(() => {
                                focusRef?.current?.focus()
                            }, 500)

                        }}
                            initial={{ x: "-50%" }}
                            animate={{ scale: [0.7, 1.2, 0.8], rotate: [0, 360] }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1],
                                repeat: Infinity,
                                repeatDelay: 1
                            }

                            }
                            className="bottom-6 flex-none ml-2 shadow-2xl button-add  top-auto bg-blue-400 
w-[2rem] h-[2rem] rounded-full left-1/2 overflow-hidden 
-translate-x-1/2
z-10  "
                        >
                            <div className="flex h-full w-full items-center scale-animation justify-center ">
                                <AiOutlinePlus size={30} color="#fff" className="" />
                            </div>
                        </motion.div>

                    </div>
                </div>
                <div className={`
            ${isOpen ? "visible opacity-100 pointer-events-all " : "invisible opacity-0 pointer-events-none"}
            fixed 
            lg:translate-x-0
            lg:translate-y-0
            lg:static
            lg:!pointer-events-auto
            lg:opacity-100
            lg:visible
            flex-none
            transition-[opacity]
            left-1/2
            z-20
            -translate-x-1/2
            w-[min(calc(100%-2.5rem),25rem)]
            min-h-[10rem]
            bg-white
            rounded-2xl
            top-1/2
            max-h-[calc(100vh-100px)]
            overflow-y-auto=--
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
                    <AnimateText text="add new bus" className='!text-lg' />

                    <form onSubmit={handleAddNewBus} className="px-6">
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={focusRef}
                                value={(busDat?.name || "")}
                                onChange={e => setBusData((prev) => ({
                                    ...prev,
                                    name: e.target.value
                                }))}
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
                                id="busname"
                                placeholder="Bus Name" required />
                            <label
                                htmlFor="busname"
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
                peer-focus:bg-white px-0
                peer-valid:bg-white 
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
            
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"
                            >
                                Bus Name
                            </label>
                        </div>
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input 
                                value={(busDat?.plate_number || "")}
                                onChange={e => setBusData((prev) => ({
                                    ...prev,
                                    plate_number: e.target.value
                                }))}
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
                                id="busnumber"
                                placeholder="Bus Number" required />
                            <label
                                htmlFor="busnumber"
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
                peer-focus:bg-white px-0
                peer-valid:bg-white 
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
            
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"
                            >
                                Bus Number
                            </label>
                        </div>

                        <div className="mb-6 flex items-center justify-center select-none ">

                            <div className="px-2 w-fit mt-4 flex gap-2">
                                <div className="flex
                                !text-sm
                                flex-col items-center">
                                    <Heading text="N_seats" className="!text-sm !text-slate-400  !mb-1" />
                                    <Seats options={seatOptions}
                                        onChange={e => setBusData((prev) => ({
                                            ...prev,
                                            number_of_seats: e.value
                                        }))}
                                        isSearchable={false}
                                        styles={{
                                            ...style,
                                            wdith: "100%",
                                            fontSize: 10 + "px"
                                        }}
                                        components={components()}
                                        defaultValue={{
                                            value: "49",
                                            label: "49"
                                        }}
                                    />
                                </div>
                                <div className="flex !text-sm
                                flex-col items-center">
                                    <Heading text="Bus Type" className="!text-sm !text-slate-400  !mb-1" />
                                    <Features
                                        options={featureOptions}
                                        onChange={e => setBusData((prev) => ({
                                            ...prev,
                                            feature: e.value
                                        }))}
                                        defaultValue={{
                                            value: "Normal Bus",
                                            label: "Normal Bus"
                                        }}
                                        isSearchable={false}
                                        styles={style}
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
                        ${isDisable ? "bg-slate-500" : "bg-blue-500"}
                        
                   w-fulll
                   mx-auto
                   w-full
                      pb-1.5
                      group-disabled:bg-slate-400
                    pt-2 text-lg
                    font-montserrat font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] ml-0
  transition duration-150 ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                        >
                            {isDisable ? "Please wait" : "Add"}
                        </button>


                    </form>
                </div>

            </div>
            <Form handleChangeText={(e) => setSearchText(e.target.value)} />
            {/* new content here  */}
            <div className='max-w-[15rem] mx-auto w-full'>

                <Categories
                    className="!text-center"
                    defaultValue={{
                        value: "all",
                        label: "all types"
                    }}
                    isSearchable={false}
                    options={catOptions}
                    onChange={handleChangeCat}
                    styles={style}
                    components={components()}
                />

            </div>
            <div

                className='w-full grid sm:grid-cols-2 lg:grid-cols-3  px-5  gap-x-2 gap-y-5 pt-10 '>
                {buses.map((arr, i) => {
                    return (
                        <BusDetail {...arr} />

                    )
                })}


            </div>
        </div>
    )
}
export default Bus