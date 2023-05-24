// imprt {createSlice} from '@reactjs'
import { createSlice } from "@reduxjs/toolkit";

const ticketdata = createSlice({
  name: "userticket",
  initialState: {
  loading:true,
    cities: [
    ],
  },
  reducers: {
    storeCities(state, {payload}) {
      state.cities=[...payload]
    },
    setLoading(state,{payload}){
    state.loading=payload
    }
  },
});
export const {storeCities,setLoading} =ticketdata.actions
export default ticketdata