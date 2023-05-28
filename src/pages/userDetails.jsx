import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { BsFillPersonFill } from 'react-icons/bs';
import { GrStackOverflow } from 'react-icons/gr';
import Select from 'react-select';
import Select2 from 'react-select';
import { useSelector, useDispatch } from 'react-redux'

// import 
const Details = () => {
  const options = [
    { label: "all", value: "all" },
    { label: "today", value: "today" },
    { label: "yesterday", value: "last" },
    { label: "last week", value: "la" },

  ]
  return (
    <div className='pt-4 px-2 max-w-full overflow-x-auto max-h-[calc(100vh-3rem)] overflow-y-auto'>
      <div className="lg:flex items-start gap-4">
        <div className="flex-1   mb-6">
          <div className="flex items-start  flex-wrap gap-x-4 gap-y-6 justify-center ">
            <div>
              <h1 className="text-xl mb-4 text-montserrat font-medium text-center uppercase">all time data</h1>
              <CircularProgressbar
                background
                strokeWidth={8}
                initialAnimation
                circleRatio={0.6}
                className='!w-[12.5rem] '
                styles={{

                  path: {
                    stroke: `rgba(62,154,199,${66 / 100})`

                  },
                  trail: {
                    stroke: "green"
                  },
                }}

                percentage={66} text={"66%"} />
        <Select2 options={options} className='!border-none !h-8 mt-4' />
                

            </div>
            <div className='flex flex-wrap  gap-2 '>
              <div className="shadow relative group bg-white py-5  overflow-hidden  px-4 rounded-xl">
            <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
                
                <span className="h-12 w-12 mx-auto  md:w-10 md:h-10 bg-blue-100 hover:bg-slate-300 transition-colors 
                duration-700 rounded-full grid place-items-center shadow-sm z-10">{false || <BsFillPersonFill className="text-4xl" />}</span>
                <p className='text-sm font-medium'>total number of tickets</p>
                <h4 className='font-semibold text-xl mb-2 text-center group-hover:text-2xl'>202</h4>
                <p className='text-sm font-medium text-center'>printed by me</p>
                <h4 className='font-semibold text-xl mb-4 text-center'>123</h4>
              </div>
              <div className="shadow bg-white py-5  px-4 rounded-xl">
                <span className="h-12 w-12 mx-auto  md:w-10 md:h-10 bg-blue-100 hover:bg-slate-300 transition-colors 
                duration-700 rounded-full grid place-items-center shadow-sm z-10">{false || <BsFillPersonFill className="text-4xl" />}</span>
                <p className='text-sm font-medium'>total number of tickets</p>
                <h4 className='font-semibold text-xl mb-2 text-center'>202</h4>
                <p className='text-sm font-medium text-center'>printed by me</p>
                <h4 className='font-semibold text-xl mb-4 text-center'>123</h4>
              </div>

            </div>
          </div>


        </div>
        <div className='flex-none  max-w-sm w-[23rem] 
        text-center bg-white rounded-sm -fixed top-0 lg:static px-4 py-10 pt-6'>
          <h1 className='text-xl font-medium '>user name</h1>
          <h1 className='text-sm text-slate-500 font-medium '>Ako Bate Emmanuel</h1>
          <h1 className='text-xl font-medium '>user name</h1>
          <h1 className='text-sm text-slate-500 font-medium '>Ako Bate Emmanuel</h1>
        </div>
      </div>

      <div className="flex justify-between pr-5">
        <h1 className="text-2xl mt-4 mb-6 text-gray-700 pl-6  tracking-tight">All tickets <GrStackOverflow className="inline-block pl-2 text-4xl" /></h1>
        <Select options={options} className='!border-none !h-8 mt-4' />

      </div>
      <div className="relative max-w-full overflow-x-auto shadow-md sm:rounded-lg w-full mb-6 ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Index
              </th>
              <th scope="col" className="px-3 py-3">
                full name
              </th>
              <th scope="col" className="px-3 py-3">
                phone
              </th>
              <th scope="col" className="px-3 py-3">
                price
              </th>
              <th scope="col" className="px-3 py-3">
                from
              </th>
              <th scope="col" className="px-3 py-3">
                to
              </th>
              <th scope="col" className="px-3 py-3">
                date
              </th>
              <th scope="col" className="px-3 py-3">
                time
              </th>
              <th scope="col" className="px-3 py-3">
                status
              </th>
              <th scope="col" className="px-3 py-3">
                age
              </th>
              <th scope="col" className="px-3 py-3">
                sex
              </th>
              <th scope="col" className="px-3 py-3">
                Action
              </th>

            </tr>
          </thead>
          <tbody>
            {
              [1, 2, 3, 4, 56, 7, 8, 9, 9, 0, 0, 3, 2].slice(0, 10).map((ticket, index) => (<tr key={index} className="bg-white hover:bg-slate-300  text-xs dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-2 py-4  flex items-center justify-center">
                  {index + 1}
                </td>
                <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ticket?.fullname || "ako bate emmanuel"}
                </th>
                <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ticket?.phone || "n/a"}
                </th>
                <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ticket?.price || " 5000frs"}
                </th>
                <td className="px-3 py-4">
                  <span className="font-medium
                                    ">{ticket?.from || " n/a"}</span>

                </td>
                <td className="px-3 py-4">
                  <span className="font-medium ">{ticket?.to || "n/a"}</span>
                </td>
                <td className="px-3 py-4">
                  {ticket?.traveldate ?
                    (new Date(ticket.traveldate).toLocaleDateString()) : "n/a"}

                </td>
                <td className="px-3 py-4">
                  {ticket?.traveltime
                    || "n/a"}

                </td>
                <td className="px-3 py-4">
                  {ticket?.active ?
                    <button type="button" class="text-white bg-gradient-to-r
                                      from-blue-500 via-blue-600
                                      to-blue-700 hover:bg-gradient-to-br text-xs
                                      focus:ring-4 focus:outline-none focus:ring-blue-300
                                      dark:focus:ring-blue-800  shadow-blue-500/50 
                                       dark:shadow-blue-800/80 font-medium rounded-lg 
                                       px-5 py-1 text-center  ">yes</button>
                    : <button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Pink</button>
                  }

                </td>

                <td className="px-3 py-4">
                  {ticket?.age || "n/a"}

                </td>
                <td className="px-3 py-4">
                  {ticket?.sex || "n/a"}

                </td>
                <td className="px-3 py-4 text-xs" onClick={() => 0}>
                  <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">details</a>
                </td>
              </tr>
              ))
            }

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Details