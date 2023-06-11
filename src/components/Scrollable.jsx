
const Scrollable = ({ children, className }) => {
    return (
        <div
            className={`flex flex-nowrap overflow-x-auto  gap-x-4 md:gap-x-2  ${className}`}
        >{children}</div>
    )
}

export default Scrollable