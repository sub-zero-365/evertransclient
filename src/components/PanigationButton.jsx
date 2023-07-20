
const PanigationButton = ({ onClick, text, active, index, loading, className }) => {
    return (
        <div
            key={index}
            className={`className flex items-center ${active === index ? "bg-blue-900" : "bg-blue-400 focus:bg-blue-900"}
    justify-center w-8 h-8 bg-blue-400 text-xs md:text-sm rounded-sm 
    hover:bg-blue-900
    focus:bg-blue-900
    text-white 
    !select-none
    flex-none
    shadow-lg`}
            onClick={() => {
                onClick()
                if (window.navigator.vibrate) {
                    window.navigator.vibrate([10])
                }
            }}
        >
            {
                active === index ? loading ? <span className="w-6 h-6 
                rounded-full bg-transparent border-t-2 border-r-2 border-transparent border-2
                border-t-orange-400
                border-r-orange-400
                animate-spin
                "></span> : text : text

            }

        </div>
    )
}

export default PanigationButton