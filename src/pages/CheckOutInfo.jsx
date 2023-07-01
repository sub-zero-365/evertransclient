import { useState, useEffect } from "react"
import { NavLink, useSearchParams, useNavigate, Link } from "react-router-dom"
import Alert from '../components/Alert'
import AlertBox from '../components/Alert'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Loadingbtn } from "../components"
import { FreeMode, Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react'
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
import busimage from '../Assets/images/busimage.jpg'
const BusSits = () => {

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
      time: queryParameters.get("time").toLowerCase(),
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
      // alert(err.response.data)
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
      <AlertBox
        duration="30000"
        className={`
     ${error && "!top-1/2 -translate-y-1/2"}
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
      <div className="flex container mx-auto">
        <div className="flex-1 hidden lg:block">
          <img
            src={busimage}
            className="w-full h-[calc(100vh-50px)] object-cover" alt="booking " />


        </div>
        <div className="flex-none pb-10 cal-width  mx-auto max-h-[calc(100vh-50px)] overflow-y-auto lg:shadow-lg mt-6 py-6 pt-0"
          style={{ "--w": "500px" }}>
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
                    <h1 className="text-slate-400  font-medium text-xl ">Informations</h1>
                  </a>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className="text-2xl text-center font-bold
          font-montserrat">Display Information </h1>
          <div className="border-2 px-2  border-orange-300 border-dotted rounded-sm py-5 pt-8 shadow mt-5 relative">

            <span className="absolute left-1/2 -translate-x-1/2 border px-10 rounded-lg shadow  min-h-[30px]  bg-color_light
                      dark:bg-color_dark top-[-15px] text-montserrat  font-semibold">
              {
                (queryParameters.get("triptype") === "single" || queryParameters.get("triptype")) == "null" ? "Single Trip" : "Round Trip"
              }
            </span>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">Full Names</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2"> {queryParameters.get("name") || "fail"}</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">Email Address</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2"> {queryParameters.get("email")}</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">from</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("from")}</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">To</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2"> {queryParameters.get("to")}</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">Age</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("age")} years</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">Gender</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("gender")}</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">Sit position</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("sitpos")}</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">Date to Travel</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{new Date(queryParameters.get("date")).toLocaleDateString()
              }</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">Travel Time</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("time")}</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">Travel Cost</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{Number(queryParameters.get("sitpos")) > 20 ? 10000 + "frs" : 6500 + "frs"}</div>
            </div>
            {/* <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={2}
              freeMode={true}
              watchSlidesProgress={true}
              scrollbar={{ draggable: true }}

              modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
              className="mySwiper mt-10"
              breakpoints={{
                640: {
                  slidesPerView: 2,
                }


              }}
            >
              {["From Details",
                "Return Details"]?.
                map((item, index) => (<SwiperSlide key={index}>
                  <h2
                    className={`
                font-bold
                uppercase 
                text-xs 
                md:text-sm 
                pb-2
                links-item
                cursor-pointer
                text-center
                fw-semibold
                font-montserrat 
                `}>
                    {item}
                  </h2>
                </SwiperSlide>))}


            </Swiper>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              modules={
                [Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                  Autoplay,
                  FreeMode,
                  Thumbs]
              }
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              // scrollbar={true}
              className="mySwiper2"
            >

              <SwiperSlide
                className="px-4 pb-4"
              >
                <Header name="From information " />
                <div className="flex mb-3 flex-wrap">
                  <div className="w-1/2 text-sm ">from</div>
                  <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("from")}</div>
                </div>
                <div className="flex mb-3 flex-wrap">
                  <div className="w-1/2 text-sm ">to</div>
                  <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("from")}</div>
                </div>
                <div className="flex mb-3 flex-wrap">
                  <div className="w-1/2 text-sm">Date to Travel</div>
                  <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{new Date(queryParameters.get("date")).toLocaleDateString()
                  }</div>
                </div>
                <div className="flex mb-3 flex-wrap">
                  <div className="w-1/2 text-sm">Travel Time</div>
                  <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("time")}</div>
                </div>

              </SwiperSlide>
              <SwiperSlide
                className="px-4 pb-4"
              >
                <Header name="Return Information" />
                <div className="flex mb-3 flex-wrap">
                  <div className="w-1/2 text-sm ">from</div>
                  <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("from")}</div>
                </div>
                <div className="flex mb-3 flex-wrap">
                  <div className="w-1/2 text-sm ">to</div>
                  <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("from")}</div>
                </div>
                <div className="flex mb-3 flex-wrap">
                  <div className="w-1/2 text-sm">Date to Travel</div>
                  <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{new Date(queryParameters.get("date")).toLocaleDateString()
                  }</div>
                </div>
                <div className="flex mb-3 flex-wrap">
                  <div className="w-1/2 text-sm">Travel Time</div>
                  <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">{queryParameters.get("time")}</div>
                </div>

              </SwiperSlide>



            </Swiper> */}
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