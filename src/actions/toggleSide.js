import { createSlice } from "@reduxjs/toolkit";


const toggleSideBar = createSlice({
    name: "sidebar",
    initialState: {
        isOpen: false
    },
    reducers: {
        toggleSideBar(state) {
            state.isOpen = !state.isOpen
        }

    }
})
export const actions = toggleSideBar.actions;

export default toggleSideBar