import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  products: [],
  brands: [],
  sales: [],
  purchases: [],
  categories: [],
  loading: false,
  error: false,
};

const getDataSlice = createSlice({
  name: "getDatas",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getDataSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.key] = payload.data;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getDataSuccess, fetchFail } =
  getDataSlice.actions;

export default getDataSlice.reducer;
