import { Heading } from "../components"
import FoodCategory from "../components/FoodCategory"
import ProductCart from "../components/ProductCart"
// import  {data}  from "../constants/demoData"
import {data} from "../constants/demoData"
const Restaurant = () => {
    return (
        <div className="bg-white">
            <FoodCategory />
            <Heading
                className={"!font-black !leading-loose  !text-center !font-bricolage !py-5 !text-4xl lg:!text-5xl "}
                text={"Restaurant "}

            />
             <div
          className='grid gap-x-4 grid-cols-[repeat(auto-fit,minmax(min(11rem,calc(100%-60px)),_1fr))]  lg:grid-cols-[repeat(auto-fit,minmax(min(17rem,calc(100%-30px)),_1fr))] !w-full   !container mx-auto lg:px-6  lg:gap-x-4'
        >
          {data?.map((item, index) => <ProductCart
            {
            ...item
            }
            className="rounded-md !w-full"
            key={index}

          />)}
        </div>
        </div>
    )
}

export default Restaurant