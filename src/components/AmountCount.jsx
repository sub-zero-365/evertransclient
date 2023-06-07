
const AmountCount = ({amount,icon,active,inactive,total,className}) => {
    return (
        <div
            className={`shadow-none shadow-slate-500 flex-none  mt-4
flex relative group bg-slate-800 text-white py-3 mb-6 flex-col gap-y-2
overflow-hidden  px-8 rounded-none ${className}`}>
            <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
            <div className="w-12 h-12 rounded-full
grid place-content-center
bg-orange-300 hover:bg-orange-200  mx-auto  overflow-hidden">
                {icon}
            </div>
            <div className="ml-2">
                
                {
                total&&(
                    <p className='text-sm font-montserrat  font-medium mb-2'>Total Cost of All Tickets</p>
                )
                }
                {
                active&&(
                    <p className='text-sm font-montserrat  font-medium mb-2'>Total Cost Active Tickekts</p>
                )
                }
                {
                inactive&&(
                    <p className='text-sm font-montserrat  font-medium mb-2'>Total Cost Inactive Tickets</p>
                )
                }
                
                
                <h1 className="font-semibold  text-lg leading-none mb-1">{amount} <sup className='text-white'>frs</sup> </h1>
            </div>
        </div>
    )
}

export default AmountCount