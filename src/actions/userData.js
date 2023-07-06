import { createSlice } from "@reduxjs/toolkit";
const userData = createSlice({
    name: "userdata",
    initialState: {
        loading: true,
        userData: {}
    },
    reducers: {
        setUserData(state, { payload }) {
            state.userData = { ...payload }
            state.loading=false
        },
       
    },
});
export const { setUserData
} = userData.actions
export default userData.reducer