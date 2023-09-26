import { useRouteError } from "react-router-dom"

const ErrorElement = () => {
    const error = useRouteError()
    console.log(error)
    return (
        <div>
            this is an error element here
        </div>
    )

}


export default ErrorElement