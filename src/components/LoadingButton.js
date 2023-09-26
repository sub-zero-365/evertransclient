import UiButton from "./UiButton"
import { useNavigation } from 'react-router-dom'
const LoadingButton = ({ className, children, onClick }) => {
    const navigation = useNavigation()
    const isPageLoading = navigation.state === "loading"
    return (
        <UiButton
            onClick={onClick}
            className={`${className} !w-[min(30rem,calc(100%-1.5rem))] !mx-auto !py-3.5 !text-lg !rounded-xl`}
        >
            {
                isPageLoading ? <p>loading please wait ...</p> : children
            }

        </UiButton>
    )

}

export default LoadingButton