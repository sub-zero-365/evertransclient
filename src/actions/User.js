import { createSlice } from "@reduxjs/toolkit";
const User = createSlice({
    name: "user",
    initialState: {
        user: {

        }
    },
    reducers: {
        setUser(state, { payload }) {
            state.user = { ...payload }
        },
        clearUser(state,) {
            state.user = {}
        }
    },
});
export const { setUser,clearUser
} = User.actions
export default User.reducer