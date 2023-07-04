import { motion } from 'framer-motion'
import { AiOutlinePlus } from 'react-icons/ai'
import { Form, Heading } from '../components'
import AnimateText from '../components/AnimateText'
import { useState, useEffect } from 'react'
import { components, style } from "../utils/reactselectOptionsStyles"
import axios from 'axios'
import { AnimateError } from '../components'
import Seats from 'react-select'
import Features from 'react-select'
import { MdOutlineClose } from 'react-icons/md'
// import busimage from '../Assets/images/busimage.jpg'
import Categories from 'react-select'
const token = localStorage.getItem("admin_token");
const Bus = () => {
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
            label: "Vip_ Bus",
            value: "Vip+ Bus"
        },

    ]
    const [isDisable, setIsAble] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [err, setErr] = useState(null)
    const [buses, setBuses] = useState([])

    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get("/bus",
                    {
                        headers: {
                            'Authorization': "makingmoney " + token
                        }
                    }
                )
                // setIsOpen(false);
                setBuses(res.data?.buses)
                console.log(res.data)

            } catch (err) {
                // setErr(err.response.data)
                console.log(err)

            }
            finally {
                // setIsAble(false)
                // setTimeout(() => {
                //     setErr(null)
                // }, 5000)
            }
        }())

    }, [])
    const [busDat, setBusData] = useState({
        name: null,
            number_of_seats: 45,
        feature: "small bus"

    })
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
            console.log(data)
            setBusData({
                // name: null,
                    number_of_seats: 45
                ,
                feature: "small bus"

            })
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
        {
            label: "49",
            value: "49"
        },
        {
            label: "53",
            value: "53"
        },

    ]
    const featureOptions = [
        {
            label: "Normal Bus",
            value: "normal bus"
        },
        {
            label: "Vip Bus",
            value: "Vip bus"
        },
        {
            label: "Vip+ Bus",
            value: "Vip+ bus"
        }
    ]




    return (
        <div className="pt-4 
        !flex-1
      z-10
    
        max-w-full 
        
        overflow-x-auto
        select-none
        max-h-[calc(100vh-4rem)] 
        h-screen overflow-y-auto
        bg-color_light-
        dark:bg-color_dark">



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
                        <motion.div onClick={() => setIsOpen(c => !c)}
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
                            <input
                                value={busDat?.name}
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
                                            feature: e.evt
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

            {/* new content here  */}
            <div className='max-w-[15rem] mx-auto w-full'>

                <Categories
                    className="!text-center"
                    defaultValue={{
                        value: "",
                        label: "all types"
                    }}
                    isSearchable={false}
                    options={catOptions}
                    styles={style}
                    components={components()}
                />

            </div>
            <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3  px-5  gap-x-2 gap-y-5 pt-10 '>
                {buses.map(({
                     number_of_seats , feature, name, _id }, i) => {
                    return (

                        <div
                            key={i}
                            class="max-w-sm
                                bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                                <Heading text="Total Seats" className="!mb-0 !text-lg !font-medium first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                                <Heading text={number_of_seats} className="!mb-2 !text-sm" />
                                <Heading text="Bus Type" className="!mb-0 !text-lg !font-medium first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                                <Heading text={feature} className="!mb-2 !text-sm" />
                                <div className="grid grid-cols-2 gap-x-6 mt-4 pb-2">
                                    <div
                                        onClick={() => setIsOpen(true)}
                                        className={` 
            font-medium
            shadow
            md:shadow-md
            shadow-blue-200
            dark:shadow-slate-800
            bg-green-400
            dark:bg-gray-700
            pt-1
            mr-1
            rounded-sm
            text-white
            dark:font-semibold
            px-3
            pb-1.5
            place-items-center  
            hover:bg-green-700
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
            `}
                                        style={{
                                            whiteSpace: "nowrap"
                                        }}
                                    >Edit Bus</div>
                                    <div

                                        className={` 
           font-medium
           shadow
           md:shadow-md
           shadow-blue-200
           dark:shadow-slate-800
           bg-red-400
           dark:bg-gray-700
           pt-1
           mr-1
           rounded-sm
           text-white
           dark:font-semibold
           px-3
           pb-1.5
           place-items-center  
           hover:bg-red-700
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
           max-w-[12rem]
           `}
                                        style={{
                                            whiteSpace: "nowrap"
                                        }}
                                    >Delete bus</div>
                                </div>


                            </div>
                        </div>


                    )
                })}


            </div>
        </div>
    )
}
export default Bus