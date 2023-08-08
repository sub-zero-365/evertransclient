import { useNavigate, useSearchParams, Link } from "react-router-dom"
import {
  Loader, Modal, Heading,
  AnimateError
} from "../components"
import { BiChevronDown } from 'react-icons/bi'
import { useState, forwardRef, useEffect } from "react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineArrowRight } from 'react-icons/ai'
import FromSelect from 'react-select/async'
import ToSelect from 'react-select/async'
import TimeSelect from 'react-select'
import React from 'react';
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
import { timeOptions } from '../utils/sortedOptions'
import { Helmet } from 'react-helmet'
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
import useCity,{ getCities } from "../utils/ReactSelectFunction";

import { components, style } from "../utils/reactselectOptionsStyles"

const Booking = () => {
 
  const [queryParams, setQueryParams] = useSearchParams()
  const [toggle, setToggle] = useState(false)

  const tripType = queryParams.get("triptype");

  const [fromCities, setFromCities] = useState(queryParams.get("from"))
  const [toCities, setToCities] = useState(queryParams.get("to"))
  const [time, setTime] = useState("7am")
  const [isLine, setIsline] = useState(false)
  const navigate = useNavigate()
  const gotoBusSits = () => navigate(`/bussits/68763?from=${fromCities}&to=${toCities}&date=${startDate.toLocaleDateString('en-ZA')}&triptype=${tripType}&time=${time}`)
  const [demoFetch, setDemoFetch] = useState(false);
  const loadDemoData = (evt) => {
    evt.preventDefault()
    if (fromCities === toCities) {
      setErr(true)
      setMsg("Please both cities must not be thesame ,that is  " + fromCities + " must not be equal to " + toCities)
      return
    }

    setDemoFetch(false)
    gotoBusSits()
  }
  const [startDate, setStartDate] = useState(new Date());

  const Header = ({ name }) => <h1 className="font-black text-center text-slate-900 dark:text-white mb-4 tracking-tighter  underline underline-offset-8 text-sm">{name || "no name was passed"}</h1>
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div
      className="w-full
      border-b
      mt-[20px]
      mx-4
      shadow-sm border-black 
      gap-2
      p-1 
      rounded-0
      bg-transparent my-1  "
      onClick={onClick} ref={ref}>

      <Heading text="Date" className={"!pl-0 !mb-1 !mt-2 !text-lg first-letter:text-2xl first-letter:font-semibold"} />

      <div className="flex-1">
        <h4 className="text-sm leading-6 capitalize"> {value}</h4>
        <p className="text-xs md:text-lg text-slate-500 font-[500]">{value && (new Date(value).toDateString())}</p>
      </div>
    </div>
  ));




  const [err, setErr] = useState(false)
  const [msg, setMsg] = useState("time must not be thesame !")
  return (
    <>
      <Helmet>
        <title>
          Booking
        </title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}

        className="md:mt-0 pb-20 md:pb-0 md:h-[calc(100vh-60px)]">
        <Modal toggle={err} toggleModal={() => setErr(false)} information={msg}  ></Modal>

        <Alert toggle={toggle} message={"please login or signup to get started"}
          setToggle={setToggle} />
        <Loader toggle={demoFetch}></Loader>


        <div className="container mx-auto md:flex ">
          <div className="image flex-1 h-[200px] md:h-[calc(100vh-60px)]
        w-full rounded-b-[3rem] md:rounded-none  overflow-hidden">
            <img 
            // src="https://th.bing.com/th/id/OIP.83QkNLDMdg1mZ1rn6bnx-gHaHa?pid=ImgDet&rs=1"
            src="https://i.pinimg.com/originals/40/ef/a6/40efa606063d41c754b0a4a6c5de8df8.gif"
            className="h-full w-full" alt="bus pic" />

          </div>

          <form onSubmit={loadDemoData} className="-mt-10 mx-4  md:pb-24
        md:mt-0 pt-10  md:w-[25rem]  lg:w-[30rem]
        md:max-w-[calc(100vw-2.5rem)] md:max-h-[calc(100vh-60px)]  md:overflow-y-auto">

            <div className="shadow-lg mx-4 min-h-[3rem]
          -mt-[25px] bg-white dark:bg-slate-700
          dark:text-white rounded-lg flex p-1 ">
              <Link to=".?triptype=single" className={`w-1/2 ${(tripType === "single" || !tripType) ? "bg-blue-400" : "bg-orange-400"} text-center text-white flex items-center justify-center rounded-sm `}>One Way</Link>
              <Link to=".?triptype=round" className={`w-1/2 ${tripType === "round" ? "bg-blue-400" : "bg-orange-400"} text-center text-black flex items-center justify-center
          rounded-sm `}>Round Trip</Link>
            </div>



            <div className="flex flex-col justify-center items-center mt-4">
              <div className="flex gap-2 dark:!text-white justify-center items-center">
                {tripType == "round" ? <Header className="dark:!text-white" name="RoundTrip" /> : <Header className="dark:!text-white" name="SingleTrip" />}
                <span className="!w-5 !h-5 grid items-center rounded-sm justify-center mb-0.5" onClick={() => setIsline(!isLine)} >
                  <BiChevronDown className="text-sm" />
                </span>
              </div>
              <DatePicker
                inline={isLine}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                Date={new Date()}
                required
                customInput={<ExampleCustomInput />
                }
              /> </div>


            <Heading text="From" className={"!mb-1 !mt-2 !text-lg first-letter:text-2xl first-letter:font-black"} />
            <FromSelect
              defaultOptions
              catcheOptions
              loadOptions={getCities}
              required

              styles={{
                ...style,
                wdith: "100%",
                fontSize: 10 + "px"
              }}

              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

              className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl"
              onChange={evt => setFromCities(evt.value)}
            />

            <Heading text="Destination" className={"!mb-1 !mt-2 !text-lg first-letter:text-2xl first-letter:font-black"} />
            <ToSelect

              defaultOptions
              catcheOptions
              loadOptions={getCities}
              required

              styles={{
                ...style,
                wdith: "100%",
                fontSize: 10 + "px"
              }}
              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

              className="dark:bg-slate-900 mx-2 text-black text-xs min-h-8 md:text-xl "

              onChange={evt => setToCities(evt.value)}
            />

            <AnimateError
              error={fromCities != null && fromCities === toCities}
              errorMessage={"cities should not be thesame"} />
            <Heading text="Time" className={"!mb-1 !mt-2 !text-lg first-letter:text-2xl first-letter:font-black"} />
            <TimeSelect
              styles={style}
              isSearchable={false}
              onChange={(evt) => setTime(evt.value)}
              components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
              required className="dark:bg-slate-900 mx-2 text-black text-xs min-h-8 md:text-xl mb-6"
              defaultValue={{
                label: "7am",
                value: "7am"
              }}
              options={timeOptions} />

            <div className="hidden min-h-8 md:flex items-center justify-center mt-auto">
              <button
                type="submit"
                data-te-ripple-init
                data-te-ripple-color="light"
                className="inline-block  rounded bg-blue-500 cal-width  pb-2 pt-2.5 text-lg font-montserrat font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
  transition duration-150 ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                FindBus <AiOutlineArrowRight className="!inline-block " />
              </button>
            </div>
            <div className="md:hidden min-h-8
           flex items-center justify-center mt-5 fixed left-0 bottom-8 w-full">
              <button
                data-te-ripple-init
                data-te-ripple-color="light"
                class="inline-block  rounded bg-blue-500 cal-width [--w:400px]  pb-2 pt-2.5 text-lg font-montserrat font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
  transition duration-150 ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

              >
                FindBus <AiOutlineArrowRight className="!inline-block " />
              </button>

            </div>
          </form>



        </div>


      </motion.div>
    </>
  )
}

export default Booking