import React from 'react'
import { useSearchParams } from 'react-router-dom'
const Form = ({ onChange, params }) => {
  const [q] = useSearchParams()

  return (
    <form className="px-4 md:px-6 my-5 max-w-5xl mx-auto" onSubmit={async (e) => {
      const formData = new FormData(e.target)
      const search = await formData.get("search") || ""
      onChange(search)
      e.preventDefault()
      // const text = await e.target.formData()

    }}>
      <div className="flex relative min-h-[40px]">
        <div className="relative w-full">
          <input type="search"
            name="search"
            // value={(q.get("search") || "")}
            defaultValue={(q.get("search") || "")}


            // onChange={onChange}

            id="search-dropdown" className="block outline-none focus:outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg
                        border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Hey Search me " required />
          <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg
                        border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form