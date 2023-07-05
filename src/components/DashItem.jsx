
import { BsFillPersonFill } from 'react-icons/bs'
import {Button,Heading} from "./"
import { useNavigate } from 'react-router-dom'
const DashItem = ({ icon, Counts, href, Name }) => {
    const navigate = useNavigate();
    return (
        <div className="p-4 mb-4 relative group z-1
        md:w-full mx-auto md:mx-initial overflow-hidden  shadow-sm  md:rounded-lg lg:rounded-xl
        shadow-slate-200 rounded-lg
        bg-white dark:bg-slate-800">
            {/* <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div> */}
            {/* <div className="absolute top-auto bottom-0 h-1 w-0 right-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div> */}
            <div className="flex justify-between mb-2 items-start">
            <Heading text={Name || "loading"} className="!pl-0 first-letter:!text-2xl
            !text-lg !mb-0 !font-black !uppercase "/>
    
    <Button name="view" className={"!shadow-xl !rounded-xl !text-white !px-5  !z-10 !mr-0"} href={href}/>
            </div>
            <div className="absolut top-auto bottom-0 h-1 mb-6 w-full right-0 transition-[width] bg-green-400 duration-700 group-hover:w-0"></div>
            
            <div className="flex items-end justify-between">
                <div className="">
                   
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