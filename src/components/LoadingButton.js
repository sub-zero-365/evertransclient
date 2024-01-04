import UiButton from "./UiButton"
import { useNavigation } from 'react-router-dom'
const LoadingButton = ({ className, children, onClick, initialText }) => {
    const navigation = useNavigation()
    const isPageLoading = navigation.state === "submitting";

    return (
        <UiButton
            onClick={onClick}
            disabled={isPageLoading}
            className={`${className} `}
        >
            {
                isPageLoading ? <p>{initialText ?? "loading please wait ..."}</p> : children
            }

        </UiButton>
    )

}

export default LoadingButton