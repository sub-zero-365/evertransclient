import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isOpen: false
}

const sliderSlice = createSlice({
    initialState,
    name: "slider",
    reducers: {
        open: (state) => { state.isOpen = true },
        close: (state) => { state.isOpen = false }
    }
})
export const { open, close } = sliderSlice.actions

export default sliderSlice.reducer
