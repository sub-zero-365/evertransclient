import React from 'react'
import { Heading } from "./"
import dayjs from "dayjs"
import UiButton from './UiButton'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { scalevariants } from '../utils/framermotionanimate'
const TicketDetail = ({ fullname, traveldate, from, to, _id, createdAt }) => {
    let downloadbaseurl = null
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        downloadbaseurl = process.env.REACT_APP_LOCAL_URL
        // dev code
    } else {
        // production code
        downloadbaseurl = process.env.REACT_APP_PROD_URL

    }

    return (
        <motion.div
            variants={scalevariants}
            whileHover="whileHover"
            class="max-w-sm mb-1 dark:text-white  cursor-pointer
bg-white  border  border-gray-200 rounded-lg shadow-xl dark:shadow-sm 
dark:shadow-black shadow-slate-300 dark:bg-gray-800 dark:border-gray-700">


            <Link to={_id} class="px-2 pb-4">
                <div className="grid grid-cols-[1fr,auto] px-2 
pb-2
items-center justify-between border dark:border-slate-400 ">
                    <Heading text="Tickets Details"
                        className="!mb-0 !text-xs !text-start !mt-0 !pl-0 !ml-0 
!font-semibold first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                    <h4 className='!text-xs text-slate-500 !mb-0 !pb-0'>
                        {createdAt && dayjs(createdAt).format("YYYY/MM/DD")}
                    </h4>
                </div>
                <Heading text="FullName" className="!mb-0 !text-center !text-lg !font-medium first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                <Heading text={fullname} className="!mb-2 !text-sm !text-center" />
                <div className='grid grid-cols-2'>
                    <div>
                        <Heading text="From" className="!mb-0 !text-lg !font-medium  first-letter:!font-semibold !font-montserrat" />
                        <Heading text={from} className="!mb-2 !text-sm" />
                    </div>

                    <div>
                        <Heading text="To" className="!mb-0 !text-lg !font-medium  first-letter:!font-semibold !font-montserrat" />
                        <Heading text={to} className="!mb-2 !text-sm" />
                    </div>

                </div>
                {/* <Heading text="Travel Date" className="!mb-0 !text-center !text-lg !font-medium  first-letter:!font-semibold !font-montserrat" />
                <Heading text={(new Date(traveldate).toLocaleDateString())} className="!mb-2 !text-sm !text-center" /> */}
            </Link>
            <div className='grid grid-cols-1 gap-x-1 place-items-center'>
                <a
                    target='_blank'
                    className=' max-w-[95%] mx-auto
w-full
font-medium
shadow
md:shadow-md
shadow-blue-200
dark:shadow-slate-800
bg-blue-800
dark:bg-gray-700

py-3.5
mr-1
rounded-sm
text-white
dark:font-semibold
px-3

place-items-center  
hover:bg-blue-900
ease 
transition-colors
duration-700
hover:underline
flex
justify-center 
items-center
text-[0.7rem] 
md:text-sm
font-montserrat

'

                    href={`${downloadbaseurl}/downloadticket/${_id}`}>download</a>

            </div>
        </motion.div>
    )
}

export default TicketDetail