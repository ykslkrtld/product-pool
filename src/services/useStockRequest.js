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
      const {data: { data }} = await axiosToken(`/${endpoint}`);
      dispatch(getDataSuccess({ data, endpoint }));
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
      getDatas(endpoint)
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Silme işlemi başarısız oldu");
      console.log(error);
    }
  };

  const postDatas = async (endpoint, datas) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/${endpoint}`, datas);
      toastSuccessNotify("Ekleme işlemi başarılı");
      getDatas(endpoint)
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Ekleme işlemi başarısız oldu");
      console.log(error);
    }
  };

  const patchDatas = async (endpoint, datas, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.patch(`/${endpoint}/${id}`, datas);
      toastSuccessNotify("Düzenleme işlemi başarılı");
      getDatas(endpoint)
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Düzenleme işlemi başarısız oldu");
      console.log(error);
    }
  };

  return { getDatas, delDatas, postDatas, patchDatas };
};

export default useStockRequest;
