import React from 'react'
import { Outlet } from "react-router-dom"
import AnimatedText from '../components/AnimateText'
import { Scrollable } from '../components'
import FilterButton from '../components/FilterButton'
import { chatsOptions, dateSortedOption } from '../utils/sortedOptions'
const UserStats = () => {
  return (
    <div
      className='flex '
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
     
      </div>
      <div
        className='flex-1'
      >
        <Outlet />
      </div>
    </div>
  )
}

export default UserStats