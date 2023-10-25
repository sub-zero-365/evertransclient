// import dayjs from "dayjs"
import { useState, useRef } from "react"
import { NavLink, useSearchParams, useNavigate, Link, useLoaderData, Form, useNavigation, redirect } from "react-router-dom"
import AlertBox from '../components/Alert'
import { motion } from 'framer-motion'
import { Heading, Scrollable } from "../components"
import { BiCategory } from 'react-icons/bi'
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "swiper/css/a11y"
import "swiper/css/scrollbar"
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import AnimateText from '../components/AnimateText'
import busimage from '../Assets/images/busimage.jpg'
import { Helmet } from 'react-helmet'
import UiButton from "../components/UiButton"
import { AiOutlineArrowRight } from "react-icons/ai"
import { toast } from 'react-toastify'
import customFetch from "../utils/customFetch"
import { useQuery } from "@tanstack/react-query"
import FilterButton from "../components/FilterButton"
import { BsCashCoin } from "react-icons/bs"
import { MdOutlineWarehouse } from "react-icons/md"

const errorToast = (msg = "Please select a seat and continue !!!") => toast.error(msg)
const successToast = () => toast.success("created successfully!!!")
const priceQuery = (params) => {
  console.log("this is the params oject here", params)
  return {
    queryKey: ["price", params],
    queryFn: async () => {
      const res = await customFetch.get("/routes/get", {
        params: params
      })
      console.log("this is the price in the loader function", res.data, params)
      return res.data
    }

  }
}
export const loader = (queryClient) => async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { from, to } = params;
  console.log("this is from and to ", from, to)
  try {
    if (!from || !to) throw new Error('please provide both source and destination');
    console.log("loader", from, to)
    await queryClient.ensureQueryData(priceQuery({ from, to }))
    return { searchValues: { from, to } }

  } catch (err) {
    const errorMessage = err?.response?.data || err?.message || "something went wrong"
    alert(errorMessage)
    return errorMessage
  }
}

export const action = (queryClient) => async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    await customFetch.post("/ticket",
      params
    )
    await queryClient.invalidateQueries({
      queryKey: ["tickets"],
      exact: true,
    })
    successToast()
    return redirect("/user?rd_from=checkout")

  } catch (err) {
    errorToast(err.response?.data || " something went wrong try again later")
    return null

  }
}

const BusSits = () => {
  const navigation = useNavigation()
  const params = Object.fromEntries([
    ...new URL(window.location.href).searchParams.entries(),
  ])
  const {
    from, to, traveldate: date, sex,
    fullname
    , type
    , seatposition,
    phone

  } = params || {}
  const constraintsRef = useRef(null);

  const [view, setView] = useState(false)
  // const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [queryParameters] = useSearchParams()
  const [message] = useState("")
  let price = null;

  const { searchValues } = useLoaderData()
  const { route } = useQuery(priceQuery(searchValues)).data
  // if ("price" in searchValues) {
  console.log("this is the price data from the server", route)
  if (type == "singletrip") {
    price = route?.singletripprice
  } else {
    price = route?.roundtripprice
  }
  // }


  return (
    <>
      <Helmet>
        <title>
          Check Information
        </title>

      </Helmet>

      <motion.div
        initial={{ x: -10, y: 40 }}
        animate={{ x: 0, y: 0 }}
        className="h-[calc(100vh-50px)]"
      >
        <motion.div
          drag
          dragConstraints={constraintsRef}
          onClick={() => setView(c => !c)}
          animate={{
            scale: [0.7, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }
          }
          className="bottom-1/2
                        -translate-y-1/2 fixed 
                        lg:hidden-
                        flex-none 
                        shadow-2xl button-add  top-auto bg-blue-400 
w-[2.5rem]
h-[2.5rem] 
-rounded-full 
overflow-hidden 
right-0
z-10  "
        >
          <div className="flex h-full w-full items-center -scale-animation justify-center ">
            <BiCategory size={20} color="#fff" className="" />
          </div>
        </motion.div>
        <AlertBox
          duration="30000"
          className={`
     ${error && "!top-1/2 -translate-y-1/2"} group
     `}
          error={error}
          confirmFunc={() => setError(false)}
          // seterror={setError}
          message={message}
          setToggle={setError}

        />


        <div className="lg:flex md:container mx-auto">
          <div className="flex-1 hidden lg:block">
            <img
              src={busimage}
              className="w-full h-[calc(100vh-50px)] object-cover" alt="booking " />

          </div>
          <Form method="post" className="flex-none px-2 w-full pb-24 lg:w-[35rem] lg:px-4
        dark:bg-slate-900 
        mx-auto max-h-[calc(100vh-50px)] overflow-y-auto lg:shadow-lg mt-6 py-6 pt-0"
            ref={constraintsRef}
          >
            <nav className="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <NavLink to={"/booking?" + queryParameters?.toString()} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    Booking
                  </NavLink>
                </li>

                <li className="inline-flex items-center">
                  <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <NavLink to={`/bussits/${queryParameters.get("seat_id")}?` + queryParameters?.toString()} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    BusSeat
                  </NavLink>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                      <h1
                        className="text-slate-400  font-medium text-xl ">Informations</h1>
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
            <AnimateText text="User Information"
              className={"!text-sm md:!text-lg lg:!text-2xl !text-center"} />

            <div method="post" className="border-2 pr-4  bg-white
          dark:bg-slate-800  shadow-xl 
          
          py-5 pt-8 rounded-lg mt-5 relative">

              <span className="absolute left-1/2 py-2 -translate-x-1/2 border px-10 rounded-lg shadow  min-h-[35px]  bg-color_light
                      dark:bg-color_dark top-[-15px] text-montserrat  font-semibold">
                {
                  (type === "singletrip" ? "Single Trip" : "Round Trip")
                }
              </span>
              <div className={`grid ${view ? "grid-cols-1 active " : "grid-cols-2"}
            group justify-center mb-1 items-center `}>
                <Heading text="Fullname"
                  className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                <div className=" line-clamp-2 group-[.active]:!text-center capitalize pl-2 border-b-2"> {fullname}</div>
              </div>
              <div className={`grid ${view ? "grid-cols-1 active " : "grid-cols-2"} group justify-center- mb-1 items-center `}>
                <Heading text="ID number" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center"> {queryParameters.get("email")}</div>
              </div>
              <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                <Heading text="From" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />

                <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{from}</div>
              </div>
              <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                <Heading text="To" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />

                <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center"> {to}</div>
              </div>

              <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                <Heading text="Gender" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />

                <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{sex}</div>
              </div>
              <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                <Heading text="Seat" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />

                <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{(Number(seatposition) + 1)}</div>
              </div>
              <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                <Heading text="Travel Date" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{date}</div>
              </div>
              {/* <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                <Heading text="Payment type" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{paymenttype}</div>
              </div> */}

              <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                <Heading text="Phone Number" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />

                <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{phone}</div>
              </div>
              <div className={`grid ${view ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                <Heading text="Travel Cost" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />

                <div className=" line-clamp-2 capitalize pl-2 border-b-2 group-[.active]:!text-center">{price} frs</div>
              </div>
              <div>
                <h1 className="text-2xl text-center mb-2 font-semibold">Method of Payment</h1>
                <Scrollable className="flex  gap-x-6 !justify-center">
                  <FilterButton
                    // className={}
                    className={"!flex justify-center !items-center"}

                    name="paymenttype"
                    value="Cash In"
                  >
                    <p>Cash In </p>
                    <BsCashCoin style={{ marginLeft: "1rem" }}
                      size={20}
                    />
                  </FilterButton>
                  <FilterButton
                    className={"!flex justify-center gap-x-"}
                    name="paymenttype"
                    value="CM"
                  // label="CM"
                  >
                    <p>Company MoMo </p>
                    <MdOutlineWarehouse style={{ marginLeft: "1rem" }}
                      size={20}
                    />
            
                  </FilterButton>

                </Scrollable>
              </div>

            </div>

            <div className="hidden h-[80px] md:flex items-center justify-center mt-auto">
              <UiButton
                disabled={(navigation.state == "submitting" ? true : false)}
                className="!w-[min(30rem,calc(100%-2.5rem))] !mx-auto !py-3.5 !text-lg !rounded-xl"
              >
                {
                  navigation.state == "submitting" ? "Loading please wait !!" : <> Book Ticket <AiOutlineArrowRight size={20} className="!inline-block -rotate-45 ml-2 " /></>

                }

              </UiButton>


            </div>
            <div className="md:hidden z-10 h-[50px] flex items-center justify-center mt-5 fixed bottom-8 w-full">
              <UiButton
                className="!w-[min(30rem,calc(100%-2.5rem))] !mx-auto !py-3.5 !text-lg !rounded-xl"
                disabled={(navigation.state == "submitting" ? true : false)}

              >
                {
                  navigation.state == "submitting" ? "Loading please wait !!" : <> Book Ticket <AiOutlineArrowRight size={20} className="!inline-block -rotate-45 ml-2 " /></>

                }


              </UiButton>

            </div>
          </Form>
        </div>
        <div className="mb-24 md:hidden" />
      </motion.div>
    </>

  )
}

export default BusSits