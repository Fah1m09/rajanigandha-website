import { Grid, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useParams } from "react-router-dom";
import EquipmetsData from "../../assets/db";

export default function EquipmentDetails() {
  const { equipmentId } = useParams();
  const Equipments = EquipmetsData;
  return (
    <>
      {Equipments &&
        Equipments.filter((x) => x.Id == equipmentId).map((equipment) => (
          <Grid container spacing={2} key={equipment.Id}>
            <Grid item xs={12} lg={4}>
              <Card
                raised
                sx={{
                  maxWidth: 420,
                  margin: "0 0.5rem",
                  padding: "0 0.1rem",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={equipment.Image}
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} lg={8}>
              <h3>{equipment.Name}</h3>
              <span>Category: </span>
              <span>{equipment.Category}</span>
              <br />
              <span>Brand: </span>
              <span>{equipment.Brand}</span>
              <h5>Details</h5>
              {equipment.Description}
            </Grid>
          </Grid>
        ))}
    </>
  );
}
