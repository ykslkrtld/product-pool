import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PurchaseModalComp from "../components/PurchaseModalComp";
import PurchaseEditModal from "../components/PurchaseEditModal";
import Tooltip from "@mui/material/Tooltip";
import { iconStyle } from "../styles/globalStyles";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Products = () => {
  const { getDatas, delDatas, patchDatas } = useStockRequest();
  const { purchases } = useSelector((state) => state.getDatas);
  const [open, setOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "firm",
      headerName: "Firm",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (props) => (
        <Tooltip title="Delete" arrow>
          <DeleteIcon
            onClick={() => delDatas("purchases", props.row.id)}
            sx={iconStyle}
          />
          <EditIcon
            onClick={() => {
              setOpen(true);
              setSelectedPurchase(props.row.id);
            }}
            sx={iconStyle}
          />
        </Tooltip>
      ),
    },
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

  useEffect(() => {
    getDatas("purchases");
  }, []);

  return (
    <>
      <Container sx={{ mb: "1.5rem" }}>
        <Typography
          variant="subtitle1"
          fontSize={"1.8rem"}
          color={"red"}
          my={"1rem"}
        >
          Purchases
        </Typography>
        <PurchaseModalComp />
      </Container>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          // checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
        />
        <PurchaseEditModal
          open={open}
          setOpen={setOpen}
          purchase={rows}
        />
      </Box>
    </>
  );
};

export default Products;
