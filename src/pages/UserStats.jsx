import React, { createContext, useContext, useState } from 'react'
import { Outlet } from "react-router-dom"
import AnimatedText from '../components/AnimateText'
import { Scrollable } from '../components'
import FilterButton from '../components/FilterButton'
import { chatsOptions, dateSortedOption } from '../utils/sortedOptions'
import UiButton from '../components/UiButton'
import EmptyModal from "../pages/ShowBuses"
import {
  AmountCount
  , BarChart,
  LineChart,
  PieChart
} from '../components'
const userStatsContext = createContext()
const UserStats = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [stats, setStats] = useState({})
  return (
    <userStatsContext.Provider
      value={{
        stats,
        setStats,
        setIsOpen
      }}
    >
      <EmptyModal
        className2={"!w-[min(calc(100%-40px),700px)]"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >

        {
          stats &&<>
          <div
          ></div>
          <BarChart chartData={
            {
              labels: stats?.monthlyApplications?.map(({ date }) => date),
              datasets: [
                {
                  label: "Number vs MailStatus",
                  // data: users?.map((v) => v.total)
                  data: stats?.monthlyApplications?.map(({ count }) => count)
                  // backgroundColor: ["red", "blue", "green"]
                },
              ]
            }
          } />
        </>
        }
   
        {/* jopajsdf {JSON.stringify(stats)} */}
      </EmptyModal>
      <div
        className='lg:flex flex-row-reverse'
      >

        <div className='flex-none  w-full max-w-sm hidden lg:block px-4 border-r-2 shadow-sm'>
          <AnimatedText
            text="Filter Mails"
            className='!text-3xl'
          />
          <h1
            className='break-words text-center text-blue-800
        inline-block w-full text-dark font-black  capitalize
        text-2xl mb-5 '
          >
            Quick Date Sort
          </h1>
          <Scrollable
            className="max-w-5xl mx-auto !mb-5 !flex-wrap gap-y-4 justify-center "
          >
            {
              dateSortedOption.map((query) => <FilterButton
                name="quickdatesort"
                {...query} key={Math.random()} />)
            }
          </Scrollable>
          <h1
            className='break-words text-center text-blue-800
        inline-block w-full text-dark font-black  capitalize
        text-2xl mb-5'
          >
            Chat Options
          </h1>
          <Scrollable className="!justify-start !flex-wrap !max-w-4xl gap-y-4 !w-fit !mx-auto px-4 pb-5 scrollto">
            {
              chatsOptions.map((query) => <FilterButton
                name="chartOption"
                {...query} key={query} />)
            }

          </Scrollable>
          <UiButton
            onClick={() => setIsOpen(c => !c)}
            className="w-[min(calc(100%-10px),500px)] mx-auto !py-4 !bg-blue-900"
          >
            6Months Stats
          </UiButton>
        </div>
        <div
          className='flex-1'
        >
          <Outlet />
        </div>
      </div>
    </userStatsContext.Provider>
  )
}
export const useUserContext = () => useContext(userStatsContext)
export default UserStats
