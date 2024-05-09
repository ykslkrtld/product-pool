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
import BrandModalComp from "../components/BrandModalComp";
import BrandEditModal from "../components/BrandEditModal";

const Brands = () => {
  const { getDatas, delDatas } = useStockRequest();
  const { brands } = useSelector((state) => state.getDatas);
  const [open, setOpen] = useState({});

  useEffect(() => {
    getDatas("brands");
  }, []);

  const handleEdit = (brand) => {
    setOpen((prevState) => ({
      ...prevState,
      [brand]: true,
    }));
  };

  const handleCloseModal = (brand) => {
    setOpen((prevState) => ({
      ...prevState,
      [brand]: false,
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
        Brands
      </Typography>
      <BrandModalComp />
      <Grid
        container
        justifyContent="center"
        gap="1.2rem"
        marginTop="1.5rem"
        spacing={2}
      >
        {brands.map((brand) => (
          <Card sx={{ width: 300, padding: "1rem", paddingBottom: "0" }} key={brand._id}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {brand.name}
              </Typography>
              <CardMedia
                sx={{ height: 140, objectFit: "contain" }}
                image={brand?.image}
                component="img"
              />
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={() => {delDatas("brands", brand._id).then(()=> getDatas("brands")) }}><DeleteIcon sx={{ ":hover": { color: "red" } }} /></Button>
                <Button onClick={()=> handleEdit(brand._id)}><EditIcon sx={{ ":hover": { color: "red" } }} /></Button>              </CardActions>
            </CardContent>
            {open[brand._id] && (
              <BrandEditModal
                key={brand._id}
                open={open[brand._id]}
                setOpen={(value) => handleCloseModal(brand._id)}
                {...brand}
              />
            )}
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Brands;
