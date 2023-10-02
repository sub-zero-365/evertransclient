import { useRouteError } from "react-router-dom"
import AnimatedText from "./AnimateText"
const ErrorElement = () => {
    const error = useRouteError()
    console.log(error)
    const errorMsg = error?.response?.data || error?.message || "something went wrong in the app "
    return (
        <div>
            <AnimatedText
                className="!text-3xl"
                text={errorMsg}
            />
        </div>
    )

}


export default ErrorElement