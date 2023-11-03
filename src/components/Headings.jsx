export default function Heading({ text ,className}) {

    return <div className={`text-xl pl-0  font-montserrat font-medium mb-6 text-black dark:text-white ${className}`}>{text}</div>

}