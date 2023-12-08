import AnimatedText from "../components/AnimateText"
import QRCode from "react-qr-code";
import UiButton from "../components/UiButton";
import { useLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import customFetch from "../utils/customFetch"

const singleRecieptQuery = (id) => {
    return ({
        queryKey: ["reciept", id],
        queryFn: async () => {
            const res = await customFetch.get(`/reciepts/${id}`)
            return res.data
        }

    })

}
export const loader = (queryClient) => async ({ params }) => {
    const id = params.id;
    // alert(id)
    try {
        // this method trys to get data from the catch if not its refetch it 
        // and if it doesnot give a 200 response it throws an error 
        await queryClient.ensureQueryData(singleRecieptQuery(id));
        return id
    } catch (error) {
        // throw an error so the error element can catch it and display the error to the user or the intended user
        throw error
    }
}

const SingleReciept = () => {
    const id = useLoaderData();
    const { reciept } = useQuery(singleRecieptQuery(id))?.data || {};
    return (
        <div className="pb-24">
            <AnimatedText
                text={`Customer Reciept(${reciept?.quantity})`}
                className='!text-5xl !my-4 !mb-10'
            />
            {/* {JSON.stringify(reciept)} */}
            <h3 className="text-center font-medium text-xl">Cart #{reciept?.id}</h3>
            <ul className="max-w-sm mx-auto">
                {
                    reciept?.products.map((item, index) => {
                        const { price, productname, total } = item;
                        return (
                            <li
                                key={index}
                                className="mb-1 border-b "
                            >
                                <div className="flex gap-x-2 justify-between p-1">

                                    <h3 className="font-medium text-lg"><span
                                        className="text-gray-800 font-medium"
                                    >({index + 1})&nbsp;&nbsp;</span>{productname}&nbsp;&nbsp;*&nbsp;&nbsp;{total} </h3>
                                    <p className="font-[500] text-lg">fcfa {price * total}</p>
                                </div>

                            </li>
                        )
                    }
                    )
                }
            </ul>
            <div className="flex gap-x-2 justify-between p-1 max-w-sm mx-auto mt-10 border-black mb-2 border-b-2">
                <h1
                    className="text-2xl font-bold"
                >Total</h1>
                <p className="text-3xl font-extrabold text-gray-600">fcfa {reciept?.total_price}</p>
            </div>
            <h2 className="text-center  text-xl md:text-xl font-medium  ">createdBy</h2>
            <p className="text-center text-slate-500 mb-4 text-lg">{"Fred Morgan" || "n/a"}</p>
            <div style={{ height: "auto", margin: "2rem auto", maxWidth: 100, width: "100%" }}>
                <QRCode
                    size={1000}
                    style={{ height: "auto", maxWidth: "100%", width: "100%", aspectRatio: "4/4" }}
                    value={`https://ntaribotaken.vercel.app/assistant/${0}?sound=true&xyz=secret&readonly=7gu8dsutf8asdf&render_9368&beta47`}
                    viewBox={`0 0 256 256`}
                />
            </div>
            <UiButton
                className="!mx-auto !py-3.5 w-[min(300px,calc(100%-0.5rem))] !bg-blue-900 !mb-10"
            >
                Download Reciept
            </UiButton>
        </div>
    )

}
export default SingleReciept