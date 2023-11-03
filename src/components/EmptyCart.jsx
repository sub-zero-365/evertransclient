import React from 'react'
import { useNavigate } from 'react-router-dom'
import useToggleCartSlider from '../utils/useToggleCartSlider'
import { motion } from "framer-motion"
import Button from './UiButton'
const EmptyCart = () => {
    const navigate = useNavigate()
    const { close } = useToggleCartSlider()
    const variants = {
        "show": {
            opacity: 1
            , y: 0
            ,
            transition: {
                duration: 1
            }
        },
        "hidden": {
            opacity: 0,
            y: 200

        }
    }
    return (
        <motion.div
            animate="show"
            initial="hidden"
            variants={variants}
            className=' w-full  h-full  flex-none'>
            <img
                src='https://media.tenor.com/xzM6oRwPFrMAAAAj/rolling-jackass.gif'
                className='mx-auto block'
            />
            <h1 className='text-lg text-center py-10  '>
                Your Card is empty
            </h1>
            <Button
                className="mx-auto block !w-[min(400px,calc(100%-20px))]  !bg-black !py-3.5 !rounded-full "
                onClick={() => {
                    close()
                    navigate("/shop")
                }}
                title="go to shop"
            />
        </motion.div>
    )
}

export default EmptyCart