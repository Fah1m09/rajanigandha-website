import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialState = {
  token: string;
};
const initialState: InitialState = {
  token: "sdfgdfg",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setToken } = authSlice.actions;
