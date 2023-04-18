import { useState } from "react"
import { Modal } from "../components"
import { useNavigate } from "react-router-dom"
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