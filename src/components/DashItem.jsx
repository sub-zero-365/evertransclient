
import { AiOutlineSetting } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
const DashItem = () => {
    return (
        <div className="p-4 mb-4 ]
        md:w-full mx-auto md:mx-initial rounded-sm shadow-sm md:rounded-lg lg:rounded-xl bg-white dark:bg-slate-300">
            <div className="flex justify-between mb-4">
                {/* <span className="bg-green-400 px-6 py-1 rounded-lg">
                16 <sup className="text-red-400 text-lg font-medium">%</sup>
                </span>
                 */}
                 <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg
                 text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">12.3%</button>

                <span className="h-8 w-8 md:w-10 md:h-10 hover:bg-slate-300 transition-colors duration-700 rounded-full grid place-items-center shadow-sm "><AiOutlineSetting className="text-xl" /> </span>
            </div>
            <div className="flex items-end justify-between">
                <div className="">
                    <h1 className="text-xl font-semibold font-montserrat">
                        Clients
                    </h1>
                    <h3 className="text-xl tracking-loose font-medium font-montserrat">
                        4,7875
                    </h3>
                </div> <span className="h-8 w-8 md:w-10 md:h-10 hover:bg-slate-300 transition-colors duration-700 rounded-full grid place-items-center shadow-sm "><BsFillPersonFill className="text-4xl" /> </span>
            </div>

        </div>
    )

}
export default DashItem