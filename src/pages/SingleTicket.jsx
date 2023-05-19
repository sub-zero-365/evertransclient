import { useSearchParams, useParams, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import Alert from '../components/Alert'
import {Loader} from '../components'
import axios from 'axios'

const User = () => {
  const [queryParameters] = useSearchParams()
  const [ticket, setTicket] = useState({})
  const [isAdmin, setAdmin] = useState(false)
  const [isLoading,setIsloading]=useState(true);
const token = localStorage.getItem("token");
  // alert(token)
  useEffect(() => {
    setAdmin(queryParameters.get("admin"));
  }, [window.location.href])
  const id = useParams().id
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    if (!token) {
      setToggle(true)
      setTimeout(() => {
          // navigate("/login")
      }, 4000);
  }
    const url = `${process.env.REACT_APP_LOCAL_URL}/ticket/${id}`
    async function getData() {
      try {
        const res = await axios.get(url,{
          headers: {
            'Authorization': "makingmoney " + token
        }
        }
        
        )
        console.log("user ticket her  ",res.data.ticket)
        setTicket(res.data.ticket)
        if(!res.data.ticket){
          setToggle(true)
        }
        setIsloading(false)
      } catch (err) {
        setIsloading(false)
        setToggle(true)
        alert("erro in thje cde ")
        console.log(err)
      }
    }

    getData()
  }
    , []
  )



  return (
    <div className="min-w-3xl md:px-5 mx-auto h-[calc(100vh-60px)] overflow-auto">
    {isLoading&&<Loader toggle/>}
      <Alert message={"fail to get ticket with\n id "+id+"\n  please contact customer service"} toggle={toggle} setToggle={setToggle} />
     {
     isAdmin?(
      <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <NavLink to={"/dashboard"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
     
     ):(
      <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NavLink to={"/user"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              User
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
     
     )
     }
      <h1 className="text-center font-semibold  font-montserrat text-xl mt-4 md:text-2xl tracking-tighter leading-10 oblique text-blue-900">Ticket Details</h1>
      <h2 className="text-center  text-lg md:text-xl font-medium  "> Tciket id</h2>
      <p className="text-center text-slate-500 mb-4 "> {id}</p>

      <h2 className="text-center  text-lg md:text-xl font-medium  "> Traveler Name</h2>
      <p className="text-center text-slate-500 mb-4 ">{ticket?.fullname || "n/a"}</p>
      <h2 className="text-center  text-lg md:text-xl font-medium  "> From</h2>
      <p className="text-center text-slate-500 mb-4 ">{ticket?.from || "n/a"} </p>

      <h2 className="text-center  text-lg md:text-xl font-medium  "> To</h2>
      <p className="text-center text-slate-500 mb-4 ">{ticket?.to || "n/a"}</p>
      <h2 className="text-center  text-lg md:text-xl font-medium  ">Travel Date </h2>
      <p className="text-center text-slate-500 mb-4 "> {ticket?.traveldate? new Date(ticket?.traveldate).toLocaleDateString():"n/a"}</p>
      <h2 className="text-center  text-lg md:text-xl font-medium  ">travel time </h2>
      <p className="text-center text-slate-500 mb-4 "> {ticket?.traveltime || "n/a"}</p>
      <h2 className="text-center  text-lg md:text-xl font-medium  "> sex of travel user</h2>
      <p className="text-center text-slate-500 mb-4 ">{ticket?.sex || "n/a"} </p>
      <h2 className="text-center  text-lg md:text-xl font-medium  "> is the ticket active</h2>
      <p className="text-center text-slate-500 mb-4 ">{ticket?.active?"yes": "no"} </p>
      <h2 className="text-center  text-lg md:text-xl font-medium  "> price of the ticket</h2>
      <p className="text-center text-slate-500 mb-10 ">{ticket?.price+"frs" || "n/a"} </p>

    </div>
  )
}

export default User