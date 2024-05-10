import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FirmModalComp from "../components/FirmModalComp";
import FirmEditModal from "../components/FirmEditModal";
import Tooltip from '@mui/material/Tooltip';

const Firms = () => {
  const { getDatas, delDatas } = useStockRequest();
  const { firms } = useSelector((state) => state.getDatas);
  const [open, setOpen] = useState({});

  useEffect(() => {
    getDatas("firms");
  }, []);

  const handleEdit = (firmId) => {
    setOpen((prevState) => ({
      ...prevState,
      [firmId]: true,
    }));
  };

  const handleCloseModal = (firmId) => {
    setOpen((prevState) => ({
      ...prevState,
      [firmId]: false,
    }));
  };

  return (
    <Container>
      <Typography
        variant="subtitle1"
        fontSize={"1.8rem"}
        color={"red"}
        my={"1rem"}
      >
        Firms
      </Typography>
      <FirmModalComp />
      <Grid
        container
        justifyContent="center"
        gap="1.2rem"
        marginTop="1.5rem"
        spacing={2}
      >
        {firms.map((firm) => (
          <Card
            sx={{ width: 300, height:350, padding: "1rem", paddingBottom: "0", display:"flex", flexDirection:"column", justifyContent:"space-around", alignItems:"center" }}
            key={firm._id}
          >
              <CardMedia
                sx={{ height: 140, objectFit: "contain" }}
                image={firm?.image}
                component="img"
              />
              <Typography gutterBottom variant="h5" component="div">
                {firm.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {firm.address}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                {firm?.phone}
              </Typography>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Tooltip title="Delete" arrow>
                  <DeleteIcon onClick={() => {delDatas("firms", firm._id).then(() => getDatas("firms"));}} sx={{ ":hover": { color: "red" } }} />
              </Tooltip>
              <Tooltip title="Edit" arrow>
                  <EditIcon onClick={() => handleEdit(firm._id)} sx={{ ":hover": { color: "red" } }} />
              </Tooltip>
              </CardActions>
            {open[firm._id] && (
              <FirmEditModal
                key={firm._id}
                open={open[firm._id]}
                setOpen={(value) => handleCloseModal(firm._id)}
                {...firm}
              />
            )}
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Firms;
