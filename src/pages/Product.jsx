import { useLoaderData, useNavigate } from "react-router-dom"
import { data } from '../constants/demoData';
import Heading from "../components/Headings"
import Button from "../components/UiButton"
import { FreeMode, Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useRef } from 'react'
import ReactStars from 'react-rating-stars-component'
import { addToCart, removeFromCart } from '../actions/cartItems'
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
// import Select from 'react-select'

import ProductCart from '../components/ProductCart';
// import ReactStars from "react-rating-stars-component";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ImageSlider from "../components/ImageSlider";
import useItem from "../utils/checkInCart";
import { useDispatch } from "react-redux";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
//this singleproductquery returns the products;

const singleProductQuery = (id) => {
    return {
        queryKey: ['products', id],
        queryFn: async () => {
            const { data } = await customFetch.get(`/products/${id}`);
            return data;
        },
    };
};
export const loader = (queryClient) => async ({ params }) => {
    try {
        // the ensurequerydata trys to get a value query value from the catch if there is no value
        // it refetch the query and get the new data
        // console.log("this is the fetching state of the application", queryClient.isFetching())
        const data = await queryClient.ensureQueryData(singleProductQuery(params.id))
        // i dont know why the intructor of the code didnt return the data here 
        // so the useloader data can take 
        const state = queryClient.getQueryState({ queryKey: ["products", params.id] })
        console.log(data, "this is the last time the data was updated ")
        return params.id
    } catch (err) {
        console.log(err)
        throw err
    }
}

const Product = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // after loading the data from the server 
    // the loader function returns the id if there is no error from the server
    // get the id from the loader function using the hook useloaderdata
    const _id = useLoaderData()
    // getting the id we search using the usequery 
    // since the data is in the cache 
    // the use query take a little time to show the client the data
    const product_ = useQuery(singleProductQuery(_id))

    const { product_name: productname, product_imgUrl,
        // product_price: price, id, total, product_rating } = product_?.data?.product
        product_price: price, id, total, product_rating } = data[1]
    const { incart } = useItem(_id)
    const [product, setProduct] = useState(data[1])
    // console.log("this is product data here", product)
    const [swiperRef, setSwiperRef] = useState(null);
    const nextSlide = () => {
        swiperRef.slideNext();
    };
    const prevSlide = () => {
        swiperRef.slidePrev();
    };

    const incrementCounter = () => {
        const total = product.total + 1
        setProduct(prev => ({ ...prev, total }))
    }
    const decrementCounter = () => {
        const total = product.total - 1
        setProduct(prev => ({ ...prev, total }))
    }
    return (
        <div>

            <div className="container mx-auto lg:grid grid-cols-2 items-start ">

                <div
                    className=" "
                >
                    <ImageSlider />
                </div>
                <div
                    className=""
                >
                    <div className="px-2">
                        <div className=" flex  items-center gap-5">
                            <ReactStars
                                count={5}
                                size={24}
                                activeColor="#ffd700"
                                edit={false}
                                value={product_rating}
                            />
                            <p className="">
                                270 Reviews</p>
                        </div>
                        <Heading
                            className=""
                            text={productname || "Binoid Delta 8 THC Vape Cartridges – Bundle"}
                        />
                        <Heading
                            className="!text-xl !py-1 !font-bold !text-start"
                            text={`$${price * product?.total}`}
                        />
                        <Heading
                            className="!text-xl !text-rose-800 line-through !py-1 !font-bold !text-start"
                            text={product?.cancel_price?.toFixed(2) * product?.total}
                        />
                        {/* start of buttons  */}
                        {
                            incart ? <Button
                                title="remove from cart"
                                className="!block !flex-1  !mx-auto  hover:!bg-blue-400
!rounded-full !bg-rose-700 !text-sm !font-bold uppercase !py-3 !transition-all !duration-[0.5s] md:!text-sm  !w-[min(30rem,calc(100%-2rem))]
"
                                onClick={e => {
                                    e.stopPropagation()
                                    dispatch(removeFromCart(_id))
                                }}
                            /> : <div className="flex items-center space-x-1">
                                <div
                                    className='flex  space-x-2.5  items-center  px-4 py-1.5 rounded-full   '
                                >
                                    <span>

                                        <AiOutlineMinus
                                            onClick={() => decrementCounter()}

                                            size={16}
                                        />
                                    </span>
                                    <span>{product?.total}</span>
                                    <span>
                                        <AiOutlinePlus
                                            onClick={() => incrementCounter()}

                                            size={16}
                                        />
                                    </span>
                                </div>
                                <Button
                                    title="add to cart"
                                    className="!block !flex-1  !mx-auto  hover:!bg-blue-400
!rounded-full !bg-black !text-sm !font-bold uppercase !py-3 !transition-all !duration-[0.5s] md:!text-sm  !w-[min(30rem,calc(100%-2rem))]
"
                                    onClick={e => {
                                        e.stopPropagation()
                                        dispatch(addToCart(product))
                                    }}
                                />

                            </div>

                        }
                        <Button
                            title="View Cart"
                            className="!block !flex-1 !mt-6 !mx-auto  hover:!bg-blue-400
!rounded-full !bg-green-600 !text-sm !font-bold uppercase !py-3 !transition-all !duration-[0.5s] md:!text-sm  !w-[min(30rem,calc(100%-2rem))]
"
                            onClick={e => {
                                e.stopPropagation()
                                navigate("/shopping-bag")
                            }}
                        />
                    </div>

                    {/* product detail container here */}


                    <div className="flex- justify-center max-w-2xl   mx-5 md:mx-auto gap-x-4 pb-4 border-b-2 border-slate-400">
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={3}
                            freeMode={true}
                            watchSlidesProgress={true}
                            scrollbar={{ draggable: true }}

                            modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
                            className="mySwiper mt-4"
                            breakpoints={{
                                640: {
                                    slidesPerView: 3,
                                },
                                786: {
                                    slidesPerView: 3,
                                },
                            }}
                        >
                            {["Product Details"].map((item, index) => (<SwiperSlide
                                key={index}
                                className="group">
                                <h1 style={{
                                    flex: "none"
                                }} className={`font-sm uppercase text-xs md:text-sm pb-2 group-[.swiper-slide-thumb-active]:!scale-125 group-[.swiper-slide-thumb-active]:!font-bold   cursor-pointer text-center  font-manrope ${({ isActive }) => isActive ? "font-medium text-orange-300" : "font-light"} `} onClick={() => {
                                }}>

                                    {item || "no service"}
                                </h1>
                            </SwiperSlide>))}
                        </Swiper>



                    </div>
                    <div />
                    <Swiper
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                        navigation={{
                            prevEl: ".swiper-button-pre",
                            nextEl: ".swiper-button-nxt",
                        }}
                        modules={
                            [Navigation, Pagination, Scrollbar, A11y, Autoplay, FreeMode, Thumbs]
                        }
                        // spaceBetween={10}
                        // navigation={true}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        scrollbar={true}
                        // modules={[FreeMode,  Thumbs]}
                        className="mySwiper2 max-w-6xl"
                        slidesPerView={1}
                    >

                        <SwiperSlide >
                            <div className=" ">

                                <h1 className="text-2xl font-medium font-montserrat text-center mt-2 mb-4 tracking-tighter italic">PRODUCT DETAILS</h1>
                                <h2 className="text-2xl text- pl-4 font-medium font-montserrat mb-4">Brazilian hair</h2>

                                <div className="px-4 tracking-tight leading-6 text-sm md:text-lg">
                                    <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, sint animi ab expedita tempore dolorem maxime cupiditate, consectetur eligendi magni laboriosam? Placeat, ex iste. A itaque molestias odit nostrum iure vel, blanditiis repellat repudiandae! Porro aperiam excepturi ipsum velit temporibus.</p>
                                    <h2 className="text-2xl text- pl-4 font-medium font-montserrat mb-2 mt-2">Information</h2>

                                    <ul className="pl-4 mb-4">
                                        <li className="list-disc ml-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, est?</li>
                                        <li className="list-disc ml-4">Lor consectetur adipisicing elit. Ipsam, est?</li>
                                        <li className="list-disc ml-4">Lorem ipsumit. Ipsam, est?</li>
                                        <li className="list-disc ml-4">Lorem ipsum, dolor sit amet consectst?</li>

                                    </ul>

                                </div>
                            </div>
                        </SwiperSlide>
                       


                    </Swiper>
                </div>
            </div>
            <section className='py-10 max-w-6xl mx-auto'>
                <div className="flex items-center justify-between px-2">
                    <Heading
                        className="!text-2xl"
                        text={"Related Product"}
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
        </div>
    )
}

export default Product