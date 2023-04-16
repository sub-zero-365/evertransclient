import { useState } from "react"
import { Modal } from "../components"
const BusSits = () => {
const [error,setError]=useState(false)
const toggleModal=()=>{
setError(!error)
}
const checkBusAvailabity=(id)=>{
if(id&1){
    setError(true)
window.navigator.vibrate([50,100,60])

    
}else{
    window.navigator.vibrate([50])


}
}
    return (
        <div

        >
        <Modal toggle={error} toggleModal={toggleModal} ></Modal>
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
            CHECKOUT 
          </button>

        </div>
            <div className="flex container mx-auto">
            
            <div className="flex-1 hidden lg:block"></div>
            
            <div className="flex-none cal-width  mx-auto  shadow-lg mt-6 py-6"
            
            style={{"--w":"500px"}}>
            
            <div className="flex justify-between px-2">
            <h1 className="text-xl">Mon</h1>
            <h1 className="text-xl">On 19th Sept2021 at </h1>
            <h2 className="text-2xl">10:am</h2>
            </div>
            <div className="flex justify-between px-5">
            <h1 className="text-xl">Available</h1>
            <h1 className="text-xl">Not Available</h1>
            </div>
            <div className="flex flex-wrap">
           {
           Array.from({length:16},(seat,i)=>{
            return(
                <div className="w-1/4 h-[80px] p-2 select-none" onClick={()=>checkBusAvailabity(i)}>
                <div className={`${i&1?"bg-orange-400":"bg-green-400"} w-full h-full rounded-lg flex items-center justify-center`}>{i}</div>
                </div>
            )
           })
           }
            </div>
            <div className="hidden h-[80px] md:flex items-center justify-center mt-auto">
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
// onClick={loadDemoData}
            >
              Find Bus
            </button>

          </div>
            </div>
            </div>
        </div>
    )
}

export default BusSits