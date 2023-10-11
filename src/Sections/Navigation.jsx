import React from 'react'
import UiButton from '../components/UiButton'
import { Heading } from '../components'
import { MdOutlineForwardToInbox } from "react-icons/md"
import { BiBusSchool } from "react-icons/bi"
import { NavLink } from 'react-router-dom'
import { motion } from "framer-motion"
const variants = {
    show: {
        opacity: 1,
        y: [100,0],
        transition: {
            duration: 1
        }
    }
    , hidden: {
        opacity: 0,
    }
}
const Navigation = () => {
    return (
        <div className='bg-white '>
            <motion.div
                variants={variants}
                animate="show"
                initial="hidden"
                className='max-w-2xl mx-10 rounded-sm
            -mt-20 z-10 relative
            sm:mx-auto bg-white py-16 px-5 shadow'
            >
                <h1
                    className='text-center leading-10 pb-10  text-3xl font-black font-monserrat'
                >Get Started</h1>
                <UiButton
                    className="!w-[min(30rem,calc(100%-0.5rem))]
                !mx-auto !py-5 !text-lg !rounded-none
                !bg-[#ffae02] !font-black"
                >
                    <NavLink
                        to="booking"
                    >
                        {({ isPending }) => <div className="flex items-center gap-x-4">
                            <BiBusSchool
                                size={25}
                            />
                            {isPending ? "loading please wait " : <p>Book As Bus</p>}
                        </div>}

                    </NavLink>


                </UiButton>
                <UiButton
                    className="!w-[min(30rem,calc(100%-0.5rem))] !mt-10 
                !mx-auto !py-5 !text-lg !rounded-none
                !bg-blue-700 !font-black"
                >
                    <NavLink
                        to="mailing"
                    >
                        {({ isPending }) => <div className="flex items-center gap-x-4">
                            <MdOutlineForwardToInbox
                                size={25}
                            />
                            {isPending ? "loading please wait " : <p>Mail As Service</p>}
                        </div>}
                    </NavLink>
                </UiButton>
            </motion.div>
        </div>
    )
}

export default Navigation