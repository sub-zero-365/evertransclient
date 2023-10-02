import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Loadingbtn} from "../components";
import { motion } from "framer-motion"
import customFetch from '../utils/customFetch';
const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const url = "/auth/admin/login"
  const [number, setNumber] = useState(null)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false);
  const [qs] = useSearchParams();

  const message = qs.get("message")
  const from =qs.get("from")
  const navigate = useNavigate();
  const handeSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const redirect_path=from ?? "/dashboard"
  await customFetch.post(url,
        { phone: number, password },
       
      )
      navigate(redirect_path, { replace: true })
    } catch (err) {
      console.log(err?.response);
      setError(err?.response.data);
      const timer = setTimeout(() => {
        clearTimeout(timer)
        setError("")
      }, 5000);
    }
    finally {
      setIsLoading(false)

    }

  }

  return (
    <section className="h-screen" >

      <div className="container h-full px-6 md:py-24 ">
        <div
          className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 hidden md:block">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image" />
          </div>

          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            {
              message && <div className="mb-6 flex items-center justify-between  text-lg font-medium md:text-xl text-orange-600">
                <motion.h1
                  animate={{
                    opacity: message ? 1 : 0,
                    x: message ? [-100, 100, 0, -100, 100, 0] : null

                  }}
                  transition={{ duration: 0.3 }}
                  className="w-fit flex-none mx-auto tracking-[0.4rem] text-center "> {message}</motion.h1>
              
              </div>

            }
            <h1 className="text-2xl  text-center  mb-10 uppercase">Login as Admin</h1>
            <form onSubmit={handeSubmit}>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input onChange={e => setNumber(e.target.value)}
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
                  id="exampleFormControlInput3"
                  value={number}
                  placeholder="Email address" required />
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

                >


                  Phone Number
                </label>
              </div>

              <div className="relative mb-4" data-te-input-wrapper-init>
                <input
                  type="password" onChange={e => setPassword(e.target.value)} value={password}
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

              {/* <span className={`text-red-400 text-lg pl-4 ${error ? "block" : "hidden"}`}>{error}</span> */}
              <div className="mb-6 flex items-center justify-between  text-lg font-medium md:text-xl text-orange-600">
                <motion.h1
                  animate={{
                    opacity: error ? 1 : 0,
                    x: error ? [-100, 100, 0, -100, 100, 0] : null

                  }}
                  transition={{ duration: 0.3 }}
                  className="w-fit flex-none mx-auto tracking-[0.4rem] text-center ">  {error}</motion.h1>
              </div>
              <button
                type="submit"
                className={`inline-block bg-blue-400 task-btn relative 
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
              dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
                data-te-ripple-init
                data-te-ripple-color="light"
                disable={isLoading}
              >
                {isLoading ? <Loadingbtn /> : "Sign In"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminLogin