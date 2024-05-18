import useStockRequest from "../services/useStockRequest";


const Home = () => {
  const { getDatas } = useStockRequest();


  return (
    <div>Home</div>
  )
}

export default Home