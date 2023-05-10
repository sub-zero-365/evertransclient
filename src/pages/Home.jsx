import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Footer, OurServices } from "../components"
import { AiOutlinePlus, AiOutlineArrowUp } from "react-icons/ai"
import { motion } from "framer-motion"


import {image2,image3,image4,image1} from "../Assets/images"
const Home = () => {
    const testimonials = useRef(null)
    const navigate = useNavigate()
    const [up, setUp] = useState(0);


    const site_name = "Afri-Con"
    const gotoBookings = () => navigate("/booking")

    useEffect(() => {
        var counter = 0

        const children = [...testimonials.current.querySelectorAll(".testimonial")]
        window.addEventListener("scroll", function () {
            if (!children) return
            children.forEach((testimonial) => {
                if (testimonial) {
                    const top = testimonial.getBoundingClientRect().top
                    if (top < window.innerHeight * 0.75) {
                        if (!testimonial.classList.contains("active")) {
                            testimonial.classList.add("active")
                        }
                    } else {
                        testimonial.classList.remove("active")

                    }
                }
            })
            const { pageYOffset } = window
            if (pageYOffset >= counter) {
                setUp(1)
            } else if (pageYOffset < counter) {
                setUp(0)
            }
            counter = pageYOffset <= 0 ? 0 : pageYOffset
        })
    }, [])

    return (

        <div className="ol">

            <div className={`fixed w-[40px] h-[40px] bottom-[5rem] bg-white right-[2rem] md:right-[4rem] 
        cursor-pointer scale-navigate
rounded-full z-[200] flex items-center justify-center shadow-2xl dark:text-black  duration-500
transition-all  ${up === 0 ? "active" : "--"}`} onClick={() => window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })}>
                <AiOutlineArrowUp size={30} />
            </div>
            <motion.div
            
            animate={{scale:[0.7,1.2,0.8]}}
            
            transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1}
           
        }
            className="bottom-6 shadow-2xl button-add  top-auto bg-blue-400 
            w-[2.5rem] h-[2.5rem] rounded-full left-1/2 overflow-hidden 
           -translate-x-1/2
            z-10 fixed md:hidden " onClick={gotoBookings}>
                <div className="flex h-full w-full items-center scale-animation justify-center ">
                    <AiOutlinePlus size={30} color="#fff" className="" />
                </div>
            </motion.div>

            <section class="bg-white dark:bg-gray-900">
                <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <motion.h1

                            initial={{ x: -100, opacity: 0, y: 10, scale: 0.8 }}
                            whileInView={{ x: 0, opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            class="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-8 md:text-4xl xl:text-5xl dark:text-white">Stop Findng <br /> and Start Tracking</motion.h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
                        <Link href="#" to={"/booking"} class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Get started
                            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Link> 
                        <Link to={"/about-us"} href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Learn More
                        </Link>
                    </div>
                    <div class="hidden- mt-2 lg:mt-0 lg:col-span-5 lg:flex">
                        <img src="https://www.pngmart.com/files/6/Bus-Transparent-Images-PNG.png" alt="bus" />
                        {/* <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup"/> */}
                    </div>
                </div>
            </section>
            <OurServices />
            <div className="container rounded-lg md:overflow-hidden
            mx-auto shadow-2xl  py-10-
             z-40  mb-[90px]   flex ">
                <div className="flex-none hidden md:block w-[150px]  md:relative ">
                    <div className="absolute top-0 bg-red-500  overflow-hidden
                    left-[-50px] h-screen rotate-[-12deg] w-full">
                    </div>
                </div>
                <div className="flex-1">
                    <motion.h1 initial={{ y: 30, opacity: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}

                        className="text-2xl mt-5 mb-2 uppercase font-[500] text-center md:text-left">Why Choose us</motion.h1>
                    <span className="w-[90px] block rounded-md h-[5px] mx-auto md:mx-0 hover:bg-red-200 transiton-bg-color bg-red-500"></span>
                    <div className="md:flex flex-wrap  mt-10">
                        <div className="md:w-1/2  items-start flex my-4 gap-2 relative">
                                <img src={image1 ||
                                    "https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
                                    alt="excellent" className="h-[60px] w-[60px] sticky top-[60px] rounded-full " />
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Mission</h2>
                                <p className="text-slate-500 text-[14px]">
                                    At  {site_name} our mission is to give people the power to build community and bring the world closer together.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed accusantium suscipit sapiente laudantium iusto quos maiores temporibus minima blanditiis eos, laborum corporis culpa mollitia, expedita neque commodi soluta optio rem natus veniam asperiores enim deleniti explicabo ea. Quam dolor quasi maxime labore nisi, quos nulla fuga molestias
                                    corrupti magnam cupiditate a repellendus ipsum totam error libero harum voluptatem? Corporis, itaque.

                                </p>
                            </div>
                        </div>
                        <div className="md:w-1/2  flex items-start my-4 gap-2">
                        <img src={image2 ||
                                    "https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
                                    alt="excellent" className="h-[60px] w-[60px] sticky top-[60px] rounded-full " />
                            
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Benefits</h2>
                                <p className="text-slate-500 text-[14px]">
                                    We invest in training and development in a big way, so you can build your future along with ours, creating an impactful career unique to you.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed accusantium suscipit sapiente laudantium iusto quos maiores temporibus minima blanditiis eos, laborum corporis culpa mollitia, expedita neque commodi soluta optio rem natus veniam asperiores enim deleniti explicabo ea. Quam dolor quasi maxime labore nisi, quos nulla fuga molestias
                                    corrupti magnam cupiditate a repellendus ipsum totam error libero harum voluptatem? Corporis, itaque.

                                </p>
                            </div>
                        </div>
                        <div className="md:w-1/2  flex items-start my-4 gap-2">
                        <img src={image3 ||
                                    "https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
                                    alt="excellent" className="h-[60px] w-[60px] sticky top-[60px] rounded-full " />
                            
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Our Desire</h2>
                                <p className="text-slate-500 text-[14px]">
                                    SAP started in 1972 as a team of five colleagues with a desire to do something new. Together, they changed enterprise software and reinvented how business was done. Today, as a market leader in enterprise application software, we remain true to our roots.
                                    We invest in training and development in a big way, so you can build your future along with ours, creating an impactful career unique to you.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed accusantium suscipit sapiente laudantium iusto quos maiores temporibus minima blanditiis eos, laborum corporis culpa mollitia, expedita neque commodi soluta optio rem natus veniam asperiores enim deleniti explicabo ea. Quam dolor quasi maxime labore nisi, quos nulla fuga molestias
                                    corrupti magnam cupiditate a repellendus ipsum totam error libero harum voluptatem? Corporis, itaque.

                                </p>
                            </div>
                        </div>
                        <div className="md:w-1/2  flex items-start my-4 gap-2">
                        <img src={image4 ||
                                    "https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
                                    alt="excellent" className="h-[60px] w-[60px] sticky top-[60px] rounded-full " />
                            
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Vison</h2>
                                <p className="text-slate-500 text-[14px]">

                                    What has remained constant throughout this history of transformation is our dedication to our customers, to our employees, and to the values on which American Express was built: integrity, quality, respect, and community.

                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12 mb-10">
                <h1 className="text-2xl mt-5 mb-2 uppercase font-[500] text-center md:text-left">View Cities In A Goal</h1>
                <span className="w-[90px] mb-6 block rounded-md h-[5px] mx-auto md:mx-0 hover:bg-red-200 transiton-bg-color bg-red-500"></span>

                <div class="-m-1 flex flex-wrap md:-m-2">
                    <div class="flex md:w-1/2 lg:w-1/3 flex-wrap">
                        <div class="w-full p-1 md:p-2">
                            <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
                        </div>
                    </div>
                    <div class="flex md:w-1/2 lg:w-1/3 flex-wrap">
                        <div class="w-full p-1 md:p-2">
                            <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp" />
                        </div>
                    </div>
                    <div class="flex md:w-1/2 lg:w-1/3 flex-wrap">
                        <div class="w-full p-1 md:p-2">
                            <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp" />
                        </div>
                    </div>
                    <div class="flex md:w-1/2 lg:w-1/3 flex-wrap">
                        <div class="w-full p-1 md:p-2">
                            <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                        </div>
                    </div>
                    <div class="flex md:w-1/2 lg:w-1/3 flex-wrap">
                        <div class="w-full p-1 md:p-2">
                            <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp" />
                        </div>
                    </div>
                    <div class="flex md:w-1/2 lg:w-1/3 flex-wrap">
                        <div class="w-full p-1 md:p-2">
                            <img
                                alt="gallery"
                                class="block h-full w-full rounded-lg object-cover object-center"
                                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp" />
                        </div>
                    </div>
                </div>
            </div>
            {/* testimonails */}

            <section class="text-neutral-700 dark:text-neutral-300 container mx-auto mb-10" ref={testimonials}>
                <div class="mx-auto text-center md:max-w-xl lg:max-w-3xl">
                    <h3 class="mb-6 text-3xl font-bold">Testimonials</h3>
                    <p class="mb-6 pb-2 md:mb-12 md:pb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                        error amet numquam iure provident voluptate esse quasi, veritatis
                        totam voluptas nostrum quisquam eum porro a pariatur veniam.
                    </p>
                </div>

                <div class="grid gap-6 text-center md:grid-cols-3">
                    <div>
                        <div
                            class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                            <div class="h-28 overflow-hidden rounded-t-lg bg-[#9d789b]"></div>
                            <div
                                class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                <img
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" alt="testimonials" />
                            </div>
                            <div class="p-6">
                                <h4 class="mb-4 text-2xl font-semibold">Maria Smantha</h4>
                                <hr />
                                <p class="mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        class="inline-block h-7 w-7 pr-2"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                    </svg>
                                    Lorem ipsum dolor sit amet eos adipisci, consectetur
                                    adipisicing elit.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                            <div class="h-28 overflow-hidden rounded-t-lg bg-[#6d5b98]"></div>
                            <div
                                class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                <img
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" alt="testimonials" />
                            </div>
                            <div class="p-6">
                                <h4 class="mb-4 text-2xl font-semibold">John Smith</h4>
                                <hr />
                                <p class="mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        class="inline-block h-7 w-7 pr-2"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                    </svg>
                                    Delectus impedit saepe officiis ab aliquam repellat rem unde
                                    ducimus.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                            <div class="h-28 overflow-hidden rounded-t-lg bg-[#7a81a8]"></div>
                            <div
                                class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                <img
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp" alt="testimonials" />
                            </div>
                            <div class="p-6">
                                <h4 class="mb-4 text-2xl font-semibold">Lisa Cudrow</h4>
                                <hr />
                                <p class="mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        class="inline-block h-7 w-7 pr-2"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                    </svg>
                                    Neque cupiditate assumenda in maiores repudi mollitia
                                    architecto.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div
                            class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                            <div class="h-28 overflow-hidden rounded-t-lg bg-[#6d5b98]"></div>
                            <div
                                class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                <img
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" alt="testimonials" />
                            </div>
                            <div class="p-6">
                                <h4 class="mb-4 text-2xl font-semibold">John Smith</h4>
                                <hr />
                                <p class="mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        class="inline-block h-7 w-7 pr-2"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                    </svg>
                                    Delectus impedit saepe officiis ab aliquam repellat rem unde
                                    ducimus.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                            <div class="h-28 overflow-hidden rounded-t-lg bg-[#9d789b]"></div>
                            <div
                                class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                <img
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" alt="testimonials" />
                            </div>
                            <div class="p-6">
                                <h4 class="mb-4 text-2xl font-semibold">Maria Smantha</h4>
                                <hr />
                                <p class="mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        class="inline-block h-7 w-7 pr-2"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                    </svg>
                                    Lorem ipsum dolor sit amet eos adipisci, consectetur
                                    adipisicing elit.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            class="block rounded-lg testimonial bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                            <div class="h-28 overflow-hidden rounded-t-lg bg-[#6d5b98]"></div>
                            <div
                                class="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                <img
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" alt="testimonials" />
                            </div>
                            <div class="p-6">
                                <h4 class="mb-4 text-2xl font-semibold">John Smith</h4>
                                <hr />
                                <p class="mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        class="inline-block h-7 w-7 pr-2"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                                    </svg>
                                    Delectus impedit saepe officiis ab aliquam repellat rem unde
                                    ducimus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </div>
    )
}

export default Home