import { createSlice } from '@reduxjs/toolkit';


const applications = createSlice({
    name: "applications",
    initialState: {
        items: [],
        loading: true
    },
    reducers: {
        addToItems(state, actions) {
            state.items = actions.payload.data
        }

    }


})


export const actions = applications.actions;


export default applications