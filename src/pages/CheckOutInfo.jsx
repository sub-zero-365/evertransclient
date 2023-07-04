import { useState, useEffect, useRef } from "react"
import { NavLink, useSearchParams, useNavigate, Link } from "react-router-dom"
import Alert from '../components/Alert'
import AlertBox from '../components/Alert'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Loadingbtn } from "../components"
import { Heading } from "../components"
import { BiCategory } from 'react-icons/bi'
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "swiper/css/a11y"
import "swiper/css/scrollbar"
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import AnimateText from '../components/AnimateText'
import busimage from '../Assets/images/busimage.jpg'
const BusSits = () => {
  const constraintsRef = useRef(null)


  const [view, setView] = useState(false)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [queryParameters] = useSearchParams()
  const [toggle, setToggle] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const proccedCheckout = () => {
    setToggle(true)
  }
  const [message, setMessage] = useState("")
  const Header = ({ name }) => <h1 className="dark:text-white  font-black text-center text-slate-900 mb-4 tracking-tighter  underline underline-offset-8 text-lg">{name || "no name was passed"}</h1>


  const url = process.env.REACT_APP_LOCAL_URL + "/ticket"
  const handleMarkSeatConSumeSeat = async () => {
    return
    const busId = queryParameters.get("bus");
    const sitpos = queryParameters.get("sitpos")
    if (!busId && !sitpos) {
      alert("fail to get ids")
      return
    }
    try {
      const res = await axios.put(`/bus/${busId}/${sitpos}`)
      console.log(res)
      return res
    } catch (err) {
      console.log(err)

      throw new Error("something went wrong")
    }

  }
  const handleSubmit = async () => {
    // if(queryParameters.get("triptype"))
    var submitdata = {
      from: queryParameters.get("from"),
      to: queryParameters.get("to"),
      traveldate: new Date(queryParameters.get("date")),
      traveltime: queryParameters.get("time") || "n/a",
      price: Number(queryParameters.get("sitpos")) > 20 ? 10000 : 6500,
      sex: queryParameters.get("gender"),
      email: queryParameters.get("email"),
      age: queryParameters.get("age"),
      phone: queryParameters.get("phone"),
      fullname: queryParameters.get("name"),

    }
    if (queryParameters.get("triptype") !== "null") {
      submitdata = {
        ...submitdata,
        type: queryParameters.get("triptype") + "trip",
      }
    }
    setIsLoading(true)
    const token = localStorage.token
    if (!token) return navigate("/login")
    try {
      const busId = queryParameters.get("bus");
      const sitpos = queryParameters.get("sitpos")
      if (!busId && !sitpos) {
        alert("fail to get ids")
        return
      }
      const r = await axios.put(`/bus/${busId}/${sitpos}`)
      const res = await axios.post(url, {
        ...submitdata
      }, {

        headers: {
          "Authorization": "makingmoney " + token

        }

      })
      setTimeout(() => {
        navigate("/user")
      }, 4000)
      proccedCheckout()
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      setMessage(err.response.data)
      setError(true)
    }

  }
  return (
    <motion.div
      initial={{ x: -10, y: 40 }}
      animate={{ x: 0, y: 0 }}
      className="h-[calc(100vh-50px)]"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        onClick={() => setView(c => !c)}
        animate={{
          scale: [0.7, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }
        }
        className="bottom-1/2
                        -translate-y-1/2 fixed 
                        lg:hidden
                        flex-none 
                        shadow-2xl button-add  top-auto bg-blue-400 
w-[2.5rem]
h-[2.5rem] 
-rounded-full 
overflow-hidden 
right-0
z-10  "
      >
        <div className="flex h-full w-full items-center -scale-animation justify-center ">
          <BiCategory size={20} color="#fff" className="" />
        </div>
      </motion.div>
      <AlertBox
        duration="30000"
        className={`
     ${error && "!top-1/2 -translate-y-1/2"} group
     `}
        error={error}
        confirmFunc={() => setError(false)}
        seterror={setError}
        message={message}

      />
      <Alert
        toggle={toggle}
        setToggle={setToggle}
        confirmFunc={() => navigate("/user")}
        message={"successfully book the ticket"} />
      <div className="md:hidden z-10 h-[50px] flex items-center justify-center mt-5 fixed bottom-8 w-full">
        {

          isLoading ? <button
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            class="inline-block  rounded bg-blue-500 cal-width  pb-2 pt-2.5 text-lg font-montserrat font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-primary-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            <Loadingbtn />
          </button> : <button
            onClick={handleSubmit}
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            class="inline-block  rounded bg-blue-500 cal-width  pb-2 pt-2.5 text-lg font-montserrat font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-primary-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Validate Ticket
          </button>

        }
      </div>
      <div className="lg:flex md:container mx-auto">
        <div className="flex-1 hidden lg:block">
          <img
            src={busimage}
            className="w-full h-[calc(100vh-50px)] object-cover" alt="booking " />

        </div>
        <div className="flex-none px-2 w-full pb-24 lg:w-[35rem] lg:px-4  mx-auto max-h-[calc(100vh-50px)] overflow-y-auto lg:shadow-lg mt-6 py-6 pt-0"
          ref={constraintsRef}
        >
          <nav className="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <NavLink to={"/booking?" + queryParameters?.toString()} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  Booking
                </NavLink>
              </li>

              <li className="inline-flex items-center">
                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <NavLink to={"/bussits/7847/?" + queryParameters?.toString()} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  BusSeat
                </NavLink>
              </li>
              <li>
                <div className="flex items-center">
                  <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    <h1

                    
                      className="text-slate-400  font-medium text-xl ">Informations</h1>
                  </a>
                </div>
              </li>
            </ol>
          </nav>
          <AnimateText text="User Information"
            className={"!text-sm md:!text-lg lg:!text-2xl !text-center"} />
          {/* <Heading text="User Information" className="!text-center !text-2xl !font-black !mb-14 !text-slate-900 underline underline-offset-8" /> */}

          <div className="border-2 pr-4  bg-white shadow-xl 
          
          py-5 pt-8 rounded-lg mt-5 relative">

            <span className="absolute left-1/2 -translate-x-1/2 border px-10 rounded-lg shadow  min-h-[30px]  bg-color_light
                      dark:bg-color_dark top-[-15px] text-montserrat  font-semibold">
              {
                (queryParameters.get("triptype") === "single" || queryParameters.get("triptype")) == "null" ? "Single Trip" : "Round Trip"
              }
            </span>
            <div className={`grid ${view ? "grid-cols-1 active " : "grid-cols-2"} group justify-center mb-1 items-center `}>
              <Heading text="Fullname" className={"!mb-1 !mt-2 group-[.active]:!text-center !text-lg first-letter:text-2xl first-letter:font-semibold"} />
              <div className=" line-clamp-2 group-[.active]:!text-center capitalize pl-2 border-b-2"> {queryParameters.get("name") || "fail"}</div>
            </div>
            <div className={`grid ${view ? "grid-cols-1 active " : "grid-cols-2"} group justify-center- mb-1 items-center `}>
              <Heading text="ID number" className={"!mb-1 !mt-2 group-[.active]:!text-center !text-lg first-letter:text-2xl first-letter:font-semibold"} />
              <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center"> {queryParameters.get("email")}</div>
            </div>
            <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
              <Heading text="From" className={"!mb-1 !mt-2 group-[.active]:!text-center !text-lg first-letter:text-2xl first-letter:font-semibold"} />

              <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{queryParameters.get("from")}</div>
            </div>
            <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
              <Heading text="To" className={"!mb-1 !mt-2 group-[.active]:!text-center !text-lg first-letter:text-2xl first-letter:font-semibold"} />

              <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center"> {queryParameters.get("to")}</div>
            </div>
            <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
              <Heading text="Age" className={"!mb-1 !mt-2 group-[.active]:!text-center !text-lg first-letter:text-2xl first-letter:font-semibold"} />

              <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{queryParameters.get("age")} years</div>
            </div>
            <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
              <Heading text="Gender" className={"!mb-1 !mt-2 group-[.active]:!text-center !text-lg first-letter:text-2xl first-letter:font-semibold"} />

              <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{queryParameters.get("gender")}</div>
            </div>
            <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
              <Heading text="Seat" className={"!mb-1 !mt-2 group-[.active]:!text-center !text-lg first-letter:text-2xl first-letter:font-semibold"} />

              <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{queryParameters.get("sitpos")}</div>
            </div>
            <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
              <Heading text="Travel Date" className={"!mb-1 !mt-2 group-[.active]:!text-center !text-lg first-letter:text-2xl first-letter:font-semibold"} />
              <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{new Date(queryParameters.get("date")).toLocaleDateString()
              }</div>
            </div>
            <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
              <Heading text="Travel Time" className={"!mb-1 !mt-2 group-[.active]:!text-center !text-lg first-letter:text-2xl first-letter:font-semibold"} />
              <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{queryParameters.get("time")}</div>
            </div>
            <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
              <Heading text="Travel Cost" className={"!mb-1 !mt-2 group-[.active]:!text-center !text-lg first-letter:text-2xl first-letter:font-semibold"} />

              <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{Number(queryParameters.get("sitpos")) > 20 ? 10000 + "frs" : 6500 + "frs"}</div>
            </div>

          </div>

          <div className="hidden h-[80px] md:flex items-center justify-center mt-auto">
            {

              isLoading ? <button
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                class="inline-block  rounded bg-blue-500 cal-width  pb-2 pt-2.5 text-lg font-montserrat font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-primary-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                <Loadingbtn />
              </button> : <button
                onClick={handleSubmit}
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                class="inline-block  rounded bg-blue-500 cal-width  pb-2 pt-2.5 text-lg font-montserrat font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
  transition duration-150 ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Validate Ticket
              </button>

            }


          </div>
        </div>
      </div>
      <div className="mb-24 md:hidden" />
    </motion.div>
  )
}

export default BusSits