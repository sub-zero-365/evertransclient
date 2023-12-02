import React, { useRef } from 'react'
import dayjs from "dayjs"
import { Link } from 'react-router-dom'
import { MdPendingActions } from "react-icons/md"
import UiButton from './UiButton'
import { motion } from "framer-motion"
import { scalevariants } from '../utils/framermotionanimate'

let downloadbaseurl = null
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    downloadbaseurl = process.env.REACT_APP_LOCAL_URL
    // dev code
} else {
    // production code
    downloadbaseurl = process.env.REACT_APP_PROD_URL

}

const Reciept = ({ id, _id, collected,
    name, senderfullname, senderidcardnumber,
    senderphonenumber, recieverfullname,
    recieverphonenumber, recieveridcardnumber,
    status
}) => {
    const createdDate = dayjs().format("MMM D, YYYY")
    return (
        <motion.div
            variants={scalevariants}
            whileHover="whileHover"
            className='shadow border-b px-4   mb-2 py-5'>
            <Link to={"/user/reciept/" + _id}
                className='  '>
                {/* <div
                    className='flex justify-between py-2  items-start'
                > */}
                    <h1 className='text-start text-3xl sm:text-4xl capitalize font-bold mb-2'>{"#yy8y43" ?? "n/a"}</h1>
                    {/* <p className='text-gray-600 '>#ID {id}</p> */}

                {/* </div> */}
                <div className='flex justify-between py-2  items-start'>
                    <div>
                        <p>{createdDate}</p>

                    </div>
                    <p className='text- animate-bounce'>{status}</p>
                </div>

                <h2 className='font-bold '>Reciept Info </h2>
                <div className='flex justify-between py-2  items-start'>
                    <p className='text-gray-600 '>Quantity : {senderfullname ?? "n/a"}</p>
                    <p className='text-gray-600 '>Price : {senderphonenumber}</p>
                    <p className='text-gray-600 '>#ID : {senderidcardnumber}</p>
                </div>

                {/* <h2 className='font-bold '>Reciever Info </h2> */}
                {/* <div className='flex justify-between py-2  items-start'>

                    <p className='text-gray-600 '>Name : {recieverfullname ?? "n/a"}</p>
                    <p className='text-gray-600 '>phone : {recieverphonenumber}</p>
                    <p className='text-gray-600 '>#ID : {recieveridcardnumber}</p>
                </div> */}




            </Link>
            <UiButton
                className="!block !mt-3"
            > <a
                target="_blank"
                href={`${downloadbaseurl}/mails/download/${_id}`}>
                    DOWNLOAD RECIEPT
                </a></UiButton>
        </motion.div>
    )
}

export default Reciept