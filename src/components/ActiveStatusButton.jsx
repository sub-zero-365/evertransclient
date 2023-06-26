import {AiOutlineCheck } from 'react-icons/ai';

const ActiveStatusButton = ({className}) => {

    return (
        <span className={`w-6 h-6 text-sm bg-green-400 grid place-items-center rounded-full text-white ${className}`}><AiOutlineCheck /></span>
        )
}
export default ActiveStatusButton