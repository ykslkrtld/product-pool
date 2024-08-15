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
import { modalStyle, buttonStyle } from "../../styles/globalStyles";

const SaleModalComp = () => {
  const [open, setOpen] = useState(false);

  const [saleInfo, setSaleInfo] = useState({
    brandId: "",
    productId: "",
    quantity: "",
    price: ""
  });

  const { postDatas } = useStockRequest();

  const { brands, products } = useSelector((state) => state.getData);

  const handleChange = (e) => {
    setSaleInfo({ ...saleInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postDatas("sales", saleInfo);
    handleClose()
  };

  const handleClose = () => {
    setSaleInfo({
      brandId: "",
      productId: "",
      quantity: "",
      price: ""
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" sx={buttonStyle} onClick={() => setOpen(true)}>
        NEW SALE
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
                {products?.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name}
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
              ADD SALE
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default SaleModalComp;
