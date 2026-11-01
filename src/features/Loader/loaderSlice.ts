import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialState = {
  loading: boolean;
};
const initialState: InitialState = {
  loading: false
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export default loaderSlice.reducer;
export const { showLoader } = loaderSlice.actions;
