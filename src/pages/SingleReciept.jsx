import AnimatedText from "../components/AnimateText"
import QRCode from "react-qr-code";

export const loader = (queryClient) => async ({ request }) => {
    return null
}

const SingleReciept = () => {
    return (
        <div>
            <AnimatedText
                text="Customer Reciept"
                className='!text-5xl !mt-4'
            />
            <div style={{ height: "auto", margin: "2rem auto", maxWidth: 100, width: "100%" }}>
                <QRCode
                    size={1000}
                    style={{ height: "auto", maxWidth: "100%", width: "100%", aspectRatio: "4/4" }}
                    value={`https://ntaribotaken.vercel.app/assistant/${0}?sound=true&xyz=secret&readonly=7gu8dsutf8asdf&render_9368&beta47`}
                    viewBox={`0 0 256 256`}
                />
            </div>
            <h3 className="text-center font-medium text-xl">Cart :</h3>
            <ul className="max-w-sm mx-auto">
                {
                    Array.from({ length: 10 }, (arr, index) => <li
                        key={index}
                        className="mb-1 border-b "
                    >
                        <div className="flex gap-x-2 justify-between p-1">
                            <h3>Plantain and rice </h3>
                            <p>$474</p>
                        </div>

                    </li>)
                }
            </ul>
            <div className="flex gap-x-2 justify-between p-1 max-w-sm mx-auto">
                <h1
                    className="text-2xl font-bold"
                >Total</h1>
                <p>$474</p>
            </div>
            <h2 className="text-center  text-xl md:text-xl font-medium  ">createdBy</h2>
                    <p className="text-center text-slate-500 mb-4 text-lg">{"Fred Morgan" || "n/a"}</p>
        </div>
    )

}
export default SingleReciept