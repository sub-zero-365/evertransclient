import { useCustomerContext } from "../pages/CustomerPage"
import { Link, useSearchParams } from "react-router-dom"

const User = ({
  fullname,
  age,
  sex,
  idcardnumber,
  phone }) => {
  const [searchQuery] = 
  useSearchParams()

  return (<Link to={`/information?fullname=${fullname}&phone=${phone}&sex=${sex}&email=${idcardnumber}&age=${age}&${searchQuery}`}
    className="p-4 flex flex-col gap-y-4 cursor-pointer  mb-4 bg-rose-50 max-w-2xl mx-auto">
    <div className="flex  justify-between items-center">
      <div className="">
        <p>#customer name</p>
        <h1 className='text-start text-xl capitalize font-bold mb-2'>{fullname ?? "n/a"}</h1>
      </div>
      <div className="">
        <p>#customer phone</p>
        <h1 className='text-start text-xl capitalize font-bold mb-2'>{phone ?? "n/a"}</h1>
      </div>
    </div>
    <div className="flex  justify-between items-center">
      <div className="">
        <p>#customer ID</p>
        <h1 className='text-start text-xl capitalize font-bold mb-2'>{idcardnumber ?? "n/a"}</h1>
      </div>
      <div className="">
        <p>#customer sex</p>
        <h1 className='text-start text-xl capitalize font-bold mb-2'>{sex ?? "n/a"}</h1>
      </div>
      <div className="">
        <p>#customer age</p>
        <h1 className='text-start text-xl capitalize font-bold mb-2'>{age ?? "n/a"}</h1>
      </div>
    </div>

  </Link>)
}


function TopRankUser() {
  const { data } = useCustomerContext()
  console.log("data in toprankuser", data?.rankUsers)
  return (
    <div className="py-4 flex-1 overflow-y-auto ">
      {
        data?.rankUsers?.map(arr => <User key={arr}
          {...arr}
        />)
      }
    </div>
  )
}

export default TopRankUser