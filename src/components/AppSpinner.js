import logo from "../Assets/images/logo.png"

export default function AppSpinner() {

    return(
        <div className="h-[calc(100vh-4rem)] fixed inset-0 z-[200] 
        grid place-items-center w-full ">
        <img src={logo}

            className="w-24 h-25 ping"
        />


    </div> 
    
    )

}