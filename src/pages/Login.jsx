

import {
  useSearchParams, Form,
  redirect, useLoaderData, useActionData
} from "react-router-dom"
import LoadingButton from "../components/LoadingButton";
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import customFetch from "../utils/customFetch";
import { Helmet } from 'react-helmet'
import LoadingButtonTimeOut from "../components/LoadingButtonTimeOut";
import { USER_ROLES } from "../utils/roles";
import { useState, forwardRef } from "react";
import { Eye, LockKeyhole } from "lucide-react"
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  return (params?.message || null)
}
const wait = async (ms = 10000) => new Promise((r) => setTimeout(() => { r() }, ms))
export const action = (queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);


  // await wait()
  try {

    var from = data.from
    const res = await customFetch.post('/auth/login', data);
    queryClient.invalidateQueries();
    toast.success('Login successful');
    const role = res.data?.user?.role
    if (role == USER_ROLES.ticketer) from = data.from || "/user"
    else if (role == USER_ROLES.mailer) from = data.from || "/user/mails"
    else if (role == USER_ROLES.admin || role == USER_ROLES.sub_admin) from = data.from || "/dashboard"
    else {
      from = data.from || "/assistant"
    }
    return redirect(from)
  } catch (error) {
    toast.error(error?.response?.data);
    return error?.response?.data || " something went wrong";
  }
}

const Login = () => {
  const Eye_Icon = forwardRef((props, ref) => (
    <Eye {...props} ref={ref} />
  ))
  const Password_Icon = forwardRef((props, ref) => (
    <LockKeyhole {...props} ref={ref} />
  ))
  const EyeIcon = motion(Eye_Icon)
  const PasswordIcon = motion(Password_Icon)
  const [seepassword, setSeePassword] = useState(false)
  const [searchParams] = useSearchParams()
  const from = searchParams.get("from")
  const errorMessageFromLoader = useLoaderData()
  var errorMessageFromAction = useActionData()

  return (<>
    <Helmet>
      <title>Login | {process.env.REACT_APP_APP_NAME}</title>
      <meta name="description" content="Login to eagletranz website,login to eagle website ,login" />
    </Helmet>
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
            <Form method="post"
              replace
            >
              {errorMessageFromLoader && <p
                className="text-rose-600 text-center "
              >{errorMessageFromLoader}</p>}
              <input
                type="hidden"
                name="from"
                value={from}

              />
              <div className="relative mb-6" data-te-input-wrapper-init>

                <input
                  type="tel"
                  name="phone"
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

              <div className="relative mb-6 flex items-stretch" data-te-input-wrapper-init>
                <div className="flex-1">
                  <input
                    name="password"
                    type={!seepassword ? "password" : "text"}
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
                <motion.span
                  // whileHover={{ scale: 1.2 }}
                  className="flex-none flex justify-center cursor-pointer border-[1px_solid_orange] p-1 rounded-sm items-center ml-0.5 bg-slate-400/25"
                  onClick={() => setSeePassword(password => !password)}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {!seepassword ? <EyeIcon
                      initial={{ scale: 0, x: -100 }}
                      animate={{ scale: 1, x: 0 }}
                      exit={{ scale: 10, x: -100 }}
                    /> : <PasswordIcon
                      initial={{ scale: 0, x: -100 }}
                      animate={{ scale: 1, x: 0 }}
                      exit={{ scale: 10, x: -100 }} />}
                  </AnimatePresence>
                </motion.span>

              </div>

              {errorMessageFromAction && <p

                className="text-rose-600 "
              >{errorMessageFromAction}</p>}
              <LoadingButtonTimeOut
                duration={5000}
                className="!w-[min(30rem,calc(100%-0.5rem))] !mx-auto !py-4 !text-lg !rounded-sm"
                type="submit"
                initialText={"please wait login..."}
              >
                Login
              </LoadingButtonTimeOut>
              {/* <LoadingButton
                className="!w-[min(30rem,calc(100%-0.5rem))] !mx-auto !py-4 !text-lg !rounded-sm"
                type="submit"
              // initialText={getbackhere}
              >
                Login
              </LoadingButton> */}




            </Form>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default Login