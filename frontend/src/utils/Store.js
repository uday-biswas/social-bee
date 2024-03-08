//the store is the global state of the application
//configures the store with the reducers

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import profileSlice from "../slice/profileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
  },
});

export default store;
