import AnimatedText from "../components/AnimateText"
import { Helmet } from "react-helmet"
const ShowBuses = ({ isOpen, setIsOpen, children, title ,className,className2}) => {
    return (
        <>
            <Helmet>
                {
                    isOpen && (<meta name="theme-color" content="rgb(200,200,200)" />)
                }
            </Helmet>
            <div
                className={`overlay  ${isOpen && "active"} !fixed !inset-0 h-screen transition-[visible] duration-100
group grid place-items-center `}
                onClick={() => setIsOpen(false)}
            >
                <div
                    onClick={e => e.stopPropagation()}
                    className={`
                    ${className2}
          -translate-x-[50px]
          md:translate-x-0
          md:translate-y-[50px]
          group-[.active]:translate-x-0
          duration-700
          ease 
          transition-all
          opacity-60
          md:group-[.active]:translate-y-0
          group-[.active]:opacity-100
          bg-white
          dark:bg-slate-800
          shadow-sm
          rounded-lg
          w-[min(calc(100%-40px),400px)]
          
            py-5 pb-10`}>
                    <AnimatedText text={title} className='!text-lg' />
                    {children}
                </div>
            </div>
        </>
    )
}

export default ShowBuses