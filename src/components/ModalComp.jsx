import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalComp() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [firmInfo, setFirmInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const { postDatas, getDatas } = useStockRequest();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFirmInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postDatas("firms", firmInfo).then(() => getDatas("firms"));
    setFirmInfo({ name: "", phone: "", address: "", image: "" });
    handleClose(); // Modal'ı kapatın
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        NEW FIRM
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
            sx={style}
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
              onChange={handleChange} // onChange işlevini ekleyin
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
            <Button variant="contained" type="submit">
              ADD FIRM
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
