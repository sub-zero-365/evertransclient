import {createSlice} from  '@reduxjs/toolkit';


const userName=createSlice({
    name:"username",initialState:{
        username:null
    },
    reducers:{
        setUserName(state,action){
        state.username=action.payload;
        }
    }
})

export const {setUserName}=userName.actions;

export default userName.reducer