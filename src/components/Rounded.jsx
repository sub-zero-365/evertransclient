const Rounded = ({ children, onClick, className }) => {
    return (
        <div
            className={`
            ${className}
            hover:bg-slate-300 hover:scale-125 duration-500 transition-all hover:dark:bg-slate-800  w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full `} onClick={onClick}>
            {children}
        </div>
    )
}

export default Rounded