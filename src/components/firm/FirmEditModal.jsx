import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useStockRequest from "../../services/useStockRequest";
import { modalStyle, buttonStyle } from "../../styles/globalStyles";

const FirmEditModal = ({open, setOpen, firm}) => {

  const {name, phone, address, image, _id} = firm

  const [firmInfo, setFirmInfo] = useState({
    name,
    phone,
    address,
    image,
  });

  const { patchDatas } = useStockRequest();

  const handleChange = (e) => {
    setFirmInfo({ ...firmInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    patchDatas("firms", firmInfo, _id);
    setOpen(false)  
};

const handleClose = () => {
  setFirmInfo({
    name,
    phone,
    address,
    image,
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
            <TextField
              id="name"
              name="name"
              label="Firm Name"
              variant="outlined"
              value={firmInfo.name}
              onChange={handleChange}
              required
            />
            <TextField
              id="phone"
              name="phone"
              label="Phone"
              variant="outlined"
              value={firmInfo.phone}
              onChange={handleChange}
              required
            />
            <TextField
              id="address"
              name="address"
              label="Address"
              variant="outlined"
              value={firmInfo.address}
              onChange={handleChange}
              required
            />
            <TextField
              id="image"
              name="image"
              label="Image"
              variant="outlined"
              value={firmInfo.image}
              onChange={handleChange}
              required
              type="url"
            />
            <Button variant="contained" type="submit" sx={buttonStyle}>
              UPDATE FIRM
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default FirmEditModal