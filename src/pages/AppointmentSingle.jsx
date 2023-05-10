import { useParams ,NavLink} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios"
import {Loader} from '../components'

const SingleAppointment = () => {
    const { id } = useParams();
    const [application, setApplication] = useState({})
    const token = localStorage.getItem("admin_token");
const [isLoading ,setIsLoading]=useState(true)
    const baseUrl = process.env.REACT_APP_BASE_PROD_URL + "/application"
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${baseUrl}?_id=${id}`, {
                    headers: {
                        'Authorization': "mrjames " + token
                    }
                })
                console.log(response?.data?.applications[0]);
                setApplication(response?.data?.applications[0])
                setIsLoading(false)
            }

            catch (err) {
                console.log(err)
                setIsLoading(false)
                
            }
        }
        fetchData()

    }, [])


    return (
        <div className=" mx-auto- flex ">
           <div className='max-w-2xl w-full'>
           <Loader toggle={isLoading} />
            <nav class="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    <li class="inline-flex items-center">
      <NavLink to={"/dashboard"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
  Appointments
      </NavLink>
    </li>
    <li>
      <div class="flex items-center">
        <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
        <h1 className="text-slate-400  font-medium text-xl ">Appointment</h1>
        
        </a>
      </div>
    </li>
  
  </ol>
</nav>
            <h2 className="text-center  text-xl capitalize mb-2 mt-2  font-monserat font-meduim">information details  </h2>
            <h2 className="text-center  text-2xl uppercase mb-4 mt-2 gradient__text font-monserat font-meduim "> {application?.service_type}</h2>
            <div className="px-4 py-6 bg-slate-100 mx-2 rounded-lg">
                <div className="flex flex-col md:flex-row items-center mb-2">
                    <h2 className="text-lg font-medium w-fit px-4 uppercase ">full Names :</h2>
                    <p className="text-lg text-slate-400 offset">{application?.fullname}</p>
                </div>
                <div className="flex flex-col md:flex-row mb-2 items-center">
                    <h2 className="text-lg font-medium w-fit px-4">Email :</h2>
                    <p className="text-lg text-slate-600 underline offset"><a href="mailto:bateemma14@gmail.com"> {application?.email}</a></p>
                </div>
                <div className="flex mb-2 items-start ">
                    <h2 className="text-lg font-medium w-fit px-4">phone number :</h2>
                    <div className="flex-1">
                        <p className="text-lg text-slate-600 underline offset"><a href="mailto:bateemma14@gmail.com"> {application?.phone}</a></p>
                        <span className="w-[40px] h-[40px] rounded-full  inline-block  overflow-hidden mr-3  my-2"><svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-7 w-7 mx-auto"
  fill="currentColor"
  style={{"color": "#128c7e"}}
 
  viewBox="0 0 24 24">
  <path
    d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
</svg></span>
                        <span className="w-[40px] h-[40px] rounded-full bg-blue-400 inline-block  overflow-hidden  my-2"></span>
                    </div>

                </div>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="flex w-1/2 mb-2 items-center">
                        <h2 className="text-lg font-medium w-fit px-4">Age</h2>
                        <p className="text-lg text-slate-600 underline offset"> {application?.age}</p>
                    </div>
                    <div className="flex w-1/2  items-center">
                        <h2 className="text-lg font-medium w-fit px-4">Sex</h2>
                        <p className="text-lg text-slate-600 underline offset"> {application?.sex}</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="flex w-1/2 mb-2 items-center">
                        <h2 className="text-lg font-medium w-fit px-4">Created at</h2>
                        <p className="text-lg text-slate-600 underline offset"> { (new Date(application?.createdAt)).toLocaleDateString()}</p>
                    </div>
                    {/* <div className="flex w-1/2  items-center">
                        <h2 className="text-lg font-medium w-fit px-4">Updated at</h2>
                        <p className="text-lg text-slate-600 underline offset"> {application?.updatedAt}</p>
                    </div> */}
                </div>
                <div className="flex  flex-col md:flex-row justify-center items-center">
                    <div className="flex w-1/2 mb-2 items-center">
                        <h2 className="text-lg font-medium w-fit px-4">time</h2>
                        <p className="text-lg text-slate-600 underline offset"> {application?.time }</p>
                    </div>
                    <div className="flex w-1/2  items-center">
                        <h2 className="text-lg font-medium w-fit px-4"> Date</h2>
                        <p className="text-lg text-slate-600 underline offset">{(new Date(application?.date)).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className=" pt-[40px] max-w-3xl mx-auto text-center shadow rounded-xl font-manrope  px-4 leading-[1.6] text-lg   relative mt-[40px] w-full pb-[50px] bg-slate-200 " >
                    <span className="absolute top-[-30px] text-white min-h-[40px] bg-blue-300 rounded-lg w-[100px] px-6 left-[50%] flex items-center justify-center shadow -translate-x-[50%] text-lg">message</span>
                    {application?.message ||" the user didnt send any message"}
                </div>
            </div>

           </div>
           <div className='hidden md:block'>
           side bar here
           </div>
        </div>
    )
}
export default SingleAppointment