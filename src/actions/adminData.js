import { createSlice } from "@reduxjs/toolkit";

const adminDataSlice = createSlice({
  name: "admindata",
  initialState: {
    users: [],
    tickets: [],
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
      state.loading.users = false;
    },
    setTickets(state, { payload }) {
      try {
        state.tickets = [...payload];
      } catch (err) {
        state.tickets = [];
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
export const { setUsers, setTickets,setCities } = adminDataSlice.actions;
export default adminDataSlice.reducer;
