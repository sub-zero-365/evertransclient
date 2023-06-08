import { useNavigate } from "react-router-dom"
import { Loader, Modal } from "../components"
import { useState, forwardRef, useEffect } from "react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CiTimer } from 'react-icons/ci'
import { BiCurrentLocation } from 'react-icons/bi'
// import 'rc-dropdown/assets/index.css';
import Select from 'react-select'
import Select2 from 'react-select'
import SelectTime from 'react-select'
import React from 'react';
import Alert from '../components/Alert'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { storeCities} from "../actions/userCity"
import axios from 'axios'
const Booking = () => {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false)
  const [time, setTime] = useState('10:00');
  const setCity=(cities)=>dispatch(storeCities(cities))
  
  useEffect(() => {
  
  
  
    const token = localStorage.getItem("token");
    console.log("token :", token == "null")
    window.scrollTo({
      top: 0,
      left: 0,
    })
    if (!token) {
      setToggle(true);
      setTimeout(() => {
        // navigate("/login")
      }, 4000)

    }
    
    async function getCities(){

      const url = process.env.REACT_APP_LOCAL_URL + "/allcities";
      try {
        const res = await axios.get(url,{
        headers:{
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
  useEffect(() => {
  }, [toggle])

  const onChange = (timeValue) => {
    setTime(timeValue.value);
    window.navigator.vibrate([40])
  }


  const [fromCities, setFromCities] = useState("choose starting point")
  const [toCities, setToCities] = useState("choose starting point")
  

  const options=useSelector(state => state.userCity.cities);
  const navigate = useNavigate()
  const gotoBusSits = () => navigate(`/bussits/99388863?from=${fromCities}&to=${toCities}&time=${time}&date=${startDate}`)
  const [demoFetch, setDemoFetch] = useState(false)
  const loadDemoData = (evt) => {
    evt.preventDefault()
    if(fromCities===toCities) return setErr(true)
    setDemoFetch(true)
    setTimeout(() => {
      setDemoFetch(false)
      gotoBusSits()
    }, 10)
  }
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (

    <div style={{ "--w": "200px" }}
      className="w-full border-2 mt-[20px] shadow-xl border-blue-500 gap-2  flex p-1 rounded-md my-1  "


      onClick={onClick} ref={ref}>
      <div className="flex-none rounded-lg h-10 w-10 flex items-center justify-center">
        <CiTimer size={30} />
      </div>
      <div className="flex-1">
        <h4 className="text-lg leading-6 capitalize"> {value}</h4>
        <p className="text-sm md:text-lg text-slate-500 font-[500]">{new Date(value).toDateString()}</p>
      </div>

    </div>


  ));




const [err,setErr]=useState(false)
  return (
    <motion.div

      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}

      className="md:mt-5 pb-20 min-h-screen">
        <Modal toggle={err} toggleModal={()=>setErr(false)} information={"Please both cities must not be thesame ,that is  "+fromCities+" must not be equal to "+toCities}  ></Modal>
      
      <Alert toggle={toggle} message={"please login or signup to get started"}
        setToggle={setToggle} />
      <Loader toggle={demoFetch}></Loader>


      <div className="container mx-auto md:flex ">
        <div className="image flex-1 h-[200px] md:h-[calc(100vh-70px)]
        w-full rounded-b-[3rem] md:rounded-none  overflow-hidden">
          <img src="https://th.bing.com/th/id/OIP.83QkNLDMdg1mZ1rn6bnx-gHaHa?pid=ImgDet&rs=1" className="h-full w-full" alt="bus pic" />
        </div>

        <form onSubmit={loadDemoData} className="-mt-10 mx-4   md:mt-5  md:w-[25rem] md:max-w-[calc(100vw-2.5rem)]">
          <div className="shadow-lg mx-4 h-[3rem] -mt-[25px] bg-white dark:bg-slate-700 rounded-lg flex p-1 ">
            <div className="w-1/2 bg-blue-500 text-center text-white flex items-center justify-center rounded-sm ">One Way</div>
            <div className="w-1/2 bg-orange-400 text-center text-black flex items-center justify-center
          rounded-sm ">Round Trip</div>
          </div>
          <div className="flex justify-center items-center mt-4">
          <DatePicker
            inline
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            Date={new Date()}
            customInput={<ExampleCustomInput />
            }
          /> </div>
          <h1 className="text-lg md:text-xl mb-3 mt-5 font-manrope">Select starting point <BiCurrentLocation size={25} className="inline-block ml-4" /></h1>
          <Select className="dark:bg-slate-900  min-h-8 text-black text-xs md:text-xl" required defaultValues={fromCities} onChange={evt => setFromCities(evt.value)}
            options={options} />
          <h1 className="text-lg md:text-xl mb-3 mt-5 font-manrope">Select Destination <BiCurrentLocation size={25} className="inline-block ml-4" /></h1>
          <Select2 required className="dark:bg-slate-900 text-black text-xs min-h-8 md:text-xl " defaultValues={toCities} onChange={evt => setToCities(evt.value)}
            options={options} />
          <h1 className="text-xl mb-3 mt-5 font-manrope">Select time <CiTimer size={25} className="inline-block ml-4" /></h1>
          <SelectTime required className="dark:bg-slate-900 text-black text-xs min-h-8 md:text-xl mb-6"
          defaultValues={time} onChange={onChange}
            options={[
            {value:"7am",label:"7am"},
            {value:"10am",label:"10am"},
            {value:"12am",label:"12am"},
            {value:"10pm",label:"10pm"},
            ]} />
          
          {/* <div className="w-full border-2 mt-[20px]
            shadow-xl border-blue-500 gap-2   p-1 rounded-md my-1 flex items-center ">
            <div className="flex-none rounded-lg h-[2.5rem] flex items-center justify-center w-[2.5rem]">
              <CiTimer size={25} />
            </div>
            <TimePicker onChange={onChange} className="flex-1" cellHeight={40} pickerDefaultValue={""} value={value} required />
          </div> */}



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
              Find Bus
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
              Find Bus
            </button>

          </div>
        </form>



      </div>


    </motion.div>
  )
}

export default Booking