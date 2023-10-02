import { useState, useEffect } from "react"
import { motion } from "framer-motion"
const Write = () => {
    const initialText = " Luctus nisi pharetra mollis aliquet iaculis tempus potenti. Dictumst vestibulum luctus eget sit sag "
    const [text, setText] = useState("")
    useEffect(() => {
        const timer = setInterval(() => {
            let i = text.length + 1
            if (i + 1 > initialText.length) {
                clearInterval(timer)
            }
            else {
                setText(text + initialText[i - 1])

            }
        }, 60);
        return () => clearInterval(timer)
    }, [text])
    return (
        <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 2,

            }}

        >
            <p
                className='text-2xl text-center lg:text-start lg:text-2xl font-medium my-4'
            >

                {text}
            </p>
        </motion.div>
    )
}

export default Write