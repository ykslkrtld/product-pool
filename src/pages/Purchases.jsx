import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PurchaseModalComp from "../components/PurchaseModalComp";
import PurchaseEditModal from "../components/PurchaseEditModal";
import Tooltip from "@mui/material/Tooltip";
import { iconStyle } from "../styles/globalStyles";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";

const Purchases = () => {
  const { getDatas, delDatas } = useStockRequest();
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
      type: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      getActions: (props) => [
        <Tooltip title="Delete" arrow>
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => delDatas("purchases", props.row.id)}
          label="Delete"
          sx={iconStyle}
        />
        </Tooltip>,
        <Tooltip title="Edit" arrow>
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            setOpen(true);
            setSelectedPurchase(props.row.id);
          }}
          label="Print"
          sx={iconStyle}
        />
        </Tooltip>,
        <PurchaseEditModal
          open={open && selectedPurchase === props.row.id}
          setOpen={setOpen}
          purchase={props.row}
        />,
      ],
    },
  ];


  const rows = purchases.map((purchase) => ({
    id: purchase._id,
    date: new Date(purchase.createdAt).toLocaleString(),
    firm: purchase.firmId.name,
    brand:  purchase.brandId.name,
    product: purchase.productId.name,
    quantity: purchase.quantity,
    price: purchase.price,
    amount: purchase.amount,
    firmId: purchase.firmId._id,
    brandId: purchase.brandId._id,
    productId: purchase.productId._id
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
          autoHeight
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          // checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </>
  );
};

export default Purchases;
