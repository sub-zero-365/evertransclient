import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFilter } from '../Hooks/FilterHooks'
const Form = ({ onChange, params, placeholder,className }) => {
  const [q] = useSearchParams()
  const { handleFilterChange } = useFilter()

  return (
    <form className={`${className} px-4 md:px-6 my-5 max-w-5xl mx-auto`} onSubmit={async (e) => {
      // e.preventDefault()
      const formData = new FormData(e.target)
      const search =  formData.get("search") || ""
      onChange(search)
      e.preventDefault()

    }}>
      <div className="flex relative min-h-[40px]">
        <div className="relative w-full flex items-stretch">
          <button type="submit" className="flex-none flex items-center justify-center min-w-[4rem] top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-l-lg
                        border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
          </button>
          <input
            type="search"
            name="search"
            // value={(q.get("search") || "")}
            defaultValue={(q.get("search") || "")}

            className="block outline-none flex-1 !rounded-none focus:outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg  rounded-l-none
                        border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder={placeholder || "Hey Search me "} required />
          <button
            onClick={() => handleFilterChange("search")}
            type="submit" className="flex-none flex items-center justify-center min-w-[4rem] top-0 right-0 p-2.5 text-sm font-medium text-white bg-rose-700 rounded-r-lg
                        border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800">
            {/* <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
            Clear
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form