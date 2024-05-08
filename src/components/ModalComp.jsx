import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField } from "@mui/material";

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

export default function ModalComp({ open, setOpen }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} display="flex" flexDirection="column" gap="1rem" component="form">
            <TextField
              id="name"
              name="name"
              label="Firm Name"
              variant="outlined"
              required
            />
            <TextField
              id="phone"
              name="phone"
              label="Phone"
              variant="outlined"
            />
            <TextField
              id="address"
              name="address"
              label="Address"
              variant="outlined"
              required 
            />
            <TextField
              id="image"
              name="image"
              label="Image"
              variant="outlined"
              required type="url"
            />
      <Button variant="contained">ADD FIRM</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
