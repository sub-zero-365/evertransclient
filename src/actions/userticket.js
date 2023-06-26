import { createSlice } from "@reduxjs/toolkit";
const ticketdata = createSlice({
  name: "userticket",
  initialState: {
  loading:true,
    tickets: [],
  },
  reducers: {
    storeTicket(state, {payload}) {
      state.tickets=[...payload]
    },
    setLoading(state,{payload}){
    state.loading=payload
    }
  },
});
export const {storeTicket,setLoading} =ticketdata.actions
export default ticketdata