import UiButton from "./UiButton"
import { useState, useEffect, useRef } from "react"
import { useNavigation } from 'react-router-dom'

const LoadingButtonTimeOut = ({
    children,
    duration = 5000,
    initialText,
    loading_text="This is taking longer than usual. Please wait while backend services are getting started.",
    ...props

}) => {
    const navigation = useNavigation()
    const isPageLoading = navigation.state === "submitting";
    const [loadingText, setLoadingText] = useState("");
    const timeRef = useRef(null)
    useEffect(() => {
        if (!isPageLoading) return
        timeRef.current = setTimeout(() => {
            setLoadingText(loading_text
            )
        }, [duration])

        return () => {
            clearTimeout(timeRef.current)
        }
    }, [isPageLoading])

    return (
        <UiButton
            disabled={isPageLoading}
            {...props}
        >
            {
                isPageLoading ? <p>{loadingText || initialText || "loading please wait ..."}</p> : children
            }
        </UiButton>
    )
}
export default LoadingButtonTimeOut