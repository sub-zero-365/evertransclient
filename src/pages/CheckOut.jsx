import { useNavigate } from 'react-router-dom'
import {AiOutlineArrowRight} from 'react-icons/ai'
const CheckOut = () => {
const navigate=useNavigate()
const gotoInfo =()=>navigate("/information")
    return (
        <section className="min-h-screen">

            <div className="container h-full px-6 md:py-24 ">
                <div
                    className="  g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="hidden lg:block mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image" />
                    </div>

                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <form>
                            <div className="mb-6 flex   text-xs mt-[40px] items-center">
                                <div className="flex-1 mx-1 relative min-h-[40px] 
                                border-2 flex items-center rounded-lg px-4">
                                    <span className="absolute left-[15px] px-2
                                    rounded-sm h-[30px] bg-color_light
                                dark:bg-color_dark top-[-10px]">
                                        From
                                    </span>
                                    <div className="relative uppercase">
                                        buea
                                    </div>

                                </div>
                                <AiOutlineArrowRight size={20} className='text-slate-400 dark:text-white flex-none'/>
                                <div className="flex-1 mx-1 relative min-h-[40px]
                                text-xs border-2 flex items-center rounded-lg px-4">
                                    <span className="absolute left-[10px] px-2 rounded-sm h-[30px] bg-color_light
                                dark:bg-color_dark top-[-10px] ">
                                        To
                                    </span>
                                    <div className="relative uppercase">
                                        Baffousam
                                    </div>

                                </div>


                            </div>
                            <h1 className="text-lg text-center  mx-5 my-2">please  take your time to fill in the information</h1>


                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full 
                rounded 
                border-2
                focus:border-2
                focus:border-blue-400
                valid:border-blue-400
                bg-transparent
                px-3 py-[0.32rem]
                leading-[2.15] 
                outline-none
                transition-all 
                duration-200
                ease-linear
                focus:placeholder:opacity-100
                data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="fullname"
                                    placeholder="Full Names" required />
                                <label
                                    htmlFor="fullname"
                                    // className="
                                    // pointer-events-none 
                                    // absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0]
                                    // truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200
                                    // ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                    className="pointer-events-none 
                absolute left-3
                top-0 mb-0
                max-w-[90%]
                origin-[0_0]
                truncate 
                pt-[0.37rem] 
                leading-[2.15]
                text-neutral-500
                transition-all duration-200  
                ease-out 
                peer-focus:-translate-y-[1.15rem]
                peer-focus:scale-[0.8]
                peer-valid:scale-[0.8]
                peer-valid:text-blue-400
                peer-valid:-translate-y-[1.15rem]
                peer-focus:text-blue-400
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                                >
                                    Full Names
                                </label>
                            </div>
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="number"
                                    className="peer block min-h-[auto] w-full 
                rounded 
                border-2
                focus:border-2
                focus:border-blue-400
                valid:border-blue-400
                bg-transparent
                px-3 py-[0.32rem]
                leading-[2.15] 
                outline-none
                transition-all 
                duration-200
                ease-linear
                focus:placeholder:opacity-100
                data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="phonenumber"
                                    placeholder="Phone number" required />
                                <label
                                    htmlFor="phonenumber"
                                    className="pointer-events-none 
                absolute left-3
                top-0 mb-0
                max-w-[90%]
                origin-[0_0]
                truncate 
                pt-[0.37rem] 
                leading-[2.15]
                text-neutral-500
                transition-all duration-200  
                ease-out 
                peer-focus:-translate-y-[1.15rem]
                peer-focus:scale-[0.8]
                peer-valid:scale-[0.8]
                peer-valid:text-blue-400
                peer-valid:-translate-y-[1.15rem]
                peer-focus:text-blue-400
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                                >
                                    Phone Number
                                </label>
                            </div>

                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full 
                rounded 
                border-2
                focus:border-2
                focus:border-blue-400
                valid:border-blue-400
                bg-transparent
                px-3 py-[0.32rem]
                leading-[2.15] 
                outline-none
                transition-all 
                duration-200
                ease-linear
                focus:placeholder:opacity-100
                data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput3"
                                    placeholder="Email address" required />
                                <label
                                    htmlFor="exampleFormControlInput3"
                                    // className="
                                    // pointer-events-none 
                                    // absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0]
                                    // truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200
                                    // ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                    className="pointer-events-none 
                absolute left-3
                top-0 mb-0
                max-w-[90%]
                origin-[0_0]
                truncate 
                pt-[0.37rem] 
                leading-[2.15]
                text-neutral-500
                transition-all duration-200  
                ease-out 
                peer-focus:-translate-y-[1.15rem]
                peer-focus:scale-[0.8]
                peer-valid:scale-[0.8]
                peer-valid:text-blue-400
                peer-valid:-translate-y-[1.15rem]
                peer-focus:text-blue-400
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                                >Email address
                                </label>
                            </div>
                            <div className="mb-6 flex items-center justify-between select-none ">
                                <div className="mb-[0.125rem] pb-0
                                block min-h-[50px]  border-2 mr-4  relative pl-[1.5rem] flex-1">
                                <span className="absolute left-[15px] px-2
                                    rounded-sm h-[30px] bg-color_light
                                dark:bg-color_dark top-[-15px]">
                                user gender
                                     </span>
                                     <div className="px-2 w-fit mt-4 flex gap-2">
                                     <div className="flex items-center">
                                     
                                    <input
                                    className="pb-0"
                                        type="radio"
                                        value="male"
                                        id="male"
                                        name="gender"
                                        checked
                                    />
                                    <label
                                        className="inline-block  pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="gender">
                                        Male
                                    </label>
                                    </div>
                                    <div className="flex items-center">
                                    
                                    <input
                                        type="radio"
                                        value="female"
                                        id="female"
                                        name="gender"
                                    />
                                    <label
                                        className="inline-block  pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="gender">
                                        female
                                    </label>
                                    </div>
                                    
                                    </div>
                                    
                                </div>

                                <div className="relative w-[80px] flex-none" data-te-input-wrapper-init>
                                    <input
                                        type="number"
                                        className="peer block min-h-[auto] w-full 
                rounded
                border-2
                focus:border-2
                focus:border-blue-400
                valid:border-blue-400
                bg-transparent
                px-3 py-[0.32rem]
                leading-[2.15] 
                outline-none
                transition-all 
                duration-200
                ease-linear
                focus:placeholder:opacity-100
                data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="age"
                                        placeholder="age" required />
                                    <label
                                        htmlFor="age"
                                        className="pointer-events-none 
                absolute left-3
                top-0 mb-0
                max-w-[90%]
                origin-[0_0]
                truncate 
                pt-[0.37rem] 
                leading-[2.15]
                text-neutral-500
                transition-all duration-200  
                ease-out 
                peer-focus:-translate-y-[1.15rem]
                peer-focus:scale-[0.8]
                peer-valid:scale-[0.8]
                peer-valid:text-blue-400
                peer-valid:-translate-y-[1.15rem]
                peer-focus:text-blue-400
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                                    >
                                        Age
                                    </label>
                                </div>
                            </div>
                            {/* <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="password"
                                    className="
                peer block min-h-[auto] border-2 w-full rounded shadow-none
                focus:border-2
                focus:border-blue-400
                valid:border-blue-400
                bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none
                transition-all duration-200 ease-linear
                focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:placeholder:text-neutral-200
                [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput33"
                                    placeholder="Password" required />
                                <label
                                    htmlFor="exampleFormControlInput33"
                                    className="pointer-events-none 
                absolute left-3
                top-0 mb-0
                max-w-[90%]
                origin-[0_0]
                truncate 
                pt-[0.37rem] 
                leading-[2.15]
                text-neutral-500
                transition-all duration-200  
                ease-out 
                peer-focus:-translate-y-[1.15rem]
                peer-focus:scale-[0.8]
                peer-valid:scale-[0.8]
                peer-valid:text-blue-400
                peer-valid:-translate-y-[1.15rem]
                peer-focus:text-blue-400
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"
                                >Password
                                </label>
                            </div> */}

                         

                            <button
                                type="submit"
                                className="inline-block bg-blue-400
              w-full rounded bg-primary px-7
              pb-2.5 pt-3 text-sm font-medium
              uppercase leading-normal
              text-white
              shadow-[0_4px_9px_-4px_#3b71ca]
              transition duration-150
              ease-in-out hover:bg-primary-600
              hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
              focus:bg-primary-600 
              focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
              focus:outline-none focus:ring-0 active:bg-primary-700 
              active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
              dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
              dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
              dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
              dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                onClick={gotoInfo}
                                >
                                Procced Checkout
                            </button>

                            {/* <div
              className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p
                className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                OR
              </p>
            </div> */}
                            {/*   
            <a
              className="mb-3 flex w-full items-center bg-orange-500 justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              // style={{"backgroundColor":"#3b5998"}}
              href="#!"
              role="button"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              Continue with Google
            </a> */}

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckOut