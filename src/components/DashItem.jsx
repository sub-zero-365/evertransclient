
import { AiOutlineSetting } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
const DashItem = ({ icon, Counts, href, Name }) => {
    const navigate = useNavigate();
    return (
        <div className="p-4 mb-4 relative group z-1
        md:w-full mx-auto md:mx-initial overflow-hidden rounded-sm shadow-sm md:rounded-lg lg:rounded-xl bg-white dark:bg-slate-300">
            <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
            <div className="absolute top-auto bottom-0 h-1 w-0 right-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
            <div className="absolute top-0 h-0 bg-opacity-25 w-full right-0 transition-[height] -z-1 bg-green-400 duration-700 group-hover:h-full"></div>
            <div className="flex justify-between mb-">
                <button type="button"
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg
                 text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">12.3%</button>
                <span className=" px-5 h-fit py-1 text-white
                text-xs md:text-sm bg-blue-500  transition-colors
                duration-700 rounded-lg z-10 grid place-items-center shadow-sm
                " onClick={() => navigate(href || "/")}>view </span>
            </div>
            <div className="absolut top-auto bottom-0 h-1 mb-6 w-full right-0 transition-[width] bg-green-400 duration-700 group-hover:w-0"></div>
            
            <div className="flex items-end justify-between">
                <div className="">
                    <h1 className="text-xl font-semibold font-montserrat">
                        {Name || "n/a"}
                    </h1>
                    <h3 className="text-xl tracking-loose font-medium font-montserrat">
                        {Counts || "n/a"}
                    </h3>
                </div> <span className="h-8 w-8 md:w-10 md:h-10 hover:bg-slate-300 transition-colors 
                duration-700 rounded-full grid place-items-center shadow-sm z-10">{icon || <BsFillPersonFill className="text-4xl" />}</span>
            </div>

        </div>
    )

}
export default DashItem