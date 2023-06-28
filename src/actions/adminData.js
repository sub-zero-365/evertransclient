import { createSlice } from "@reduxjs/toolkit";

const adminDataSlice = createSlice({
  name: "admindata",
  initialState: {
    users: [],
    ticketdata: {},
    cities: [],
    loading: {
      users: true,
      tickets: true,
      cities: true,
    },
  },
  reducers: {
    setUsers(state, { payload }) {
      try {
        state.users = [...payload];
      } catch (err) {
        state.users = [];
      }
      finally{
        state.loading.users = false;
      }
    },
    setTicketData(state, { payload }) {
      try {
        state.ticketdata = {...payload};
      } catch (err) {
        state.ticketdata = {};
      }
      state.loading.tickets = false;
    },
    setCities(state, { payload }) {
      try {
        state.cities = [...payload];
      } catch (err) {
        state.cities = [];
      }
      state.loading.cities = false;
    },
  },
});
export const { setUsers, setTicketData,setCities } = adminDataSlice.actions;
export default adminDataSlice.reducer;
