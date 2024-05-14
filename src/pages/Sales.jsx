import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaleModalComp from "../components/SaleModalComp";
import SaleEditModal from "../components/SaleEditModal";
import Tooltip from "@mui/material/Tooltip";
import { iconStyle } from "../styles/globalStyles";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";

const Sales = () => {
  const { getDatas, delDatas } = useStockRequest();
  const { sales } = useSelector((state) => state.getDatas);
  const [open, setOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const columns = [
    {
      field: "date",
      headerName: "Date",
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
          onClick={() => delDatas("sales", props.row.id)}
          label="Delete"
          sx={iconStyle}
        />
        </Tooltip>,
        <Tooltip title="Edit" arrow>
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            setOpen(true);
            setSelectedSale(props.row.id);
          }}
          label="Print"
          sx={iconStyle}
        />
        </Tooltip>,
        <SaleEditModal
          open={open && selectedSale === props.row.id}
          setOpen={setOpen}
          sale={props.row}
        />,
      ],
    },
  ];

  const rows = sales.map((sale) => ({
    date: new Date(sale.createdAt).toLocaleString(),
    brand: sale.brandId.name,
    product: sale.productId.name,
    quantity: sale.quantity,
    price: sale.price,
    amount: sale.amount,
    id: sale._id,
    brandId: sale.brandId._id,
    productId: sale.productId._id,
  }));

  useEffect(() => {
    getDatas("sales");
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
          Sales
        </Typography>
        <SaleModalComp />
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

export default Sales;
