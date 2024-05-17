import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useStockRequest from "../../services/useStockRequest";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { modalStyle } from "../../styles/globalStyles";

const ProductModalComp = () => {
  const [open, setOpen] = useState(false);

  const [productInfo, setProductInfo] = useState({
    categoryId: "",
    brandId: "",
    name: "",
  });

  const { postDatas, getDatas } = useStockRequest();

  const { brands, categories } = useSelector((state) => state.getDatas);

  const handleChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postDatas("products", productInfo);
    setProductInfo({ categoryId: "", brandId: "", name: "" });
    setOpen(false);
  };

  const handleClose = () => {
    setProductInfo({
        categoryId: "",
        brandId: "",
      name: "",
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        NEW PRODUCT
      </Button>
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
              ADD PRODUCT
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default ProductModalComp;
