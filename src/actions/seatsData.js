import { createSlice } from "@reduxjs/toolkit";
const seatSlice = createSlice({
    name: "seats",
    initialState: {
        seats: {},
        loading: true
    }
    , reducers: {
        setSeats(state, { payload, type }) {
            try {
                state.seats = payload;
            } catch (err) {
                state.seats = {};
            }
            finally {
                state.loading = false;
            }
        },
    }

})
export const { setSeats } = seatSlice.actions
export default seatSlice.reducer