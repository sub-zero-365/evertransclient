import { Footer } from "../components"
const Home = () => {
    return (
        <div className="ol">
            <div className="container mx-auto py-[2rem] pb-[5rem]">
                <div className="md:flex px-4 items-center">
                    <div className=" flex-1">
                        <h1 className="text-2xl uppercase md:text-3xl">stop looking</h1>
                        <h1 className="text-2xl uppercase md:text-3xl text-red-700">start tracking</h1>
                        <p className="text-lg my-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, tenetur. Laborum, iste recusandae officiis vel sit eum dolores repellendus nesciunt non enim ab nam alias, debitis quas qui reiciendis quae voluptatum, mollitia ipsa. Minima error ipsum tempora beatae, asperiores deleniti.</p>
                        <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            class="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
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
            mx-auto shadow-2xl bg-white
            -mb-20 z-40  pb-[90px]   flex ">
                <div className="flex-none hidden md:block w-[150px]  relative overflow-hidden">
                    <div className="absolute top-0 bg-red-500 
                    left-[-50px] h-full rotate-[-12deg] w-full">
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl mt-5 mb-2 uppercase font-[500] text-center md:text-left">Why Choose us</h1>
                    <span className="w-[90px] block rounded-md h-[5px] mx-auto md:mx-0 hover:bg-red-200 transiton-bg-color bg-red-500"></span>
                    <div className="md:flex flex-wrap  mt-10">

                        <div className="md:w-1/2 flex my-4">
                            <div className="flex-none w-[80px]"> icon</div>
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Lorem ipsum  c.</h2>
                                <p className="text-slate-500 text-[14px]">dolor sit amet consectetur adipisicing elit. Rerum, nesciunt.F</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex my-4">
                            <div className="flex-none w-[80px]"> icon</div>
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Lorem ipsum  c.</h2>
                                <p className="text-slate-500 text-[14px]">dolor sit amet consectetur adipisicing elit. Rerum, nesciunt.F</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex my-4">
                            <div className="flex-none w-[80px]"> icon</div>
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Lorem ipsum  c.</h2>
                                <p className="text-slate-500 text-[14px]">dolor sit amet consectetur adipisicing elit. Rerum, nesciunt.F</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex my-4">
                            <div className="flex-none w-[80px]"> icon</div>
                            <div className="flex-1">
                                <h2 className="text-lg mb-2 font-[500] leading-5"
                                >Lorem ipsum  c.</h2>
                                <p className="text-slate-500 text-[14px]">dolor sit amet consectetur adipisicing elit. Rerum, nesciunt.F</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home