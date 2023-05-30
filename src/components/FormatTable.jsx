import { motion } from "framer-motion";
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

const FormatTable = ({ tickets, i, j }) => {
    const navigate = useNavigate();
    return (

        <motion.tbody
            key={j}
            initial={{ x: 100, opacity: 0.1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}

        >
            {
                tickets.slice(i, j).map((ticket, index) => (<tr key={index} className={` ${index % 2 == 0 ? "bg-slate-100" : "bg-white"} hover:bg-slate-300  text-xs dark:bg-gray-900 dark:border-gray-700`}
                >
                    <td className="px-2 py-4  flex items-center justify-center">
                        {index + 1}
                    </td>
                    <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket?.fullname || "n/a"}
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
                    <td className="px-3 py-2">
                        <span className="font-medium ">{ticket?.to || "n/a"}</span>
                    </td>
                    <td className="px-3 py-2">
                        {ticket?.traveldate ?
                            (new Date(ticket.traveldate).toLocaleDateString()) : "n/a"}

                    </td>
                    <td className="px-3 py-2">
                        {ticket?.traveltime
                            || "n/a"}
                    </td>
                    <td className="px-3 py-4  grid place-items-center">
                        {ticket?.active ?
                            <span className='w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span>
                            :
                            <span className='w-6 h-6  bg-red-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineClose /></span>

                        }

                    </td>

                    <td className="px-3 py-4">
                        {ticket?.age || "n/a"}

                    </td>
                    <td className="px-3 py-4">
                        {ticket?.sex || "n/a"}

                    </td>
                    <td className="py-0 text-xs" onClick={() => navigate(`/dashboard/${ticket?._id || index}?admin=true`)}>
                        <span className="font-medium grid bg-green-400 pr-2 py-1 mx-1 rounded-lg text-white place-items-center  hover:underline">details</span>
                    </td>
                </tr>
                ))
            }

        </motion.tbody>
        
    )
}

export default FormatTable