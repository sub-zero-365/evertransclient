import { AnimatePercent, DeactiveStatusButton,Number } from "."
import ActiveStatusButton from "./ActiveStatusButton"
import { motion } from 'framer-motion'
const BoxModel = ({ activeCount = 0, inActiveCount = 0,className,text ,text1,text2}) => {
    const boxvariant = {
        hide: {
            y: 40,
            opacity: 0
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                delay: 0.2
            }
        }
    }
    const movex = {


        animate: {
          width: ["0%", (activeCount / (activeCount +inActiveCount)) * 100 + "%"],
          transition: {
            duration: 1,
            delay: 0.2
          }
        }
    
      }
    return (
        <motion.div

            variants={boxvariant}
            initial="hide"
            whileInView="show"

            className={`bg-color_light border rounded-xl mx-2 mt-7 ${className}`}>
            <div
                className="flex 
             text-center
            rounded-b-none
            
            shadow  py-5 mb-0 "
            >

                <div className="flex-1 border-r-2
                items-center justify-center">
                    <p className="text-slate-700
                    font-montserrat  text-xs md:text-sm font-black  mb-1">{text1 ||"Active"} </p>
                     <span className="mb-5 mx-auto
                    w-10  h-[2px] bg-blue-700 block rounded-lg"></span>
                    
                    <h2 className="font-bold text-lg font-montserrat ">
                    <Number number={activeCount} 
                    className="!w-fit !px-6 !text-lg !bg-transparent 
                    !text-black !text-center !block !mx-auto
                    !shadow-none"
                    
                    />
                    </h2>
                    <ActiveStatusButton className="!mx-auto !mt-2" />


                </div>

                <div className="flex-1 ">
                    <p className="text-slate-700 font-montserrat text-xs md:text-sm font-semibold  mb-1">{text2 ||  "InActive"} </p>
                    <span className="mb-5 mx-auto
                    w-10  h-[2px] bg-blue-700 block rounded-lg"></span>
                    
                    <h2 className="font-bold text-lg font-montserrat ">
                    <Number number={inActiveCount} 
                    className="!w-fit !px-6 !text-lg !bg-transparent !mx-auto
                    !text-black !text-center !block
                    !shadow-none"
                    
                    />
                    </h2>
                    <DeactiveStatusButton className="!mx-auto !mt-2" />
                </div>
            </div>
            <AnimatePercent className="!mt-0 !rounded-lg !mx-2 "
                        variants={movex}
                        percent={Math.floor((activeCount / (activeCount+inActiveCount)) * 100)}
                      />
            <h1
            className="border rounded-none pb-3 pt-2  bg-transparent text-xs font-bold  text-center"
            >{text || "user ticket printed by this user"}</h1>

        </motion.div>
    )
}

export default BoxModel