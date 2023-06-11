import {AiOutlineClose } from 'react-icons/ai';

const DeaciveStatusButton = ({className}) => {

    return (
        <span className={`w-6 h-6  bg-red-400 grid place-items-center
        text-lg rounded-full text-white ${className}`}><AiOutlineClose /></span>
        )
}
export default DeaciveStatusButton