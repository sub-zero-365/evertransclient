import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Footer, OurServices } from "../components"
import { AiOutlineArrowUp } from "react-icons/ai"
import { motion } from "framer-motion"
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import AnimateText from '../components/AnimateText'
import { image2, image3, image4, image1 } from "../Assets/images"
import { Heading } from '../components'
import UiButton from '../components/UiButton'
import { getCities } from "../utils/ReactSelectFunction"
import { hero } from "../Assets/images"
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import dateFormater from '../utils/DateFormater'
import axios from "axios"
import { components, style } from "../utils/reactselectOptionsStyles"
// import UiButton from '../components/UiButton'
import { Helmet } from 'react-helmet'
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
    const testimonials = useRef(null)
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
    useEffect(() => {
        var counter = 0

        const children = [...testimonials.current.querySelectorAll(".testimonial")]
        window.addEventListener("scroll", function () {
            if (!children) return
            children.forEach((testimonial) => {
                if (testimonial) {
                    const top = testimonial.getBoundingClientRect().top
                    if (top < window.innerHeight * 0.75) {
                        if (!testimonial.classList.contains("active")) {
                            testimonial.classList.add("active")
                        }
                    } else {
                        testimonial.classList.remove("active")

                    }
                }
            })
            const { pageYOffset } = window
            if (pageYOffset >= counter) {
                setUp(1)
            } else if (pageYOffset < counter) {
                setUp(0)
            }
            counter = pageYOffset <= 0 ? 0 : pageYOffset
        })
    }, [])

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

                <div className={`fixed w-[40px] h-[40px] bottom-[5rem] bg-white right-[2rem] md:right-[4rem] 
        cursor-pointer scale-navigate
rounded-full z-[200] flex items-center justify-center shadow-2xl dark:text-black  duration-500
transition-all  ${up === 0 ? "active" : "--"}`} onClick={() => window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                })}>
                    <AiOutlineArrowUp size={30} />
                </div>


                <section class="bg-white dark:bg-gray-900">
                    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                        <div class="mr-auto place-self-center lg:col-span-7">
                            <AnimateText text="Find cheap bus tickets for your next trip" className="!text-3xl md:!text-4xl lg:!text-6xl  !font-poppins !uppercase !max-w-xl !text-start " />
                            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Easily compare and book your next trip with {process.env.REACT_APP_APP_NAME} </p>
                            <Link href="#" to={"/booking"} class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                Get started
                                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </Link>
                            <Link to={"/about-us"} href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                Learn More
                            </Link>
                        </div>
                        <div class="hidden- mt-2 lg:mt-0 lg:col-span-5 lg:flex group relative">
                            <img src="https://clipart-library.com/img/133458.png"
                                alt="bus"
                                className="md:hover:scale-[1.2]  md:hover:scale-x-[1.2]  hover:-translate-x-10
                        duration-300 ease transition-all" />
                        </div>
                    </div>
                </section >
                <div id="ourservices">
                    <OurServices />
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0.3 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, }}

                    // initial={{y:20,opacity:0.3}}
                    className="container rounded-lg md:overflow-hidden
            mx-auto shadow-2xl  py-10-
             z-40  mb-[90px]   flex ">
                    <div className="flex-none hidden md:block w-[150px]  md:relative ">
                        <div className="absolute top-0 bg-red-500  overflow-hidden
                    left-[-50px] h-screen rotate-[-12deg] w-full">
                        </div>
                    </div>
                    <div className="flex-1">
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}

                            className="text-2xl mt-5 mb-2 uppercase font-[500] text-center md:text-left">Why Choose us</motion.h1>
                        <span className="w-[90px] block rounded-md h-[5px] mx-auto md:mx-0 hover:bg-red-200 transiton-bg-color bg-red-500"></span>
                        <div className="md:flex flex-wrap  mt-10">
                            <div className="md:w-1/2  items-start flex my-4 gap-2 relative">
                                <img src={image1 ||
                                    "https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
                                    alt="excellent" className="h-[60px] w-[60px] sticky top-[60px] rounded-full " />
                                <div className="flex-1">
                                    <h2 className="text-lg mb-2 font-[500] leading-5"
                                    >Mission</h2>
                                    <p className="text-slate-500 text-[14px]">
                                        At  {site_name} our mission is to give people the power to build community and bring the world closer together.

                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/2  flex items-start my-4 gap-2">
                                <img src={image2 ||
                                    "https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
                                    alt="excellent" className="h-[60px] w-[60px] sticky top-[60px] rounded-full " />

                                <div className="flex-1">
                                    <h2 className="text-lg mb-2 font-[500] leading-5"
                                    >Benefits</h2>
                                    <p className="text-slate-500 text-[14px]">
                                        We invest in training and development in a big way, so you can build your future along with ours, creating an impactful career unique to you.

                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/2  flex items-start my-4 gap-2">
                                <img src={image3 ||
                                    "https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
                                    alt="excellent" className="h-[60px] w-[60px] sticky top-[60px] rounded-full " />
                                <div className="flex-1">
                                    <h2 className="text-lg mb-2 font-[500] leading-5"
                                    >Our Desire</h2>
                                    <p className="text-slate-500 text-[14px]">
                                        SAP started in 1972 as a team of five colleagues with a desire to do something new. Together, they changed enterprise software and reinvented how business was done. Today, as a market leader in enterprise application software, we remain true to our roots.
                                        We invest in training and development in a big way, so you can build your future along with ours, creating an impactful career unique to you.

                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/2  flex items-start my-4 gap-2 pb-24 ">
                                <img src={image4 ||
                                    "https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
                                    alt="excellent" className="h-[60px] w-[60px] sticky top-[60px] rounded-full " />

                                <div className="flex-1">
                                    <h2 className="text-lg mb-2 font-[500] leading-5"
                                    >Vison</h2>
                                    <p className="text-slate-500 text-[14px]">

                                        What has remained constant throughout this history of transformation is our dedication to our customers, to our employees, and to the values on which American Express was built: integrity, quality, respect, and community.

                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
                <motion.section
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="md:grid grid-cols-2 space-y-8 py-10 pb-52 container mx-auto items-center">
                    <div>
                        <img
                            className=""
                            src={hero}
                            alt="hero"
                        />

                    </div>
                    <div>
                        <div
                            onClick={e => e.stopPropagation()}
                            className={`
                        mx-auto
          md:translate-x-0
          group-[.active]:translate-x-0
          duration-700
          ease 
          transition-all
          md:group-[.active]:translate-y-0
          group-[.active]:opacity-100
          bg-white
          dark:bg-slate-800
          shadow-sm
          rounded-lg
          w-[min(calc(100%-40px),400px)]
          
            py-5 pb-10`}>

                            <AnimateText text="Check Ticket Status here" className='!text-lg' />
                            <form
                                onSubmit={handleSubmit}
                                className='px-5 pb-5'
                            >
                                <div className="relative mb-6" data-te-input-wrapper-init>
                                    <input
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}

                                        type="text"
                                        className="peer block min-h-[auto] w-full 
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="ticket_id"
                                        placeholder="Password" required />
                                    <label
                                        htmlFor="ticket_id"
                                        className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-white
              peer-valid:bg-white
              dark:peer-focus:bg-slate-800
              dark:peer-valid:bg-slate-800
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"
                                    >
                                        Enter Ticket Id
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="inline-block bg-blue-400
            w-full rounded bg-primary px-7
            pb-2.5 pt-3 text-sm font-medium
            uppercase leading-normal
            text-white
            shadow-[0_4px_9px_-4px_#3b71ca]
            transition duration-150
            ease-in-out hover:bg-primary-600
            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            focus:bg-primary-600 
            focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
            focus:outline-none focus:ring-0 active:bg-primary-700 
            active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
            dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    // disabled={loading}
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    {/* {loading ? <Loadingbtn /> : "Change Password"}
                            */}
                                    {"check ticket details"}
                                </button>


                            </form>
                        </div>
                    </div>

                </motion.section>


                {/* testimonails */}

                <section class="text-neutral-700 dark:text-neutral-300 container mx-auto mb-10" ref={testimonials}>
                    <div class="mx-auto text-center md:max-w-xl lg:max-w-3xl">
                        <h3 class="mb-6 text-3xl font-bold">People from around the world trust {process.env.REACT_APP_APP_NAME}</h3>
                        <p class="mb-6 pb-2 md:mb-12 md:pb-0">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                            error amet numquam iure provident voluptate esse quasi, veritatis
                            totam voluptas nostrum quisquam eum porro a pariatur veniam.
                        </p>
                    </div>

                    <div class="grid gap-6 text-center md:grid-cols-3">
                        <div>
                            <div
                                class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                                <div class="h-28 overflow-hidden rounded-t-lg bg-[#9d789b]"></div>
                                <div
                                    class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                    <img
                                        src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" alt="testimonials" />
                                </div>
                                <div class="p-6 mx-auto">
                                    <h4 class="mb-4 text-2xl font-semibold">Maria Smantha</h4>

                                    <div class="flex items-center justify-center mb-1">
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
                                    </div>

                                    <hr />
                                    <p class="mt-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            class="inline-block h-7 w-7 pr-2"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                        </svg>
                                        Lorem ipsum dolor sit amet eos adipisci, consectetur
                                        adipisicing elit.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                                <div class="h-28 overflow-hidden rounded-t-lg bg-[#6d5b98]"></div>
                                <div
                                    class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                    <img
                                        src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" alt="testimonials" />
                                </div>
                                <div class="p-6">
                                    <h4 class="mb-4 text-2xl font-semibold">John Smith</h4>
                                    
                                    <div class="flex items-center justify-center mb-1">
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
                                    </div>
                                    <hr />
                                    <p class="mt-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            class="inline-block h-7 w-7 pr-2"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                        </svg>
                                        Delectus impedit saepe officiis ab aliquam repellat rem unde
                                        ducimus.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                                <div class="h-28 overflow-hidden rounded-t-lg bg-[#7a81a8]"></div>
                                <div
                                    class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                    <img
                                        src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp" alt="testimonials" />
                                </div>
                                <div class="p-6">
                                    <h4 class="mb-4 text-2xl font-semibold">Lisa Cudrow</h4>
                                    
                                    <div class="flex items-center justify-center mb-1">
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
                                    </div>
                                    <hr />
                                    <p class="mt-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            class="inline-block h-7 w-7 pr-2"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                        </svg>
                                        Neque cupiditate assumenda in maiores repudi mollitia
                                        architecto.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div
                                class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                                <div class="h-28 overflow-hidden rounded-t-lg bg-[#6d5b98]"></div>
                                <div
                                    class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                    <img
                                        src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" alt="testimonials" />
                                </div>
                                <div class="p-6">
                                    <h4 class="mb-4 text-2xl font-semibold">John Smith</h4>
                                    
                                    <div class="flex items-center justify-center mb-1">
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
                                    </div>
                                    <hr />
                                    <p class="mt-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            class="inline-block h-7 w-7 pr-2"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                        </svg>
                                        Delectus impedit saepe officiis ab aliquam repellat rem unde
                                        ducimus.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                                <div class="h-28 overflow-hidden rounded-t-lg bg-[#9d789b]"></div>
                                <div
                                    class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                    <img
                                        src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" alt="testimonials" />
                                </div>
                                <div class="p-6">
                                    <h4 class="mb-4 text-2xl font-semibold">Maria Smantha</h4>
                                    
                                    <div class="flex items-center justify-center mb-1">
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
                                    </div>
                                    <hr />
                                    <p class="mt-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            class="inline-block h-7 w-7 pr-2"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                        </svg>
                                        Lorem ipsum dolor sit amet eos adipisci, consectetur
                                        adipisicing elit.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                                <div class="h-28 overflow-hidden rounded-t-lg bg-[#6d5b98]"></div>
                                <div
                                    class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                    <img
                                        src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" alt="testimonials" />
                                </div>
                                <div class="p-6">
                                    <h4 class="mb-4 text-2xl font-semibold">John Smith</h4>
                                    
                                    <div class="flex items-center justify-center mb-1">
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
                                    </div>
                                    
                                    <div class="flex items-center justify-center mb-1">
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg class="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
                                    </div>
                                    <hr />
                                    <p class="mt-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            class="inline-block h-7 w-7 pr-2"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                        </svg>
                                        Delectus impedit saepe officiis ab aliquam repellat rem unde
                                        ducimus.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <Footer />
            </div >
        </>
    )
}

export default Home