import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Number } from '../components';
import AnimateText from '../components/AnimateText'
import { MdOutlineClose } from 'react-icons/md'

import { setUsers } from '../actions/adminData';
import { Loader, Button, Heading } from '../components';
import { AiOutlinePlus } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { UserData } from '../Assets/userdata';
import { setUserName } from "../actions/userName"
import { Loadingbtn } from "../components";
const Appointment = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const setuserName = (username) => {
        dispatch(setUserName(username))

    }
    const password = useRef(null)
    const phone = useRef(null)
    const fullnames = useRef(null)
    const email = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const url = process.env.REACT_APP_LOCAL_URL + "/auth/register"
        try {
            const res = await axios.post(
                url, {
                password: password.current.value,
                phone: phone.current.value,
                fullname: fullnames.current.value,
                email: email.current.value,
            }
            )
            const { data: { fullname, token } } = res
            setuserName(fullname)
            localStorage.removeItem("token");
            localStorage.setItem("token", res.data.token)
            navigate("/user")
            // return res
            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            // setError("registration fail");
            setError(err.response.data);

            const timer = setTimeout(() => {
                clearTimeout(timer)
                setError("")
            }, 5000);

        }

    }

    // 
    const token = localStorage.getItem("admin_token");

    const users_ = useSelector(state => state.setAdminData.users);
    const _isLoading = useSelector(state => state.setAdminData.loading.users)
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const setUsers_ = (payload) => {
        return dispatch(setUsers(payload))
    }
    const [text, setText] = useState("")



    useEffect(() => {
        const url = process.env.REACT_APP_LOCAL_URL + "/admin/userticketlength"

        async function fetchData() {
            if (token == null) {
                alert("please login to get token")
            }
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    },
                    params: {
                        search: text
                    }
                })
                setUsers_([...response?.data?.userdetails]);
                setUserData({
                    ...{
                        labels: [...response?.data?.userdetails].map((v) => v.user.fullname),
                        datasets: [
                            {
                                label: "ticket vs user data",
                                data: [...response?.data?.userdetails].map((v) => v.nHits)

                            },
                        ]

                    }

                })
            } catch (err) {
                setUsers_([])
                alert("fail to get users")
                console.log(err)
            }
        }
        fetchData()



    }, [text])






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
            {isLoading && (<Loader toggle dark />)}
            <div> </div>
            <Heading text="Employees OverView" />
            <div className="lg:flex lg:mb-14 w-full  lg:px-10">
                <div className={` flex-1 relative  text-xs mx-0   rounded-lg `}
                >
                    <div className="flex  items-center  mb-10 mt-5 justify-between py-1 rounded-lg shadow bg-white mx-4">
                        <div className="flex-1">
                            <Heading text="Add A New Employee" className="!mb-2 !font-black mt-0" />
                            <p className="mb-3 text-sm  px-6">Employees added help to book ticket and give more data</p>
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
                    <LineChart chartData={userData} />
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
                    <AnimateText text="create new employee" className='!text-lg' />
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
                                // className="
                                // pointer-events-none 
                                // absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0]
                                // truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200
                                // ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
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
                            <input ref={email}
                                type="email"
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
                                id="exampleFormControlInput3"
                                placeholder="Email address" required />
                            <label
                                htmlFor="exampleFormControlInput3"
                                // className="
                                // pointer-events-none 
                                // absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0]
                                // truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200
                                // ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
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

                            >Email address
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

                        <div className="mb-6 flex items-center justify-between  text-sm font-medium md:text-xl text-orange-600">
                            <motion.h1
                                animate={{
                                    opacity: error ? 1 : 0,
                                    y: error ? 0 : -40,
                                    x: error ? 0 : -1000

                                }}


                                className="text-center w-fit flex-none mx-auto tracking-[0.4rem] text-center ">  {error}</motion.h1>
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
                            {isLoading ? <Loadingbtn /> : "Create Account"}
                        </button>


                    </form>
                </div>

                {/* <div className="flex-none lg:w-[25rem]   shadow-xl lg:rounded-lg bg-white shadow-slate-400 shadow-offset-4">
                    side bar here
                </div> */}


            </div>
            {/* <Scrollable className="mb-10 mt-5">
                <AmountCount
                    className="!bg-blue-400"
                    text="All employees"
                    icon={<BiCategory />}
                    amount={67} />
                <AmountCount
                    className="!bg-blue-400"
                    text="All employees"
                    icon={<BiCategory />}
                    amount={67} />
                <AmountCount
                    className="!bg-blue-400"
                    text="All employees"
                    icon={<BiCategory />}
                    amount={67} />
            </Scrollable> */}



            <form className="px-4 md:px-6 my-5 max-w-2xl mx-auto"
                onSubmit={handleSubmit}>
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



            <div className="relative max-w-full w-full  mx-auto overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="max-w-full w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                Index
                            </th>
                            <th scope="col" className="px-6 py-3">
                                full name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                N_print
                            </th>
                            <th scope="col" className="px-6 py-3">
                                createdAt
                            </th>

                            {/* <th scope="col" className="px-6 py-3">
                                user_id
                            </th> */}

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users_.map(({ user, nHits }, index) => (<tr key={index}
                                className={`${index & 1 ? "bg-transparent" : "bg-slate-200"}
                            dark:bg-gray-900 dark:border-gray-700 hover:bg-slate-200`}
                            >
                                <td className="px-2 py-4  flex items-center justify-center">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user?.fullname || "n/a"}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user?.phone || "n/a"}
                                </th>
                                <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Number number={nHits} />
                                </th>

                                <td className="px-6 py-4">
                                    {user?.createdAt ?
                                        (new Date(user?.createdAt).toLocaleDateString()) : "n/a"}

                                </td>



                                <td className="px-0 py-0 text-xs" >
                                    <Button
                                        name="Check User"
                                        href={`/dashboard/details/${user?._id || index}?admin=true&createdBy=${user?._id}`}
                                    ></Button>
                                </td>
                            </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </motion.div>
    )

}

export default Appointment