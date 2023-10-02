import React from 'react'
import dayjs from "dayjs"
import { Link } from 'react-router-dom'
import { MdPendingActions } from "react-icons/md"
const Status = ({ status }) => {
    return (<div>
        {status ? "collected" : <div className='flex items-end gap-x-2'>
            <p>pending</p> <MdPendingActions size={15} />
        </div>}
    </div>)

}
const Mail = ({ id,_id, collected, name, senderfullname, senderidcardnumber, senderphonenumber }) => {
    const createdDate = dayjs().format("MMM D, YYYY")
    return (
        <Link to={"/user/mail/" + _id}
            className='px-4 py-5 shadow border-b  mb-2 '>
            <h1 className='text-start text-2xl capitalize font-bold mb-2'>{name ?? "n/a"}</h1>
            <div className='flex justify-between py-2  items-start'>
                <div>
                    <p>{createdDate}</p>
                    <p className='text-gray-600 '>#ID {id}</p>

                </div>
                <Status status={false} />
            </div>
            <h2 className='font-bold '>Sender Info </h2>
            <div className='flex justify-between py-2  items-start'>

                <p className='text-gray-600 '>Name : {senderfullname ?? "n/a"}</p>
                <p className='text-gray-600 '>phone : {senderphonenumber}</p>
                <p className='text-gray-600 '>#ID : {senderidcardnumber}</p>
            </div>


        </Link>
    )
}

export default Mail