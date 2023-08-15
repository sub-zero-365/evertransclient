import React from 'react'
import Heading from './Headings'
import { motion } from 'framer-motion'
import { AiOutlinePlus } from 'react-icons/ai'
const GreetingText = ({ setIsOpen ,heading,text}) => {
    return (
        <div className="flex  items-center  mb-10 mt-5 justify-between py-1 rounded-lg shadow
    bg-white dark:bg-slate-800 mx-4">
            <div className="flex-1">
                <Heading text={heading} className="!mb-2 !font-black mt-0" />
                <p className="mb-3 text-sm  px-6">{text}</p>
            </div>
            <motion.div onClick={() => {
                if (setIsOpen) {
                    setIsOpen(c => !c)
                }
            }}
                initial={{ x: "-50%" }}
                animate={{ scale: [0.7, 1.2, 0.8], rotate: [0, 360] }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                }

                }
                className="bottom-6 flex-none ml-2 shadow-2xl button-add  top-auto bg-blue-400 
w-[2rem] h-[2rem] rounded-full left-1/2 overflow-hidden 
-translate-x-1/2
z-10  "
            >
                <div className="flex h-full w-full items-center scale-animation justify-center ">
                    <AiOutlinePlus size={30} color="#fff" className="" />
                </div>
            </motion.div>

        </div>
    )
}

export default GreetingText