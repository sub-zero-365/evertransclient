import { motion } from "framer-motion";
import { Button, DeactiveStatusButton, ActiveStatusButton } from './'
import { useState, useEffect } from 'react'
// import { Heading, Scrollable, PanigationButton } from './'
// import axios from "axios"
// import { components, style } from "../utils/reactselectOptionsStyles"
// import BusesSelect from 'react-select/async'rugfuisd
import EditTicketModal from './EditTicketModal'
const FormatTable = ({ tickets, currentPage, admin, skip }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleEditTicket = async (id) => {
        setIsOpen(true)
    }
    // const [count,setCount]
    const handleSelectAll = () => {
        const activeIds = tickets?.map((items) => {
            if (items.active == true) {
                return items._id
            }
        })
        setSelectedId(activeIds)
    }
    const [selectedids, setSelectedId] = useState([])
    const handleChange = (id) => {
        if (!selectedids.includes(id)) {
            setSelectedId([...selectedids, id])
            return
        }
        const temp = selectedids.filter((item) => item !== id);
        setSelectedId(temp);

    }
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

            {

                true && (

                    <div className="flex items-center gap-x-5 mb-2">
                        <button
                            onClick={
                                () => handleSelectAll()

                            }
                            className={`
                        min-w-[7rem]
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
                        >Select All</button>
                        <button


                            onClick={
                                () => 0

                            }

                            className={`
                        min-w-[7rem]
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
                        >Assign new bus</button>

                    </div>


                )


            }
            <EditTicketModal isOpen={isOpen}
                setIsOpen={setIsOpen} />
            <div className="relative max-w-full overflow-x-auto
                    bg-white
    shadow-md sm:rounded-lg w-full mb-6 ">
                <table className="w-full text-sm text-left text-gray-500 
              dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
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

                            <th scope="col" className="px-3 py-3">
                                createdAt
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
                                        ? "bg-slate-100" : "bg-white"} hover:bg-slate-300
                        dark:hover:bg-slate-500
                border-slate-100  text-xs
                border-b-2
                dark:bg-gray-900
                dark:border-white`}
                                >
                                    <th className="px-2 py-4  flex items-center justify-center">
                                        {
                                            ticket?.active ? (
                                                <input
                                                    onChange={() => handleChange(ticket?._id)}
                                                    checked={selectedids.includes(ticket?._id)} id="green-checkbox" type="checkbox" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                            ) : (
                                                (index + 1) + skip * (currentPage - 1)
                                            )
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
                                    <td className="px-3 py-2">
                                        {ticket?.createdAt ?
                                            (new Date(ticket.createdAt).toLocaleDateString()) : "n/a"}

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
                                        {admin && ticket?.active && (

                                            <button


                                                onClick={
                                                    () => handleEditTicket(ticket?._id)

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