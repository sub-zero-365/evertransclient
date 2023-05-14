import { useSelector } from 'react-redux'
import { useravatar } from '../Assets/images';
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState,useEffect} from 'react';
import "swiper/css"
import { motion } from 'framer-motion'
import axios from 'axios'
const UserBoard = () => {
    const token = localStorage.token

    useEffect(() => {
        if (!token) return

        async function getData() {
            const url = process.env.REACT_APP_LOCAL_URL + "/ticket";

            try {
                const res = await axios.get(url, {
                    headers: {
                        'Authorization': "makingmoney " + token
                    }
                })
                console.log(res)
                // const { data: { fullname, } } = res
setTickets(res?.data?.tickets);
            } catch (err) {
                console.log(err)
            }

        }
        getData()

    }, [])

    const [activeSlide, setctiveSlide] = useState(0);
    const [tickets, setTickets] = useState([])
    const isUserName = useSelector(state => state.username.username);
    // const isToken=localStorage.token;
    return (
        <div className="max-w-5xl mx-auto min-h-screen">
            <div className="flex  justify-between px-4 my-2 py-2">
                <div className="leading-2">
                    <h2 className="text-lg leading-5">welcome back</h2>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">{isUserName}</h1>
                </div>
                <img src={useravatar} alt="user" className='shadow w-[2.5rem] h-[2.5rem] rounded-full border' />
            </div>
            <Swiper className='my-6 px-4'
                slidesPerView={1.2}
                onSlideChange={(e) => console.log(setctiveSlide(e.activeIndex))}
            >

                {Array.from({ length: 10 }, (arr, index) => (<SwiperSlide >
                    <motion.div className={`min-h-[200px] mx-2 ${activeSlide == index ? "bg-orange-500" : "bg-orange-200"}  rounded-lg `}
                        animate={{
                            y: activeSlide == index ? [40, 0] : null,
                        }}
                    >

                        <p className='text-center pt-4'>12/23/2021</p>


                    </motion.div>
                </SwiperSlide>))}

            </Swiper>


            <h2 className='text-xl px-2  '>recent travels</h2>
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

                            tickets.map(({ from, to, price,traveldate }, index) => (<motion.tr

                                whileInView={{ y: 0 }}
                                initial={{ y: 10 }}

                                key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"

                            >
                                <td className="px-2 py-4 border flex items-center justify-center">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {from}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {to}
                                </th>
                                <td className="px-6 py-4">
                                    <a href={`https://wa.me/237672301714`} className="font-medium cursor:pointer text-blue-500 dark:text-blue-500 hover:underline">{price} frs</a>

                                </td>
                                <td className="px-6 py-4">
                                    <a href={`mailto:bateemma14@gmail.com`} className="font-medium cursor:pointer text-blue-500 dark:text-blue-500 hover:underline">11:00am</a>


                                </td>
                                <td className="px-6 py-4">
                                   {traveldate}
                                </td>
                                <motion.td
                                    whileInView={{ scale: 1, x: 0 }}
                                    initial={{ scale: 0.5, x: -30 }}
                                    className="px-6 py-4" onClick={() => 0}>
                                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</a>
                                </motion.td>
                            </motion.tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>



        </div>

    )
}

export default UserBoard