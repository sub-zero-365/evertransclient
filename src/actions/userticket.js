// imprt {createSlice} from '@reactjs'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const getData = createAsyncThunk(process.env.REACT_APP_LOCAL_URL + "/ticket", async (arg,thukapi) => {

//         const url = process.env.REACT_APP_LOCAL_URL + "/ticket";
//         const res = await axios.get(url, {
//             headers: {
//                 'Authorization': "makingmoney " + token
//             }
//         })
//         return res.data

// });

const ticketdata = createSlice({
  name: "userticket",
  initialState: {
    tickets: [],
  },
  reducers: {
    storeTicket(state, {payload}) {
      state.tickets=[...payload]
    },
  },
});
export const {storeTicket} =ticketdata.actions
export default ticketdata