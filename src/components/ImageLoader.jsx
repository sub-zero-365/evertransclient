import React, { useState, } from 'react'
import { motion } from "framer-motion"
import AnimatedText from './AnimateText'
const ImageLoader = ({ imgUrl }) => {
    const [loading, setLoading] = useState(true)
    return (

        <div className="relative h-[15rem]">

            {
                loading && <div
                    className="absolute top-1/2 -translate-y-1/2 inset-0 bg-slate-500/25"
                >
                    <AnimatedText
                        text="loading image please wait.."
                        className="!text-3xl"
                    />
                </div>

            }

            <a
                href={imgUrl}
                target="_blank" s
                className="cursor-pointer  border "
            >

                <motion.img
                    loading="lazy"
                    onLoad={() => setLoading(false)}
                    whileHover={{
                        scale: 0.9, transition: {
                            duration: 0.4
                        }
                    }}
                    className="max-w-sm mx-auto h-[15rem] object-cover w-full"
                    src={imgUrl}
                    alt="product image"

                />

            </a>

        </div>


    )
}

export default ImageLoader