import { useNavigate } from 'react-router-dom'
import {AiOutlineArrowRight} from 'react-icons/ai'

import { useEffect } from 'react'
const CheckOut = () => {
const navigate=useNavigate()
const gotoInfo =()=>navigate("/information");
useEffect(()=>{
    window.scrollTo({
        top: 0,
        left: 0,
    })

},[])
    return (
      <></>
    )
}

export default CheckOut