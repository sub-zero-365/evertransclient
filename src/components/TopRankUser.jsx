import { useCustomerContext } from "../pages/CustomerPage"
import { Link, useSearchParams } from "react-router-dom"
import AnimatedText from "./AnimateText"

const User = ({ total,
  fullname,
  age,
  sex,
  idcardnumber,
  phone }) => {
  const [searchQuery] =
    useSearchParams()

  return (<Link to={`/information?fullname=${fullname}&phone=${phone}&sex=${sex}&email=${idcardnumber}&age=${age}&${searchQuery}&paymenttype=Cash In`}
    className="p-4 flex flex-col gap-y-4 cursor-pointer gold:bg-color_gold/10   mb-4 bg-white dark:bg-slate-800 dark:text-white max-w-2xl mx-auto">
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
    <div className="flex  justify-between items-center">
      <div className="">
        <p>#Total Book tickets </p>
        <h1 className='text-start text-xl capitalize font-bold mb-2'>{total ?? "n/a"}</h1>
      </div>
    </div>


  </Link>)
}


function TopRankUser() {
  const { data, isPreviousData } = useCustomerContext()
  return (
    <>
      {isPreviousData && <div>Please wait refetching data</div>}
      <div className={`py-4 flex-1 overflow-y-auto  scrollto transition-opacity duration-300 ${isPreviousData && "!opacity-70"}`}>
        {data?.rankUsers?.length > 0 ?
          data?.rankUsers?.map(arr => <User
            key={arr.phone}
            {...arr}
          />) : <AnimatedText
            className="!text-4xl"
            text="No Items matches your query "
          />
        }
      </div>
    </>
  )
}

export default TopRankUser