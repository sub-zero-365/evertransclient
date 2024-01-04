import {  Form, redirect, useSearchParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import {
    BarChart,
    LineChart,
    PanigationButton,
    PieChart,
    Scrollable,
    TicketCounts
} from '../components';
import AnimateText from '../components/AnimateText'
import { MdOutlineClose } from 'react-icons/md'
import Alert from '../components/Alert'
import { Button, Heading } from '../components';
import { AiOutlinePlus } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { UserData } from '../Assets/userdata';
import { Loadingbtn } from "../components";
import InputBox from '../components/InputBox';
import UiButton, { UiButtonDanger } from '../components/UiButton';
import dateFormater from '../utils/DateFormater';
// import { SlOptions } from 'react-icons/sl';
// import ShowBuses from './ShowBuses';
import customFetch from '../utils/customFetch'
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import RoleSelect from "react-select"
import { chatsOptions, usersRoleOptions } from "../utils/sortedOptions"
// import EmptyBox from "../components"
import EmptyBox from './ShowBuses'
import LoadingButton from '../components/LoadingButton';
import ToggleSwitch from '../components';
import { useDashBoardContext } from '../components/DashboardLayout';
import FilterButton from '../components/FilterButton';
import AnimatedText from '../components/AnimateText';
import { AreaChart } from '../components/AreaChart';
const usersQuery = {
    queryKey: ["user"],
    queryFn: async () => {
        const res = await customFetch.get(
            "/admin/userticketlength"
        )
        return res.data

    }
}
export const action = (queryClient) => async ({ request }) => {
    try {
        const form = await request.formData()
        const id = await form.get("id")
        const password = await form.get("password")
        await customFetch.delete("/user/delete-user/" + id, {
            data: { password }
        })
        await queryClient.invalidateQueries({
            queryKey: ["users"]
        })
        toast.success("delete user success!")
        return null
    }
    catch (err) {
        // console.log(err)
        toast.warning(err?.response?.data || err?.message || "something went wrong try again")
        return err
    }

}
export const loader = (queryClient) => async ({ params }) => {
    return await queryClient.ensureQueryData(usersQuery)
}

const Appointment = ({ skip, currentPage }) => {
    const [searchParams] = useSearchParams({
        chartOption: "bar"
    })
    const { user } = useDashBoardContext()

    // const { user } = useDashBoardContext()
    const { userdetails: users } = useQuery(usersQuery)?.data || {}
    const data = {}
    const [selected, setSelected] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const password = useRef(null)
    const phone = useRef(null)
    const fullnames = useRef(null)
    const email = useRef(null)
    const [role, setRole] = useState("tickets")
    let [t, setT] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault()
        setIsLoading(true)

        const url = "/auth/register"
        try {
            await customFetch.post(
                url, {
                password: password?.current?.value,
                phone: phone.current.value,
                fullname: fullnames.current.value,
                email: email.current.value,
                role
            },

            )

            setIsOpen(false)
            setT(true)
            // fetchData()
            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            setError(err?.response?.data || err?.message || "something went wrong!!");
            const timer = setTimeout(() => {
                clearTimeout(timer)
                setError("")
            }, 5000);

        }

    }



    const [text, setText] = useState("")

    useEffect(() => {
        setUserData({
            ...{
                labels: users?.map((v) => v.fullname),
                datasets: [
                    {
                        label: "ticket vs user data",
                        data: users?.map((v) => v.total)

                    },
                ]

            }

        })
    }, [users])





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
            <Alert toggle={t} message="Created successfully" setToggle={setT} />
            <EmptyBox
                title="Delete  User Account"
                isOpen={selected}
                setIsOpen={setSelected}
            >
                <Form
                    method='post'
                    className='px-6'
                >
                    <input
                        type='hidden'
                        name='id'
                        value={selected?._id}
                    />
                    {selected && <AnimateText
                        text="Enter Your Password to delete User"
                        className='!text-center !text-3xl'
                    />}
                    <h2
                        className='text-rose-500 font-black !text-center  !text-4xl line-clamp-1 mb-3 my-1'
                    >
                        {selected?.fullname}
                    </h2>
                    <InputBox
                        className="!min-h-[3rem] capitalize
                        !w-[min(300px,calc(100%-0.5rem))]
                        "
                        name="password"
                        hidden
                        type="password"

                    />

                    <LoadingButton
                        className="!w-[min(300px,calc(100%-0.5rem))] !mx-auto
                        !rounded-none !py-4  !bg-red-900"
                    >
                        Confirm Delete Accout
                    </LoadingButton>
                </Form>
            </EmptyBox>

            <div className="flex gap-x-1 items-center">
                <AnimatedText
                    text="Employees OverView"
                    className='!text-4xl lg:text-6xl lg:text-start'
                />
                {/* <Heading text="Employees OverView" className="!mb-0" /> <h2 className="text-lg text-gray-400">{users?.length}</h2> */}
            </div>
            <div className="lg:flex items-start lg:mb-14 w-full  lg:px-10">
            {/* {
            user?.role !== "admin"&& */}
                <div className={` flex-1 relative  text-xs mx-0   rounded-lg `}
                >
                    <div className="flex  items-center  mb-10 mt-5 justify-between py-1 rounded-lg shadow
                    bg-white dark:bg-slate-800 mx-4">
                        <div className="flex-1">{
                        user?.role == "user"&&
                        <Heading text="Add A New Employee" className="!mb-2 !pl-4 !font-black mt-0" />
                        
                        
                        }
                            <p className="mb-3 text-sm  px-6">
                                {user?.role == "admin" ? "Inorder to add new employes login as normal admin" : " Employees added help to book ticket and give more data"}
                            </p>
                        </div>
                        {
                        user?.role !== "admin"&&
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
                        }

                    </div>
                    <Scrollable
                        className="!justify-center"
                    >
                        <TicketCounts
                            className="!rounded-none !py-10"
                            counts={users?.length}
                            text="Total Number Of Employees"
                        />
                    </Scrollable>
                    <Scrollable className="!justify-start !max-w-full !w-fit !mx-auto px-4 pb-5 scrollto">
                        {
                            chatsOptions.map((query) => <FilterButton
                                name="chartOption"
                                {...query} key={query} />)
                        }

                    </Scrollable>
                    {
                        userData && (
                            searchParams.get("chartOption") == "line" && <LineChart chartData={userData} />
                            ||

                            searchParams.get("chartOption") == "bar" && <BarChart chartData={userData} /> ||
                            searchParams.get("chartOption") == "pie" && <PieChart chartData={userData} /> ||
                            searchParams.get("chartOption") == "area" && <AreaChart chartData={{
                                ...userData,
                                datasets: [
                                    {
                                        fill: true,
                                        borderColor: 'rgb(53, 162, 235)',
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                        label: "ticket vs user data",
                                        data: users?.map((v) => v.total)

                                    },
                                ]
                            }} />

                        )
                    }
                    {/* <LineChart chartData={userData} /> */}
                </div>
            {/* } */}
                {/* 
*/}

                <div className={`${user?.role == "admin" && "!invisible"}
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
                    {/* {user?.role !== "admin"&& */}
                    
                    <AnimateText text="add a new Employee " className='!text-lg !pl-2' />
                    {/* } */}
                    <form
                        onSubmit={handleSubmit}
                        className='px-5'
                    >
                        <InputBox
                            ref={fullnames}
                            name={"Full Names"}
                        />
                        <InputBox
                            ref={phone}
                            type={"tel"}
                            name={"Phone Number"}
                        />

                        <InputBox
                            ref={email}
                            type={"email"}
                            name={"Email Address"}
                        />

                        <InputBox
                            ref={password}
                            type={"password"}
                            name={"Password"}
                        />
                        <h2>select user role</h2>
                        <RoleSelect
                            name="role"
                            isSearchable={false}
                            defaultValue={usersRoleOptions[0]}
                            options={usersRoleOptions}
                            onChange={({ value }) => setRole(value)}
                        />

                        <div className="mb-6 flex items-center justify-between  text-sm font-medium md:text-xl text-orange-600">


                            <motion.h1
                                animate={{
                                    opacity: error ? 1 : 0,
                                    y: error ? 0 : -40,
                                    x: error ? 0 : -1000
                                }}

                                className="w-fit flex-none mx-auto tracking-[0.4rem] text-center ">  {error}</motion.h1>
                        </div>


                        <UiButton
                            type="submit"
                            className={"!text-lg !bg-blue-800 !w-[min(300px,calc(100%-30px))] !mx-auto pb-2 pt-1.5"}
                            disabled={isLoading}
                            name={isLoading ? <Loadingbtn /> : "Create Account"}
                        />


                    </form>
                </div>



            </div>



            <form className="px-4 !hidden md:px-6 my-5 max-w-2xl mx-auto"
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



            {/* table here */}
            <>

                <div className="relative mt-10 lg:max-w-6xl xl:container  mx-auto overflow-x-auto
bg-white
shadow-md sm:rounded-lg w-full mb-6 ">
                    <table className="w-full text-sm text-left text-gray-500 
dark:text-gray-400 transition-colors duration-[2s]">
                        <thead className="text-xs text-gray-700 dark:bg-slate-800 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    Index
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    Full Name
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    CreatedAt
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    Role
                                </th>

                                <th scope="col" className="px-3 py-3">
                                    N_Prints
                                </th>
                                {/* <th scope="col" className="px-3 py-3">
                                        N_created
                                    </th> */}

                                <th scope="col" className="px-3 py-3">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody
                            className="pt-4 pb-12 text-xs md:text-sm"

                        >
                            {
                                users?.map((user, index) => {
                                    const { fullname, phone, createdAt, _id, total, role } = user
                                    return (
                                        <tr key={index}
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

                                                    (index + 1) + (skip ?? 0) * ((currentPage ?? 2) - 1)

                                                }
                                            </th>


                                            <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {fullname || "fred morgan rose babell34"}
                                            </th>


                                            <td className="px-3 py-4">
                                                <span className="font-medium
">{phone || "n/a"}</span>
                                            </td>

                                            <td className="px-3 py-2">
                                                {dateFormater(createdAt).date}
                                            </td>
                                            <td className="px-3 py-2">
                                                {role}
                                            </td>


                                            <td className="px-3 py-2">
                                                {total}
                                            </td>

                                            <td className="py-0 text-xs cursor-pointer hover:scale-110 transition-all duration-500 flex items-center justify-center"
                                            >
                                                {
                                                    role == "tickets" ? <Button
                                                        className={"!max-w-[14rem] !w-full"}
                                                        name="View Employee"
                                                        href={`/dashboard/details/${_id}?admin=true&createdBy=${_id}`}
                                                    ></Button> : <Button
                                                        className={"!max-w-[14rem] !w-full"}
                                                        name="View Employee"
                                                        href={`/dashboard/mails?admin=true&createdBy=${_id}`}
                                                    ></Button>

                                                }
                                                {/* <Button
                                                    className={"!max-w-[14rem] !w-full"}
                                                    name="View Employee"
                                                    href={`/dashboard/details/${_id || index}?admin=true&createdBy=${_id}`}
                                                ></Button> */}

                                                <UiButtonDanger
                                                    className="px-2 !flex !items-center"
                                                    onClick={() => setSelected(user)}
                                                >
                                                    Delete Account
                                                </UiButtonDanger>

                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>

                </div>
                <div
                    className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto flex  md:gap-x-2"
                >
                    {Array.from({
                        length: data?.numberOfPages
                    }, (text, index) => {
                        return <PanigationButton
                            text={index + 1}
                            active={index + 1}
                            // loading={isActiveIndexLoading}
                            index={index}

                            onClick={() => {
                                // setActiveIndex(index)
                                // checkPages(index + 1)
                            }} />
                    })}
                </div>
            </>
            {/* table ends here */}


        </motion.div>
    )

}

export default Appointment