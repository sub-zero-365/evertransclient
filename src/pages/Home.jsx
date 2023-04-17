import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Footer } from "../components"
import { AiOutlinePlus } from "react-icons/ai"
const Home = () => {
    const testimonials = useRef(null)
    const navigate = useNavigate()
    const gotoBookings = () => navigate("/booking")
    useEffect(() => {
        const children = [...testimonials.current.querySelectorAll(".testimonial")]
        window.addEventListener("scroll", function () {
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
        })
    }, [])

    return (
        <div className="ol">

            <div className="bottom-4 shadow-2xl  top-auto bg-blue-400 
            w-[60px] h-[60px] rounded-full left-[50%] 
           translate-x-[-50%] 
            z-10 fixed md:hidden " onClick={gotoBookings}>
            <div className="flex h-full w-full items-center justify-center ">
                <AiOutlinePlus size={40} color="#fff"className="" />
            </div>
            </div>

            <div className="container mx-auto py-[2rem] pb-[5rem]">
                <div className="md:flex px-4 items-center">
                    <div className=" flex-1">
                        <h1 className="text-2xl uppercase md:text-3xl">stop looking</h1>
                        <h1 className="text-2xl uppercase md:text-3xl text-red-700">start tracking</h1>
                        <p className="text-lg my-10">

                            mollitia ipsa. Minima error ipsum tempora beatae, asperiores deleniti.</p>

                        <div className="shadow-2xl w-full md:w-[300px]  my-5 py-2">
                            <div className="flex">
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="icon">icon</div>
                                    <h1 className="text-lg text-blue-500">Buea</h1>
                                    <p className="text-sm">from</p>
                                </div>
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="icon">icon</div>
                                    <h1 className="text-lg text-blue-500">Baffousam</h1>
                                    <p className="text-sm">To</p>
                                </div>
                            </div>
                            {/* <p className="text-center leading-[2rem]">very fast and reliable to an extend</p> */}

                        </div>

                        <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            class="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
  transition duration-150 ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            onClick={gotoBookings}
                        >
                            Get Started
                        </button>
                    </div>
                    <div className="flex-1">
                        <img src="https://www.pngmart.com/files/6/Bus-Transparent-Images-PNG.png" alt="bus image" />
                    </div>


                </div>

            </div>
            {/* why choose use */}
            <div className="container rounded-lg overflow-hidden
            mx-auto shadow-2xl  py-10
             z-40  mb-[90px]   flex ">
                <div className="flex-none hidden md:block w-[150px]  relative overflow-hidden">
                    <div className="absolute top-0 bg-red-500 
                    left-[-50px] h-screen rotate-[-12deg] w-full">
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl mt-5 mb-2 uppercase font-[500] text-center md:text-left">Why Choose us</h1>
                    <span className="w-[90px] block rounded-md h-[5px] mx-auto md:mx-0 hover:bg-red-200 transiton-bg-color bg-red-500"></span>
                    <div className="md:flex flex-wrap  mt-10">

                        <div className="md:w-1/2 flex my-4 gap-2">
                            <div className="flex-none w-[80px] h-full  flex justify-center"> 
                            <img src="https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                            alt="excellent" className="h-[60px] w-[60px] rounded-full" />
                            
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Lorem ipsum  c.</h2>
                                <p className="text-slate-500 text-[14px]">dolor sit amet consectetur adipisicing elit. Rerum, nesciunt.F</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex my-4 gp-2">
                        <div className="flex-none w-[80px] h-full  flex justify-center"> 
                            <img src="https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                            alt="excellent" className="h-[60px] w-[60px] rounded-full" />
                            
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Lorem ipsum  c.</h2>
                                <p className="text-slate-500 text-[14px]">dolor sit amet consectetur adipisicing elit. Rerum, nesciunt.F</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex my-4 gap-2">
                        <div className="flex-none w-[80px] h-full  flex justify-center"> 
                            <img src="https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                            alt="excellent" className="h-[60px] w-[60px] rounded-full" />
                            
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Lorem ipsum  c.</h2>
                                <p className="text-slate-500 text-[14px]">dolor sit amet consectetur adipisicing elit. Rerum, nesciunt.F</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex my-4 gap-2">
                        <div className="flex-none w-[80px] h-full  flex justify-center"> 
                            <img src="https://th.bing.com/th?id=OIP.JmPqYEw8hQz6yvtJhbfA3wHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                            alt="excellent" className="h-[60px] w-[60px] rounded-full" />
                            
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Lorem ipsum  c.</h2>
                                <p className="text-slate-500 text-[14px]">dolor sit amet consectetur adipisicing elit. Rerum, nesciunt.F</p>
                            </div>
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
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" />
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
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" />
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
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp" />
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
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" />
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
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" />
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
                                    src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" />
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