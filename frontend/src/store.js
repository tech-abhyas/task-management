import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"
import taskReducer from "./slice/taskSlice"


const reducer = {
  authReducer,
  taskReducer
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
