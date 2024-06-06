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
import FirmModalComp from "../components/firm/FirmModalComp";
import FirmEditModal from "../components/firm/FirmEditModal";
import Tooltip from "@mui/material/Tooltip";
import { iconStyle } from "../styles/globalStyles";
import { CardSkeleton, NoDataMessage} from "../components/DataFetchMessages"

const Firms = () => {
  const { getDatas, delDatas } = useStockRequest();
  const { firms, loading } = useSelector((state) => state.getData);
  const [open, setOpen] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState(null);

  useEffect(() => {
    getDatas("firms");
  }, []);

  return (
    <Container>
      <Typography
        variant="subtitle1"
        fontSize={"1.8rem"}
        color={"purple"}
        my={"1rem"}
      >
        Firms
      </Typography>
      <FirmModalComp />
      {loading && <CardSkeleton/>}
      {!loading && !firms.length && <NoDataMessage />}
      {!loading && firms.length > 0 && 
      <Grid
        container
        justifyContent="center"
        gap="1.2rem"
        marginTop="1.5rem"
        spacing={2}
      >
        {firms.map((firm) => (
            <Card
              sx={{
                width: 300,
                height: 350,
                padding: "1rem",
                paddingBottom: "0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
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
                  <DeleteIcon
                    onClick={() => {delDatas("firms", firm._id);}}
                    sx={iconStyle}
                  />
                </Tooltip>
                <Tooltip title="Edit" arrow>
                  <EditIcon
                    sx={iconStyle}
                    onClick={() => {
                      setOpen(true);
                      setSelectedFirm(firm._id);
                    }}
                  />
                </Tooltip>
              </CardActions>
              <FirmEditModal
                open={open && selectedFirm === firm._id}
                setOpen={setOpen}
                firm={firm}
              />
            </Card>
        ))}
      </Grid>
}
    </Container>
  );
};

export default Firms;
