import { toast } from "react-toastify"


export const onSuccessToast = (msg = "") => {
    toast.success(msg, {
        position: toast.POSITION.BOTTOM_CENTER
    })
}

export const onErrorToast = (msg = "") => {
    toast.error(msg, {
        position: toast.POSITION.BOTTOM_CENTER
    })
}


export const onWarningToast = (msg = "") => {
    toast.warning(msg, {
        position: toast.POSITION.BOTTOM_CENTER
    })
}