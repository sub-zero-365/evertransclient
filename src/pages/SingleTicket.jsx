import { useSearchParams, useParams, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import Alert from '../components/Alert'
import { Loader } from '../components'
import axios from 'axios'
import Marquee from 'react-fast-marquee'

import { image1 } from "../Assets/images"
import { motion } from "framer-motion"
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import QRCode from "react-qr-code";

const User = () => {
  const [queryParameters] = useSearchParams()
  const [ticket, setTicket] = useState({})
  const [isAdmin, setAdmin] = useState(false)
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setAdmin(queryParameters.get("admin"));
  }, [window.location.href])
  const id = useParams().id
  const [toggle, setToggle] = useState(false)
  var token = undefined, url = ""
  const isadminuser = queryParameters.get("admin");
  async function getData() {
    if (isadminuser == null) {
      token = localStorage.getItem("token")
      // alert("enter here")
      if (token == null) {
        // alert("login user1")
      }
      url = `${process.env.REACT_APP_LOCAL_URL}/ticket/${id}`
    } else {
      token = localStorage.getItem("admin_token");
      url = `${process.env.REACT_APP_LOCAL_URL}/admin/staticticket/${id}`;
      if (token == null) {
        // alert("login user")
      }

    }
    try {
      // alert(token)
      const res = await axios.get(url, {
        headers: {
          'Authorization': "makingmoney " + token
        }
      }

      )
      setTicket(res.data.ticket)
      if (!res.data.ticket) {
        setToggle(true)
      }
      setIsloading(false)
    } catch (err) {
      setIsloading(false)
      setToggle(true)
      console.log(err)
    }
  }

  useEffect(() => {
    
    getData()
  }
    , []
  )
  const redeemTicket=async()=>{
    token = localStorage.getItem("admin_token")
    const url = `${process.env.REACT_APP_LOCAL_URL}/admin/edit/${id}`;
    try {
      await axios.get(url, {
       headers: {
         'Authorization': "makingmoney " + token
       }
     }
     )
     getData();
     alert("ebry thing good")
   } catch (err) {
     setToggle(true)
     console.log(err)
     alert("fail ")
   }
   setIsloading(false)
   
   }


  return (
    <div className="min-w-3xl md:px-5 mx-auto max-h-[calc(100vh-60px)] pb-64 overflow-y-auto">

      {isLoading && <Loader toggle />}
      <Alert message={"fail to get ticket with\n id " + id + "\n  please contact customer service"} toggle={toggle} setToggle={setToggle} />
      {
        isAdmin ? (
          <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <NavLink to={"/dashboard/tickets"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  DashBoard
                </NavLink>
              </li>
              <li>
                <div class="flex items-center">
                  <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Ticket details</h1>
                  </a>
                </div>
              </li>

            </ol>
          </nav>

        ) : (
          <nav class="flex mb-5 mt-5 px-5 w-full " aria-label="Breadcrumb">
            <ol class="flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center flex-none">
                <NavLink to={"/user"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  User
                </NavLink>
              </li>
              <li className="flex-1">
                <div class="flex items-center flex-1">
                  <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Ticket details</h1>
                  </a>
                </div>
              </li>
              <li className="">
                <div class="flex items-center">
                  <a href={image1} download={"ticket"} class="ml-1 text-xs font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      type="button"
                      a data-te-ripple-init
                      data-te-ripple-color="light"
                      className="inline-block  rounded-none  bg-blue-400 px-6 pb-2 pt-2.5 ml-5 my-4 text-xs font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
ease-in-out hover:bg-primary-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700
active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Download ticket
                    </motion.button>
                  </a>
                </div>
              </li>

            </ol>
          </nav>

        )
      }
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
        <QRCode
          size={400}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`https://ntaribotaken.vercel.app/dashboard/${id}?admin=true`}
          viewBox={`0 0 256 256`}
        />
      </div>

      <Marquee play pauseOnClick pauseOnHover className="capitalize text-red-500 dark:text-red-500 py-6 mb-4 text-xs font-extrabold leading-none  px-5 text-gray-900- md:text-lg lg:text-xl dark:text-white- max-w-5xl">
        this ticket is valid for a period of 1month
      </Marquee>
      <h1 className="text-center font-semibold  font-montserrat text-xl mt-4 md:text-2xl tracking-tighter leading-10 oblique text-blue-900">Ticket Details</h1>
      <h2 className="text-center  text-lg md:text-xl font-medium  "> Ticket id</h2>
      <p className="text-center text-slate-500 mb-4 "> {id}</p>

      <h2 className="text-center  text-lg md:text-xl font-medium  "> Traveler Name</h2>
      <p className="text-center text-slate-500 mb-4 ">{ticket?.fullname || "n/a"}</p>

      <h2 className="text-center  text-lg md:text-xl font-medium  ">Travel Date </h2>
      <p className="text-center text-slate-500 mb-4 "> {ticket?.traveldate ? new Date(ticket?.traveldate).toLocaleDateString() : "n/a"}</p>
      <h2 className="text-center  text-lg md:text-xl font-medium  ">travel time </h2>
      <p className="text-center text-slate-500 mb-4 "> {ticket?.traveltime || "n/a"}</p>
      <div className="grid grid-cols-2">

        <div>
          <h2 className="text-center  text-lg md:text-xl font-medium  "> From</h2>
          <p className="text-center text-slate-500 mb-4 ">{ticket?.from || "n/a"} </p>

        </div>
        <div>
          <h2 className="text-center  text-lg md:text-xl font-medium  "> To</h2>
          <p className="text-center text-slate-500 mb-4 ">{ticket?.to || "n/a"}</p>
        </div>
      </div>
      <div className="grid grid-cols-2">

        <div>

          <h2 className="text-center  text-lg md:text-xl font-medium  "> sex</h2>
          <p className="text-center text-slate-500 mb-4 ">{ticket?.sex || "n/a"} </p>
        </div>
        <div>
          <h2 className="text-center  text-lg md:text-xl font-medium  "> status</h2>
          <p className="text-center text-slate-500 mb-4 grid place-items-center"> {ticket?.active ?
            <span className='w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span>
            :
            <span className='w-6 h-6  bg-red-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineClose /></span>

          }</p>
        </div>
      </div>
      <h2 className="text-center  text-lg md:text-xl font-medium  "> price of the ticket</h2>
      <p className="text-center text-slate-500 mb-10 ">{ticket?.price + "frs" || "n/a"} </p>
{
ticket?.active?
<div
onClick={redeemTicket}
className="w-[min(calc(100vw-2.5rem),300px)]
fixed left-1/2 bottom-0 -translate-x-1/2
flex items-center justify-center pt-1.5
rounded-sm font-medium
pb-2.5
shadow-lg
md:static
md:translate-x-0
mx-auto bg-red-500 font-montserrat mb-10">Remove validatility</div>:<div className="text-slate-500 font-semibold text-center text-montserrat 
capitalize">this ticket isnot valid cause it was redeem on the <br/>   
<div className="text-center leading-8">
<span className="text-lg text-center  text-red-300 font-medium tracking-wide">
{new Date(ticket?.updatedAt).toLocaleDateString()}</span> &nbsp;&nbsp; at&nbsp; &nbsp; 
<span className="text-lg text-center text-green-300  font-medium tracking-wide">
{new Date(ticket?.updatedAt).toLocaleTimeString()}</span> 


</div>
</div>

}

    </div>
    
  )
}

export default User