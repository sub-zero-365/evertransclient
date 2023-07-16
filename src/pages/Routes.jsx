import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, forwardRef } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Number } from '../components';
import AnimateText from '../components/AnimateText'
import { MdOutlineClose } from 'react-icons/md'
import { useravatar } from '../Assets/images';
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import BusesSelect from 'react-select/async'
import DepartureTime from "react-select"
import { components, style } from "../utils/reactselectOptionsStyles"
import DatePicker from 'react-datepicker'

import { setUsers } from '../actions/adminData';
import { Loader, Button, Heading } from '../components';
import { AiOutlinePlus } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { UserData } from '../Assets/userdata';
import { setUserName } from "../actions/userName"
import { toast } from "react-toastify"
import { Loadingbtn } from "../components";
const Routes = () => {
    const token = localStorage.getItem("admin_token");

    const [startDate, setStartDate] = useState(new Date());

    const [routes, setRoutes] = useState([])

    async function getRoutes() {
        try {

            const res = await axios.get("/route", {
                headers: {
                    'Authorization': "makingmoney " + token
                },
                params: {
                    getbuses: true
                }

            })
            setRoutes(res.data.routes)
        }
        catch (err) {
            console.log(err)
            alert(err.response.data)

        }
    }

    useEffect(() => {
        getRoutes()

    }, [])
    const handleDeleteRoute = async (id) => {

        try {
            await axios.delete("/route/" + id, {
                headers: {
                    'Authorization': "makingmoney " + token
                },
            })
            getRoutes()
        } catch (err) {
            console.log(err)
        }

    }

    const handleCreateNewRoute = async () => {
        try {
            const res = await axios.post("/route", routesData, {
                headers: {
                    'Authorization': "makingmoney " + token
                },
            })
            getRoutes()
            setIsOpen(false)
            return res.data
        } catch (err) {
            console.log(err)
            throw err
        }
    }



    const [routesData, setRoutesData] = useState({
        from: null
        , to: null,
        bus_id: null,
        departuretime: null,
        departuredate: startDate.toLocaleDateString('en-CA')
    })


    const getBuses = async (inputValue = "") => {
        try {
            const res = await axios.get("/bus",
                {
                    params: {
                        search: inputValue || "",
                    }
                }
            )
            const { buses } = res.data;
            const buses_name = buses.map(({ _id, name }) => ({
                label: name,
                value: _id,
            }))
            return buses_name
        } catch (err) {
            console.log("error : ", err)
            return err.response.data

        }

    }


    const timeOptions = [

        {

            label: "7am",
            value: "7am"
        },
        {

            label: "10am",
            value: "10am"
        },
        {

            label: "12am",
            value: "12am"
        },
        {
            label: "10pm",
            value: "12pm"
        },
    ]

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div
            className="w-full
            max-w-[10rem]
          border-b
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
        }

    }

    // const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault()
        toast.promise(handleCreateNewRoute(), {
            pending: "sbmitting ",
            success: "done submitting",
            error: "oops some bad occured"
        })

    }



    const [isLoading, setIsLoading] = useState(false)



    const [isOpen, setIsOpen] = useState(false);


    const [userData, setUserData] = useState({
        labels: UserData.map((v) => v.id),
        labels: UserData.map((v) => v.year),
        datasets: [
            {
                label: "users gain",
                data: UserData.map((v) => v.userGain),


            },
            {
                label: "users lost",
                data: UserData.map((v) => v.userLost)

            },
        ]

    })
    return (
        <motion.div
            className="max-w-full !flex-1 w-full   overflow-auto max-h-[calc(100vh-3rem)] pt-10 " >
            {/* {isLoading && (<Loader toggle dark />)} */}
            <div> </div>
            <Heading text="ROUTES BOARD" />
            <div className="lg:flex lg:mb-14 w-full  lg:px-10 flex-row-reverse">
                <div className={` flex-1 relative  text-xs mx-0   rounded-lg `}
                >
                    <div className="flex  items-center  mb-10 mt-5 justify-between py-1 rounded-lg shadow bg-white mx-4">
                        <div className="flex-1">
                            <Heading text="Add A New Routes" className="!mb-2 !font-black mt-0" />
                            <p className="mb-3 text-sm  px-6">Routes </p>
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
                    {/* <LineChart chartData={userData} /> */}
                </div>
                {/* 
*/}

                <div className={`
            ${isOpen ? "visible opacity-100 pointer-events-all " : "invisible opacity-0 pointer-events-none"}
            fixed 
            lg:static
            lg:opacity-100
            lg:visible
            lg:!pointer-events-auto
            transition-[opacity]
            left-1/2
            -translate-x-1/2
            w-[min(calc(100%-2.5rem),25rem)]
            min-h-[10rem]
            bg-white
            z-20
            rounded-2xl
            top-1/2
max-h-[calc(100vh-100px)]
overflow-y-auto
            -translate-y-1/2
            lg:translate-x-0
            lg:translate-y-0
            shadow-xl
            shadow-slate-400
            py-5 pb-10`}>
                    <span
                        className='absolute lg:hidden
                    w-8 h-8  hover:ring-red-500
           
            md:h-10 md:w-10 rounded-full
            grid place-items-center
            text-xs
            hover:shadow-xl
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
                    <AnimateText text="create new routes " className='!text-lg' />
                    <form
                        onSubmit={handleSubmit}
                        className='px-5'
                    >
                        <div className='px-10'>
                            <Heading text="Bus Name" className="!text-sm !text-slate-400  !mb-1" />

                            <BusesSelect

                                onChange={evt => setRoutesData(pre => ({
                                    ...pre,
                                    bus_id: evt.value

                                }))}
                                defaultOptions
                                catcheOptions
                                loadOptions={getBuses}

                                required

                                styles={{
                                    ...style,
                                    wdith: "100%",
                                    fontSize: 10 + "px"
                                }}
                                components={components()}

                            />
                        </div>
                        <div className="mb-6 flex items-center justify-center select-none ">

                            <div className="px-2 w-fit mt-4 flex gap-2">
                                <div className="flex
    !text-sm
    flex-col items-center">
                                    <Heading text="From" className="!text-sm !text-slate-400  !mb-1" />
                                    <FromSelect
                                        onChange={evt => setRoutesData(pre => ({
                                            ...pre,
                                            from: evt.label

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
                                        onChange={evt => setRoutesData(pre => ({
                                            ...pre,
                                            to: evt.label

                                        }))}

                                        required
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
                        <div>


                            <DatePicker
                                wrapperClassName="datePicker"
                                className="datePicker"
                                selected={startDate}
                                onChange={evt => {

                                    setRoutesData(pre => ({
                                        ...pre,
                                        departuredate: evt.toLocaleDateString('en-CA')

                                    }))
                                    setStartDate(evt)
                                }}

                                minDate={new Date()}
                                Date={new Date()}
                                required
                                customInput={<ExampleCustomInput />
                                }
                            />

                        </div>

                        <div className='max-w-[15rem] w-full mx-auto'>
                            <DepartureTime
                                options={timeOptions}
                                onChange={evt => setRoutesData(pre => ({
                                    ...pre,
                                    departuretime: evt.value

                                }))}

                                styles={{
                                    ...style,
                                    wdith: "100%",
                                    fontSize: 10 + "px"
                                }}
                                components={components()}
                            />

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
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            {isLoading ? <Loadingbtn /> : "Create Route"}
                        </button>


                    </form>
                </div>

                {/* <div className="flex-none lg:w-[25rem]   shadow-xl lg:rounded-lg bg-white shadow-slate-400 shadow-offset-4">
                    side bar here
                </div> */}


            </div>
         



         



            <div class="w-full  p-4
lg:col-span-8 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <Heading text="Travel Routes " className="!font-black first-letter:!text-2xl !text-xl underline underline-offset-8 uppercase" />


                <section class=" antialiased bg-gray-100 text-gray-600 ">
                    <div class="h-">
                        <div class="w-full max-w-2xl-- mx-auto bg-white shadow-lg rounded-sm ">

                            <div class="p-0">
                                <div class="overflow-x-auto">
                                    <table class="table-auto w-full">
                                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">index</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">From</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">Destination</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">Departure Date</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">Departure Time</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-center">actions</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-sm divide-y divide-gray-100">
                                            {

                                                routes.map(({ from,
                                                    to,
                                                    bus_id,
                                                    departuretime,
                                                    departuredate,
                                                    _id
                                                }, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td class="p-2 whitespace-nowrap">
                                                                <div class="text-left pl-1">{(index + 1) || "n/a"}</div>
                                                            </td>

                                                            <td class="p-2 whitespace-nowrap">
                                                                <div class="text-left">{from || "n/a"}</div>
                                                            </td>
                                                            <td class="p-2 whitespace-nowrap">
                                                                <div class="text-left font-medium text-green-500">{to}</div>
                                                            </td>
                                                            <td class="p-2 whitespace-nowrap">
                                                                <div class="text-left font-medium text-green-500">{bus_id}</div>
                                                            </td>
                                                            <td class="p-2 whitespace-nowrap">
                                                                <div class="text-left font-medium text-green-500">{departuredate}</div>
                                                            </td>
                                                            <td class="p-2 whitespace-nowrap">
                                                                <div class="text-left font-medium text-green-500">{departuretime}</div>
                                                            </td>
                                                            <td class="p-2 whitespace-nowrap flex ">
                                                                <Button
                                                                    className={"!max-w-[14rem] !w-full !bg-blue-900"}
                                                                    name="edit route"
                                                                // href={`/dashboard/details/${_id}?admin=true`}
                                                                ></Button>
                                                                <button


                                                                    onClick={
                                                                        () => {
                                                                            toast.promise(handleDeleteRoute(_id), {
                                                                                pending: "please wait",
                                                                                success: "delete successfully",
                                                                                error: "something happen",

                                                                            })
                                                                        }

                                                                    }

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
                                                                    `}
                                                                    // className={"!max-w-[14rem] !w-full !bg-red-900"}
                                                                    name="Delete Route"
                                                                // href={`/dashboard/details/${_id}?admin=true`}
                                                                >delete route</button>
                                                            </td>
                                                        </tr>

                                                    )
                                                })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

        </motion.div>
    )

}

export default Routes