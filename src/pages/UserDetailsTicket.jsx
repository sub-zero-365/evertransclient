import React, { useState, useEffect } from 'react'
import { useParams, useLoaderData, redirect, useSearchParams } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { AmountCount, FormatTable, PercentageBar, Scrollable, TicketCounts } from '../components'
import { VscFolderActive } from 'react-icons/vsc'
import { MdOutlinePriceChange } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'
import { useFilter } from '../Hooks/FilterHooks'
import { toast } from 'react-toastify'

import {
    useQuery
} from '@tanstack/react-query';
import { AiOutlineSave } from 'react-icons/ai'
const singleUserQuery = (id) => {
    return ({
        queryKey: ["user", id],
        queryFn: async () => {
            const res = await customFetch.get("/ticket?createdBy=" + id)
            return res.data
        }
    })
}

export const loader = (queryClient) => async ({ params: P, request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    try {

        await queryClient.ensureQueryData(singleUserQuery(P.id))
        return ({
            id: P.id,
            searchValues: params
        })
    } catch (error) {
        toast.error(error?.response?.data || error?.message || "something went wrong")
        return redirect("/dashboard/users");
    }
}
const UserDetailsTicket = () => {
    const { handleFilterChange } = useFilter()
    // const { id } = useLoaderData()
    const id = useParams().id
    const userData = useQuery(singleUserQuery(id)).data
    const [querySearch, setQuerySearch] = useSearchParams();


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);


    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        console.log(dates)
    };

    const [_userData, _setUserData] = useState({
        labels: ["active tickets", "inactive tickets"],
        datasets: [
            {
                label: "ticket data",
                data: [12, 14],
                backgroundColor: ["green", "orange"]
            }
        ],
        datalabels: {
            backgroundColor: function (context) {
                return context.dataset.backgroundColor;
            },
            borderColor: 'white',
            borderRadius: 25,
            borderWidth: 3,
            color: 'white',
            font: {
                weight: 'bold'
            },
            padding: 6,


        }


    }
    )

    const viewAll = querySearch.get("view");


    const handleChangeText = (e) => {

        handleFilterChange("search", e.target.value)
    }


    const handleBoardingRangeSearch = () => {
        if (querySearch.get("daterange")) {
            handleFilterChange("daterange", null)
        }
        handleFilterChange("boardingRange", `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`)
    }
    const handleFilterSearch = () => {
        if (querySearch.get("boardingRange")) {
            handleFilterChange("boardingRange", null)
        }
        handleFilterChange("daterange", `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`)
    }

    const handleSortTime = (evt) => {
        if (querySearch.get("sort") == evt.value) return
        handleFilterChange("sort", evt.value)
    }
    const handleChange = (evt) => {
        if (querySearch.get("ticketStatus") == evt.value) return
        handleFilterChange("ticketStatus", evt.value)
    }
    return (
        <>
            <div className="flex items-start  flex-wrap gap-x-4 gap-y-6 justify-center ">

                <Scrollable className={`!mb-10 !justify-center !w-full  flex ${viewAll && "!grid md:!grid-cols-2 gap-y-5"} !transition-all !duration-[1s]`}>
                    <PercentageBar
                        className={`${viewAll && "!min-w-[8rem]"}`}
                        percent={userData?.percentageActive} text="Active Ticket Ratio" />
                    <PercentageBar
                        className={`${viewAll && "!min-w-[8rem]"}`}
                        stroke="red"
                        percent={userData?.percentageInActive} text="InActive Ticket Ratio" />
                </Scrollable>
                {

                    <>
                        <div className='underline  mb-2 underline-offset-8 w-[400px] mx-auto text-center max-w-3xl md:hidden- font-medium text-slate-700 capitalize' onClick={() => {

                            if (querySearch.get("view")) {
                                handleFilterChange("view")
                            } else {
                                handleFilterChange("view", "all")
                            }

                        }} >{viewAll == "all" ? "view less" : "view all"}</div>
                        <Scrollable className={`!px-5 ${viewAll && "!grid md:!grid-cols-2"} !transition-all !duration-[1s] `}>
                            <TicketCounts counts={userData?.totalTickets}
                                text={"Total Number Of Tickets"}
                                icon={<AiOutlineSave />} />
                            <TicketCounts counts={userData?.totalActiveTickets}
                                text={"Total Number Of active Tickets"}
                                icon={<VscFolderActive />} />
                            <TicketCounts
                                text={"Total Number Of Inactive Tickets"}
                                counts={userData?.totalInActiveTickets} icon={<BiCategory />} />
                        </Scrollable>
                        <Scrollable className={`!px-5 ${viewAll && "!grid md:!grid-cols-2"}`}>
                            <AmountCount
                                className="!bg-blue-400"
                                text="Total coset of all tickets"
                                icon={<MdOutlinePriceChange />}
                                amount={userData?.totalPrice} />
                            <AmountCount
                                className="!bg-green-400"

                                text="Total coset of all active tickets"

                                icon={<BiCategory />} amount={userData?.totalActivePrice} />
                            <AmountCount
                                className="!bg-red-400 !text-black"

                                text="Total coset of all inactive tickets"

                                icon={<BiCategory />} amount={userData?.totalInActivePrice} />
                        </Scrollable>
                    </>
                }


            </div>
            <div className='flex items-start  flex-wrap gap-x-4 gap-y-6 justify-center'>
                <FormatTable
                    isPreviousData={false}
                    ticketData={userData}
                    admin
                />
            </div>
        </>
    )
}

export default UserDetailsTicket