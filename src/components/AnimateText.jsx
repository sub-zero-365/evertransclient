import React from 'react'
import { motion } from "framer-motion"
const qoute = {
    initial: {
        opacity: 1
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren:0.08
        }

    }
}

const singleword = {
    initial: {
        y: 50, 
        x:-10,
        opacity: 0
    },
    animate: {
        y: 0, opacity: 1,x:0
        , transition: {
            duration: 1
        }
    }
}
const SplitText = ({ text }) => {
    return text?.split(" ").map((word, index) => (
        <motion.span
            
            variants={singleword}
            className='inline-block'
            key={index + word}
        >{word}&nbsp;</motion.span>
    ))
}
const AnimatedText = ({ text, className = "" }) => {
    return (
        <div
            className={` w-full  mx-auto  py-2 flex items-center justify-center text-center 
            overflow-hidden`}
        >
            <motion.h1
                variants={qoute}
                initial="initial"
                animate="animate"
                className={`${className} break-words
            inline-block w-full text-dark font-bold capitalize
            text-8xl`}>
                <SplitText text={text} />
            </motion.h1>


        </div>
    )
}

export default AnimatedText