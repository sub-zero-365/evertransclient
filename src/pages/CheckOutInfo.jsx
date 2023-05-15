import { useState, useEffect } from "react"
import { NavLink, useSearchParams, useNavigate } from "react-router-dom"
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Loadingbtn } from "../components"
const BusSits = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [queryParameters] = useSearchParams()
  const [toggle, setToggle] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const proccedCheckout = () => {
    setToggle(true)
  }


  const url = process.env.REACT_APP_LOCAL_URL + "/ticket"
  const handleSubmit = async () => {
    setIsLoading(true)
    const token = localStorage.token
    if (!token) return navigate("/login")
    try {
      const res = await axios.post(url, {
        from: queryParameters.get("from"),
        to: queryParameters.get("to"),
        traveldate: new Date(),
        traveltime: "12/02/22",
        price: 2000
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
      setIsLoading(false)
      console.log(err)
    }

  }
  return (
    <motion.div
      initial={{ x: -10, y: 40 }}
      animate={{ x: 0, y: 0 }}
      className="min-h-screen"
    >
      <Alert toggle={toggle} setToggle={setToggle} message={"successfully!! thanks for using our service"} />
      <div className="md:hidden h-[50px] flex items-center justify-center mt-5 fixed bottom-8 w-full">
        <button
          type="button"
          data-te-ripple-init
          data-te-ripple-color="light"
          class="inline-block  rounded bg-blue-500 cal-width  pb-2 pt-2.5 text-lg font-montserrat font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
  transition duration-150 ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={handleSubmit}
        >
          {isLoading ? <Loadingbtn /> : "Pay And Go"}
        </button>
      </div>
      <div className="flex container mx-auto">
        <div className="flex-1 hidden lg:block"></div>
        <div className="flex-none cal-width  mx-auto  lg:shadow-lg mt-6 py-6 pt-0"
          style={{ "--w": "500px" }}>
          <nav className="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <NavLink to={"/booking"} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  Booking
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
          <h1 className="text-2xl text-center">Your display Information </h1>
          <div className="border-2 px-2 border-orange-300 border-dotted rounded-sm py-5 shadow mt-3">
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
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">24/02/2025</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">Travel Time</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">3:00 AM</div>
            </div>
            <div className="flex mb-3 flex-wrap">
              <div className="w-1/2 text-sm">Travel Cost</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">5100 frs</div>
            </div>

          </div>

          <div className="hidden h-[80px] md:flex items-center justify-center mt-auto">
            <button
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
              {isLoading ? <Loadingbtn /> : "Pay And Go"}
            </button>

          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BusSits