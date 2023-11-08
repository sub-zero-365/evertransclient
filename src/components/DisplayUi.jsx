import { AiOutlineArrowRight } from 'react-icons/ai'

const DisplayUi = ({ from, to }) => {

    return (
        <div className="mb-2 flex   text-xs mt-[0rem] items-center">
            <div className="flex-1 mx-1 relative min-h-[40px] 
                      border-2 flex items-center rounded-lg px-4">
                <span className="absolute left-[15px] px-2
                          rounded-sm h-[15px] bg-color_light gold:bg-color_gold/75
                      dark:bg-color_dark top-[-10px]">
                    From
                </span>
                <div className="relative uppercase text-xs lg:text-sm">
                    {from || "invalid location"}
                </div>
            </div>

            <AiOutlineArrowRight size={20} className='text-slate-400 dark:text-white flex-none' />
            <div className="flex-1 mx-1 relative min-h-[40px]
                      text-xs border-2 flex items-center rounded-lg px-4">
                <span className="absolute left-[10px] px-2 rounded-sm h-[15px] 
                bg-color_light
                gold:bg-color_gold/75
                      dark:bg-color_dark top-[-10px] ">
                    To
                </span>
                <div className="relative uppercase text-xs lg:text-sm">
                    {to || "invalid location"}
                </div>
            </div>
        </div>

    )
}
export default DisplayUi