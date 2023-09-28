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
const Home = () => {
    let downloadbaseurl = null
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        downloadbaseurl = process.env.REACT_APP_LOCAL_URL
        // dev code
    } else {
        // production code
        downloadbaseurl = process.env.REACT_APP_PROD_URL

    }
    const [ticket, setTicket] = useState({})
    const [up, setUp] = useState(0);
    const [fromCities, setFromCities] = useState("")
    const [toCities, setToCities] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const site_name = "Afri-Con"
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const [id, setId] = useState("")
    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsOpen(true)
        setLoading(true)
        setErr(null)
        try {
            const { data: { ticket } } = await axios.post("/public/ticket",
                {
                    id
                    , from: fromCities,
                    to: toCities
                })
            setTicket(ticket)
            console.log("enter here ")
        } catch (err) {
            console.log(err)
            setErr(err.response.data)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }


    }


    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className="ol">
                <div
                    className={`overlay
                !fixed
                ${isOpen && "active"} transition-[visible] duration-100
      group grid place-items-center `}
                    onClick={() => setIsOpen(false)}
                >

                    <div
                        onClick={e => e.stopPropagation()}
                        className={`
    lg:max-h-[calc(100%-100px)]
    max-h-[calc(100%-60px)]
    overflow-auto
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
                        {
                            loading ? <AnimateText text="loading please wait ..." className="!text-2xl" /> : (
                                err ? <>
                                    <Heading text={err} className="!text-rose-600" />
                                    <p className="mb-4 px-4 text-center lg:text-start text-sm">contact customer service if something is wrong </p>
                                    <Link
                                        to="contact-us"
                                    >
                                        <UiButton name="Contact Customer Services" className="!pb-2.5 !pt-1.5 w-[min(400px,calc(100%-60px))] !mx-auto" />
                                    </Link>

                                </>
                                    : (
                                        <div>
                                            <h1 className="text-center font-semibold  font-montserrat text-xl mt-4 md:text-2xl tracking-tighter leading-10 oblique text-blue-900">Ticket Details</h1>
                                            <h2 className="text-center  text-lg md:text-xl font-medium  "> Ticket id</h2>
                                            <p className="text-center text-slate-500 mb-4 "> {ticket?._id}</p>

                                            <h2 className="text-center  text-lg md:text-xl font-medium  "> Traveler Name</h2>
                                            <p className="text-center text-slate-500 mb-4 ">{ticket?.fullname || "n/a"}</p>

                                            <h2 className="text-center  text-lg md:text-xl font-medium  ">Travel Date </h2>
                                            <p className="text-center text-slate-500 mb-4 "> {ticket?.traveldate ? dateFormater(ticket?.traveldate).date : "n/a"}</p>
                                            <h2 className="text-center  text-lg md:text-xl font-medium  ">travel time </h2>
                                            <p className="text-center text-slate-500 mb-4 "> {ticket?.traveltime || "n/a"}</p>
                                            <div className="grid grid-cols-2">

                                                <div>
                                                    <h2 className="text-center  text-lg md:text-xl font-medium  "> From</h2>
                                                    <p className="text-center text-slate-500 mb-4 ">{ticket?.from || "n/a"} </p>

                                                </div>
                                                <div>
                                                    <h2 className="text-center  text-lg md:text-xl font-medium  "> To</h2>
                                                    <p className="text-center text-slate-500 mb-4 ">{ticket?.to || "n/a"}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">

                                                <div>

                                                    <h2 className="text-center  text-lg md:text-xl font-medium  "> sex</h2>
                                                    <p className="text-center text-slate-500 mb-4 ">{ticket?.sex || "n/a"} </p>
                                                </div>
                                                <div>
                                                    <h2 className="text-center  text-lg md:text-xl font-medium  "> status</h2>
                                                    <p className="text-center sidebar text-slate-500 mb-4 grid place-items-center"> {ticket?.active ?


                                                        ticket?.type == "roundtrip" ? <div className="flex gap-x-1">
                                                            {ticket?.doubletripdetails[0]?.active ? <span className='w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span> : <span className='w-6 h-6  bg-red-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineClose /></span>}
                                                            {ticket?.doubletripdetails[1]?.active ? <span className='w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span> : <span className='w-6 h-6  bg-red-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineClose /></span>}
                                                        </div> : <span className='w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span>

                                                        :
                                                        <span className='w-6 h-6  bg-red-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineClose /></span>

                                                    }</p>
                                                </div>
                                            </div>
                                            <h2 className="text-center  text-lg md:text-xl font-medium  "> this ticket was created at </h2>
                                            <p className="text-center text-slate-500 mb-10 ">{dateFormater(ticket?.createdAt).date + " at " + dateFormater(ticket?.createdAt).time || "n/a"} </p>
                                            <h2 className="text-center  text-lg md:text-xl font-medium  "> price of the ticket</h2>
                                            <p className="text-center text-slate-500 " >{ticket?.price + "frs" || "n/a"} </p>

                                            <a
                                                href={`${downloadbaseurl}/downloadticket/${ticket?._id}?payload=79873ghadsguy&requ`}
                                                target="_blank"
                                                className="inline---block 
                        w-[min(300px,calc(100%-2.5rem))]
                         bottom-0
                         pb-2.5
                         block
                         min-h-[2rem]
                         mx-auto
                         pt-2
                         text-center
                        rounded bg-green-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-green-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-green-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                            >
                                                Download ticket
                                            </a>
                                        </div>
                                    )

                            )

                        }
                    </div>










                </div>

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
                <OurServices />
                <ChooseTheBus />
                <WhyChooseUs />
                <BusRentals />
                <FrequentlyAsked />

                <Footer />
            </div >
        </>
    )
}

export default Home