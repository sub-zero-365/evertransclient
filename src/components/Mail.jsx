import React from 'react'
import dayjs from "dayjs"
import { Link } from 'react-router-dom'
import { MdPendingActions } from "react-icons/md"
import UiButton from './UiButton'
import { motion } from "framer-motion"
const Status = ({ status }) => {
    return (<div>
        {status ? "collected" : <div className='flex items-end gap-x-2'>
            <p>pending</p> <MdPendingActions size={15} />
        </div>}
    </div>)

}
let downloadbaseurl = null
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    downloadbaseurl = process.env.REACT_APP_LOCAL_URL
    // dev code
} else {
    // production code
    downloadbaseurl = process.env.REACT_APP_PROD_URL

}
const Mail = ({ id, _id, collected,
    name, senderfullname, senderidcardnumber,
    senderphonenumber, recieverfullname,
    recieverphonenumber, recieveridcardnumber,
    status
}) => {
    const createdDate = dayjs().format("MMM D, YYYY")
    return (
        <motion.div
            whileHover={{
                scale: 0.9, transition: {
                    duration: 0.4
                }
            }}
            className='shadow border-b px-4   mb-2 py-5'>
            <Link to={"/user/mail/" + _id}
                className='  '>
                <div
                    className='flex justify-between py-2  items-start'
                >
                    <h1 className='text-start text-2xl capitalize font-bold mb-2'>{name ?? "n/a"}</h1>
                    <p className='text-gray-600 '>#ID {id}</p>
                </div>
                <div className='flex justify-between py-2  items-start'>
                    <div>
                        <p>{createdDate}</p>


                    </div>
                    <p className='text- animate-bounce'>{status}</p>
                </div>

                <h2 className='font-bold '>Sender Info </h2>
                <div className='flex justify-between py-2  items-start'>

                    <p className='text-gray-600 '>Name : {senderfullname ?? "n/a"}</p>
                    <p className='text-gray-600 '>phone : {senderphonenumber}</p>
                    <p className='text-gray-600 '>#ID : {senderidcardnumber}</p>
                </div>

                <h2 className='font-bold '>Reciever Info </h2>
                <div className='flex justify-between py-2  items-start'>

                    <p className='text-gray-600 '>Name : {recieverfullname ?? "n/a"}</p>
                    <p className='text-gray-600 '>phone : {recieverphonenumber}</p>
                    <p className='text-gray-600 '>#ID : {recieveridcardnumber}</p>
                </div>




            </Link>
            <UiButton
                className="!block !mt-3"
            > <a
                target="_blank"
                href={`${downloadbaseurl}/mails/download/${_id}`}>
                    DOWNLOAD
                </a></UiButton>
        </motion.div>
    )
}

export default Mail