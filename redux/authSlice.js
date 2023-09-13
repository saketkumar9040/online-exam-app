import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    token: null,
  },
  reducers: {
    authenticate: (state, action) => {
      (state.token = action.payload.token),
        (state.userData = action.payload.userData);
    },
  },
});

export const authReducer = authSlice.reducer;
export const { authenticate } = authSlice.actions;
