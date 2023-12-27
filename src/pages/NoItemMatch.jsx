import AnimatedText from "../components/AnimateText"
const NoItemMatch = ({ text, className }) => {
    return (
        <div className="mb-10">
            <AnimatedText
                className={`${className} !text-xl`}
                text={text || "Nothing to display"}
            ></AnimatedText>
        </div>
    )
}

export default NoItemMatch