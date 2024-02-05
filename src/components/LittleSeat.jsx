import React from 'react'
import { motion } from 'framer-motion'
import { TbArmchair2, TbArmchairOff } from 'react-icons/tb'
const LittleSeat = ({onClick=()=>0,animate,isTaken,isReserved,_id}) => {
    return (
        <motion.div
            animate={{ scale: animate? [0.8, 1, 0.9] : null }}
            onClick={onClick}
            initial={false}
            transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
            }
            }
            className={`${(isTaken) ? "bg-orange-400 group-hover:bg-orange-800" : isReserved ? "!bg-blue-500 group-hover:bg-blue-800" : "bg-green-500 group-hover:bg-green-800"} peer
${animate ? "border-2 border-black dark:border-white gold:border-color_gold/50" : ""} transition duration-200  group w-full h-full  relative max-w-[4.5rem] mx-auto
rounded-lg flex items-center justify-center`}>
            <motion.div
                initial={false}
                animate={{ y: animate ? "1.3rem" : 0 }}
                className={`absolute group-hover:!translate-y-[1.3rem] transition-all duration-300 top-[-10px] bg-color_light text-[12px] dark:bg-color_dark gold:bg-color_gold  shadow-lg
px-2 rounded-sm `}>{_id + 1}</motion.div>
            {isTaken ? (<div><TbArmchairOff size={30} /></div>) : <div><TbArmchair2 size={30} /></div>}
        </motion.div>
    )
}

export default LittleSeat