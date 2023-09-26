

import { useNavigate, useSearchParams, Form, useNavigation, redirect, useLoaderData, useActionData } from "react-router-dom"
import UiButton from "../components/UiButton";
import { toast } from "react-toastify"
import customFetch from "../utils/customFetch";
import { useState, useEffect } from "react"
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  return (params?.message || null)
}
export const action = (queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    queryClient.invalidateQueries();

    toast.success('Login successful');
    return redirect("/user", { replace: true })
  } catch (error) {
    console.log("logging error", error?.response?.data)
    toast.error(error?.response?.data);
    return error?.response?.data;
  }
}

const Login = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state == "submitting"
  const errorMessageFromLoader = useLoaderData()
  var errorMessageFromAction = useActionData()
  const [err, setError] = useState(null)
  useEffect(() => {
    if (errorMessageFromAction) {
      setError(errorMessageFromAction)
      const timer = setTimeout(() => {
        setError(null)
        clearTimeout(timer)
      }, 3000)
    }
  }, [errorMessageFromAction, err])
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
            <Form method="post">
              {errorMessageFromLoader && <p
                className="text-rose-600 text-center "
              >{errorMessageFromLoader}</p>}
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

              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  name="password"
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

              {err && <p

                className="text-rose-600 "
              >{err}</p>}

              <UiButton
                disabled={isSubmitting}
                className="!w-[min(30rem,calc(100%-2.5rem))] !mx-auto !py-3.5 !text-lg !rounded-sm"

                type="submit"
              >
                {isSubmitting ? "please wait " : "Login"}

              </UiButton>



            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login