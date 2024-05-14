import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { modalStyle } from "../styles/globalStyles";

const BrandModalComp = () => {
  const [open, setOpen] = useState(false);

  const [brandInfo, setBrandInfo] = useState({
    name: "",
    image: "",
  });

  const { postDatas } = useStockRequest();

  const handleChange = (e) => {
    setBrandInfo({ ...brandInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postDatas("brands", brandInfo);
    setBrandInfo({ name: "", image: "" });
    setOpen(false);
  };
  const handleClose = () => {
    setBrandInfo({
      name: "",
      image: "",
    })
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        NEW BRAND
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
            <TextField
              id="name"
              name="name"
              label="Brand Name"
              variant="outlined"
              value={brandInfo.name}
              onChange={handleChange}
              required
            />
            <TextField
              id="image"
              name="image"
              label="Image"
              variant="outlined"
              value={brandInfo.image}
              onChange={handleChange}
              required
              type="url"
            />
            <Button variant="contained" type="submit">
              ADD BRAND
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default BrandModalComp;
