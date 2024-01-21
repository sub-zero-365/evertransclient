
import { Outlet, useNavigate, useLocation, Link, redirect, Form, useSubmit } from 'react-router-dom';
import { Heading } from '../components';
import UiButton from '../components/UiButton';
import { useState, useEffect, useRef } from 'react'
import AnimateText from '../components/AnimateText'
import { toast } from 'react-toastify'
import { Loadingbtn, } from '../components'
import { motion } from 'framer-motion'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import customFetch from '../utils/customFetch';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingButton from "../components/LoadingButton"
import { USER_ROLES } from '../utils/roles';
const onLoadFailure = (errorMessage = null) => toast.error(errorMessage || "Something went wrong", {
    position: toast.POSITION.TOP_CENTER
})
const assistantQuery = {
    queryKey: ["assistant"],
    queryFn: async () => {
        const res = await customFetch.get("/users/current-user");
        return res.data
    }

}
export const loader = (queryClient) => async ({ request }) => {
    try {
        return await queryClient.ensureQueryData(assistantQuery)
    } catch (err) {
        onLoadFailure(err?.response?.data)
        console.log("this is the error message : ", err.response.data)
        return redirect(`/login?message=something went wrong try again later&from=${new URL(request.url).pathname}`);
    }

}

export const action = (queryClient) => async ({ }) => {
    try {
        await customFetch.get("/auth/logout");
        await queryClient.removeQueries()
        return redirect("/")
    } catch (err) {
        toast.warning(err?.response?.data || err?.message || "something went wrong")
        return err
    }
}


const Assist = () => {
    const submit = useSubmit();

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const password1 = useRef(null);
    const password2 = useRef(null);
    const password3 = useRef(null);
    const onPasswordSuccess = () => toast.success("Password Change Successfully!!", {
        position: toast.POSITION.BOTTOM_CENTER
    })


    const { user: assistant } = useQuery(assistantQuery)?.data || { user: null }//to prevent some errors cause by the loader function
    useEffect(() => {
        if (assistant?.role !== "scanner") {
            const role = assistant.role
          
            if (role === USER_ROLES.admin || role === USER_ROLES.sub_admin || role === USER_ROLES.ticketer) {
                toast.error("Incorrect Credentials to access this route!!", {
                    position: toast.POSITION.TOP_CENTER
                })
                navigate(`/`)
                return
            }

        }
    },
        [
            assistant?.role
        ])
    const handleChangePassWord = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            await customFetch.patch("/assistant", {
                oldpassword: password1.current.value,
                newpassword: password2.current.value,
                confirmpassword: password3.current.value
            })
            setIsOpen(false)
            onPasswordSuccess()
        } catch (err) {
            setError(err.response.data)
            setTimeout(() => {
                setError(null)
            }, 6000)

        }
        finally {
            setLoading(false)
        }


    }
    const location = useLocation()
    const [show, setShow] = useState(true)

    useEffect(() => {
        if (location.pathname?.slice(1) !== "assistant") {
            setShow(false)
        } else { setShow(true) }
    }, [location])

    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="h-[calc(100vh-60px)] max-w-sm mx-auto">
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

                    <AnimateText text="change password " className='!text-lg' />
                    <form
                        onSubmit={handleChangePassWord}
                        className='px-5'
                    >
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={password1}
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
                                id="password1"
                                placeholder="Password" required />
                            <label
                                htmlFor="password1"
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
                                Old Passowrd
                            </label>
                        </div>
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={password2}
                                type="password"
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
                                id="password2"
                                placeholder="New Password" required />
                            <label
                                htmlFor="password2"
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
                                New Password
                            </label>
                        </div>
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={password3}
                                type="password"
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
                                id="password3"
                                placeholder="Email address" required />
                            <label
                                htmlFor="password3"
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

                            >Confirm Password
                            </label>
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
                            disabled={loading}
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            {loading ? <Loadingbtn /> : "Change Password"}
                        </button>


                    </form>
                </div>
            </div>
            <div>
                <div>
                    <div className="flex">
                        {
                            !show && (
                                <Link
                                    to={".."}
                                    relative="path"
                                    className='hover:bg-slate-300 
                                w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full '
                                >
                                    <AiOutlineArrowLeft size={20}
                                        className="flex-none pl-1 " />

                                </Link>
                            )
                        }
                        <div className="flex flex-wrap  mt-2">
                            <Heading text="Phone Number :"
                                className="!flex-1 !inline-block"
                            />
                            <Heading
                                text={`${assistant?.phone || "loading"}`}
                                className="!text-xl !font-black !text-black !pl-2 !inline-block"
                            />

                        </div>

                    </div>

                    <Form
                        method="post"

                    >
                        <LoadingButton
                            name="Logout ?"
                            className="!w-[min(400px,calc(100%-40px))] !pb-2.5 !pt-1.5
                            !bg-rose-800 !hover:bg-orange-900
                            !pl-0  !mb-2 !mx-auto"
                        >
                            Logout ?
                        </LoadingButton>

                    </Form>
                </div>
                {
                    show && (
                        <div className="mb">
                            <div className="flex space-x-2 flex-wrap">
                                <AnimateText
                                    text={"WelCome"}
                                    className="!text-xl !text-gray-900 italic !mb-0"
                                />
                                <AnimateText
                                    text={`${assistant?.fullname || "loading"}`}
                                    className="!text-3xl !text-black"
                                />
                                <AnimateText
                                    text={"Ready to scan "}
                                    className="!text-xl !text-gray-900 italic !mb-0"
                                />
                            </div>


                            <>
                                <Heading text="Go To Camera App Scan Ticket You will be redirect to this page"

                                    className="!text-center !pl-0"
                                />
                            </>
                            <div className='flex justify-center max-w-sm mx-auto gap-x-3 items-center'>
                                <span className='flex-1 h-[1px] bg-gray-800'></span>
                                <p className='text-xl font-bold'>OR</p>
                                <span className='flex-1 h-[1px] bg-gray-800'></span>
                            </div>
                            <h1 className='text-xl leading-4 tracking-tight mt-6 text-center '>Enter the <span className='text-gray-600 font-black text-2xl'>ID</span> of the ticket below </h1>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    const formData = new FormData(e.target)
                                    const id = formData.get("id");
                                    navigate(`${id}`)
                                }}
                                className="max-w-3xl mb-3 px-4 w-full mx-auto">
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <input

                                        id='id'
                                        name='id'
                                        className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                                    />
                                </div>
                                <UiButton
                                    type="submit"
                                    className="!px-10 !py-3.5 !mt-6 !font-semibold
                                !mx-auto !text-lg !bg-green-800
                                "
                                >
                                    Check Status
                                </UiButton>
                            </form>


                        </div>
                    )
                }
                {
                    show && (
                        <UiButton
                            name="Change Password"
                            className="!w-[min(400px,calc(100%-40px))] 
                            !fixed 
                            left-1/2 
                            -translate-x-1/2
                            !pb-2.5
                            !pt-1.5
                            !pl-0
                            !mb-2 !mx-auto
                            !bottom-10
                            "
                            onClick={() => {
                                setIsOpen(true)
                            }} />

                    )
                }
                <Outlet />
            </div>
        </div>)
}
export default Assist