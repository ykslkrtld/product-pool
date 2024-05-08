import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchFail,
  fetchStart,
  getDataSuccess,
  delDataSuccess,
} from "../features/getDataSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useStockRequest = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  const getDatas = async (endpoint) => {
    dispatch(fetchStart());
    try {
      const {
        data: { data },
      } = await axiosToken(`/${endpoint}`);
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
      dispatch(delDataSuccess({ key: endpoint, id }));
      toastSuccessNotify("Silme işlemi başarılı");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Silme işlemi başarısız oldu");
      console.log(error);
    }
  };

  return { getDatas, delDatas };
};

export default useStockRequest;
