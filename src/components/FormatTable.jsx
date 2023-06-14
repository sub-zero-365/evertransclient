import { motion } from "framer-motion";
import { Button,DeactiveStatusButton,ActiveStatusButton } from './'
const FormatTable = ({ tickets,currentPage,admin,skip=10}) => {
    return (
        <motion.tbody
            className="pt-4 pb-12 text-xs md:text-sm"
            key={currentPage}
            initial={{ x: 100, opacity: 0.1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}

        >
            {
                tickets.map((ticket, index) => (
                    <tr key={index}
                    className={` ${index % 2 == 0
                        ? "bg-slate-100" : "bg-white"} hover:bg-slate-300
                        dark:hover:bg-slate-500
                border-slate-100  text-xs
                border-b-2
                dark:bg-gray-900
                dark:border-white`}
                    >
                        <td className="px-2 py-4  flex items-center justify-center">
                            {(index + 1) +skip*(currentPage-1)}
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
                            {ticket?.createdAt ?
                                (new Date(ticket.createdAt).toLocaleDateString()) : "n/a"}

                        </td>
                        <td className="px-3 py-2">
                            {ticket?.traveltime
                                || "n/a"}
                        </td>
                        <td className="px-3 py-4  grid place-items-center">
                            {ticket?.active ?
                            <ActiveStatusButton/>
                                :
                                <DeactiveStatusButton/>
                            }

                        </td>

                        <td className="px-3 py-4">
                            {ticket?.age || "n/a"}

                        </td>
                        <td className="px-3 py-4">
                            {ticket?.sex || "n/a"}

                        </td>
                        <td className="py-0 text-xs"
                        >
                            <Button admin
                                href={`/${admin?"dashboard":"user"}/${ticket?._id || index}${admin?"?admin=true":""}`}
                            />
                        </td>
                    </tr>
                ))
            }

        </motion.tbody>

    )
}

export default FormatTable