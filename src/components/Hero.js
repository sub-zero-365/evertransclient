import AnimateText from './AnimateText'
import herobg from '../Assets/images/herobg.jpg'
import herooverlay from '../Assets/images/herooverlay.png'
import UiButton from './UiButton';
import busimages from '../Assets/images/mainbusimage.png'
import { motion } from "framer-motion"
import { Link, NavLink } from 'react-router-dom';
import Write from './Write';
const Hero = () => {
    return (
        <div className="h-screen text-white relative group">
            <img className="absolute -z-0  inset-0 w-full h-full "
                src={herobg}
            />
            <div
                className='h-full 
                  bg-opacity-80 px-5 lg:p-20 sm:px-10  py-10 relative z-1 bg-[#1a1f6f]'
            >
                <div
                    className="grid grid-cols-1 h-full items-center lg:grid-cols-2"
                >
                    <motion.div
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
                            className="!text-4xl md:!text-5xl lg:leading-[1.2]
                            lg:!text-left lg:!text-6xl !text-center    !py-6 !font-black"
                            text="Charter With Us For An Adventure-Filled Journey"
                        />

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
                            {/* <p
                                className='text-xl text-center lg:text-start lg:text-2xl font-medium my-4'
                            >Luctus nisi pharetra mollis aliquet iaculis tempus potenti. Dictumst vestibulum luctus eget sit sag </p> */}

                            <div
                                className='flex gap-6  justify-start flex-wrap '
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
                    <div>
                        <img
                            // initial={{ x: 300 }}
                            // animate={{ x: 0 }}

                            className='lg:scale-[1.3] lg:translate-x-20
                            duration-700 transition-all
                            lg:group-hover:translate-x-10  '
                            src={herooverlay}
                        />

                    </div>
                </div>

            </div>

        </div>

    )

}
export default Hero