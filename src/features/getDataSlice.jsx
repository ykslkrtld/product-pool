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
  name: "getData",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getDataSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.endpoint] = payload.data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    },
  },
);

export const { fetchStart, getDataSuccess, fetchFail } =
  getDataSlice.actions;

export default getDataSlice.reducer;
