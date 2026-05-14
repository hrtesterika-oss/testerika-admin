import { configureStore } from "@reduxjs/toolkit";
import asideReducer from "./AsideMenuReducer";
const store=configureStore({
    reducer:{
        reducerData:asideReducer
    }
})

export default store