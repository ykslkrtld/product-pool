import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getDataSuccess,
} from "../features/getDataSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useStockRequest = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  const getDatas = async (endpoint) => {
    dispatch(fetchStart());
    try {
      const {
        data: { data }} = await axiosToken(`/${endpoint}`);
      console.log(data);
      dispatch(getDataSuccess({ data, key: endpoint }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const delDatas = async (endpoint, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${endpoint}/${id}`);
      toastSuccessNotify("Silme işlemi başarılı");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Silme işlemi başarısız oldu");
      console.log(error);
    }
  };

  const postDatas = async (endpoint, firmData) => { // data parametresini ekleyin
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/${endpoint}`, firmData); // data'yı isteğe ekleyin
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };
  
  
  return { getDatas, delDatas, postDatas };
};

export default useStockRequest;
