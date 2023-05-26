import React, {useState} from 'react'
import Loadingbtn from './Loadingbtn';
import { motion } from 'framer-motion'

const AddCities = ({edit,toggle,setToggle,addFunc ,editFunc,city,setVal,className}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div
        onClick={()=>setToggle(false)}
        
        className={`fixed ${className} h-full ${toggle?"visible active":"invisible"} z-[5]
        group transition-all duration-300
        w-full container left-1/2 -translate-x-1/2 bg-slate-950 bg-opacity-50 flex flex-col items-center justify-center`}>
            <form onSubmit={edit?editFunc:addFunc} onClick={e=>e.stopPropagation()}
            className='bg-white relative scale-75 opacity-0 transition-all duration-300 group-[.visible]:opacity-100 group-[.visible]:scale-100 w-[min(calc(100vw-2.5rem),25rem)] min-h-[10rem] rounded-lg p-3 shadow shadow-slate-950'
            
            >
            <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="successModal"        onClick={()=>setToggle(false)}
>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <h1 className='text-center font-black uppercase mb-6 font-montserrat'>
            
            {isLoading ? <Loadingbtn /> :edit?"Edit city :"+city: "Add New City"}
            
            </h1>
            <div className="relative mb-6" data-te-input-wrapper-init>
                <input onChange={e=>setVal(e.target.value)}
                  type="text"
                  className="
              peer block min-h-[auto] border-2 w-full rounded shadow-none peer
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none
              transition-all duration-200 ease-linear
              focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:placeholder:text-neutral-200
              [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput33"
                  placeholder="City Name" required />
              <p className='text-center text-xs mt-2 translate-y-4 transition-all duration-300 text-red-400 opacity-0  peer-hover:translate-y-0  peer-hover:opacity-100 peer-focus:translate-y-0  peer-focus:opacity-100'>please make sure not to add two thesame cities</p>
                  
                <label
                  htmlFor="exampleFormControlInput33"
                  className="pointer-events-none 
              absolute left-1/2
              -translate-x-1/2
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
              peer-focus:bg-color_light
              peer-valid:bg-color_light
              dark:peer-focus:bg-color_dark
              dark:peer-valid:bg-color_dark
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"
                >
                {edit?"Edit City "+city: "City Name"}
                </label>
              </div>
              <button 
                type="submit"
                className="block bg-blue-400
                w-[min(calc(100vw-2.5rem),10rem)]
            mx-auto mb-6
            rounded bg-primary px-7
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
                data-te-ripple-init
                data-te-ripple-color="light">
                {isLoading ? <Loadingbtn /> :edit?"Edit "+city: "Add New City"}

              </button>
            </form>
        </div>
    )
}

export default AddCities