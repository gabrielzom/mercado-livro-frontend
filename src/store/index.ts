import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const store = configureStore({
  reducer: {
    count: reducers,
  }
})

export type RootState = ReturnType<typeof store.getState>
