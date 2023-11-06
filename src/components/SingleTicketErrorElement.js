import { Link, useRouteError, useNavigate } from "react-router-dom"
import UiButton from "./UiButton"
import AnimatedText from "./AnimateText"

const SingleTicketErrorElement = () => {
    const error = useRouteError()
    const navigate = useNavigate()
    // const rd_from =
    // console.log(error)
    return (
        <div className="py-24">
            <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png"
                className="mx-auto max-w-lg"
            />
            <AnimatedText
                className="!text-3xl !my-10 !text-rose-600"
                text={error?.response?.data || error?.message || "something went wrong ,try again later"}
            />

            <UiButton
                onClick={() => navigate(-1, { replace: true })}
                className="!w-[min(30rem,calc(100%-2.5rem))] !mb-5 !mx-auto !py-3.5 !text-lg !rounded-xl !bg-green-800"
            >
                {/* <Link to="/user"
                    className="w-full"
                    replace>
                    Go To Dashboard
                </Link> */}
                Go Back
            </UiButton>
            <UiButton
                className="!w-[min(30rem,calc(100%-2.5rem))] !mx-auto !py-3.5 !text-lg !rounded-xl"

            >
                <Link to="/user"
                    className="w-full"
                    replace>
                    Go To Dashboard
                </Link>
            </UiButton>
        </div>
    )
}

export default SingleTicketErrorElement