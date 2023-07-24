


export const UiButtonDanger = ({ className, onClick, name }) => {
    return (
        <button
            onClick={onClick}

            className={` ${className}
font-medium
shadow
md:shadow-md
shadow-red-200
dark:shadow-slate-800
bg-red-400
dark:bg-gray-700
pt-1
mr-1
rounded-sm
text-white
dark:font-semibold
px-4
pb-1.5
place-items-center  
hover:bg-red-700
ease 
transition-colors
duration-700
hover:underline
flex
justify-center 
items-center
text-[0.7rem] 
md:text-sm
font-montserrat
`}
        >{name || "Button"}</button>
    )

}

const UiButton = ({ className, onClick, name, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            
            className={` ${className}
font-medium
shadow
md:shadow-md
shadow-blue-200
dark:shadow-slate-800
bg-blue-400
dark:bg-gray-700
pt-1
mr-1
rounded-sm
text-white
dark:font-semibold
px-4
pb-1.5
place-items-center  
hover:bg-blue-700
ease 
transition-colors
duration-700
hover:underline
flex
justify-center 
items-center
text-[0.7rem] 
md:text-sm
font-montserrat
`}
        >{name || "Button"}</button>
    )


}
export default UiButton