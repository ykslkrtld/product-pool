import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
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
            sx={{ width: 300, padding: "1rem", paddingBottom: "0" }}
            key={firm._id}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {firm.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {firm.address}
              </Typography>
              <CardMedia
                sx={{ height: 140, objectFit: "contain" }}
                image={firm?.image}
                component="img"
              />
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                {firm?.phone}
              </Typography>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Tooltip title="Delete" arrow>
                <Button onClick={() => {delDatas("firms", firm._id).then(() => getDatas("firms"));}}>
                  <DeleteIcon sx={{ ":hover": { color: "red" } }} />
                </Button>
              </Tooltip>
              <Tooltip title="Edit" arrow>
                <Button onClick={() => handleEdit(firm._id)}>
                  <EditIcon sx={{ ":hover": { color: "red" } }} />
                </Button>
              </Tooltip>
              </CardActions>
            </CardContent>
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
