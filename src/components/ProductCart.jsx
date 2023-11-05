import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { EffectCreative, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./productcart.css"
import Button from './UiButton';
import useItem from '../utils/checkInCart.js';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartItems'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
const variants = {
    show: {
        y: 0, opacity: 1,

    }, hidden: {
        y: 100, opacity: 0.3
    }
}

const ProductCart = (props) => {

    const { _id: id = 1,

        className,
        price,
        product_desc: decription,
        product_imgUrl,
        productname: product_name, hidden } = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const item = {
        ...props
    }
    const [activeSlide, setActiveSlide] = useState(0)
    const [swiperRef, setSwiperRef] = useState(null);
    const slideTo = (index) => {
        swiperRef.slideTo(index);
    };


    const { incart } = useItem(id)
    return (
        <motion.div
            onClick={() => navigate("/product/" + id)}
            className={`productcart py-2 relative group flex-none w-full max-w-sm ${className}`}
            variants={variants}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="show"

        >
            <div className='absolute left-0 top-0 z-10'>
                <Button
                    name="10% off"
                    className="!px-2  !rounded-lg !text-xs !bg-[#652fb7] !uppercase"
                />
            </div>

            <Swiper className="mySwiper"
                onSwiper={setSwiperRef}
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                modules={[EffectCreative, Pagination]}
                pagination={true}
                onSlideChange={(e) => setActiveSlide(e.activeIndex)}
            // className=""
            >
                <SwiperSlide>
                    <img
                        src={product_imgUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"}
                        className='h-[12rem] md:h-[15rem] w-full '
                        alt="hair " />

                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src='https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&rect=10%2C0%2C6699%2C4476&q=45&auto=format&w=926&fit=clip'
                        className='h-[12rem] md:h-[15rem] w-full '
                        alt="hair " />

                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={'https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&rect=10%2C0%2C6699%2C4476&q=45&auto=format&w=926&fit=clip'}
                        className='h-[12rem] md:h-[15rem] w-full '
                        alt="hair " />

                </SwiperSlide>
            </Swiper>
            <div className='flex items-center justify-center py-1 mb-1 gap-x-1'
                onClick={e => e.stopPropagation()}
            >
                {
                    Array.from({ length: 3 }, (_, index) => <div
                        onClick={() => slideTo(index)}
                        className={`border-[#e0e0e0] cursor-pointer border w-7 h-7 ${activeSlide == index ? "scale-150" : ""} `}><img
                            src='https://images.theconversation.com/files/368263/original/file-20201109-22-lqiq5c.jpg?ixlib=rb-1.1.0&rect=10%2C0%2C6699%2C4476&q=45&auto=format&w=926&fit=clip' /> </div>)
                }
            </div>
            <div>
                <p className='text-gray-400 text-sm font-medium uppercase'>{product_name}</p>
                <p className=' text-sm font-bold uppercase line-clamp-2 text-slate-900'>
                    {decription}
                </p>
                <h1
                    className='text-black leading-8 font-bold '
                >FCFA {price}</h1>
            </div>
            {
                !hidden && <div
                    className='mt-5'
                >
                    {
                        incart ? <Button
                            name="remove from cart"
                            className="!block cursor-pointer lg:translate-y-10 lg:opacity-0 group-[:hover]:opacity-100  group-[:hover]:translate-y-0 !mx-auto !w-full hover:!bg-rose-900
!rounded-full !bg-rose-800 !text-xs !py-3 !transition-all !duration-[0.5s] md:!text-sm  group-[:hover]:visible lg:invisible

"
                            onClick={e => {
                                e.stopPropagation()
                                console.log(e)
                                dispatch(removeFromCart(id))
                                toast.success("remove from cart  !!!")
                            }}
                        /> : <Button
                            name="add to cart"
                            className="!block lg:translate-y-10 lg:opacity-0 group-[:hover]:opacity-100 y-0 group-[:hover]:translate-y-0 !mx-auto !w-full hover:!bg-blue-400
!rounded-full !bg-black !text-xs !py-3 !transition-all !duration-[0.5s] md:!text-sm  group-[:hover]:visible lg:invisible
"
                            onClick={e => {
                                e.stopPropagation()
                                dispatch(addToCart(item))
                                toast.success("added to cart !!!")

                            }}
                        />
                    }
                </div>
            }
        </motion.div>
    )
}

export default ProductCart