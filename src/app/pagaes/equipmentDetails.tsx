import { Chip, Grid, Paper, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useParams } from "react-router-dom";
import EquipmetsData from "../../assets/db";
import { iEquipment } from "../../types/Equipment";

export default function EquipmentDetails() {
  const { equipmentId } = useParams();
  const Equipments = EquipmetsData;
  return (
    <div className="equipment-container">
      {Equipments &&
        Equipments.filter((x) => x.Id == equipmentId).map((equipment) => (
          <Grid container spacing={2} key={equipment.Id}>
            <Grid item xs={12} lg={4}>
              <Card
                raised
                sx={{
                  maxWidth: 450,
                  margin: "0 0.5rem",
                  padding: "0 0.1rem",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={equipment.Image}
                    alt="equipment-image"
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} lg={8}>
              <h3>{equipment.Name}</h3>
              <Stack spacing={1} alignItems="start">
                <Stack spacing={1} textAlign="left">
                  <Chip label={"Category:" + equipment.Category} />
                  <Chip label={"Brand:" + equipment.Brand} variant="outlined" />
                </Stack>
              </Stack>

              <h5 style={{ marginTop: "50px", marginBottom: "20px" }}>
                Details
              </h5>
              <ul>{String(equipment.Description).split("\n")}</ul>
            </Grid>
          </Grid>
        ))}
    </div>
  );
}
