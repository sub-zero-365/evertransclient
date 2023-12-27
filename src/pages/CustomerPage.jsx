import React, { createContext, useContext } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { SlOptionsVertical } from 'react-icons/sl'
import { Rounded, Scrollable } from '../components'
import AnimatedText from '../components/AnimateText'
import TopRankUser from '../components/TopRankUser'

import { useQuery } from '@tanstack/react-query'
import { BiChevronDown } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFilter } from '../Hooks/FilterHooks'
import FilterButton from '../components/FilterButton'
import customFetch from '../utils/customFetch'
import { dateSortedOption } from "../utils/sortedOptions"
import SearchComponent from '../components/SearchBox'

const topRankedQuery = (params) => {
    return (
        {
            queryKey: ["rankedusers", params],
            queryFn: async () => {
                await new Promise((r) => setTimeout(() => {
                    r()
                }, 1000))
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
    const { data, isPreviousData, isLoading, isError } = useQuery(topRankedQuery(params))
    const [querySearch] = useSearchParams()

    if (isError) return <div>something went wrong</div>;
    if (isLoading) return <div>loading please wait ...</div>;
    return (
        <CustomerContext.Provider
            value={{
                data,
                isPreviousData
            }}
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
                    {/* search number form here  */}
                    <SearchComponent
                        type='tel'
                        filterMethod='numberFilter'
                        placeholder='Phone Number'
                    />
                    {/* end of header here */}
                    <Scrollable className="!justify-start !max-w-full !w-fit !mx-auto px-4 pb-5 scrollto">
                        {
                            dateSortedOption.map((query) => <FilterButton
                                name="quickdatesort"
                                {...query} key={Math.random()} />)
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