import herobg from '../Assets/images/herobg.jpeg';
import AnimateText from './AnimateText';
import herooverlay from '../Assets/images/herooverlay.png'
import { motion } from "framer-motion";
import { Link, NavLink } from 'react-router-dom';
import UiButton from './UiButton';
import Write from './Write';
import { SiYourtraveldottv } from "react-icons/si";
// import { useUserLayoutContext } from './UserLayout';
import userRole from "../utils/userRole"
const Hero = () => {
    // const { user } = useUserLayoutContext()
   const userrole= userRole()

    return (
        <div className=" h-[min(35rem,100vh)]-- mb-10 text-white relative group ">
      {/* <img src={herobg}
      className="absolute inset-0 h-full w-full max-w-5xl mx-auto opacity-40"
      /> */}
            <div
                className='h-full 
                  bg-opacity-80 px-5 lg:p-20 sm:px-10  py-10 relative z-1 dark:bg-slate-700/80-- bg-[#1a1f6f]-- gold:bg-yellow-400/20--'
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
                            className="!text-5xl md:!text-6xl lg:leading-tight !font-poppins-- !font-bricolage
                            lg:!text-left-- lg:!text-7xl !text-center  !text-black dark:!text-white  !pt-6 !font-black"
                            text="Travel With Us For An Adventure-Filled"
                        />
                        <div className='text-blue-600 
                        gold:text-color_gold 
                        !text-6xl md:!text-7xl
                        font-black text-center flex justify-center items-center 
                        !font-bricolage'>
                            Journey <SiYourtraveldottv
                                className="ml-1"
                                size={30}
                            />.
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

                            <Write
                                className="!text-black dark:!text-white !text-xl sm:!text-2xl text-muted-foreground"
                            />

                            <div
                                className='flex  gap-y-2 w-full  items-center sm:flex-row
                                flex-wrap flex-col justify-center'
                            >
                                <UiButton
                                    className="!bg-[#ffae02]-- !bg-blue-600 !w-fit !flex-none  !py-3 lg:!py-3.5
                    !px-14 !text-lg hover:!bg-purple-600 
                    transition duration-500 !rounded-md
                    "
                                >
                                    <NavLink
className='w-full h-full'
                                        to={userrole}
                                    >{
                                            ({ isPending }) => isPending ? "please wait..." : "   Get Started"

                                        }

                                    </NavLink>
                                </UiButton>
                                <UiButton
                                    className="bg-transparent !w-fit  border-none !border-[#ffae02] !flex-none  !py-3 lg:!py-3.5
                    !px-14 !text-lg hover:!bg-purple-600 dark:!text-white  hover:!border-white !text-black
                    transition duration-500
                    "
                                >
                                    <Link className='w-full h-full'

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