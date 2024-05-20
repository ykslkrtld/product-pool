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

const PurchaseEditModal = ({open, setOpen, purchase}) => {

  const {firmId, brandId, productId, quantity, price, id} = purchase
  
  const [purchaseInfo, setPurchaseInfo] = useState({
    firmId,
    brandId,
    productId,
    quantity,
    price
  });

  const { patchDatas } = useStockRequest();

  const { brands, products, firms } = useSelector((state) => state.getData);

  const handleChange = (e) => {
    setPurchaseInfo({ ...purchaseInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    patchDatas("purchases", purchaseInfo, id);
    setOpen(false)  
};

const handleClose = () => {
  setPurchaseInfo({
    firmId,
    brandId,
    productId,
    quantity,
    price
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
              <InputLabel id="demo-simple-select-label">Firm</InputLabel>
              <Select
                name="firmId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={purchaseInfo.firmId}
                label="Firm"
                onChange={handleChange}
                required
              >
                {firms?.map((firm) => (
                  <MenuItem key={firm._id} value={firm._id}>
                    {firm.name}
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
                value={purchaseInfo.brandId}
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                name="productId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={purchaseInfo.productId}
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

            <TextField
              id="quantity"
              name="quantity"
              label="Quantity"
              variant="outlined"
              value={purchaseInfo.quantity}
              onChange={handleChange}
              required
            />
            <TextField
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              value={purchaseInfo.price}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type="submit">
              UPDATE PURCHASE
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default PurchaseEditModal