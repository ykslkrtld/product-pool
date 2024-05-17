import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import useStockRequest from "../../services/useStockRequest";
import { useSelector } from "react-redux";
import { modalStyle } from "../../styles/globalStyles";

const ProductEditModal = ({open, setOpen, product}) => {

  const { brandId, categoryId, id, name} = product
  console.log(product)
  
  const [productInfo, setProductInfo] = useState({
    categoryId,
    brandId,
    name,
  });

  const { patchDatas } = useStockRequest();

  const { brands, categories } = useSelector((state) => state.getDatas);

  const handleChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    patchDatas("products", productInfo, id);
    setOpen(false)  
};

const handleClose = () => {
  setProductInfo({
    categoryId,
    brandId,
    name,
  });
  setOpen(false);
};

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
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                name="categoryId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productInfo.categoryId}
                label="Category"
                onChange={handleChange}
                required
              >
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
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
                value={productInfo.brandId}
                label="Brand"
                onChange={handleChange}
                required
              >
                {brands?.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="name"
              name="name"
              label="Product Name"
              variant="outlined"
              value={productInfo.name}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type="submit">
              UPDATE PRODUCT
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ProductEditModal