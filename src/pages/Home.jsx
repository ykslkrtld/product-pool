import Charts from "../components/home/Charts"
import KPICards from "../components/home/KPICards"
import useStockRequest from "../services/useStockRequest"
import { useEffect } from "react"

const Home = () => {
  const { getDatas } = useStockRequest()

  useEffect(() => {
    getDatas("sales")
    getDatas("purchases")
  }, [])

  return (
    <div>
      <KPICards />
      <Charts />
    </div>
  )
}

export default Home
