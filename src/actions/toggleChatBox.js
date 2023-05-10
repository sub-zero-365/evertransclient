import { createSlice } from '@reduxjs/toolkit'

const toggleChatBox = createSlice({
    name: "chatbox",
    initialState: {
        isOpen: false
    },
    reducers: {
        toggleChatBox(state) {
            state.isOpen = !state.isOpen
        }
    }

})


export const actions = toggleChatBox.actions;
export default toggleChatBox