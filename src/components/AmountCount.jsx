
const AmountCount = ({ amount, icon, text, className }) => {
    return (
        //         <div
        //             className={`shadow-none
        //             dark:bg-slate-900

        //             shadow-slate-500 flex-none  
        // flex relative group bg-slate-800 text-white py-3 mb-4 flex-col gap-y-2
        // overflow-hidden  px-8 rounded-none ${className}`}>
        //             <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
        //             <div className="w-12 h-12 rounded-full
        // grid place-content-center
        // bg-orange-300 hover:bg-orange-200  mx-auto  overflow-hidden">
        //                 {icon}
        //             </div>
        //             <div className="ml-2">
        //                         <p className='text-sm font-montserrat  font-medium mb-2'>{text || "please passs a text in this box"} </p>
        //                 <h1 className="font-semibold  text-lg leading-none mb-1">{amount} <sup className='text-white'>frs</sup> </h1>
        //             </div>
        //         </div>
        <div className="flex items-center p-4 bg-white rounded flex-none mb-5">
            <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </div>
            <div className="flex-grow flex flex-col ml-4">
                <span className="text-xl font-bold">{amount} frs</span>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">{text}</span>
                    {/* <span className="text-green-500 text-sm font-semibold ml-2">+12.6%</span> */}
                </div>
            </div>
        </div>

    )
}

export default AmountCount