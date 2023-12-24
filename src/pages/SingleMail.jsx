import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { motion, useInView } from "framer-motion"
import { Suspense, createContext, useContext, useEffect, useRef, useState } from "react"
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsChevronCompactUp } from "react-icons/bs"
import { GrCircleInformation } from "react-icons/gr"
import QRCode from "react-qr-code"
import {
    Form,
    useLoaderData,
    useNavigate,
    defer
    , Await,
    useAsyncValue,
    useParams,
    redirect,
    useActionData
} from "react-router-dom"
import { toast } from "react-toastify"
import { Heading, Rounded } from "../components"
import AnimatedText from "../components/AnimateText"
import LoadingButton from "../components/LoadingButton"
import UiButton from "../components/UiButton"
import customFetch from "../utils/customFetch"
import SingleTicketErrorElement from "../components/SingleTicketErrorElement"
import { useUserLayoutContext } from "../components/UserLayout"
// const wait = () => new Promise(r => setTimeout(() => { r() }, 10000))
const wait = (ms = 5000) => new Promise((r) => setTimeout(() => {
    r()
}, ms))

const UserTicketContext = createContext()
const singleMail = (url, id) => {
    return ({
        queryKey: ["mail", id],
        queryFn: async () => {
            // await wait();
            const res = await customFetch.get(url)
            return res.data
        }

    })

}
export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData()
    const id = await formData.get("id")
    const status = await formData.get("status")
    if (status == null) {
        return toast.warning("please mark and send")
    }
    try {
        await customFetch.patch("/mails/edit/" + id, { status })
        toast.success("edited success ")
        // queryClient.
        await queryClient.invalidateQueries({ queryKey: ["mail", id] })
        // return redirect("/user/mails")
        return "edited success"

    } catch (err) {
        toast.error(err.response?.data || "something went wrong")
        // console.log(err.response.data)
        return null
    }

}
export const loader = (queryClient) => async ({ request, params }) => {
    const searchParams = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    try {
        var url = "/mails/" + params.id
        const readonly = searchParams.readonly === "7gu8dsutf8asdf" || false
            // try to get the previous page from user being
            ;

        return defer({
            id: params.id,
            url,
            readonly,
            Mail: queryClient.ensureQueryData(singleMail(url, params.id))
        })
    } catch (err) {
        throw err
    }

}

const MailTemplate = ({ url }) => {
    const id = useParams();
    const { user } = useUserLayoutContext()
    const [isOpen, setIsOpen] = useState(false)
    let mail = {}
    const { data, refetch } = useQuery(singleMail(url, id));
    const { setUserMail } = useContext(UserTicketContext);
    if (data) {
        mail = data?.mail
        setUserMail(data?.mail)
    }
    const actiondata = useActionData();
    // when using  defer my invalidate query couldnt not refetch 
    // so i implented this code and its working fine
    useEffect(() => {
        if (actiondata === "edited success") {
            refetch()
        }
    }, [actiondata])
    const ref = useRef(null);
    const isInView = useInView(ref)
    const [isImageLoading, setIsImageLoading] = useState(true)
    const handleLoadingImage = async (e) => {
        setIsImageLoading(false)
    }
    useEffect(() => {
        if (isInView) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }

    }, [isInView])
    // const { mail } = useQuery(singleMail(url, id)).data

    let downloadbaseurl = null
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        downloadbaseurl = process.env.REACT_APP_LOCAL_URL
        // dev code
    } else {
        // production code
        downloadbaseurl = process.env.REACT_APP_PROD_URL

    }
    return (<>
        <div className="lg:flex flex flex-col lg:flex-row items-center lg:items-start !w-full lg:gap-x-10 justify-center">

            <div className="flex-1 lg:flex-none w-full max-w-2xl">

                <div>
                    <div
                        className="mb-10"
                        style={{ height: "auto", margin: "2.5rem auto", maxWidth: 64, width: "100%" }}>

                        <QRCode
                            size={400}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={`${downloadbaseurl}/mails/download/${mail?._id}?sound=true&xyz=secret&readonly=7gu8dsutf8asdf&render_9368&beta47`}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    {

                        mail?.imgUrl &&


                        <div className="relative h-[15rem]">
                            {
                                isImageLoading && <div
                                    className="absolute top-1/2 -translate-y-1/2 inset-0 bg-slate-500/25"
                                >
                                    <AnimatedText
                                        text="loading image please wait.."
                                        className="!text-3xl"
                                    />
                                </div>

                            }

                            <a
                                href={mail?.imgUrl}
                                target="_blank" s
                                className="cursor-pointer  border "
                            >

                                <motion.img

                                    loading="lazy"
                                    onLoad={handleLoadingImage}
                                    whileHover={{
                                        scale: 0.9, transition: {
                                            duration: 0.4
                                        }
                                    }}
                                    className="max-w-sm mx-auto h-[15rem] object-cover w-full"
                                    src={mail?.imgUrl}
                                    alt="product image"

                                />

                            </a>

                        </div>


                    }

                    <div className='flex items-center mb-5 mt-8  justify-center'>

                        <Heading
                            text="Mail's Information"
                            className="!text-center !p-0 !m-0 !text-2xl !font-black"
                        />
                        <GrCircleInformation
                            className="ml-2"
                            size={20}
                        />
                    </div>

                    {/* jfjasdjfsjdaf */}

                    <h2 className="text-center  text-xl md:text-xl font-medium  "> Mail  Name</h2>
                    <p className="text-center text-slate-500 mb-4 text-lg uppercase ">{mail?.name || "n/a"}</p>


                    <div className="grid grid-cols-2">

                        <div>
                            <h2 className="text-center  text-xl md:text-xl font-medium  "> From</h2>
                            <p className="text-center text-slate-500 mb-4 text-lg">{mail?.from || "n/a"} </p>

                        </div>
                        <div>
                            <h2 className="text-center  text-xl md:text-xl font-medium  "> To</h2>
                            <p className="text-center text-slate-500 mb-4 text-lg">{mail?.to || "n/a"}</p>
                        </div>
                    </div>


                    <div className="grid grid-cols-2">
                        <div>
                            <h2 className="text-center  text-xl md:text-xl font-medium  ">Register Date </h2>
                            <p className="text-center text-slate-500 mb-4 text-lg"> {dayjs(mail?.registerdate || new Date).format("MMM D, YYYY")}</p>
                        </div>
                        <div>
                            <h2 className="text-center  text-xl md:text-xl font-medium  ">Estimate Price </h2>
                            <p className="text-center text-slate-500 mb-4 text-lg"> {mail?.estimatedprice + "frs" ?? "n/a"}</p>
                        </div>
                    </div>
                    {/*  */}
                    <h2 className="text-center  text-xl md:text-xl font-medium  "> Sending Cost </h2>
                    <p className="text-center animate- text-slate-500 mb-4 text-lg">{
                        mail?.price ? mail.price + " frs" : "n/a"
                    }</p>
                    <h2 className="text-center  text-xl md:text-xl font-medium  "> Created At </h2>
                    <p className="text-center animate- text-slate-500 mb-4 text-lg">{
                        dayjs(mail?.createdAt || new Date()).format("dddd, MMMM D, YYYY h:mm A")
                    }</p>
                    <h2 className="text-center  text-xl md:text-xl font-medium  "> Mail Status</h2>
                    <p className="text-center animate-bounce text-slate-500 mb-4 text-lg">{mail?.status}</p>
                    {/* <span className='w-6 h-6 mx-auto  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span> */}

                    {/* jufodjaosdf */}


                    {/* sender info */}
                    <div className="py-10" />
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
                    <h2 className="text-center  text-xl md:text-xl font-medium  "> Sender Name</h2>
                    <p className="text-center text-slate-500 mb-4 text-lg">{mail?.senderfullname || "n/a"}</p>
                    <div className="grid grid-cols-1">
                        <div>
                            <h2 className="text-center  text-xl md:text-xl font-medium  ">Phone Number </h2>
                            <p className="text-center text-slate-500 mb-4 text-lg"> {mail?.senderphonenumber ?? "n/a"}</p>
                        </div>

                    </div>
                    <h2 className="text-center  text-xl md:text-xl font-medium  "> #ID</h2>
                    <p className="text-center text-slate-500 mb-4 text-lg">{mail?.senderidcardnumber || "n/a"}</p>
                    {/* end of sender info */}
                    <div className="py-10" />
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
                    <h2 className="text-center  text-xl md:text-xl font-medium  ">Full Name</h2>
                    <p className="text-center text-slate-500 mb-4 text-lg">{mail?.recieverfullname || "n/a"}</p>
                    <h2 className="text-center  text-xl md:text-xl font-medium  "> Phone Number</h2>
                    <p className="text-center text-slate-500 mb-4 text-lg">{mail?.recieverphonenumber || "n/a"}</p>
                    {
                        mail?.editedBy?.length > 0 ? <Heading text="Edited History" className={"!text-center !font-bold italic"} />
                            : "This mail have not being edited since created "
                    }


                    <ol class="relative border-l border-gray-200 dark:border-gray-700">

                        {
                            mail?.editedBy?.map(({ full_name,
                                user_id,
                                date,
                                action }) => {
                                const createdByMe = user_id?.toString() == user?._id?.toString()
                                return (<li class="ml-4 mb-4" key={user_id}>
                                    <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{dayjs(date).format("dddd, MMMM D, YYYY h:mm A")}</time>
                                    <h3 className={`text-lg font-semibold text-gray-900 dark:text-white `}>Edited By:
                                        <span
                                            className={`${createdByMe && "!text-rose-400"}`}
                                        >

                                            {
                                                createdByMe ? " You  " :
                                                    full_name}
                                        </span>
                                    </h3>
                                    <p class="text-base
                                    font-normal text-gray-500
                                    dark:text-gray-400">Action:{
                                            createdByMe ?
                                                "You  " + action?.split(" ")?.slice(2)?.join(" ")
                                                : action
                                        }</p>
                                </li>)
                            })
                        }

                    </ol>

                    <div className="py-54" />



                </div>
            </div>
            <div ref={ref} className="mt-56" />
        </div>
        <div className="lg:!sticky lg:top-[4rem] lg:flex-none lg:py-10 lg:!right-[2rem]--


 bottom-0
 fixed
 w-full
 flex flex-col
 -translate-x-1/2
 lg:translate-x-0
 left-1/2
 md:w-[min(30rem,calc(100%-1rem))]
 md:left-[calc(5rem+50%)]
 lg:w-[30rem]
 lg:left-[calc(100%-10rem)]
 
 ">


            <button
                data-te-ripple-init
                data-te-ripple-color="light"
                className="inline---block 
w-[min(400px,calc(100%-2.5rem))]
 bottom-0
 pb-2
 block
 min-h-[2rem]
 mx-auto
rounded bg-blue-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
transition duration-150 ease-in-out hover:bg-blue-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"


                onClick={() => {
                    setIsOpen(!isOpen)

                }}
            >
                <span

                    className={`absolute 
shadow
z-[23]
left-1/2 
 -top-8
 bg-slate-400/75 
 px-2
 rounded-sm
 pt-1
 pb-1.5
 !font-black
 h-fit lg:hidden
 -translate-x-1/2
 
${isOpen ? "rotate-180" : " "}
 
 
 `}> <BsChevronCompactUp size={20} /></span>
                {mail?.status}
            </button>


            <motion.div
                className={`mx-auto
${isOpen ? "max-h-[calc(100vh-1rem)] overflow-y-auto py-5" : "max-h-0  overflow-hidden"}
lg:overflow-hidden
lg:max-h-screen
transition-[max-height]
duration-300
w-[min(40rem,calc(100%-1rem))]
bg-white
dark:bg-slate-800
mb-5
rounded-lg
shadow-xl
lg:py-10
`}

            >
                <h2 className="text-center  text-xl md:text-xl font-medium  ">createdBy</h2>
                <p className="text-center text-slate-500 mb-4 text-lg">{mail?.doneby || "n/a"}</p>
                <p className={`text-center animate-pulse text-gray-700 mb-4 text-xl
                ${mail?.status == "pending" && "!text-rose-950"}
                ${mail?.status == "sent" && "!text-orange-200"}
                ${mail?.status == "recieved" && "!text-green-800"}
                `}><span
                        // className="text-green-500"
                    >status: &nbsp;&nbsp;&nbsp;</span>{mail?.status || "n/a"}</p>
                <Form method="post"
                // replace
                >
                    <input name="id" type="hidden" value={mail?._id} />
                    <ol class="flex items-center w-full mb-4 sm:mb-5 justify-center px-4">
                        <li class={`flex w-full items-center
${(mail?.status === "sent" || mail?.status == "recieved") ? " after:border-blue-600" : ""}
after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block  text-blue-600 dark:text-blue-500 dark:after:border-blue-800 `}>
                            <div class="flex items-center justify-center w-10 h-10 bg-blue-300 rounded-full lg:h-12 lg:w-12  shrink-0">
                                <svg class="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                                </svg>
                            </div>
                        </li>
                        <li class={`flex w-full items-center
${(mail?.status == "recieved") ? " after:border-blue-600" : ""}
after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block text-blue-600 dark:text-blue-500 dark:after:border-blue-800  `}>
                            <div class={`${(mail?.status == "recieved") ? " bg-blue-300" : "bg-gray-100"} flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}>
                                <svg class={` w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                                    <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
                                </svg>
                            </div>
                        </li>
                        <li class="flex items-center w-fit">
                            <div class={`flex items-center justify-center w-10 h-10  ${(mail?.status == "recieved") ? " bg-blue-400" : "bg-gray-100"} rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}>
                                <svg class="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                                </svg>
                            </div>
                        </li>
                    </ol>


                    <h3 class="mb-4 font-semibold text-gray-900 dark:text-white text-center text-xl">Mails Actions</h3>
                    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="vue-checkbox-list" type="checkbox" disabled checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="vue-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pending</label>
                            </div>
                        </li>
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input name="status" id="sent"
                                    defaultChecked={mail?.status == "sent" || mail?.status == "recieved"}
                                    disabled={mail?.status === "sent" || mail?.status == "recieved"}
                                    type="checkbox" value="sent" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label for="sent" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sent</label>
                            </div>
                        </li>

                        {
                            (mail?.status == "recieved" || mail?.status == "sent") && <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div class="flex items-center pl-3">
                                    <input name="status" id="recieved" type="checkbox" value="recieved"
                                        defaultChecked={mail?.status == "pending" || mail?.status == "recieved"}
                                        // checked={mail?.status == "pending" || mail?.status == "recieved"}
                                        disabled={mail?.status == "pending" || mail?.status == "recieved"}
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="recieved" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recieved</label>
                                </div>
                            </li>
                        }

                    </ul>
                    {
                        mail?.status != "recieved" && <LoadingButton className="!block !my-5 !mx-auto !px-8 !py-2.5">
                            Validate
                        </LoadingButton >
                    }


                </Form>
            </motion.div>




        </div>
    </>)
}


const SingleMail = () => {
    const navigate = useNavigate()
    const { Mail, url, id, readonly } = useLoaderData()
    const [userMail, setUserMail] = useState({})//create context for the customer ticket when the loader loads 
    // it will update the context of the mail ins

    let downloadbaseurl = null
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        downloadbaseurl = process.env.REACT_APP_LOCAL_URL
        // dev code
    } else {
        // production code
        downloadbaseurl = process.env.REACT_APP_PROD_URL

    }
    return (
        <UserTicketContext.Provider
            value={{ userMail, setUserMail }}
        >
            <div
                className="flex max-w-5xl mx-auto items-center justify-between py-4 px-4 border-b bg-slate-50--  mb-10"
            >

                <Rounded
                    onClick={() => navigate(-1)}
                    className="!w-10 !h-10"
                >
                    <AiOutlineArrowLeft
                        size={25}
                    />

                </Rounded>
                <h3 className="text-2xl  font-bold flex-1 text-center cursor-pointer "
                    onClick={() => {
                        window?.navigator?.clipboard?.writeText(id).then(() => {
                            alert("copy success")
                        }).catch(err => alert("something went wrong"))
                        // inputRef.current?.select();
                        // // document.execCommand("copy");
                        // document.execCommand('copy');
                    }}
                >#{userMail?.id}</h3>
                {/* <textarea type="text" value={id}
ref={inputRef}
id="GfGInput"
// className='invisible w-0 h-0'
/> */}
                {userMail?.id &&
                    <UiButton
                        className="flex-none"
                    >
                        <a
                            target="_blank"
                            href={`${downloadbaseurl}/mails/download/${userMail?._id}`}>
                            DOWNLOAD
                        </a>

                    </UiButton>
                }
            </div>
            <Suspense
                fallback={
                    <div role="status" class="w-full mx-auto max-w-5xl p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div class="flex items-center justify-between pt-4">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div class="flex items-center justify-between pt-4">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div class="flex items-center justify-between pt-4">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <div class="flex items-center justify-between pt-4">
                            <div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        <span class="sr-only">Loading...</span>
                    </div>
                }
            >
                <Await
                    resolve={Mail}
                    errorElement={<SingleTicketErrorElement />}
                >
                    <MailTemplate
                        url={url}
                        id={id}
                        readonly={readonly}
                    />
                </Await>
            </Suspense>
        </UserTicketContext.Provider>
    )
}

export default SingleMail