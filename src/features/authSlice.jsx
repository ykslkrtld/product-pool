import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: "",
  token: "",
  loading: false,
  error: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart : (state) => {
      state.loading = true
    },
    loginSuccess: (state, {payload}) => {
      state.loading = false
      state.user = payload.user.username
      state.token = payload.token
    },
    registerSuccess: (state, {payload}) => {
      state.loading = false
      state.user = payload.data.username
      state.token = payload.token
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
    fetchEnd: (state, {payload}) => {
      state.loading = false
      state.user = ""
      state.token = ""
    }
  },
})

export const {fetchStart, loginSuccess, fetchFail, registerSuccess, fetchEnd} = authSlice.actions
export default authSlice.reducer
