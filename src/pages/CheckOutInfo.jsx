import { useState } from "react"
import { Modal } from "../components"
import { useNavigate ,NavLink} from "react-router-dom"
const BusSits = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const toggleModal = () => {
    setError(!error)
  }
  const checkBusAvailabity = (id, e = null) => {
    if (id & 1) {
      setError(true)
      setErrorMessage("Sheet has already beeen taken ; choose another sheet thanks")

      window.navigator.vibrate([50, 100, 60])


    } else {
      window.navigator.vibrate([50])
      setSelected(id)


    }
  }
  const proccedCheckout = () => {

    if (!selected) {
      setError(true)
      setErrorMessage("please select a sit and procced thanks")
      return
    }
    gotoCheckOut()

  }
  const gotoCheckOut = () => navigate("/checkout")
  return (
    <div
      className="min-h-screen"
    >
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

        >
          &lt;&lt;&lt;&nbsp;  PAY&nbsp; &gt;&gt;&gt;

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
        {/* <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> */}
      Booking
      </NavLink>
    </li>
    <li className="inline-flex items-center">
    <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
    
      <NavLink to={"/bussits/99388863"} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        {/* <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> */}
      BusShits
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

            <div className="flex mb-3">
              <div className="w-1/2 text-sm">Full Names</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2"> ako bate emmanuel</div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 text-sm">Email Address</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2"> akobate@gmail.com</div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 text-sm">From</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2"> Buea</div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 text-sm">To</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2"> Baffousam</div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 text-sm">Age</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">25 years</div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 text-sm">Gender</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">Male</div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 text-sm">Sit position</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">05</div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 text-sm">Date to Travel</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">24/02/2025</div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 text-sm">Travel Time</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">3:00 AM</div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2 text-sm">Travel Cost</div>
              <div className="w-1/2 line-clamp-2 capitalize pl-2 border-b-2">5000 frs</div>
            </div>

          </div>

          <div className="hidden h-[80px] md:flex items-center justify-center mt-auto">
            <button
              onClick={proccedCheckout}
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
              PAY &gt
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BusSits