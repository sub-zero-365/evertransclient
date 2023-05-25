import { configureStore } from '@reduxjs/toolkit';

import toggleSideBar from '../actions/toggleSide'
import toggleChatBox from '../actions/toggleChatBox'
import setUserName from "../actions/userName"
import userTicket from "../actions/userticket"
import userCity from "../actions/userCity"
import adminData from "../actions/adminData"
import data from '../actions/applications'
const store = configureStore({
    reducer: {
        sidebar: toggleSideBar.reducer,
        chatbox: toggleChatBox.reducer,
        data: data.reducer,
        username:setUserName,
        userTicket:userTicket.reducer,
        userCity:userCity.reducer,
        setAdminData:adminData
    }

})
export default store