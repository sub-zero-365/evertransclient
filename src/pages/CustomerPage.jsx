import React, { createContext, useContext } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Form, Rounded, Scrollable } from '../components'
import AnimatedText from '../components/AnimateText'
import { SlOptionsVertical } from 'react-icons/sl'
import TopRankUser from '../components/TopRankUser'

import { dateSortedOption, queryOptions } from "../utils/sortedOptions"
import FilterButton from '../components/FilterButton'
import { useQuery } from '@tanstack/react-query'
import customFetch from '../utils/customFetch'
import { useNavigate } from 'react-router-dom'
import { useFilter } from '../Hooks/FilterHooks'
const topRankedQuery = (params) => {

    return (
        {
            queryKey: ["rankedusers", params],
            queryFn: async () => {
                const res = await customFetch.get("/ranked-users", {
                    params: {
                        ...params
                    }
                })
                return res.data
            },
            keepPreviousData: true
        }
    )
}
const CustomerContext = createContext()
const CustomerPage = () => {
    const { handleFilterChange } = useFilter()
    const navigate = useNavigate()
    const params = Object.fromEntries([
        ...new URL(window.location.href).searchParams.entries(),
    ])
    const { data, isPreviousData } = useQuery(topRankedQuery(params))
    console.log("this is the data here", data)
    return (
        <CustomerContext.Provider
            value={{ data }}
        >
            <div
                className='w-full max-w-3xl mx-auto -bg-gray-500 flex flex-col h-screen max-h-[calc(100vh-4rem)]'
            >
                <div className='flex-none'>
                    <div
                        className='flex p-4 items-center justify-between'
                    >
                        <Rounded
                            onClick={() => navigate(-1)}
                        >

                            <AiOutlineArrowLeft
                                size={20}
                                className='flex-none'
                            />
                        </Rounded>

                        <AnimatedText
                            text="Top Ranked Customer"
                            className='!text-2xl !text-center'
                        />
                        <Rounded>
                            <SlOptionsVertical
                                size={20}

                            />
                        </Rounded>

                    </div>
                    <Form
                        onChange={search => handleFilterChange("search", search)}
                    />
                    {/* end of header here */}
                    <Scrollable className="!justify-start !max-w-full !w-fit !mx-auto px-4 pb-5">
                        {
                            dateSortedOption.map((query) => <FilterButton
                                name="quickdatesort"
                                {...query} key={query} />)
                        }

                    </Scrollable>
                </div>
                <TopRankUser />
            </div>

        </CustomerContext.Provider>
    )
}
export const useCustomerContext = () => useContext(CustomerContext)
export default CustomerPage