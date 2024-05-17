import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ProductModalComp from "../components/product/ProductModalComp";
import ProductEditModal from "../components/product/ProductEditModal";
import Tooltip from "@mui/material/Tooltip";
import { iconStyle } from "../styles/globalStyles";
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import TableSkeleton, { NoDataMessage } from "../components/DataFetchMessages"

const Products = () => {
  const { getDatas, delDatas } = useStockRequest();
  const { products, loading } = useSelector((state) => state.getDatas);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', flex:1, headerAlign:"center", align:"center" },
    {
      field: 'category',
      headerName: 'Category',
      flex:1,
      headerAlign:"center", 
      align:"center"
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex:1,
      headerAlign:"center", 
      align:"center"
    },
    {
      field: 'name',
      headerName: 'Name',
      flex:1,
      headerAlign:"center", 
      align:"center"
    },
    {
      field: 'stock',
      headerName: 'Stock',
      flex:1,
      headerAlign:"center", 
      align:"center"
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
          onClick={() => delDatas("products", props.row.id)}
          label="Delete"
          sx={iconStyle}
        />
        </Tooltip>,
        <Tooltip title="Edit" arrow>
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            setOpen(true);
            setSelectedProduct(props.row.id);
          }}
          label="Edit"
          sx={iconStyle}
        />
        </Tooltip>,
        <ProductEditModal
          open={open && selectedProduct === props.row.id}
          setOpen={setOpen}
          product={props.row}
        />,
      ],
    },
  ];
  
  const rows = products.map((product) => ({
    brand: product.brandId.name,
    category: product.categoryId.name,
    name: product.name,
    stock: product.quantity,
    id: product._id,
    brandId: product.brandId._id,
    categoryId: product.categoryId._id,
  }));

  useEffect(() => {
    getDatas("products");
    getDatas("categories");
    getDatas("brands");
  }, []);

  return (
    <>
    <Container sx={{mb:"1.5rem"}} >
      <Typography
        variant="subtitle1"
        fontSize={"1.8rem"}
        color={"darkorange"}
        my={"1rem"}
      >
        Products
      </Typography>
      <ProductModalComp/>
      </Container>
      {loading && <TableSkeleton />}
      {!loading && !products.length && <NoDataMessage />}
      {!loading && products.length > 0 && 
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSizeOptions={[5,10,25,50,100]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
    }
    </>
  )
}

export default Products;