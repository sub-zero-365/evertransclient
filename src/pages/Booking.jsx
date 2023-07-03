import { useNavigate, useSearchParams, Link } from "react-router-dom"
import {
  Loader, Modal, PrevButton, NextButton, Heading,
  AnimateError
} from "../components"

import { BiChevronDown } from 'react-icons/bi'
import { useState, forwardRef, useEffect } from "react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Select from 'react-select'
import Select2 from 'react-select'
import Select3 from 'react-select'
import SelectTime from 'react-select'
import React from 'react';
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { storeCities } from "../actions/userCity"
import axios from 'axios'
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
const Booking = () => {

  const dispatch = useDispatch();
  const [queryParams, setQueryParams] = useSearchParams()
  const [toggle, setToggle] = useState(false)
  const [time, setTime] = useState("7am");
  const [endTime, setEndTime] = useState("7am");
  const setCity = (cities) => dispatch(storeCities(cities));
  const style = {
    control: base => ({
      ...base,
      border: 0,
      borderBottom: "1px solid black",
      boxShadow: "none",
      background: "transparent",
      color: "red",
      borderRadius: 0,
      fontSize: 1 + "rem"
    }
    )

  }
  const [buses,setBuses]=useState([])
  useEffect(() => {
    const token = localStorage.getItem("token");
    
       (async function () {
      try {
          const res = await axios.get("/bus",
              {
                  headers: {
                      'Authorization': "makingmoney " + token
                  }
              }
          )
          // setIsOpen(false);
          setBuses(res.data?.buses?.map((bus)=>({label:bus.name,value:bus._id})))
          console.log(res.data)

      } catch (err) {
          // setErr(err.response.data)
          console.log(err)

      }
      finally {
   
      }
  }())
    
    
    window.scrollTo({
      top: 0,
      left: 0,
    })
    if (!token) {
      setToggle(true);
      setTimeout(() => {
        navigate("/login")
      }, 4000)

    }

    async function getCities() {

      const url = process.env.REACT_APP_LOCAL_URL + "/allcities";
      try {
        const res = await axios.get(url, {
          headers: {
            'Authorization': "makingmoney " + token
          }
        })
        setCity(res?.data?.cities)
      } catch (err) {
        console.log(err)
      }



    }
    getCities()
    
    
 


  }, [])
  const tripType = queryParams.get("triptype");
  const onChange = (timeValue, setSecond = null) => {
    if (setSecond == null) {
      setTime(timeValue.value);
      return
    }
    setEndTime(timeValue.value)
  }


  const [fromCities, setFromCities] = useState(queryParams.get("from"))
  const [toCities, setToCities] = useState(queryParams.get("to"))
const [selectedbus,setSelectedBus]=useState(null)
  const [isLine, setIsline] = useState(false)
  const options = useSelector(state => state.userCity.cities);
  const navigate = useNavigate()
  const gotoBusSits = () => navigate(`/bussits/99388863?from=${fromCities}&to=${toCities}&time=${time}&date=${startDate}&endTime=${endTime}&triptype=${tripType}&bus=${selectedbus}`)
  const [demoFetch, setDemoFetch] = useState(false);
  const loadDemoData = (evt) => {
    evt.preventDefault()
    if (fromCities === toCities) {
      setErr(true)
      setMsg("Please both cities must not be thesame ,that is  " + fromCities + " must not be equal to " + toCities)
      return
    }

    setDemoFetch(true)
    setTimeout(() => {
      setDemoFetch(false)
      gotoBusSits()
    }, 10)
  }
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());
  const Header = ({ name }) => <h1 className="font-black text-center text-slate-900 mb-4 tracking-tighter  underline underline-offset-8 text-lg">{name || "no name was passed"}</h1>
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div
      // style={{ "--w": "200px" }}
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
        <h4 className="text-lg leading-6 capitalize"> {value}</h4>
        <p className="text-sm md:text-lg text-slate-500 font-[500]">{value && (new Date(value).toDateString())}</p>
      </div>
    </div>
  ));




  const [err, setErr] = useState(false)
  const [msg, setMsg] = useState("time must not be thesame !")
  return (
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
          <img src="https://th.bing.com/th/id/OIP.83QkNLDMdg1mZ1rn6bnx-gHaHa?pid=ImgDet&rs=1" className="h-full w-full" alt="bus pic" />
        </div>

        <form onSubmit={loadDemoData} className="-mt-10 mx-4  md:pb-24
        md:mt-0 pt-10  md:w-[25rem]  lg:w-[30rem]
        md:max-w-[calc(100vw-2.5rem)] md:max-h-[calc(100vh-60px)]  md:overflow-y-auto">

          <div className="shadow-lg mx-4 min-h-[3rem] -mt-[25px] bg-white dark:bg-slate-700 rounded-lg flex p-1 ">
            <Link to=".?triptype=single" className={`w-1/2 ${(tripType === "single" || !tripType) ? "bg-blue-400" : "bg-orange-400"} text-center text-white flex items-center justify-center rounded-sm `}>One Way</Link>
            <Link to=".?triptype=round" className={`w-1/2 ${tripType === "round" ? "bg-blue-400" : "bg-orange-400"} text-center text-black flex items-center justify-center
          rounded-sm `}>Round Trip</Link>
          </div>



          <div className="flex flex-col justify-center items-center mt-4">
            <div className="flex gap-2 justify-center items-center">

              {tripType == "round" ? <Header name="RoundTrip" /> : <Header name="SingleTrip" />}

              <span className="!w-5 !h-5 grid items-center rounded-sm justify-center mb-0.5" onClick={() => setIsline(!isLine)} >
                <BiChevronDown className="text-sm" />
              </span>
            </div>
            <DatePicker
              wrapperClassName="datePicker" className="datePicker"
              inline={isLine}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              Date={new Date()}
              // isClearable
              required
              customInput={<ExampleCustomInput />
              }
            /> </div>

          <Heading text="Bus " className={"!mb-1 !mt-2 !text-lg first-letter:text-2xl first-letter:font-semibold"} />
          <Select3
            styles={style}
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            className="dark:bg-slate-900 mx-2  min-h-8 text-black text-xs md:text-xl"
            required

            onChange={evt => setSelectedBus(evt.value)}
            options={buses} />
          <Heading text="From" className={"!mb-1 !mt-2 !text-lg first-letter:text-2xl first-letter:font-black"} />
          <Select
            styles={style}
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

            className="dark:bg-slate-900 mx-2 min-h-8 text-black text-xs md:text-xl" required

            onChange={evt => setFromCities(evt.value)}
            options={options} />

          <Heading text="Destination" className={"!mb-1 !mt-2 !text-lg first-letter:text-2xl first-letter:font-black"} />
          <Select2
            styles={style}
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

            required className="dark:bg-slate-900 mx-2 text-black text-xs min-h-8 md:text-xl "

            onChange={evt => setToCities(evt.value)}
            options={options} />
          <AnimateError
            error={fromCities != null && fromCities === toCities}
            errorMessage={"cities should not be thesame"} />
          <Heading text="Time" className={"!mb-1 !mt-2 !text-lg first-letter:text-2xl first-letter:font-black"} />
          <SelectTime
            styles={style}
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

            required className="dark:bg-slate-900 mx-2 text-black text-xs min-h-8 md:text-xl mb-6"

            defaultValue={{
              label: "7am",
              value: "7am"
            }}

            onChange={(evt) => onChange(evt)}
            options={[
              { value: "7am", label: "7am" },
              { value: "10am", label: "10am" },
              { value: "12am", label: "12am" },
              { value: "10pm", label: "10pm" },
            ]} />

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
              Next <AiOutlineArrowRight className="!inline-block " />
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
              Next <AiOutlineArrowRight className="!inline-block " />
            </button>

          </div>
        </form>



      </div>


    </motion.div>
  )
}

export default Booking