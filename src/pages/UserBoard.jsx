import { useravatar } from '../Assets/images';
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect } from 'react';
import "swiper/css"
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert'
import { storeTicket, setLoading } from "../actions/userticket"
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { BiSupport } from 'react-icons/bi'
import { Footer } from "../components"
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
// import "swiper/css/scrollbar"
// import {useDispatch,useSelector} from 'reduc'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from "../components"
const UserBoard = () => {
    const token = localStorage.token
    const [toggle, setToggle] = useState(false)
    // const[loading,setLoading]=useState(true)
    const navigate = useNavigate()
    // const dispatch=useDispatch();
    const dispatch = useDispatch()


    const userTicket = (load) => {
        return dispatch(storeTicket(load))

    }
    const setLoading_ = (state) => {

        return dispatch(setLoading(state))

    }
    const tickets_ = useSelector(state => state.userTicket.tickets);
    const loading = useSelector(state => state.userTicket.loading);
    useEffect(() => {
        if (!token) {
            setToggle(true)
            setTimeout(() => {
                navigate("/login")
            }, 4000);
        }
        async function getData() {
            const url = process.env.REACT_APP_LOCAL_URL + "/ticket";
            try {
                const res = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                })
                userTicket(res?.data?.tickets)
            } catch (err) {
                console.log(err)
            }
            if(loading){
setLoading_(false)
            }
        }
        getData()

    }, [])

    const [activeSlide, setctiveSlide] = useState(0);
    const isUserName = useSelector(state => state.username.username);
    return (
        <div className="max-w-5xl  mx-auto min-h-screen">
            {
                loading && <Loader dark toggle />
            }
            <Alert toggle={toggle} setToggle={setToggle} message={"please login to continue "} />
            <div className="flex  justify-between px-4 my-2 py-2">
                <div className="leading-2">
                    <h2 className="text-lg leading-5">welcome back</h2>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">{isUserName}</h1>
                </div>
                <img src={useravatar} alt="user" className='shadow w-[2.5rem] h-[2.5rem] rounded-full ' />
            </div>
            <Swiper className='my-6 px-4'
                slidesPerView={1.2}
                onSlideChange={(e) => setctiveSlide(e.activeIndex)}
            >

                {tickets_.length > 0 ? tickets_.map(({ _id }, index) => (<SwiperSlide >
                    <motion.div className={`min-h-[200px] text-xs mx-2 ${activeSlide == index ? "bg-orange-500" : "bg-orange-200"}  rounded-lg `}
                        animate={{
                            y: activeSlide == index ? [40, 0] : null, scale: activeSlide == index ? [1, 1.02, 1] : null,
                        }}
                    >
                        {/* <p className='text-center pt-4 text-3xl'>{index + 1}</p> */}
                        <h5 className="text-xs font-black w-fit px-4 py-1 rounded">id: {_id}</h5>

                    </motion.div>
                </SwiperSlide>))
                    : (

                        <motion.div className={`min-h-[200px]  px-2 pt-4 mx-2 ${activeSlide == 0 ? "bg-orange-100" : "bg-orange-200"}  rounded-lg shadow `}
                            animate={{
                                y: activeSlide == 0 ? [40, 0] : null, scale: activeSlide == 0 ? [1, 1.02, 1] : null,
                            }}
                        >
                        <p>pl</p>
                        
                        </motion.div>
                    )

                }

            </Swiper>


            <h2 className='text-xl px-2  '>recent travels</h2>
            {

                tickets_.length > 0 ?
                    (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full ">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <motion.tr

                                    >
                                        <th scope="col" className="px-2 py-3">
                                            Index
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            from
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            to
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            fees
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Sit pos
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            travel date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>

                                    </motion.tr>
                                </thead>
                                <tbody>

                                    {

                                        tickets_.map(({ from, to, price, traveldate, _id }, index) => (<motion.tr
                                            whileInView={{ y: 0 }}
                                            initial={{ y: 10 }}
                                        >
                                            <td className="px-2 text-xs py-4  flex items-center justify-center">
                                                {index + 1}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {from}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {to}
                                            </th>
                                            <td className="px-6 py-4">
                                                <span href={`https://wa.me/237672301714`} className="font-medium cursor:pointer ">{price}frs</span>

                                            </td>
                                            <td className="px-6 py-4">
                                                <span href={`mailto:bateemma14@gmail.com`} className="font-medium ">11:00am</span>


                                            </td>
                                            <td className="px-6 py-4">
                                                {(new Date(traveldate).toLocaleDateString())}
                                            </td>
                                            <motion.td
                                                whileInView={{ scale: 1, x: 0 }}
                                                initial={{ scale: 0.5, x: -30 }}
                                                className="px-6 py-4" onClick={() => navigate(`${_id}`)}>
                                                <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Details</a>
                                            </motion.td>
                                        </motion.tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="min-h-[300px]">
                            <h1 className="mb-6 text-2xl font-montserrat text-center leading-5 font-medium  dark:text-orange-100 px-4 mt-4">It appears that this users hasnot book a ticket</h1>
                            <div className="">
                                <button
                                    type="button"
                                    a data-te-ripple-init
                                    data-te-ripple-color="light"
                                    className="flex justify-center items-center gap-2 tracking-6 w-[min(calc(100vw-2.5rem),400px)] font-montserrat z-10 relative bg-blue-700 -mb-12 px-6 pb-2 pt-2.5  my-4 mt-0 text-xs font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
ease-in-out hover:bg-primary-600 mx-auto
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700
active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    onClick={() => {
                                        navigate("/booking")
                                    }}
                                >
                                    go booking page
                                </button>
                                <img src="https://media.tenor.com/Y3c23UQQ3MIAAAAC/empty-box.gif" alt="box" className="max-w-full mx-auto" />

                            </div>
                            <h1 className="mb-6 text-xl font-montserrat text-center leading-5 font-medium  dark:text-orange-100 px-4 mt-4">If you think something went wrong contact customer service </h1>
                            <button
                                type="button"
                                a data-te-ripple-init
                                data-te-ripple-color="light"
                                className="flex justify-center items-center gap-2  tracking-6 w-[min(calc(100vw-2.5rem),400px)]  font-montserrat z-10 relative bg-blue-900 mb-2 px-6 pb-2 pt-2.5  my-4 mt-0 text-xs font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
ease-in-out hover:bg-primary-600 mx-auto
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700
active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                onClick={() => {
                                    navigate("/contact-us")
                                }}
                            >
                                <span> Contact-Us</span> <BiSupport size={25} />
                            </button>
                            <button
                                type="button"
                                a data-te-ripple-init
                                data-te-ripple-color="light"
                                className="flex justify-center items-center gap-2 rounded tracking-6 w-[min(calc(100vw-2.5rem),400px)]  font-montserrat z-10 relative bg-green-700  px-6 pb-2 pt-2.5  my-4 mt-0 text-xs font-medium uppercase
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
ease-in-out hover:bg-primary-600 mx-auto
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-primary-700
active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                onClick={() => {
                                    // navigate("/contact-us")
                                }}
                            >
                                whatsapp-us <AiOutlineWhatsApp size={25} className="inline-block" />
                            </button>
                            <Footer />
                        </div>

                    )
            }



        </div>

    )
}

export default UserBoard