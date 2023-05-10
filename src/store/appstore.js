import { createStore } from "redux"

const initialState = {
    openChat: false,
    openSideBar: false,
    data: []
}


const appReducer = async(initialState, action) => {
    switch (action.type) {
        case "openChat":
            return {...initialState, openChat: !initialState.openChat }
        case "openSideBar":
            return {...initialState, openSideBar: !initialState.openSideBar }
        default:
            return initialState
    }
}
export const store = createStore(appReducer, initialState);