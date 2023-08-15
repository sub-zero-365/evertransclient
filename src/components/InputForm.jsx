import React from 'react'
import AnimatedText from './AnimateText'

const InputForm = ({ isOpen, setIsOpen, children, heading, onSubmit }) => {
    return (
        <div
            onClick={() => {
                if (setIsOpen) {
                    setIsOpen(false)
                }
            }}
            className={`
            group
        ${isOpen ? "visible opacity-100 pointer-events-all active " : "invisible opacity-0 pointer-events-none"}
        fixed 
        z-[100]
        transition-all 
        transition-duration-500
        bg-slate-400/25  inset-0 h-screen w-screen
        flex-none 
       lg:opacity-100
       lg:bg-transparent
       lg:static
       lg:visible
       lg:h-fit
       lg:w-[min(calc(100%-2.5rem),27rem)]
       lg:border-2
       lg:!pointer-events-auto
       grid place-items-center
       
       
       `}
        >

            <div
                className={`
                transition-all
                group-[.active]:translate-y-0
                lg:translate-y-0
                translate-y-[50px]
            
            w-[min(calc(100%-2.5rem),25rem)]
            min-h-[10rem]
            bg-white
            dark:bg-slate-800
            dark:shadow-sm
            dark:shadow-dark
            z-20
            rounded-2xl
            shadow-xl
            shadow-slate-400
            py-5 pb-10`}
                onClick={e => e.stopPropagation()}
            >
                <AnimatedText text={heading} className='!text-lg' />

                <form onSubmit={onSubmit}
                    className='px-5'
                >
                    {children}
                </form>
            </div>

        </div>
    )
}

export default InputForm