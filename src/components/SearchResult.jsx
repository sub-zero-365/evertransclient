import React from 'react'
import Button from "./UiButton"
import { useSearchContext } from './Navbar'
import ProductCart from './ProductCart'
import { Link } from 'react-router-dom'
// import { data } from '../constants/demoData'

const SearchResultContainer = () => {
    const { products, setToggle, isPreviousData, data } = useSearchContext()
    return (
        <div

            className={`h-[40rem] pb-24 max-h-[calc(100vh-4rem)] scrollto  overflow-y-auto 
        ${isPreviousData && "opacity-60"}
        `}>
            <div
                className='grid  grid-cols-[repeat(auto-fit,minmax(min(11rem,calc(100%-60px)),_1fr))]  lg:grid-cols-[repeat(auto-fit,minmax(min(17rem,calc(100%-30px)),_1fr))] !w-full   !container mx-auto lg:px-6 gap-x-1 lg:gap-x-0'
            >
                {
                    data?.tickets?.slice(0, 10)?.map((product, index) => <ProductCart hidden
                        {
                        ...product
                        }
                        
                        className="rounded-md !w-full"
                        key={index}

                    />)
                }
            </div>

            <Button

                className="
        transiton duration-500 !my-5
        !w-[min(40rem,calc(100%-2.5rem))]
        !rounded-full
        !block 
        hover:!bg-transparent
        !border !border-black
        !bg-black
        !text-white hover:!text-black !py-3.5
        !mx-auto"
            >
                <Link to="shop"
                    className=' w-fit uppercase   !block !mx-auto'
                >
                    go to shop
                </Link>

            </Button>
            <Button
                onClick={() => setToggle(false)}
                className="
        transiton duration-500 !my-5
        !w-[min(25rem,calc(100%-2.5rem))]
        !rounded-full
        !block 
        hover:!bg-transparent
        !border !border-black
        !bg-red-600
        !text-white hover:!text-black !py-3.5
        !mx-auto"
            >
                <p to="shop"
                    className=' w-fit uppercase   !block !mx-auto'
                >
                    close
                </p>

            </Button>
        </div>
    )
}

export default SearchResultContainer