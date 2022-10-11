import { configureStore } from "@reduxjs/toolkit";
import appReducers from "./reducers/app";

export const store = configureStore({
  reducer: {
    app: appReducers,
    
  }
})

export type RootState = ReturnType<typeof store.getState>
