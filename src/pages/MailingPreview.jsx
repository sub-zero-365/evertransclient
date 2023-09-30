import { RiDeleteBin6Line } from "react-icons/ri"
import { useMailingContext } from "./Mailing"
import { Heading, Rounded } from "../components"
import { useOutletContext, useLocation, useNavigate, Form, redirect, Navigate, useActionData } from "react-router-dom"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import LoadingButton from "../components/LoadingButton"
import AnimatedText from "../components/AnimateText"
import { toast } from "react-toastify"
import { GrCircleInformation } from "react-icons/gr"
import { useEffect } from "react"

export const loader = async () => {


}

export const action = (queryClient) => async ({ }) => {
    toast.success("successfully added product")
    // return redirect("/user")
    // return <Navigate to={"/user"} replace />
    return "successfully"

}

const MailingPreview = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { imgArr, from, to, senderidcardnumber, fullname, senderphonenumber, } = location.state ?? {}
    window.onpopstate = (e) => {
        window.history.pushState({ imgArr, from, to }, null, window.location.href)
    }
    const NUMBER_OF_IMAGES = imgArr?.length
    const message = useActionData()
    if (message === "successfully") {
        return <Navigate to={"/user"} replace />
    }
    return (
        <Form method="post">
            <div className="flex items-center px-5 gap-x-4 py-4">
                <Rounded
                    className=""
                    onClick={() => navigate(-1, { state: { imgArr, from, to } })}
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

                {
                    imgArr?.map((img, index) =>
                        <>
                            <div

                                key={`${img?.name}--${img?.size}`}
                                className='flex px-4 py-4
                                justify-between  
                                flex-col
                                mb-3 items-center 
                                gap-x-2 border rounded-lg bg-slate-50'
                            >
                                <img
                                    className='flex-none w-full max-w-sm '
                                    src={URL.createObjectURL(img)}
                                />
                                <div classNamme="flex-1  overflow-hidden ">
                                    <Heading
                                        className="!text-sm line-clamp-1 !text-start"
                                        text={img?.name
                                        }
                                    />
                                    <Heading
                                        className="!text-sm line-clamp-1 !text-start"
                                        text={`${(img?.size / 1024).toFixed(1)} kb`
                                        }
                                    />
                                </div>
                                <div
                                    className='flex-none'
                                >
                                    {/* <RiDeleteBin6Line
                                        className='cursor-pointer'
                                        onClick={() => deleteImg(index)}
                                        size={25}
                                    /> */}
                                </div>
                            </div>

                        </>

                    )
                }



                <div className="py-10">
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
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                        <Heading text="Full Name" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2  group-[.active]:!text-center">{fullname}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                        <Heading text="Phone Number" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2  group-[.active]:!text-center">{senderphonenumber}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                        <Heading text="ID Card Number" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2  group-[.active]:!text-center">{senderidcardnumber}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                        <Heading text="To" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2  group-[.active]:!text-center">{to}</div>
                    </div>


                </div>
                <div className="py-10">
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
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                        <Heading text="Full Name" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2  group-[.active]:!text-center">{fullname}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                        <Heading text="Phone Number" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2  group-[.active]:!text-center">{senderphonenumber}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                        <Heading text="ID Card Number" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2  group-[.active]:!text-center">{senderidcardnumber}</div>
                    </div>
                    <div className={`grid ${false ? "grid-cols-1 active" : "grid-cols-2"} group justify-center mb-1 items-center `}>
                        <Heading text="To" className={"!mb-1 !mt-2 group-[.active]:!text-center dark:text-white !text-lg first-letter:text-2xl first-letter:font-semibold"} />
                        <div className=" line-clamp-2 capitalize pl-2  group-[.active]:!text-center">{to}</div>
                    </div>


                </div>
            </div>
            <LoadingButton
                className="!w-[min(30rem,calc(100%-0.5rem))] !mx-auto !py-4 !text-lg !rounded-xl"
            >
                <>CheckOut <AiOutlineArrowRight size={20} className="!inline-block -rotate-45 ml-2 " /></>
            </LoadingButton>
        </Form>
    )
}

export default MailingPreview