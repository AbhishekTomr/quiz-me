import { userSlice } from "./userslice";
import { configureStore } from "@reduxjs/toolkit";


let store = configureStore({reducer:{userInfo: userSlice.reducer}});
export default store;