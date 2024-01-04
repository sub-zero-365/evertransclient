// import { RiDeleteBin6Line } from "react-icons/ri"
// import { useMailingContext } from "./Mailing"
import { Heading, Rounded, Scrollable } from "../components"
import { useLocation, useNavigate, Form, redirect, Navigate, useActionData } from "react-router-dom"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import LoadingButton from "../components/LoadingButton"
import AnimatedText from "../components/AnimateText"
import { toast } from "react-toastify"
import { GrCircleInformation } from "react-icons/gr"
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from "react"
import customFetch from "../utils/customFetch"
import UiButton from "../components/UiButton"
import { BsCashCoin } from "react-icons/bs"
import { MdOutlineWarehouse } from "react-icons/md"
import LoadingButtonTimeOut from "../components/LoadingButtonTimeOut"
export const loader = async () => {
    return null
}

export const action =
    (queryClient) =>
        async ({ request }) => {


            try {

                const formData = await request.formData();
                const file = window.history.state?.usr?.file
                if (file) {
                    formData.append("imgUrl", file, file.name)
                }
                localStorage.setItem("mailingdetails", JSON.stringify(window.history.state?.usr || window.history.state))

                if (file && file.size > 500000) {
                    const error = new Error("fail to large ")
                    throw error
                }

                await customFetch.post('/mails/new', formData);
                queryClient.invalidateQueries(['mails']);
                toast.success('Mail Created Successfully');
                localStorage.removeItem("mailingdetails")
                return redirect('/user/mails');
            } catch (error) {
                toast.error(error?.response?.data || error.message);
                return redirect("/mailing");

            }

        };

const MailingPreview = () => {
    const [paymenttype,
        setPaymenttype] =
        useState("Cash In")
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        })
    }, [])
    const navigate = useNavigate()
    const location = useLocation()
    const { from, to,
        senderidcardnumber,
        recieverfullname,
        senderphonenumber,
        file, estimatedprice,
        name,
        senderfullname,
        recieverphonenumber,
        price } = location.state ?? {}
    window.onpopstate = (e) => {
        window.history.replaceState(window.history.state, null)
    }
    const NUMBER_OF_IMAGES = file ? 1 : 0
    const message = useActionData()
    if (message === "successfully") {
        return <Navigate to={"/user"} replace />
    }

    return (
        <Form method="post" className='form' encType='multipart/form-data'
        replace
        >
            {
                location.state && Object.keys(location.state).map((input, index) => {
                    if (input == "images") return null
                    return (
                        <input key={index}
                            type="hidden"
                            readOnly
                            name={input}
                            value={location.state[input]}
                        />)


                }
                )

            }
            <input type="hidden"
                name="paymenttype"
                value={paymenttype}
            />

            <div className="flex items-center px-5 gap-x-4 py-4">
                <Rounded
                    className=""
                    onClick={() => {
                        console.log("preview state", location.state)
                        navigate("/mailing", { state: location.state })
                    }}
                >
                    <AiOutlineArrowLeft
                        size={20}
                    />
                </Rounded>
                <div className='flex items-center mb-5  justify-center'>

                    <Heading
                        text="Sender's Information"
                        className="!text-center !p-0 !m-0 !text-2xl !font-black"
                    />
                    <GrCircleInformation
                        className="ml-2"
                        size={20}
                    />
                </div>
            </div>
            <div className=''>
                <AnimatedText
                    text={`Product Images (${NUMBER_OF_IMAGES})`}
                    className="!text-2xl !text-blue-400"

                />
                <AnimatePresence
                // initial={false}
                >


                    {
                        file && <motion.img
                            transition={{ delay: 0.2 }}
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={false}
                            alt='mails image'
                            src={file ? URL.createObjectURL(file) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAVXZhlM-qA4bg_bOHRutl3wQVQdAbSWx_A&usqp=CAU'}
                        />
                    }



                </AnimatePresence>



                <div className="py-10 px-4 border-black dark:border-gray-600  border-b  border-l">
                    <div className='flex items-center mb-5  justify-center'>

                        <Heading
                            text="Product's Information"
                            className="!text-center !p-0 !m-0 !text-2xl !font-black"
                        />
                        <GrCircleInformation
                            className="ml-2"
                            size={20}
                        />
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} text-xl group justify-center mb-1 items-center `}>
                        <Heading text="Product Name" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2 text-lg  group-[.active]:!text-center">{name}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} text-xl group justify-center mb-1 items-center `}>
                        <Heading text="From" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2 text-lg  group-[.active]:!text-center">{from}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} text-xl group justify-center mb-1 items-center `}>
                        <Heading text="To" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2 text-lg  group-[.active]:!text-center">{to}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} text-xl group justify-center mb-1 items-center `}>
                        <Heading text="Sending Cost " className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2 text-lg  group-[.active]:!text-center">{price}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} text-xl group justify-center mb-1 items-center `}>
                        <Heading text="Estimated Price" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2 text-lg  group-[.active]:!text-center">{estimatedprice}</div>
                    </div>



                </div>
                <div className="py-10 px-4 border-black dark:border-gray-600  border-b  border-r">
                    <div className='flex items-center mb-5  justify-center'>

                        <Heading
                            text="Sender's Information"
                            className="!text-center !p-0 !m-0 !text-2xl !font-black"
                        />
                        <GrCircleInformation
                            className="ml-2"
                            size={20}
                        />
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} text-xl group justify-center mb-1 items-center `}>
                        <Heading text="Full Name" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2 text-lg  group-[.active]:!text-center">{senderfullname}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} text-xl group justify-center mb-1 items-center `}>
                        <Heading text="Phone Number" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2 text-lg  group-[.active]:!text-center">{senderphonenumber}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} text-xl group justify-center mb-1 items-center `}>
                        <Heading text="ID Card Number" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2 text-lg  group-[.active]:!text-center">{senderidcardnumber}</div>
                    </div>



                </div>
                <div className="py-10 px-4 border-black dark:border-gray-600  border-b  mb-4  border-l">
                    <div className='flex items-center mb-5  justify-center'>

                        <Heading
                            text="Reciever's Information"
                            className="!text-center !p-0 !m-0 !text-2xl !font-black"
                        />
                        <GrCircleInformation
                            className="ml-2"
                            size={20}
                        />
                    </div>

                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} text-xl group justify-center mb-1 items-center `}>
                        <Heading text="Full Name" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2 text-lg  group-[.active]:!text-center">{recieverfullname}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} text-xl group justify-center mb-1 items-center `}>
                        <Heading text="Phone Number" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2 text-lg  group-[.active]:!text-center">{recieverphonenumber}</div>
                    </div>



                </div>
            </div>
            <div>
                <h1 className="text-2xl text-center mb-2 font-semibold">Method of Payment</h1>
                <Scrollable className="flex  gap-x-6 !justify-center mb-5">

                    <UiButton

                        onClick={() => setPaymenttype("Cash In")}

                        className={`${paymenttype == "Cash In" && "!bg-green-900"} !flex justify-center !items-center`}

                        // name="paymenttype"
                        type="button"
                        value="Cash In"
                    >
                        <p>Cash In </p>
                        <BsCashCoin style={{ marginLeft: "1rem" }}
                            size={20}
                        />
                    </UiButton>
                    <UiButton
                        onClick={() => setPaymenttype("CM")}
                        className={`${paymenttype == "CM" && "!bg-green-900"} !flex justify-center gap-x-`}
                        type="button"
                        value="CM"
                    >
                        <p>Company MoMo </p>
                        <MdOutlineWarehouse style={{ marginLeft: "1rem" }}
                            size={20}
                        />

                    </UiButton>

                </Scrollable>
            </div>

            <LoadingButtonTimeOut
            duration={5000}
            loading_text="trying to book mail has take longer than expected please wait..."
                className="!w-[min(30rem,calc(100%-0.5rem))] !mx-auto !py-4 !text-lg
                !rounded-none"
            >
                <>CheckOut <AiOutlineArrowRight size={20} className="!inline-block -rotate-45 ml-2 " /></>
            </LoadingButtonTimeOut>
        </Form>
    )
}

export default MailingPreview