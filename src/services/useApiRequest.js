import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


// Custom Hook
const useApiRequest = () => {
  const disPatch = useDispatch();
  const navigate = useNavigate()

   const login = async (userData) => {
    // const BASE_URL = "https://10114.fullstack.clarusway.com"

    disPatch(fetchStart());

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userData
      );
      disPatch(loginSuccess(data));
      toastSuccessNotify("Login başarılı");
      navigate("/stock")
    } catch (error) {
      disPatch(fetchFail());
      toastErrorNotify("Login başarısız oldu");
      console.log(error);
    }
  }
  const register = async () => {}
  const logout = async () => {}


  return {login, register, logout }
}

export default useApiRequest


