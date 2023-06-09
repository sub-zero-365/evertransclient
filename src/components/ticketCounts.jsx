
const ticketCounts = ({counts,icon,active,inactive,total}) => {
    return (
        <div
            className="shadow-lg shadow-slate-300 flex-none  mt-4
    flex relative group bg-white py-6 mb-6   overflow-hidden  px-8 rounded-xl">
            <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
            <div className="w-10 h-10 rounded-full
   grid place-content-center
   bg-blue-300 hover:bg-blue-200  overflow-hidden">
                {icon}
            </div>
            <div className="ml-2">
                <h1 className="font-semibold  text-lg leading-none mb-1">{counts}</h1>
                
                {
                total&&(
                    <p className='text-sm font-montserrat text-gray-500 font-medium '>Total Tickets</p>
                )
                }
                {
                active&&(
                    <p className='text-sm font-montserrat text-gray-500 font-medium '>Total Active Tickekts</p>
                )
                }
                {
                inactive&&(
                    <p className='text-sm font-montserrat text-gray-500 font-medium '>Total Inactive Tickekts</p>
                )
                }
            </div>
        </div>
    )
}

export default ticketCounts