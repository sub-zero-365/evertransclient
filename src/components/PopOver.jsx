const PopOver = ({ children }) => {
    return (
        <div className='w-44 rounded cursor-pointer text-center group-[:hover]:visible
        invisible duration-300 transition-colors  px-5 py-1.5 bg-black absolute -top-[calc(100%+0.825rem)]'>
            <p
                className='text-[#ffae02] text-xs lg:text-sm leading-relaxed relative z-[2] '
            >{children}</p>
            <div className='w-4 h-4 -mt-1 z-[1]
                                bg-black
                                rotate-45 absolute
                                left-1/2 -translate-x-1/2 '>
            </div>
        </div>
    )
}
export default PopOver