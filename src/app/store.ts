import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./features/Loader/loaderSlice";
import authReducer from "./features/Auth/authSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
