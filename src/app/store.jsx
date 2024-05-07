import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import getDataReducer from "../features/getDataSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    getDatas: getDataReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;

