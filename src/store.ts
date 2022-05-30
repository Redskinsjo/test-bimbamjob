import { configureStore } from "@reduxjs/toolkit";

import lawnReducer from "./features/lawnSlice";
import mowerReducer from "./features/mowerSlice";
// import configsReducer from "./features/configsSlice";

export const store = configureStore({
  reducer: {
    lawn: lawnReducer,
    mower: mowerReducer,
    // configs: configsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
