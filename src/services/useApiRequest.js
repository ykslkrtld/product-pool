// import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { fetchFail, fetchStart, loginSuccess, registerSuccess, logoutSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";


// Custom Hook
const useApiRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {axiosToken, axiosPublic} = useAxios()
  // const {token} = useSelector((state) => state.auth )

   const login = async (userData) => {
    // const BASE_URL = "https://10114.fullstack.clarusway.com"

    dispatch(fetchStart());

    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login`,
      //   userData
      // );
      const { data } = await axiosPublic.post("/auth/login/", userData)
      dispatch(loginSuccess(data));
      toastSuccessNotify("Giriş başarılı");
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Giriş başarısız oldu");
      console.log(error);
    }
  }

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/users`,
      //   userInfo
      // );
      const { data } = await axiosPublic.post("/users/", userInfo)
      dispatch(registerSuccess(data));
      toastSuccessNotify("Kayıt başarılı");
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Kayıt işlemi başarısız");
      console.log(error);
    }
  }


  const logout = async () => {
    dispatch(fetchStart());
    try {
      // await axios(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      //   headers: {Authorization: `Token ${token}`}
      // });
      await axiosToken("/auth/logout")
      dispatch(logoutSuccess());
      toastSuccessNotify("Çıkış başarılı"); 
      // navigate("/")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Giriş başarısız oldu");
      console.log(error);
    }
  }


  return {login, register, logout }
}

export default useApiRequest


