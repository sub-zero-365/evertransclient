import { RiDeleteBin6Line } from "react-icons/ri"
import { useMailingContext } from "./Mailing"
import { Heading, Rounded } from "../components"
import { useOutletContext, useLocation, useNavigate, Form, redirect, Navigate, useActionData } from "react-router-dom"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import LoadingButton from "../components/LoadingButton"
import AnimatedText from "../components/AnimateText"
import { toast } from "react-toastify"
import { GrCircleInformation } from "react-icons/gr"
import customFetch from "../utils/customFetch"
export const loader = async () => {

    return null
}

export const action =
    (queryClient) =>
        async ({ request }) => {


            try {

                const formData = await request.formData();
                // const data =window.history.state?.usr
                // const file = formData.get('avatar');
                const file = window.history.state?.usr?.file
                console.log("file is the file here  ", file)
                if (file) {
                    alert("enter here")
                    formData.append("mailimg", file, file.name)
                    return null
                }
                console.log("this is the form data ", formData)

                if (file && file.size > 500000) {
                    toast.error('Image size too large');
                    return null;
                }

                await customFetch.post('/mails/new', formData);
                queryClient.invalidateQueries(['mails']);
                toast.success('Profile updated successfully');
                return redirect('/user/mails');
            } catch (error) {
                toast.error(error?.response?.data || error.message);
                return redirect("/mailing");
            }
        };

const MailingPreview = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { imgArr, from, to, senderidcardnumber, fullname, senderphonenumber, file } = location.state ?? {}
    window.onpopstate = (e) => {
        window.history.replaceState({ imgArr, from, to }, null, window.location.href)
    }
    const NUMBER_OF_IMAGES = imgArr?.length
    const message = useActionData()
    if (message === "successfully") {
        return <Navigate to={"/user"} replace />
    }
    return (
        <Form method="post" className='form' encType='multipart/form-data'
            state={{ user: "send the code" }}>

            {
                location.state && Object.keys(location.state).map((input, index) => {
                    if (input == "images") return null
                    return (
                        <input key={index}
                            type="text"
                            readOnly
                            name={input}
                            value={location.state[input]}
                        />)


                }
                )

            }

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
            <input
                name="fullname"
                value="fullname"
                id="fullname"
            />
            <input
                type='file'
                id='avatar'
                name='avatar'
                className='form-input'
                accept='image/*'
            />
            <div className=''>
                <AnimatedText
                    text={`Product Images (${NUMBER_OF_IMAGES})`}
                    className="!text-2xl !text-blue-400"

                />


                <img
                    alt='mails imae'
                    src={file ? URL.createObjectURL(file) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAVXZhlM-qA4bg_bOHRutl3wQVQdAbSWx_A&usqp=CAU'}
                />


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