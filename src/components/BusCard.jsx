import footerbg from '../Assets/images/fooote-bg.jpg'
import { Heading } from "../components"
import { AnimatePresence, motion } from "framer-motion"
import { TbArmchairOff, TbArmchair2 } from 'react-icons/tb'
import dayjs from "dayjs"
import { toast } from "react-toastify"
import { useState } from 'react'
import { Form, useOutletContext } from 'react-router-dom'
import LoadingButton from '../components/LoadingButton'

const BusCard = ({ seat_positions, traveldate, traveltime, number_of_seats, bus, _id, from, to }) => {
    const currentDate = dayjs()
    const future = dayjs(traveldate)
    const timeLeft = dayjs(currentDate.diff(future)).format("YYYY-MM-DD")
    // const timeLeft = dayjs(future.diff(currentDate)).format("HH:mm:ss")
    const errorToast = (msg = "bus seat is already taken") => toast.warning(msg)
    const [selected, setSelected] = useState(null)
    const { id } = useOutletContext()
    const checkBusAvailabity = (isTaken, isReserved, id, flag = null) => {
        if (0 == id && isTaken == false && isReserved == false) {
            setSelected(0)
            return
        }
        if (isTaken == true || isReserved == true) {
            errorToast()
            return
        } else {
            setSelected(id)

            return
        }
    }
    return (
        <div className="bg-white overflow-hidden group swiper-slide-active w-full  min-[100px] mx-auto mb-5 py-5 px-4">
            <Form method='post'>
                <input
                    type='hidden'
                    name='id'
                    value={id}
                />
                <input
                    type='hidden'
                    name='traveldate'
                    value={traveldate}
                />
                <input
                    type='hidden'
                    name='traveltime'
                    value={traveltime}
                />
                <input
                    type='hidden'
                    name='seatposition'
                    value={selected}
                />
                <input
                    type='hidden'
                    name='seat_id'
                    value={_id}
                />
                <input
                    type='hidden'
                    name='from'
                    value={from}
                />
                <input
                    type='hidden'
                    name='to'
                    value={to}
                />

                <div className="py-5">
                    <div
                        className="flex items-end justify-center gap-x-4"
                    >
                        <Heading
                            className="!m-0 !p-0 !pb-0"
                            text="Name"
                        />
                        <p>Rose Mary</p>
                    </div>
                    {/* <div
                        className="flex items-end justify-center gap-x-4"
                    >
                        <Heading
                            className="!m-0 !p-0 !pb-0"
                            text="Name"
                        />
                        <p>{dayjs(traveldate).format("YYYY-MM-DD")}</p>
                    </div> */}
                    <div
                        className="flex items-end justify-center gap-x-4"
                    >
                        <Heading
                            className="!m-0 !p-0 !pb-0"
                            text="time left"
                        />
                        <p>{
                            timeLeft}</p>
                    </div>
                    <div
                        className="flex items-end justify-center gap-x-4"
                    >
                        <Heading
                            className="!m-0 !p-0 !pb-0"
                            text="Traveltime"
                        />
                        <p>{traveltime}</p>
                    </div>

                    <div
                        className="flex items-end justify-center gap-x-4"
                    >
                        <Heading
                            className="!m-0 !p-0 !pb-0"
                            text="Name"
                        />
                        <p>Rose Mary</p>
                    </div>
                </div>
                <motion.div className="flex flex-wrap translate-y-6 opacity-40 transition-transform duration-700 group-[.swiper-slide-active]:!opacity-100 group-[.swiper-slide-active]:!translate-y-0">
                    {
                        seat_positions?.map(({ isTaken, isReserved, _id }, i) => {
                            return (
                                <div className="w-1/5 h-[3.75rem] p-2 px-3 select-none"
                                    key={_id}
                                    onClick={() => checkBusAvailabity(isTaken, isReserved, _id)}>
                                    <motion.div
                                        initial={false}
                                        animate={{ scale: selected == _id ? [0.8, 1, 0.9] : null }}
                                        transition={{
                                            duration: 1,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                        }
                                        }
                                        className={`${(isTaken) ? "bg-orange-400" : isReserved ? "!bg-blue-500" : "bg-green-400"} peer
                ${selected == _id ? "border-2 border-black dark:border-white" : ""} w-full h-full  relative
                rounded-lg flex items-center justify-center`}>
                                        <motion.div
                                            initial={false}
                                            animate={{ y: selected == _id ? "1.3rem" : 0 }}
                                            className={`absolute top-[-10px] bg-color_light text-[12px] dark:bg-color_dark shadow-lg
                px-2 rounded-sm `}>{_id + 1}</motion.div>
                                        {isTaken ? (<div><TbArmchairOff size={30} /></div>) : <div><TbArmchair2 size={30} /></div>}
                                    </motion.div>
                                </div>
                            )
                        })
                    }
                </motion.div>

                <AnimatePresence
                    initial={false}

                >
                    {
                        selected && <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{
                                y: 0, opacity: 1
                            }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{
                                mass: 40, stiffness: "spring",
                                duration: 0.4
                            }}

                        >
                            <LoadingButton
                                className="!w-[min(30rem,calc(100%-1.5rem))] !mx-auto !py-3.5  !mt-5 !text-lg !rounded-xl"
                            >
                                <>Validate Update Ticket </>
                            </LoadingButton>
                        </motion.div>
                    }

                </AnimatePresence>

            </Form>
        </div>
    )

}

export default BusCard