import { useNavigate } from "react-router-dom"
import { Loader,Modal } from "../components"
import { useState } from "react"
const Booking = () => {
const navigate=useNavigate()
const gotoBusSits=()=>navigate("/bussits/99388863")
const [demoFetch,setDemoFetch]=useState(false)
const loadDemoData=()=>
{

  setDemoFetch(true)

setTimeout(()=>{
setDemoFetch(false)
gotoBusSits()
},5000)}
  return (
    <div className="md:mt-5 mb-20">
    <Loader toggle={demoFetch}></Loader>
      <div className="container mx-auto md:flex ">
        <div className="image flex-none h-[200px] md:h-[80vh] 
        w-full rounded-b-[3rem] md:rounded-none md:w-[300px] lg:w-[500px] overflow-hidden">

          <img src="https://th.bing.com/th/id/OIP.83QkNLDMdg1mZ1rn6bnx-gHaHa?pid=ImgDet&rs=1" className="h-full w-full" alt="bus pic" />


        </div>
        <div className="border-4 border-green-700 h-[400px] -mt-10 mx-4 bg-white flex-1 md:mt-5">
          <div className="shadow-lg mx-4 h-[50px] -mt-[25px] bg-white rounded-lg flex p-1 ">

            <div className="w-1/2 bg-blue-500 text-center text-white flex items-center justify-center rounded-sm ">One Way</div>
            <div className="w-1/2 text-center text-black flex items-center justify-center
          rounded-sm ">Round Trip</div>
          </div>
          <div className="hidden h-[50px] md:flex items-center justify-center mt-auto">
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
onClick={loadDemoData}
            >
              Find Bus
            </button>

          </div>
        </div>



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
  onClick={loadDemoData}

          >
            Find Bus
          </button>

        </div>
      </div>


    </div>
  )
}

export default Booking