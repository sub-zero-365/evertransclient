import UiButton from "./UiButton"
import { useNavigation } from 'react-router-dom'
const LoadingButton = ({ className, children, onClick }) => {
    const navigation = useNavigation()
    const isPageLoading = navigation.state === "loading"
    return (
        <UiButton
            onClick={onClick}
            className={`${className} `}
        >
            {
                isPageLoading ? <p>loading please wait ...</p> : children
            }

        </UiButton>
    )

}

export default LoadingButton