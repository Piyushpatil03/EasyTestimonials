import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

export const store = configureStore({
    reducer : {
        authorization : authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;