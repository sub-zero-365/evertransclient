import {BsChevronRight} from 'react-icons/bs'
const NextButton = ({className}) => {
  return (
    <div className={`arrows arrow__right ${className} `}> <BsChevronRight size={20}/></div>
  )
}

export default NextButton