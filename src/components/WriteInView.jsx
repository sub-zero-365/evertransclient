import { useRef} from 'react'
import Write from "./Write"
import { useInView } from "framer-motion"

const WriteInView = ({message, className }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
   
    return (
        <div
        ref={ref}
        >
            {isInView && <Write
            initial
            message={message}
            ></Write>}
        </div>
    )
}

export default WriteInView
