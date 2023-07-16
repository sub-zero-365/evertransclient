import { motion } from "framer-motion";
import { Button, DeactiveStatusButton, ActiveStatusButton } from './'
import { useState, useEffect } from 'react'
import { Heading, Scrollable, PanigationButton } from './'
import axios from "axios"
import { components, style } from "../utils/reactselectOptionsStyles"
import BusesSelect from 'react-select/async'
import { CustomDatePicker, ToggleSwitch } from './'
import TimeSelect from 'react-select'
const EditTicketModal = ({ isOpen, setIsOpen }) => {

    const [startDate, setStartDate] = useState(new Date())
   
    const getNextDay = (date = new Date()) => {
        const next = new Date(date.getTime());
        next.setDate(date.getDate() + 1);
        return next.toLocaleDateString("en-CA")
    }
    const timeOptions = [
        {
            label: "7am", value: "7am"
        },
        {
            label: "10am", value: "10am"
        },
        {
            label: "12pm", value: "12pm"
        },
        {
            label: "10pm", value: "10pm"
        },
    ]
    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 z-[2] ${isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"}
w-screen h-screen 
bg-slate-600/50 flex items-center justify-center`}>

            <div
                onClick={e => e.stopPropagation()}
                className={`


flex-none
transition-[opacity]
z-20
w-[min(calc(100%-2.5rem),25rem)]
min-h-[10rem]
bg-white
rounded-2xl
max-h-[calc(100vh-100px)]
overflow-y-auto
shadow-xl
shadow-slate-400
py-5 pb-10`}

            >

                <form className="px-6">
                    {/* <div className='px-10 mb-5'>
                        <Heading text="Select Bus" className="!text-sm !pl-0 !text-slate-400  !mb-1" />
                        <BusesSelect
                        Disabled
                            defaultOptions
                            catcheOptions
                            loadOptions={getBuses}
                            required
                            styles={{
                                ...style,
                                wdith: "100%",
                                fontSize: 10 + "px"
                            }}
                            components={components()}

                        />
                    </div> */}
                    <CustomDatePicker
                        startDate={startDate}
                        setStartDate={setStartDate}
                        maxDate={getNextDay()}
                    />
                    <TimeSelect
                        options={timeOptions}
                        

                    />

                    {/* <div className="w-fit mx-auto"> 
                    <Heading text="edit seat" className="!mb-1"/>
                    <ToggleSwitch/>
                    </div> */}
                    <Scrollable className="!gap-x-1 !mb-1 !gap-y-0.5 !flex-wrap">

                        {
                            Array.from({ length: 0 }, (arr, index) => (<PanigationButton
                                onClick={() => 0}
                                text={(index + 1)} index={(index + 1)} />))

                        }


                    </Scrollable>

                    <button
                        disabled={false}
                        type="submit"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className={`inline-block 
            rounded 
            ${false ? "bg-slate-500" : "bg-blue-500"}
            
       w-fulll
       mx-auto
       w-full
          pb-1.5
          group-disabled:bg-slate-400
        pt-2 text-lg
        font-montserrat font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] ml-0
transition duration-150 ease-in-out hover:bg-primary-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                    >
                        {false ? "Please wait" : "Edit"}
                    </button>


                </form>
            </div>


        </div>

    )


}
export default EditTicketModal