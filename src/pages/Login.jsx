import { useRef,useState } from "react"
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {setUserName} from "../actions/userName"
import {useNavigate} from "react-router-dom"
import { Loadingbtn } from "../components";
import {motion} from "framer-motion"
const Login = () => {
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState("")

const navigate=useNavigate();
  const password = useRef(null)
  const phone = useRef(null)
  const dispatch = useDispatch();
  const setuserName = (username) => {
  
dispatch(setUserName(username))

  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    

    const url = process.env.REACT_APP_LOCAL_URL + "/auth/login"
    try {
      const res = await axios.post(
        url, {
        password: password.current.value,
        phone: phone.current.value,
      }
      )
      const { data: { fullname, token } } = res
      console.log(fullname, token);
      setuserName(fullname)
      localStorage.removeItem("token");
      // localStorage.token=token
      localStorage.setItem("token",res.data.token)
      navigate("/user")

    } catch (err) {
      console.log(err)
setIsLoading(false)
setError("loading fail");
const timer=setTimeout(() => {
clearTimeout(timer)
  setError("")
}, 5000);
      

    }

  }


  
  return (
<section className="h-screen">
  <div className="container h-full px-6 py-24">
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="w-full"
          alt="Phone image" />
      </div>

      <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input ref={phone}
              type="tel"
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
              placeholder="Phone Number" required />
            <label
              htmlFor="exampleFormControlInput3"
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
              
              >Phone Number
            </label>
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <input ref={password}
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
          </div>

          <div className="mb-6 flex items-center justify-between  text-lg font-medium md:text-xl text-orange-600">
         <motion.h1 
         animate={{
         opacity:error?1:0,
        //  y:error?0:-40,
         x:error?[-100,100,0,-100,100,0]:null
         
         }}
         transition={{duration:0.3}}
         
         
         className="text-center w-fit flex-none mx-auto tracking-[0.4rem] text-center ">  {error}</motion.h1>
          </div>

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
            data-te-ripple-color="light">
                       {isLoading?<Loadingbtn/>:"Sign In"}

          </button>

          <div
            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
            dont have an account continue 
            </p>
          </div>

          <a onClick={()=>navigate("/register")}
            className="mb-3 flex w-full items-center bg-orange-300 justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            href="#!"
            role="button"
            data-te-ripple-init
            data-te-ripple-color="light">
         
         Create an account
          </a>
    
        </form>
      </div>
    </div>
  </div>
</section>
  )
}

export default Login