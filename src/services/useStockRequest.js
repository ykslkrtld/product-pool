import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart, getDataSuccess } from "../features/getDataSlice"


const useStockRequest = () => {
    const {axiosToken} = useAxios()
    const dispatch = useDispatch()

    const getDatas = async(endpoint) => {
        dispatch(fetchStart())
        try {
            const {data:{data}} = await axiosToken(`/${endpoint}`)
            console.log(data)
            dispatch(getDataSuccess({data, key:endpoint}))
        } catch (error) {
            dispatch(fetchFail())
            console.log(error)
        }
    }
    return {getDatas}
}

export default useStockRequest