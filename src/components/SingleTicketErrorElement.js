import { Link, useRouteError } from "react-router-dom"
import UiButton from "./UiButton"
import AnimatedText from "./AnimateText"

const SingleTicketErrorElement = () => {
    const error = useRouteError()
    console.log(error)
    return (
        <div className="py-24">
            <img


                src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png"
                className="mx-auto max-w-lg"
            />
            <AnimatedText
                className="!text-3xl !my-10 !text-rose-600"
                text={error?.response?.data || "something went wrong ,try again later"}
            />

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