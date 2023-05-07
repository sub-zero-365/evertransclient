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
const Booking = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    })

  }, [])

  const [from, setFrom] = useState(null)
  const [_to, setTo] = useState(null)
  function onSelectTo({ key }) {
    setFrom(key)
  }
  function onSelectFrom({ key }) {
    setTo(key)
  }
  function click({ key }) {
  }
  function onVisibleChange(visible) {
    console.log(visible);
  }
  const [fromCities, setFromCities] = useState("choose starting point")
  const options = [
    { value: "limbe", label: "limbe" },
    { value: "douala", label: "douala" },
    { value: "yaounde", label: "yaounde" },
    { value: "kumba", label: "kumba" },
    { value: "kribi", label: "kribi" },
    { value: "bamenda", label: "bamenda" },
  ]
  const from_ = (
    <Menu onSelect={onSelectTo} onClick={click} className="bg-slate-400 text-orange-400 cal-width py-10
    max-h-screen overflow-auto mx-auto scrollto" style={{ "--w": "400px" }}>

      {
        Array.from({ length: 50 }, (arr, index) => {

          return (
            <MenuItem key={index} className="text-2xl text-center hover:bg-slate-400">{index}</MenuItem>
          )

        })
      }
    </Menu>
  );

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
  const gotoBusSits = () => navigate("/bussits/99388863")
  const [demoFetch, setDemoFetch] = useState(false)
  const loadDemoData = () => {

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
    <div className="md:mt-5 pb-20 min-h-screen">
      <Loader toggle={demoFetch}></Loader>


      <div className="container mx-auto md:flex ">
        <div className="image flex-none h-[200px] md:h-[80vh] 
        w-full rounded-b-[3rem] md:rounded-none md:w-[300px] lg:w-[700px] overflow-hidden">

          <img src="https://th.bing.com/th/id/OIP.83QkNLDMdg1mZ1rn6bnx-gHaHa?pid=ImgDet&rs=1" className="h-full w-full" alt="bus pic" />


        </div>

        <div className="  -mt-10 mx-4  flex-1 md:mt-5">
          <div className="shadow-lg mx-4 h-[50px] -mt-[25px] bg-white dark:bg-slate-700 rounded-lg flex p-1 ">

            <div className="w-1/2 bg-blue-500 text-center text-white flex items-center justify-center rounded-sm ">One Way</div>
            <div className="w-1/2 bg-orange-400 text-center text-black flex items-center justify-center
          rounded-sm ">Round Trip</div>
          </div>
          <h1 className="text-xl mb-3 mt-5 font-manrope">Select starting point <BiCurrentLocation size={25} className="inline-block ml-4" /></h1>  


          <Select defaultValues={fromCities} onChange={setFromCities}
            options={options} />
              <h1 className="text-xl mb-3 mt-5 font-manrope">Select Destination <BiCurrentLocation size={25} className="inline-block ml-4" /></h1>  
          <Select2 defaultValues={fromCities} onChange={setFromCities}
            options={options} />

          {/* <Dropdown className="w-full border-2 mt-[20px] shadow-xl border-blue-500 gap-2  flex p-1
            rounded-md my-1  "
            trigger={['click', "mouseover"]}
            overlay={from_}
            animation="slide-up"
            onVisibleChange={onVisibleChange}
          >
            <div>
              <div className="flex-none rounded-lg h-[50px] w-[50px]  flex items-center justify-center">
                <BiCurrentLocation size={40} />
              </div>
              <div className="flex-1">
                <h4 className="text-lg leading-6 capitalize">from</h4>
                <p className="text-sm md:text-lg text-slate-500 font-[500]">{from || "Buea"}</p>
              </div>

              <div className="flex-none h-full w-[40px]">
                <IoMdArrowDropdown size={40} />
              </div>
            </div>

          </Dropdown> */}
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
                <p className="text-sm md:text-lg text-slate-500 font-[500]">{_to +":00 am"|| "00:00 am"}</p>
              </div>

              <div className="flex-none h-full w-[40px]">
                <IoMdArrowDropdown size={40} />
              </div>
            </div>

          </Dropdown>





          <DatePicker
          
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput />
            
            }
          />




          <div className="hidden h-[50px] md:flex items-center justify-center mt-auto">
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="inline-block  rounded bg-blue-500 cal-width  pb-2 pt-2.5 text-lg font-montserrat font-medium uppercase
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