import { motion } from "framer-motion";
import { Button, DeactiveStatusButton, ActiveStatusButton } from './'
import { useState, useEffect } from 'react'

import EditTicketModal from './EditTicketModal'
const FormatTable = ({ tickets, currentPage, admin, skip }) => {
    const [ticket, setSelectTicket] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const handleEditTicket = async (ticket) => {
        setIsOpen(true)
        setSelectTicket(ticket)
    }
    useEffect(() => {
        if (!isOpen) {
            setSelectTicket({})
        }
    }, [isOpen])


    const FormatTd = ({ ticket }) => {
        if (ticket?.active) {
            return (
                <td className="px-3 py-4  grid place-items-center">
                    <ActiveStatusButton />
                </td>
            )
        }
        return (
            <td className="px-3 py-4  grid place-items-center">
                {
                    ticket.active ? <ActiveStatusButton /> : <DeactiveStatusButton />
                }
            </td>
        )


    }
    return (
        <>

            <EditTicketModal
                ticket={ticket}
                isOpen={isOpen}
                setIsOpen={setIsOpen} />
            <div className="relative max-w-full overflow-x-auto
                    bg-white
    shadow-md sm:rounded-lg w-full mb-6 ">
                <table className="w-full text-sm text-left text-gray-500 
              dark:text-gray-400 transition-colors duration-[2s]">
                    <thead className="text-xs text-gray-700 dark:bg-slate-800 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                Index
                            </th>
                            <th scope="col" className="px-3 py-3">
                                full name
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

                            <th scope="col" className="px-3 py-3 hidden lg:block">
                                time
                            </th>
                            <th scope="col" className="px-3 py-3">
                                createdAt
                            </th>
                            <th scope="col" className="px-3 py-3">
                                phone
                            </th>

                            <th scope="col" className="px-3 py-3">
                                status
                            </th>
                            <th scope="col" className="px-3 py-3">
                                type
                            </th>
                            <th scope="col" className="px-3 py-3">
                                price
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>

                    <motion.tbody
                        className="pt-4 pb-12 text-xs md:text-sm"
                        key={currentPage}
                        initial={{ x: 100, opacity: 0.1 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}

                    >
                        {
                            tickets?.map((ticket, index) => (
                                <tr key={index}
                                    className={` ${index % 2 == 0
                                        ? "bg-slate-100" : "bg-white"}
                                        hover:bg-slate-300
                        dark:hover:bg-slate-500
                border-slate-100  text-xs
                border-b-2
                dark:bg-gray-900
                dark:border-gray-600
                
                `}
                                >
                                    <th className="px-2 py-4  flex items-center justify-center">
                                        {

                                            (index + 1) + skip * (currentPage - 1)
                                        }
                                    </th>


                                    <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {ticket?.fullname || "n/a"}
                                    </th>


                                    <td className="px-3 py-4">
                                        <span className="font-medium
                              ">{ticket?.from || " n/a"}</span>
                                    </td>
                                    <td className="px-3 py-2">
                                        <span className="font-medium ">{ticket?.to || "n/a"}</span>
                                    </td>
                                    <td className="px-3 py-2">
                                        {ticket?.traveldate ?
                                            (new Date(ticket.traveldate).toLocaleDateString()) : "n/a"}
                                    </td>
                                    <td className="px-3 py-2 hidden lg:block">
                                        {ticket?.traveltime ?
                                            ticket?.traveltime : "n/a"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {ticket?.createdAt ?
                                            (new Date(ticket.createdAt).toLocaleDateString()) : "n/a"}
                                    </td>
                                    <td className="px-3 py-2 cursor-pointer">
                                        {ticket?.email ?
                                            <a href={`tel:${ticket?.email} `} >{ticket?.email}</a> : "n/a"}
                                    </td>

                                    <FormatTd ticket={ticket} />
                                    <td className="px-3 py-2">
                                        <span className="font-medium ">{ticket?.type || "singletrip"}</span>
                                    </td>
                                    <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {ticket?.price || " 5000frs"}
                                    </th>

                                    <td className="py-0 text-xs flex items-center"
                                    >
                                        <Button admin state={ticket}
                                            href={`/${admin ? "dashboard" : "user"}/${ticket?._id || index}${admin ? "?admin=true" : ""}`}
                                        />
                                        {ticket?.active && (
                                            <button
                                                onClick={
                                                    () => handleEditTicket(ticket)

                                                }

                                                className={`
font-medium
shadow
md:shadow-md
shadow-blue-200
dark:shadow-slate-800
bg-blue-400
dark:bg-gray-700
pt-1
mr-1
rounded-sm
text-white
dark:font-semibold
px-4
pb-1.5
place-items-center  
hover:bg-blue-700
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
`}
                                            >Edit</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }

                    </motion.tbody>
                </table>
            </div>
        </>
    )
}

export default FormatTable