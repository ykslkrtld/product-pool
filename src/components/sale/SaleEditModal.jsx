import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import useStockRequest from "../../services/useStockRequest";
import { useSelector } from "react-redux";
import { modalStyle, buttonStyle } from "../../styles/globalStyles";
import { useNavigate } from "react-router-dom";

const SaleEditModal = ({open, setOpen, sale}) => {

  const navigate = useNavigate()

  const { brandId, productId, quantity, price, id} = sale
  
  const [saleInfo, setSaleInfo] = useState({
    brandId,
    productId,
    quantity,
    price
  });

  const { patchDatas } = useStockRequest();

  const { brands, products } = useSelector((state) => state.getData);

  const handleChange = (e) => {
    setSaleInfo({ ...saleInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    patchDatas("sales", saleInfo, id);
    setOpen(false)  
};

const handleClose = () => {
    setSaleInfo({
    brandId,
    productId,
    quantity,
    price
  });
  setOpen(false);
};

const productNamesCount = products.reduce((acc, product) => {
  acc[product.name] = (acc[product.name] || 0) + 1;
  return acc;
}, {});

const formattedProducts = products.map((product) => {
  const isDuplicate = productNamesCount[product.name] > 1;
  return {
    ...product,
    displayName: isDuplicate ? `${product.brandId.name} - ${product.name}` : product.name
  };
});

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={modalStyle}
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
                  <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                name="productId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={saleInfo.productId}
                label="Product"
                onChange={handleChange}
                required
              >
                <MenuItem sx={{borderBottom:"1px solid grey"}} onClick={()=> navigate("/stock/products")}>Add New Product</MenuItem>
                {formattedProducts?.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                name="brandId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={saleInfo.brandId}
                label="Brand"
                onChange={handleChange}
                required
              >
                <MenuItem sx={{borderBottom:"1px solid grey"}} onClick={()=> navigate("/stock/brands")}>Add New Brand</MenuItem>
                {brands?.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="quantity"
              name="quantity"
              label="Quantity"
              variant="outlined"
              value={saleInfo.quantity}
              onChange={handleChange}
              required
            />
            <TextField
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              value={saleInfo.price}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type="submit" sx={buttonStyle}>
              UPDATE SALE
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SaleEditModal