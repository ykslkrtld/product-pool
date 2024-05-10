import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import useStockRequest from "../services/useStockRequest";

const Purchases = () => {
  const { getDatas } = useStockRequest();
  const { purchases } = useSelector((state) => state.getDatas);
  console.log(purchases);

  const columns = [
    { field: "date", headerName: "Date", width: 130 },
    { field: "firm", headerName: "Firm", width: 130 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "product", headerName: "Product", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "amount", headerName: "Amount", width: 100 },
    { field: "actions", headerName: "Actions", width: 100 },
  ];

  const rows = purchases.map((purchase) => ({
    id: purchase._id,
    date: new Date(purchase.createdAt).toLocaleString(),
    firm: purchase.firmId ? purchase.firmId.name : "N/A",
    brand: purchase.brandId ? purchase.brandId.name : "N/A",
    product: purchase.productId ? purchase.productId.name : "N/A",
    quantity: purchase.quantity,
    price: purchase.price,
    amount: purchase.amount,
  }));

  React.useEffect(() => {
    getDatas("purchases");
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
};

export default Purchases;
