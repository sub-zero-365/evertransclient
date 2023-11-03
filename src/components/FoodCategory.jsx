import React, { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
// import NextButton from '../components/NextButton'
// import PreviousButton from '../components/PreviousButton'
import {PrevButton as PreviousButton ,NextButton } from "../components"
import { motion } from 'framer-motion'
const FoodCategory = () => {

    const links = useMemo(() => [

        {
            name: "Flower & Pre-Rolls",
            href: "/",
            imgUrl: "https://weed.com/wp-content/uploads/cache/thumbs_150x150/460863_cannabis-foower-pre-rolls.png"
        },
        {
            name: "Gummies & Edibles",
            href: "/",
            imgUrl: "https://weed.com/wp-content/uploads/cache/thumbs_150x150/460862_cannabis-edibles-gummies-beverages.png"
        },
        {
            name: "Vapes & Carts",
            href: "/",
            imgUrl: "https://weed.com/wp-content/uploads/cache/thumbs_150x150/460870_weed-vape-pen-cart.png"
        },
        {
            name: "Dabs & Concentrates",
            href: "/",
            imgUrl: "https://weed.com/wp-content/uploads/cache/thumbs_150x150/460871_weed-wax-dabs.png"
        },
        {
            name: "Oils & Tinctures",
            href: "/",
            imgUrl: "https://weed.com/wp-content/uploads/cache/thumbs_150x150/460869_weed-oil-tincture.png"
        },
        {
            name: "Bongs & Vaporizers etc.",
            href: "/",
            imgUrl: "https://weed.com/wp-content/uploads/cache/thumbs_150x150/460865_cannabis-hardware.png"
        },
        {
            name: "Grinders & Accessories etc.",
            href: "/",
            imgUrl: "https://weed.com/wp-content/uploads/cache/thumbs_150x150/460868_grinder-accessories-weed.png"
        },
        {
            name: "Pet Products",
            href: "/",
            imgUrl: "https://weed.com/wp-content/uploads/cache/thumbs_150x150/460867_cbd-for-pets.png"
        },
        {
            name: "Capsules & Sublinguals",
            href: "product-category",
            imgUrl: "https://weed.com/wp-content/uploads/cache/thumbs_150x150/460866_cbd-capsules.png"
        },
        {
            name: "Skin,Health  & Beauty",
            href: "/",
            imgUrl: "https://weed.com/wp-content/uploads/cache/thumbs_150x150/460864_cannabis-for-skin.png"
        },
    ], [])
    return (
        <div className='py-4 px-4 containet mx-auto lg:px-20 relative'>
            <Swiper
                slidesPerView={3}
                navigation={{
                    prevEl: ".arrow__left",
                    nextEl: ".arrow__right",
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 5,
                    },
                    786: {
                        slidesPerView: 7,
                    },
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true
                }}
                loop={true}
                modules={[Pagination, Autoplay, Navigation]} className="mySwiper">
                <PreviousButton
                    className="!left-1.5 arrow__left !border-none !bg-transparent !text-black !font-black !shadow-none  hover:!text-green-700 transition"
                />
                <NextButton
                    className="!right-1.5 arrow__right !border-none !bg-transparent !text-black !font-black !shadow-none  hover:!text-green-700 transition"
                />
                {
                    links.map(({ imgUrl, name }, index) => <SwiperSlide key={index}>
                        <Link to={`product-category/${name}`} >
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0.5 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                className='flex flex-col items-center justify-between px-1 '>
                                <motion.img
                                    whileHover={{ scale: 1.2 }}
                                    className='w-14 h-14 rounded-full'
                                    src={imgUrl}
                                />
                                <p className='text-sm font-[600] leading-[1rem] whitespace-normal md:text-sm leading-tighter text-center py-3 hover:text-[#4ca84a] transition duration-500'>{name}</p>

                            </motion.div>
                        </Link>
                    </SwiperSlide>)

                }

            </Swiper>
        </div>
    )
}

export default FoodCategory