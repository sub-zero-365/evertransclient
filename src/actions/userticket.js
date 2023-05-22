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