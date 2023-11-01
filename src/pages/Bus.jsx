import { motion } from 'framer-motion'
import { AiOutlinePlus, AiOutlineSave } from 'react-icons/ai'
import { Heading, Scrollable, TicketCounts, Form as SearchForm } from '../components'
import AnimateText from '../components/AnimateText'
import { useState, useRef, forwardRef } from 'react'
import { components, style } from "../utils/reactselectOptionsStyles"
import { AnimateError } from '../components'
import Seats from 'react-select'
import Features from 'react-select'
import { FiRefreshCcw } from 'react-icons/fi'
import { MdOutlineClose } from 'react-icons/md'
import Alert from '../components/Alert'
import { Link, useLoaderData, Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from "../utils/customFetch"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import FilterButton from '../components/FilterButton'
import { useFilter } from '../Hooks/FilterHooks'
const allBusQuery = (params = {}) => {
    return ({
        queryKey: ["buses"],
        queryFn: async () => {
            const res = await customFetch.get("/bus", {
                params: params
            })
            return res.data
        }
    })
}

export const loader = (queryClient) => async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    try {
        await queryClient.ensureQueryData(allBusQuery(params))
        return ({
            searchValues: params ?? {}
        })

    } catch (err) {
        // console.log("this is the error that causes the crases", err)
        return err
    }
}
const BusDetail = ({ number_of_seats, name, _id, plate_number }) => {
    return (
        <div className="max-w-[calc(100%-2rem)] mx-auto border-b-2 w-full border-gray-200 dark:border-gray-700 rounded-lg shadow">
            <Link to={`${_id}`}
                key={_id}
                class={` dark:bg-gray-800 dark:border-gray-700`}>
                <div className="flex justify-between px-2 pt-3
pb-2
items-center place-items-center border-b ">
                    <Heading text="Car Details"
                        className="!mb-0 !text-lg !text-start !mt-0 !pl-0 !ml-0 
!font-semibold first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                    <h4 className='!text-xs text-slate-500 !mb-0 !pb-0'>
                        <div
                            className="inline-block mr-2 text-gray-500"
                        >#Plate Number</div>
                        {plate_number}
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
                    </div>

                </div>
            </Link>

        </div>


    )

}
const Bus = () => {
    const { handleFilterChange } = useFilter()
    const queryClient = useQueryClient()
    const newbustoast = () => toast.success("Add bus successfully  !", {
        position: toast.POSITION.BOTTOM_CENTER
    })



    const focusRef = useRef(null)
    const constraintsRef = useRef(null)
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [isDisable, setIsAble] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [err, setErr] = useState(null)

    const { searchValues } = useLoaderData()
    const { buses, nHits } = useQuery(allBusQuery(searchValues))?.data || []



    const [busDat, setBusData] = useState({
        name: null,
        number_of_seats: 9,
        feature: "classic",

    })


    const handleAddNewBus = async (e) => {
        e.preventDefault()
        setIsAble(true)
        try {
            await customFetch.post("/bus",
                busDat

            )
            // invalidateQueries
            setIsOpen(false);

            setBusData({
                name: "",
                number_of_seats: 9
                ,
                feature: "classic",
            })
            await queryClient.invalidateQueries({
                queryKey: ["buses"],
                exact: true,
            })
            newbustoast()

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
        ...Array.from({ length: 6 }, (arr, i) => (
            {
                label: 4 + i,
                value: 4 + i
            }))

    ]
    const featureOptions = [
        {
            label: "Classic Bus",
            value: "classic"
        },
        {
            label: "Vip Bus",
            value: "vip"
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
                // onClick={() => getBuses()

                // }
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
                    <div className="flex px-5  items-center  mb-10 mt-5 !flex-wrap justify-between py-1 rounded-lg shadow bg-white dark:bg-slate-900 mx-4">
                        <div className="flex-1 ">
                            <Heading text="Hey Add A New Car" className="!mb-0 !pl-0 !font-black mt-0" />
                            <AnimateText text="Hello admin add new Car to the app"
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
                            <div className="flex h-full w-full items-center scale-animation dark:bg-slate- justify-center ">
                                <AiOutlinePlus size={30} color="#fff" className="" />
                            </div>
                        </motion.div>

                    </div>
                    {/* <SearchForm
                        onChange={search => handleFilterChange("search", search)}
                    /> */}
                    {/* <Heading
                        text="Number of Seats "
                        className=""
                    />
                    <Scrollable
                        className="!mb-10 !flex-wrap-- !max-w-xl !mx-auto"
                    >
                        <FilterButton
                            name="numberOfSeat"
                            label={"All"}
                            value={"all"} />
                        {
                            Array.from({ length: 10 },
                                (arr, index) => <FilterButton
                                    key={arr}
                                    name="numberOfSeat"
                                    label={index + 4}
                                    value={index + 4} />)
                        }

                    </Scrollable> */}
                    <Scrollable
                    >
                        <TicketCounts
                            counts={nHits}
                            text={"Total Number of Cars"}
                            icon={<AiOutlineSave />} />
                    </Scrollable>
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
            dark:bg-slate-900
            dark:shadow-dark
            dark:shadow-sm
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
            dark:bg-slate-600
            hover:bg-red-400
            ease duration-500
            transition-colors
            right-0 top-0 '
                        onClick={() => setIsOpen(false)}
                    >
                        <MdOutlineClose
                            classNae="text-sm" />
                    </span>
                    <AnimateText text="add new car" className='!text-lg' />

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
                dark:peer-focus:bg-slate-900
                dark:peer-valid:bg-slate-900
            
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"
                            >
                                Car Name
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
                                placeholder="Bus Plate Number" required />
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
                dark:peer-focus:bg-slate-900
                dark:peer-valid:bg-slate-900
            
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"
                            >
                                #Car Number
                            </label>
                        </div>

                        <div className="mb-6 flex items-center justify-center select-none ">

                            <div className="px-2 w-fit mt-4 flex gap-2">
                                <div className="flex
                                !text-sm
                                flex-col items-center">
                                    <Heading text="Number of Seats" className="!text-sm !text-slate-400  !mb-1" />
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
                                        defaultValue={seatOptions[0]}
                                    />
                                </div>
                                <div className="flex- !text-sm  hidden
                                flex-col items-center">
                                    <Heading text="Bus Type" className="!text-sm !text-slate-400  !mb-1" />
                                    <Features
                                        className=" dark:text-white"
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

            <div

                className='w-full 
                grid grid-cols-1 
                sm:grid-cols-2 justify-center 
                lg:grid-cols-3  px-5 
                gap-x-2 gap-y-5 pt-10 '>
                {buses.map((arr) => {
                    return (
                        <BusDetail
                            key={arr}
                            {...arr} />

                    )
                })}


            </div>
        </div>
    )
}
export default Bus