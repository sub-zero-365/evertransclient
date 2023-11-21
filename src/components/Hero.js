import herobg from '../Assets/images/herobg.jpeg';
import AnimateText from './AnimateText';
// import herooverlay from '../Assets/images/herooverlay.png'
import { motion } from "framer-motion";
import { Link, NavLink } from 'react-router-dom';
import UiButton from './UiButton';
import Write from './Write';
const Hero = () => {
    return (
        <div className=" h-[min(35rem,100vh)] text-white relative group">
            <img className="absolute -z-0 max-w-7xl left-1/2 -translate-x-1/2 inset-0 w-full h-full "
                src={herobg}
            />
            <div
                className='h-full 
                  bg-opacity-80 px-5 lg:p-20 sm:px-10  py-10 relative z-1 dark:bg-slate-700/80 bg-[#1a1f6f] gold:bg-yellow-400/20'
            >
                <div
                    className=" h-full items-center  "
                >
                    <motion.div
                        className="max-w-5xl mx-auto"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{
                            y: 0, opacity
                                : 1
                        }}
                        transition={
                            {
                                duration: 1
                            }}
                    >


                        <AnimateText
                            className="!text-6xl md:!text-7xl lg:leading-tight !font-poppins-- !font-bricolage
                            lg:!text-left-- lg:!text-7xl !text-center    !pt-6 !font-black"
                            text="Travel With Us For An Adventure-Filled"
                        />
                        <div className='text-blue-600 
                        gold:text-color_gold 
                        !text-6xl md:!text-7xl
                        font-black text-center
                        !font-bricolage'>
                            Journey
                        </div>
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={

                                {
                                    duration: 1,
                                    delay: 0.5

                                }}
                        >

                            <Write />

                            <div
                                className='flex-- hidden gap-6  justify-start flex-wrap '
                            >
                                <UiButton
                                    className="!bg-[#ffae02] flex-none !my-10 !py-3 lg:!py-3.5
                    !px-8 !text-lg hover:!bg-purple-600 
                    transition duration-500
                    "
                                >
                                    <NavLink

                                        to="/booking"
                                    >{
                                            ({ isPending }) => isPending ? "please wait..." : "   Get Started"

                                        }

                                    </NavLink>
                                </UiButton>
                                <UiButton
                                    className="bg-transparent  border-2 !border-[#ffae02] flex-none !my-10 !py-3 lg:!py-3.5
                    !px-8 !text-lg hover:!bg-purple-600  hover:!border-white
                    transition duration-500
                    "
                                >
                                    <Link

                                        to="/about-us"
                                    >
                                        Learn More
                                    </Link>
                                </UiButton>

                            </div>
                        </motion.div>

                    </motion.div>
                    {/* <div>
                        <img
                     
                            className='lg:scale-[1.3] lg:translate-x-20
                            duration-700 transition-all
                            lg:group-hover:translate-x-10  '
                            src={herooverlay}
                        />

                    </div> */}
                </div>

            </div>

        </div>

    )

}
export default Hero