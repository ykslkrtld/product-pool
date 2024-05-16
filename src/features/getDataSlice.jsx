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
    emptyStates: (state) => {
      state.firms = [];
      state.products = [];
      state.brands = [];
      state.sales = [];
      state.purchases = [];
      state.categories = [];
      },
    },
  },
);

export const { fetchStart, getDataSuccess, fetchFail, emptyStates } =
  getDataSlice.actions;

export default getDataSlice.reducer;
