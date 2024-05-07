import { useEffect } from "react";
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

const Firms = () => {
  const { getDatas } = useStockRequest();
  const { firms } = useSelector((state) => state.getDatas);
  useEffect(() => {
    getDatas("firms");
  }, []);

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
      <Button variant="contained" color="success" size="small">
        NEW FIRM
      </Button>
      <Grid
        container
        justifyContent="center"
        gap="1.2rem"
        marginTop="1.5rem"
        spacing={2}
      >
        {firms.map((firm) => (
          <Card sx={{ width: 300, padding: "1rem", paddingBottom:"0" }} key={firm.id}>
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
              // height={"300px"}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              {firm?.phone}
            </Typography>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <DeleteIcon sx={{ ":hover": { color: "red" } }} />
              <EditIcon sx={{ ":hover": { color: "red" } }} />
            </CardActions>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Firms;
