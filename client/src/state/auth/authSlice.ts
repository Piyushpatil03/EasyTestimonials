import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "../../utils/HelperFunctions";

interface authState {
  loading: boolean;
  accessToken: string;
  userId: string;
}

const initialState: authState = {
  loading: false,
  accessToken: getToken() || "",
  userId: "",
};

const authSlice = createSlice({
  name: "auth_slice",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ authToken: string }>) => {
      state.accessToken = action.payload.authToken;
      setToken(action.payload.authToken);
    },
    registerSuccess: (state, action: PayloadAction<{ authToken: string }>) => {
      state.accessToken = action.payload.authToken;
      setToken(action.payload.authToken);
    },
    logoutSuccess: (state) => {
      state.accessToken = "";
      removeToken()
    },
  },
});

export const { loginSuccess, registerSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
