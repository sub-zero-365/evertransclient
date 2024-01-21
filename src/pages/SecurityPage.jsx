import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { SlOptions } from 'react-icons/sl'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Heading, NextButton, PanigationButton, PieChart, PrevButton, ToggleSwitch } from '../components'
import GreetingText from '../components/GreetingText'
import InputBox from '../components/InputBox'
import InputForm from '../components/InputForm'
import UiButton from '../components/UiButton'
import dateFormater from '../utils/DateFormater'
import customFetch from '../utils/customFetch'
import { onErrorToast, onSuccessToast } from '../utils/toastpopup'
import ShowBuses from './ShowBuses'
import { USER_ROLES } from '../utils/roles'
import RestrictUser from '../components/RestrictUser'

const securityQuery = {
    queryKey: ["all_subadmins"],
    queryFn: async () => {
        const res = await customFetch.get("/users/security")
        return res.data
    }
}

export const loader = (queryClient) => async ({ request }) => {
    try {
        return await queryClient.ensureQueryData(securityQuery)
    } catch (err) {
        throw err
    }
}

const SecurityPage = ({ currentPage, skip }) => {
    const queryClient = useQueryClient()
    const token = localStorage.getItem("admin_token");
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const fullname = useRef(null)
    const phone = useRef(null)
    const password = useRef(null)
    const password2 = useRef(null)
    const setSelectedNull = () => setSelected(null)
    const { users, numberOfPages } = useQuery(securityQuery).data

    const handleCreateNewAdmin = async () => {
        return customFetch.post("/auth/register", {
            phone: phone.current?.value,
            fullname: fullname.current?.value,
            password: password.current?.value,
            password2: password2.current?.value,
            role: USER_ROLES.sub_admin
        },)
    }

    const addAdmin = useMutation(handleCreateNewAdmin, {
        onSuccess: data => {
            setIsOpen(false)
            onSuccessToast("successfully added new bus to the routes!")
        },
        onError: error => {
            onErrorToast((error.response.data ?? "Oops something bad happen try again later !!"))
        },
        onSettled: () => {
            queryClient.invalidateQueries("all_subadmins")
        }
    })
    return (
        <>
            <Helmet>
                <title>
                    security
                </title>
            </Helmet>
            <div className='!flex-1 h-[calc(100vh-60px)] px-2 lg:px-10  pt-5 container mx-auto overflow-y-auto pb-24'>
                <ShowBuses
                    className={"!z-[1000]"}
                    className2={"!z-[200]"}
                    isOpen={selected ? true : false}
                    setIsOpen={setSelectedNull}
                    title={"Settings!"}
                >
                    <div>
                        <Heading text="Account Actions" className="!mb-0 !text-sm  !text-center" />
                        <Heading text={`${selected?.fullname ?? ""}`} className="!mb-3  !text-lg !font-black uppercase !text-center" />
                        <RestrictUser
                            id={selected?._id}
                        />
                        <div className="mb-5" />
                        {/* <UiButton name="Confirm"
                            className={"!w-[min(300px,calc(100%-30px))] !mx-auto !bg-green-800 !pb-2.5 pt-1.5"}
                        /> */}
                    </div>
                </ShowBuses>
                <Heading text={"Security"} className={""} />
                <div className='flex items-start justify-between'>
                    <div className="flex-1">
                        <GreetingText heading={"Super,Add new Admin"}
                            setIsOpen={setIsOpen}
                            text={`
                        Admin added help to create new employees
                        `}
                        />

                        <div className='w-[30rem] max-w-[calc(100%-2.5rem)]'>
                            {
                                users && (

                                    <Swiper
                                        className='md:hidden mx-auto  w-full lg:max-w-2xl border '
                                        slidesPerView={1}
                                        modules={[Autoplay, Navigation]}
                                        autoplay={{
                                            delay: 20000,
                                            disableOnInteraction: false
                                        }}
                                        navigation={{
                                            prevEl: ".arrow__left",
                                            nextEl: ".arrow__right",
                                        }}
                                    >
                                        <PrevButton className="!left-1.5" />
                                        <NextButton className="!right-1.5" />
                                        <SwiperSlide>
                                            <PieChart

                                                chartData={
                                                    {
                                                        labels: users?.map((v) => v.fullname),
                                                        datasets: [
                                                            {
                                                                label: "user vs admin data",
                                                                data: users?.map((v) => v.total)

                                                            },
                                                        ]

                                                    }


                                                } />
                                        </SwiperSlide>


                                    </Swiper>



                                )
                            }

                        </div>


                    </div>
                    <InputForm
                        onSubmit={(e) => {
                            e.preventDefault()
                            addAdmin.mutate()
                        }}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        heading="Create an admin"
                    >
                        <InputBox
                            name={"Full Name"}
                            ref={fullname}
                            type={"text"}
                        />
                        <InputBox
                            name={"Phone Number"}
                            type={"tel"}
                            ref={phone}

                        />
                        <InputBox
                            name={"password"}
                            ref={password}
                            type={"password"}
                        />
                        <InputBox
                            name={"Confirm Password"}
                            ref={password2}
                            type={"password"}
                        />
                        <UiButton name={addAdmin.isLoading ? "Please Wait" : "Create Account"}
                            disabled={addAdmin.isLoading}
                            className={`!text-lg
                            ${addAdmin.isLoading && "!bg-black"}
                            !bg-blue-800 
                            !w-[min(300px,calc(100%-30px))] !mx-auto pb-2 pt-1.5`}
                        />
                    </InputForm>
                </div>
                {/* table here  */}
                <>

                    <div className="relative mt-10 xl:container 4xlmax-w- mx-auto overflow-x-auto
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
                                        Phone
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        CreatedAt
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        N_created
                                    </th>


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
                                        const { fullname,
                                            phone,

                                            total,
                                            createdAt } = user

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

                                                        // (index + 1) + (skip ?? 2) * ((currentPage ?? 2) - 1)
                                                        index + 1

                                                    }
                                                </th>


                                                <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {fullname || "n/a"}
                                                </th>


                                                <td className="px-3 py-4">
                                                    <span className="font-medium
">{phone || "n/a"}</span>
                                                </td>

                                                <td className="px-3 py-2">
                                                    {createdAt ?
                                                        dateFormater(createdAt).date : "n/a"}
                                                </td>


                                                <td className="px-3 py-2">
                                                    {total || "0"}
                                                </td>

                                                <td className="py-0 text-xs cursor-pointer hover:scale-110 transition-all duration-500 flex items-center justify-center"
                                                    onClick={() => setSelected({ ...user, testing: "some data" })}
                                                >
                                                    <SlOptions
                                                        size={20}
                                                    />

                                                </td>
                                            </tr>

                                        )
                                    }
                                    )
                                }

                            </tbody>
                        </table>

                    </div>
                    <div
                        className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto flex  md:gap-x-2"
                    >
                        {Array.from({
                            length: numberOfPages
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

                {/* table ends hee */}

            </div>


        </>
    )
}

export default SecurityPage