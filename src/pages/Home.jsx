import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Footer, OurServices, Rounded } from "../components"
import { AiOutlineArrowUp } from "react-icons/ai"
import { motion } from "framer-motion"
import FromSelect from 'react-select/async'
import AnimateText from '../components/AnimateText'
import { image2, image3, image4, image1 } from "../Assets/images"
import { Heading } from '../components'
import UiButton from '../components/UiButton'
import { hero } from "../Assets/images"
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import dateFormater from '../utils/DateFormater'
import axios from "axios"
import busimages from '../Assets/images/mainbusimage.png'
import Hero from "../components/Hero"
import { Helmet } from 'react-helmet'
import WhyChooseUs from "../Sections/WhyChooseUs"
import FrequentlyAsked from "../Sections/FrequentlyAsked"
import BusRentals from "../Sections/BusRentals"
import ChooseTheBus from "../Sections/ChooseTheBus"
import Navigation from "../Sections/Navigation"



const Home = () => {
    // let defferedPrompt = null
    const [defferedPrompt, setDefferedPrompt] = useState(null)
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault()
        console.log("this is the promt ", e)
        setDefferedPrompt(e)
    })
    // window.addEventListener("b")

    let downloadbaseurl = null
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        downloadbaseurl = process.env.REACT_APP_LOCAL_URL
        // dev code
    } else {
        // production code
        downloadbaseurl = process.env.REACT_APP_PROD_URL

    }

    const [up, setUp] = useState(0);



    return (
        <>
            <Helmet>
                <title>Home | {process.env.REACT_APP_APP_NAME}</title>
                <meta name="description" content="Book Your Ticket at Eagletranz " />
            </Helmet>
            <div className="ol">

                {
                    defferedPrompt && (
                        <div
                            className="fixed bottom-4 top-auto right-5 px-6 
                            lg:hidden p-4 z-20 bg-white shadow"
                        >
                            <h1
                                className="text-xl mb-2"
                            >Install {process.env.REACT_APP_APP_NAME} Wep App</h1>
                            <UiButton
                                className="text-green-500 !px-6 !text-sm"
                                onClick={async () => {
                                    defferedPrompt.prompt()
                                    const { outcome } = await defferedPrompt.userChoice;
                                    if (outcome == "accepted") {
                                        setDefferedPrompt(null)
                                    }
                                }}
                            >
                                Install
                            </UiButton>
                        </div>

                    )

                }

                <Rounded
                    className={`fixed !w-[40px] !h-[40px] bottom-[5rem] !bg-white right-[2rem] md:right-[4rem] 
        cursor-pointer scale-navigate
rounded-full z-[200] flex items-center justify-center shadow-2xl dark:text-black  duration-500
transition-all  ${up === 0 ? "active" : "--"}`} onClick={() => window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    })}>
                    <AiOutlineArrowUp size={30} />
                </Rounded>
                <Hero />
                {/* <Navigation /> */}
                <OurServices />
                <WhyChooseUs />
                <FrequentlyAsked />
                <Footer />
            </div >
        </>
    )
}

export default Home