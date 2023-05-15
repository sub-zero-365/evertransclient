import { useNavigate } from "react-router-dom"
import { Loader, Modal } from "../components"
import { useState, forwardRef, useEffect } from "react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IoMdArrowDropdown, } from 'react-icons/io'
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import { CiTimer } from 'react-icons/ci'
import { BiCurrentLocation } from 'react-icons/bi'
import 'rc-dropdown/assets/index.css';
import Select from 'react-select'
import Select2 from 'react-select'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
const Booking = () => {
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token :", token == "null")
    window.scrollTo({
      top: 0,
      left: 0,
    })

    if (!token) {
      // alert("enter here")
      setToggle(true);
      setTimeout(() => {
        navigate("/login")
      }, 4000)

    }
  }, [])
  useEffect(() => {


    if (!toggle) {
      // settimeout is out now 
      // navigate("/login")

    }



  }, [toggle])

  // const [from, setFrom] = useState(null)
  const [_to, setTo] = useState(null)

  function onSelectFrom({ key }) {
    setTo(key)
  }
  function click({ }) {
  }
  function onVisibleChange(visible) {
    console.log(visible);
  }
  const [fromCities, setFromCities] = useState("choose starting point")
  const [toCities, setToCities] = useState("choose starting point")
  const options = [
    { value: "limbe", label: "limbe" },
    { value: "douala", label: "douala" },
    { value: "yaounde", label: "yaounde" },
    { value: "kumba", label: "kumba" },
    { value: "kribi", label: "kribi" },
    { value: "bamenda", label: "bamenda" },
  ]


  const to = (
    <Menu onSelect={onSelectFrom} onClick={click} className="bg-slate-400 text-green-400 cal-width
    max-h-screen overflow-auto scrollto" style={{ "--w": "400px", padding: "5rem 0" }}>

      {
        Array.from({ length: 24 }, (arr, index) => {

          return (
            <MenuItem key={index} className="text-2xl text-center hover:bg-slate-400 w-full">{index}:00 am</MenuItem>
          )

        })
      }
    </Menu>
  );










  const navigate = useNavigate()
  const gotoBusSits = () => navigate(`/bussits/99388863?from=${fromCities}&to=${toCities}&time=${startDate}&date=${startDate}`)
  const [demoFetch, setDemoFetch] = useState(false)
  const loadDemoData = (evt) => {

    evt.preventDefault()
    // if()
    setDemoFetch(true)
    setTimeout(() => {
      setDemoFetch(false)
      gotoBusSits()
    }, 5000)
  }
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (

    <div style={{ "--w": "200px" }}
      className="w-full border-2 mt-[20px] shadow-xl border-blue-500 gap-2  flex p-1 rounded-md my-1  "


      onClick={onClick} ref={ref}>
      <div className="flex-none rounded-lg h-[50px] w-[50px] flex items-center justify-center">
        <CiTimer size={30} />
      </div>
      <div className="flex-1">
        <h4 className="text-lg leading-6 capitalize"> {value}</h4>
        <p className="text-sm md:text-lg text-slate-500 font-[500]">{new Date(value).toDateString()}</p>
      </div>

    </div>


  ));





  return (
    <motion.div

      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}

      className="md:mt-5 pb-20 min-h-screen">
      <Alert toggle={toggle} message={"please login or signup to get started"}
        setToggle={setToggle} />
      <Loader toggle={demoFetch}></Loader>


      <div className="container mx-auto md:flex ">
        <div className="image flex-none h-[200px] md:h-[calc(100vh-60px)]
        w-full rounded-b-[3rem] md:rounded-none md:w-[300px] lg:w-[700px] overflow-hidden">
          <img src="https://th.bing.com/th/id/OIP.83QkNLDMdg1mZ1rn6bnx-gHaHa?pid=ImgDet&rs=1" className="h-full w-full" alt="bus pic" />
        </div>

        <form onSubmit={loadDemoData} className="-mt-10 mx-4  flex-1 md:mt-5">
          <div className="shadow-lg mx-4 h-[50px] -mt-[25px] bg-white dark:bg-slate-700 rounded-lg flex p-1 ">

            <div className="w-1/2 bg-blue-500 text-center text-white flex items-center justify-center rounded-sm ">One Way</div>
            <div className="w-1/2 bg-orange-400 text-center text-black flex items-center justify-center
          rounded-sm ">Round Trip</div>
          </div>

          <h1 className="text-xl mb-3 mt-5 font-manrope">Select starting point <BiCurrentLocation size={25} className="inline-block ml-4" /></h1>


          <Select required defaultValues={fromCities} onChange={evt => setFromCities(evt.value)}
            options={options} />
          <h1 className="text-xl mb-3 mt-5 font-manrope">Select Destination <BiCurrentLocation size={25} className="inline-block ml-4" /></h1>
          <Select2 required defaultValues={fromCities} onChange={evt => setToCities(evt.value)}
            options={options} />

          <Dropdown className="w-full border-2 mt-[20px]
            shadow-xl border-blue-500 gap-2  flex p-1 rounded-md my-1  "
            trigger={['click', "mouseover"]}
            overlay={to}
            animation="slide-up"
            onVisibleChange={onVisibleChange}
          >
            <div className="flex items-center">
              <div className="flex-none rounded-lg h-[2.5rem] flex items-center justify-center w-[2.5rem]">
                <CiTimer size={25} />
              </div>
              <div className="flex-1">
                <h4 className="text-lg leading-6 capitalize">Select Travel time</h4>
                <p className="text-sm md:text-lg text-slate-500 font-[500]">{_to + ":00 am" || "00:00 am"}</p>
              </div>

              <div className="flex-none h-full w-[40px]">
                <IoMdArrowDropdown size={40} />
              </div>
            </div>

          </Dropdown>

          <DatePicker
            // inline
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput />
            }
          />




          <div className="hidden h-[50px] md:flex items-center justify-center mt-auto">
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
            // onClick={loadDemoData}
            >
              Find Bus
            </button>

          </div>

          <div className="md:hidden h-[50px]
           flex items-center justify-center mt-5 fixed left-0 bottom-8 w-full">
            <button
              // type="submit"
              data-te-ripple-init
              data-te-ripple-color="light"
              class="inline-block  rounded bg-blue-500 cal-width [--w:400px]  pb-2 pt-2.5 text-lg font-montserrat font-medium uppercase
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
        </form>



      </div>


    </motion.div>
  )
}

export default Booking