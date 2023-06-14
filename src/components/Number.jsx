const Number = ({number,className}) => {
let formatter=Intl.NumberFormat("en",{notation:'compact'});
    return (
        <span className={`flex items-center justify-center shadow h-7 w-7 ${className}
        shadow-green-200  rounded-full text-[0.5rem] text-white   ${true ? "bg-green-500" : "bg-red-500"}`}>{formatter.format(number) || "0"}</span>
    )

}
export default Number