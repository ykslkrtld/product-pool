import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BrandModalComp from "../components/brand/BrandModalComp";
import BrandEditModal from "../components/brand/BrandEditModal";
import Tooltip from '@mui/material/Tooltip';
import { iconStyle } from "../styles/globalStyles";
import { CardSkeleton, NoDataMessage } from "../components/DataFetchMessages"

const Brands = () => {
  const { getDatas, delDatas } = useStockRequest();
  const { brands, loading } = useSelector((state) => state.getData);
  const [open, setOpen] = useState({});
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    getDatas("brands");
  }, []);

  return (
    <Container>
      <Typography
        variant="subtitle1"
        fontSize={"1.8rem"}
        color={"purple"}
        my={"1rem"}
      >
        Brands
      </Typography>
      <BrandModalComp />
      {loading && <CardSkeleton/>}
      {!loading && !brands.length && <NoDataMessage />}
      {!loading && brands.length > 0 && 
      <Grid
        container
        justifyContent="center"
        gap="1.2rem"
        marginTop="1.5rem"
        spacing={2}
      >
        {brands.map((brand) => (
          <Card key={brand._id} sx={{ width: 300, padding: "1rem", paddingBottom: "0" }}>
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
              <Tooltip title="Delete" arrow>
                <DeleteIcon onClick={() => {delDatas("brands", brand._id)}} sx={iconStyle} />
              </Tooltip>
              <Tooltip title="Edit" arrow>
                <EditIcon onClick={() => {
                      setOpen(true);
                      setSelectedBrand(brand._id);
                    }} sx={iconStyle} />
              </Tooltip>
                </CardActions>
            </CardContent>
              <BrandEditModal open={open && selectedBrand === brand._id}
                setOpen={setOpen}
                brand={brand}/>
          </Card>
        ))}
      </Grid>
}
    </Container>
  );
};

export default Brands;
