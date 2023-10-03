import { useQuery } from "@tanstack/react-query"
import customFetch from "../utils/customFetch"
import {
    useLoaderData, useNavigate
} from "react-router-dom"
import { Heading, Rounded } from "../components"

import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'
import QRCode from "react-qr-code";
import { GrCircleInformation } from "react-icons/gr"
import UiButton from "../components/UiButton"


const singleMail = (url, id) => {
    return ({
        queryKey: ["mail", id],
        queryFn: async () => {
            const res = await customFetch.get(url)
            return res.data
        }

    })

}

export const loader = (queryClient) => async ({ request, params }) => {
    const searchParams = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    try {
        var url = "/mails/" + params.id
        const readonly = searchParams.readonly === "7gu8dsutf8asdf" || false
        if (readonly) {
            url = `/assistant/ticket/${params.id}`
        }
        // try to get the previous page from user being
        await queryClient.ensureQueryData(singleMail(url, params.id));

        return {
            id: params.id,
            url,
            readonly
        }
    } catch (err) {
        throw err
    }

}


const SingleMail = () => {
    const navigate = useNavigate()
    const { id, url } = useLoaderData()

    const { mail } = useQuery(singleMail(url, id)).data
    let downloadbaseurl = null
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        downloadbaseurl = process.env.REACT_APP_LOCAL_URL
        // dev code
    } else {
        // production code
        downloadbaseurl = process.env.REACT_APP_PROD_URL

    }
    return (
        <div>
            {/* {JSON.stringify(mail)} */}
            <div className="max-w-2xl mx-auto bg-slate-500--">
                <div
                    className="flex items-center py-4 px-4 border-b bg-slate-50--  mb-10"
                >

                    <Rounded
                        onClick={() => navigate(-1)}
                        className="!w-10 !h-10"
                    >
                        <AiOutlineArrowLeft
                            size={25}
                        />

                    </Rounded>
                    <h3 className="text-2xl font-bold flex-1 text-center ">#{mail?.id}</h3>
                    <UiButton
                        className="flex-none"
                    >
                        <a
                            target="_blank"
                            href={`${downloadbaseurl}/mails/download/${mail?._id}`}>
                            DOWNLOAD
                        </a>

                    </UiButton>
                </div>
                <div>
                    <div
                        className="mb-10"
                        style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>

                        <QRCode
                            size={400}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={`https://ntaribotaken.vercel.app/assistant/${id}?sound=true&xyz=secret&readonly=7gu8dsutf8asdf&render_9368&beta47`}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    {

                        mail?.imgUrl &&

                        <a
                        href={mail?.imgUrl}
                        target="_blank"
                        >

                            <img
                                lazy
                                className="max-w-sm mx-auto h-[15rem] object-cover w-full"
                                src={mail?.imgUrl}
                                alt="product image"

                            />

                        </a>
                    }

                    <div className='flex items-center mb-5  justify-center'>

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

                    <h2 className="text-center  text-lg md:text-xl font-medium  "> Mail  Name</h2>
                    <p className="text-center text-slate-500 mb-4 ">{mail?.name || "n/a"}</p>


                    <div className="grid grid-cols-2">

                        <div>
                            <h2 className="text-center  text-lg md:text-xl font-medium  "> From</h2>
                            <p className="text-center text-slate-500 mb-4 ">{mail?.from || "n/a"} </p>

                        </div>
                        <div>
                            <h2 className="text-center  text-lg md:text-xl font-medium  "> To</h2>
                            <p className="text-center text-slate-500 mb-4 ">{mail?.to || "n/a"}</p>
                        </div>
                    </div>


                    <div className="grid grid-cols-2">
                        <div>
                            <h2 className="text-center  text-lg md:text-xl font-medium  ">Register Date </h2>
                            <p className="text-center text-slate-500 mb-4 "> {mail?.traveldate ? "12/12/2002" : "n/a"}</p>
                        </div>
                        <div>
                            <h2 className="text-center  text-lg md:text-xl font-medium  ">register time </h2>
                            <p className="text-center text-slate-500 mb-4 "> {mail?.traveltime || "n/a"}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div>
                            <h2 className="text-center  text-lg md:text-xl font-medium  ">Estimate Price </h2>
                            <p className="text-center text-slate-500 mb-4 "> {mail?.traveldate ? "12/12/2002" : "n/a"}</p>
                        </div>
                        <div>
                            <h2 className="text-center  text-lg md:text-xl font-medium  ">register time </h2>
                            <p className="text-center text-slate-500 mb-4 "> {mail?.traveltime || "n/a"}</p>
                        </div>
                    </div>
                    <h2 className="text-center  text-lg md:text-xl font-medium  "> Mail Status</h2>
                    <span className='w-6 h-6 mx-auto  bg-green-400 grid place-items-center text-lg rounded-full text-white'><AiOutlineCheck /></span>

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
                    <h2 className="text-center  text-lg md:text-xl font-medium  "> Sender  Name</h2>
                    <p className="text-center text-slate-500 mb-4 ">{mail?.name || "n/a"}</p>
                    <div className="grid grid-cols-2">
                        <div>
                            <h2 className="text-center  text-lg md:text-xl font-medium  ">Phone Number </h2>
                            <p className="text-center text-slate-500 mb-4 "> {mail?.traveldate ? "12/12/2002" : "n/a"}</p>
                        </div>
                        <div>
                            <h2 className="text-center  text-lg md:text-xl font-medium  ">register time </h2>
                            <p className="text-center text-slate-500 mb-4 "> {mail?.traveltime || "n/a"}</p>
                        </div>
                    </div>
                    <h2 className="text-center  text-lg md:text-xl font-medium  "> #ID</h2>
                    <p className="text-center text-slate-500 mb-4 ">{mail?.senderidcardnumber || "n/a"}</p>
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
                    <h2 className="text-center  text-lg md:text-xl font-medium  "> Phone Number</h2>
                    <p className="text-center text-slate-500 mb-4 ">{mail?.senderphonenumber || "n/a"}</p>
                    <div className="py-10" />
                </div>
            </div>
        </div>
    )
}

export default SingleMail