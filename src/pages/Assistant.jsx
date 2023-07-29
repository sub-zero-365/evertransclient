import { FiRefreshCcw } from 'react-icons/fi'

// import {
//     useQuery,
// } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import AnimateText from '../components/AnimateText'
import { MdOutlineClose } from 'react-icons/md'
import { useravatar } from '../Assets/images';
import { Loader, Button, Heading } from '../components';
import { AiOutlinePlus } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedError from "../components/AnimateError"
import { Loadingbtn } from "../components";
import { UiButtonDanger } from '../components/UiButton'
const Appointment = () => {
    const constraintsRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const password = useRef(null)
    const phone = useRef(null)
    const fullnames = useRef(null)
    const [err, setErr] = useState("")
    const [activeIndex, setActiveIndex] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleDeleteUser = async (_id, index) => {
        setActiveIndex(index)
        try {
            await axios.delete(`/assistant/${_id}`,
                {
                    headers: {
                        "Authorization": "makingmoney " + token
                    }
                })
            console.log("delete successfully")
            getData()
        } catch (err) {
            console.log(err)
        } finally {
            setActiveIndex(null)
        }
    }
    const [error, setError] = useState(null)
    const handleCreateNewAssistant = async () => {
        setErr(null)

        try {
            setIsLoading(true)
            const res = await axios.post("/auth/assistant/register", {
                phone: phone.current.value,
                password: password.current.value,
                fullname: fullnames.current.value,

            },
                {

                    headers: {
                        "Authorization": "makingmoney " + token
                    }
                })
            setIsOpen(false)
            getData()
            setErr(null)
            fullnames.current.value = ""
            password.current.value = ""
            phone.current.value = ""

        } catch (err) {
            setErr(err.response.data)
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        handleCreateNewAssistant()
    }
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const getData = async () => {
        try {
            const res = await axios.get("/assistant",

                {
                    headers: {
                        'Authorization': "makingmoney " + token
                    },

                }
            )
            setData(res.data)
        } catch (err) {
            setError(err.response.data)
        }
        finally {
            
        }
    }
    useEffect(() => {
        setLoading(true);
        getData()
        setLoading(false)
    }, [])

    
    const token = localStorage.getItem("admin_token");

    const [text, setText] = useState("")

    if (loading) return <div>Loading</div>
    return (
        <motion.div
            className="max-w-full !flex-1 w-full   overflow-auto h-[calc(100vh-3rem)] pt-10 "
            ref={constraintsRef}
        >
            <motion.div
                drag
                dragConstraints={constraintsRef}
                onClick={() => getData()

                }
                animate={{
                    scale: [0.7, 1.2, 0.8],
                    rotate: loading ? [0, 360] : null
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    repeat: loading ? Infinity : null,

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

            <div className="flex gap-x-1  items-center" onClick={() => {

                console.log("click here")
            }}>
                <Heading text="Employees OverView" className="!mb-0" /> <h2 className="text-lg text-gray-400"></h2>
            </div>
            <div className="lg:flex flex-row-reverse lg:mb-14 w-full  lg:px-10">
                <div className={` flex-1 relative  text-xs mx-0   rounded-lg `}
                >
                    <div className="flex  items-center  mb-10 mt-5 justify-between py-1 rounded-lg shadow
                    bg-white dark:bg-slate-800 mx-4">
                        <div className="flex-1">
                            <Heading text="Add A New Assistant" className="!mb-2 !font-black mt-0" />
                            <p className="mb-3 text-sm  px-6">Assistant added help to scan  ticket and give more data to the system</p>
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
            dark:bg-slate-800
            dark:shadow-sm
            dark:shadow-dark
            z-20
            rounded-2xl
            top-1/2
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
                    <AnimateText text="create new Assistant" className='!text-lg' />
                    <form
                        onSubmit={handleSubmit}
                        className='px-5'
                    >
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={fullnames}
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
                                id="fullname"
                                placeholder="Full Names" required />
                            <label
                                htmlFor="fullname"
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
                                Full Names
                            </label>
                        </div>
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={phone}
                                type="tel"
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
                                id="phonenumber"
                                placeholder="Phone number" required />
                            <label
                                htmlFor="phonenumber"
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
                                Phone Number
                            </label>
                        </div>
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={password}
                                type="password"
                                className="
              peer block min-h-[auto] border-2 w-full rounded shadow-none
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none
              transition-all duration-200 ease-linear
              focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:placeholder:text-neutral-200
              [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput33"
                                placeholder="Password" required />
                            <label
                                htmlFor="exampleFormControlInput33"
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
                            >Password
                            </label>
                        </div>

                        <AnimatedError error={err} errorMessage={err} />

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
                            disabled={isLoading}
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            {isLoading ? <Loadingbtn /> : "Create Account"}
                        </button>


                    </form>
                </div>



            </div>



            <form className="px-4 md:px-6 my-5 max-w-2xl mx-auto"
                onSubmit={e => e.preventDefault()}>
                <div className="flex relative min-h-[40px]">
                    <div className="relative w-full">
                        <input type="search" value={text}
                            onChange={e => setText(e.target.value)} id="search-dropdown" className="block outline-none focus:outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg
                        border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Email address,names etc " required />
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg
                        border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>





            <div class="w-full  lg:p-4
lg:col-span-8 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <Heading text="Recent Assistant" className="!font-black first-letter:!text-2xl !text-lg underline underline-offset-8 uppercase" />


                <div class="w-full max-w-2xl-- mx-auto bg-white dark:bg-slate-900 shadow-lg rounded-sm ">
                    <div class="overflow-x-auto">

                        <table class="table-auto w-full text-black dark:text-white">
                            <thead class="text-xs font-semibold uppercase text-gray-400 dark:bg-gray-800 bg-gray-50">
                                <tr>
                                    <th class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-left">index</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-left">Full Name</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-left">Phone Number</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-left">CreaedAt</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-left">Scan tickets</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-center">action</div>
                                    </th>
                                </tr>
                            </thead>
                            <AnimatePresence>
                                <tbody class="text-sm divide-y divide-gray-100">
                                    {

                                        data?.assistants?.map(({ fullname,
                                            phone, createdAt,
                                            numberOfTicketScan
                                            , _id }, index) => {
                                            return (
                                                <motion.tr
                                                    key={_id}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    initial={{ opacity: 1, x: 0 }}

                                                >

                                                    <td class="p-2 whitespace-nowrap">
                                                        <div class="text-left pl-1">{(index + 1) || "n/a"}</div>
                                                    </td>
                                                    <td class="p-2 whitespace-nowrap">
                                                        <div class="flex items-center">
                                                            <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                                <img class="rounded-full"
                                                                    src={useravatar}
                                                                />
                                                            </div>
                                                            <div class="font-medium text-gray-800
                                                        dark:text-white">{fullname}</div>
                                                        </div>
                                                    </td>
                                                    <td class="p-2 whitespace-nowrap">
                                                        <div class="text-left">{phone || "n/a"}</div>
                                                    </td>
                                                    <td class="p-2 whitespace-nowrap">
                                                        <div class="text-left font-medium text-green-500">{(new Date(createdAt).toDateString())}</div>
                                                    </td>
                                                    <td class="p-2 whitespace-nowrap">
                                                        <div class="text-left font-medium text-green-500">{numberOfTicketScan}</div>
                                                    </td>
                                                    <td class="p-2 whitespace-nowrap">

                                                        <UiButtonDanger
                                                            disabled={activeIndex == index}
                                                            onClick={() => handleDeleteUser(_id, index)}
                                                            name="delete " />
                                                    </td>
                                                </motion.tr>

                                            )
                                        })}

                                </tbody>
                            </AnimatePresence>

                        </table>


                    </div>
                </div>

            </div>

        </motion.div>
    )

}

export default Appointment