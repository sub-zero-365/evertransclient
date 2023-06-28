import { useNavigate } from 'react-router-dom'
const 
Button = ({ className, href, name }) => {
    const navigate = useNavigate();
    const navigateTo = (path = "/") => {
        return navigate(path)
    }
    return (
        <div
            onClick={() => {
                navigateTo(href);
                window.navigator.vibrate([10])
            }}
            className={`${className} 
            font-medium
            shadow
            md:shadow-md
            shadow-blue-200
            dark:shadow-slate-800
            bg-green-400
            dark:bg-gray-700
            pt-1
            mr-1
            rounded-sm
            text-white
            dark:font-semibold
            px-3
            pb-1.5
            place-items-center  
            hover:bg-green-700
            ease 
            transition-colors
            duration-700
            hover:underline
            flex
            justify-center 
            items-center
            text-[0.7rem] 
            md:text-sm
            font-montserrat
            `}
            style={{
                whiteSpace: "nowrap"
            }}
        >{name || "Details"}</div>
    )
}

export default Button