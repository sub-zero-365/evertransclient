import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../components/UiButton';
import { v4 as uuidv4 } from "uuid"
import { BsArrowLeft, BsArrowRight, BsBag, BsCashCoin } from 'react-icons/bs'
import ShoppingCart from '../components/ShoppingCart';
import { data } from '../constants/demoData';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import EmptyCart from '../components/EmptyCart';
import Heading from '../components/Headings';
import { Link, useNavigate } from 'react-router-dom';
import { FreeMode, Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs, EffectCreative } from "swiper/modules";
import ProductCart from '../components/ProductCart';
import { AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { calculateTotal } from '../actions/cartItems';
import FilterButton from '../components/FilterButton';
import { MdOutlineWarehouse } from 'react-icons/md';
import { Scrollable } from '../components';
import { toast } from "react-toastify"

// import Accordians from '../components/Accordians';
import {
    useQuery, useMutation, QueryClient
} from '@tanstack/react-query'
import customFetch from '../utils/customFetch'

const ShoppingBag = () => {
    const navigate = useNavigate()
    const queryClient = new QueryClient();
    const createNewRecieptMutation = useMutation({
        mutationFn: async (data = {}) => {
            const res = await customFetch.post("/reciepts/new",
                { ...data });
            return res.data
        },
        // mutationKey: ["delete"]
    })
    const { cartItem, amount, total } = useSelector(state => state.cartItems)
    const iscartempty = cartItem?.length > 0
    const [swiperRef, setSwiperRef] = useState(null);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(calculateTotal())
    }, [cartItem, amount])
    const nextSlide = () => {
        swiperRef.slideNext();
    };
    const prevSlide = () => {
        swiperRef.slidePrev();
    };
    return (
        <div
            className='bg-white pb-28'
        >


            {/* end of the first modal here */}
            <p
                className='border-b py-4 text-[#53c563] h-[3.4375rem] border-[#f7f8f9] text-center text-xs md:text-sm font-medium tracking-tight'
            >
                WORLDWIDE SHIPPING + EASY RETURNS
            </p>
            <Heading className="font-semibold"
                text={"Cart"}
            />
            {JSON.stringify(cartItem)}
            {
                iscartempty ?
                    <div className='lg:flex  justify-between items-start lg:flex-row max-w-6xl mx-auto  gap-x-4'>
                        <div
                            className='flex-1 space-y-1 w-full lg:max-w-3xl'
                        >
                            <AnimatePresence
                                initial={false}
                            >
                                {
                                    cartItem.map((arr, __) => {
                                        return (
                                            <ShoppingCart
                                                key={arr._id}
                                                {...arr}
                                            />
                                        )
                                    })
                                }
                            </AnimatePresence>
                        </div>
                        <div
                            className='flex-none- sticky  top-[4rem] mt-6 mx-auto lg:m-0 w-[min(25rem,calc(100%))]   flex flex-col justify-center items-center'
                        >

                            <div
                                className=' w-full !font-medium bg-[#f7f7f7] py-2 px-4 border rounded-md'
                            >

                                <div
                                    className='flex justify-between items-center'
                                >
                                    <p className='text-lg font-medium'>Total</p>
                                    <Heading
                                        className={"!text-xl !p-0 !m-0 !font-semibold"}
                                        text={`$${amount}`}
                                    />
                                </div>
                            </div>
                            <Scrollable className="flex !flex-col sm:!flex-row gap-y-4   gap-x-6 !justify-center !my-4">
                                <FilterButton
                                    // className={}
                                    className={"!flex justify-center !items-center"}

                                    name="paymenttype"
                                    value="Cash In"
                                >
                                    <p>Cash In </p>
                                    <BsCashCoin style={{ marginLeft: "1rem" }}
                                        size={20}
                                    />
                                </FilterButton>
                                <FilterButton
                                    className={"!flex justify-center gap-x-"}
                                    name="paymenttype"
                                    value="CM"
                                // label="CM"
                                >
                                    <p>Company MoMo </p>
                                    <MdOutlineWarehouse style={{ marginLeft: "1rem" }}
                                        size={20}
                                    />

                                </FilterButton>

                            </Scrollable>
                            {/* <Link to="/checkout"
                                className='mt-10  !block w-full'
                            > */}
                            <Button
                                onClick={() => createNewRecieptMutation.mutate({ items: cartItem }, {
                                    onSuccess: (data) => {
                                        const { id } = data
                                        toast.success("created successfully");
                                        console.log("this is the succcess data", data)
                                        navigate(`/user/reciept/${id}`)
                                    },
                                    onError: error => {
                                        toast.error((error.response.data ?? "Oops something bad happen try again later !!"))
                                    },
                                    onSettled: () => {
                                        queryClient.invalidateQueries({
                                            queryKey: ["reciepts"]
                                        })
                                    }
                                })}
                                className="!w-full !text-sm !rounded-none !block !bg-[#4ca84a] !py-3.5 "
                                title="Book Reciept"
                                disable={createNewRecieptMutation.isLoading}
                            />
                            {/* </Link> */}


                        </div>
                    </div> : <EmptyCart />
            }
            <section className='py-10 max-w-6xl mx-auto hidden'>
                <div className="flex items-center justify-between px-2">
                    <Heading
                        className="!text-2xl lg:!text-3xl"
                        text={"You may be interested in…"}
                    />
                    <div className="flex items-center justify-center space-x-2">
                        <div className="flex items-center justify-center border p-2 hover:border-green-500 transtition duration-500  rounded-full border-gray-500">
                            <BsArrowLeft
                                onClick={prevSlide}
                                size={25}
                            />
                        </div>
                        <div className="flex items-center  justify-center border p-2 hover:border-green-500 transtition duration-500 rounded-full border-gray-500">
                            <BsArrowRight
                                onClick={nextSlide}
                                size={25}
                            />
                        </div>

                    </div>

                </div>

                <Swiper
                    // loop={true}
                    // spaceBetween={30}

                    // effect='fade'
                    speed={1000}
                    onSwiper={setSwiperRef}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                        786: {
                            slidesPerView: 4,
                        },

                    }}

                    slidesPerView={1.8}

                    pagination={true}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper my-10">
                    {

                        data?.map((arr, index) => <SwiperSlide>
                            {
                                ({ isActive, isPrev }) =>
                                    <ProductCart
                                        className="rounded-md !max-w-[13rem] md:!max-w-[14rem]"
                                        key={index}
                                        {
                                        ...arr
                                        }
                                    />

                            }
                        </SwiperSlide>)
                    }












                </Swiper>



            </section>
            <div className='py-10' />

        </div>
    )
}

export default ShoppingBag