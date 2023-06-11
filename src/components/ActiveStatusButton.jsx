import {AiOutlineCheck } from 'react-icons/ai';

const ActiveStatusButton = ({className}) => {

    return (
        <span className={`w-6 h-6  bg-green-400 grid place-items-center text-lg rounded-full text-white ${className}`}><AiOutlineCheck /></span>
        )
}
export default ActiveStatusButton