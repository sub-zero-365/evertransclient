import {Button,} from '../components'
export default function UserRanking() {
const admin=true
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-transparent ">
                <table className="w-full text-sm text-left text-gray-500 
                dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase 
                    bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                rank
                            </th>
                            <th scope="col" className="px-3 py-3">
                                full name
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    
                    {
                [1,2,3].map((ticket, index) => (
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
                    {index}
                        </td>
                      
                        <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {ticket?.phone || "n/a"}
                        </th>
                        
                        
                      
                        <td className="py-0 text-xs"
                        >
                            <Button admin className="!px-2"
                                href={`/${admin?"dashboard":"user"}/${ticket?._id || index}${admin?"?admin=true":""}`}
                            />
                        </td>
                    </tr>
                ))
            }
                </table>
            </div>
    )
}
