import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import uprx50 from "../../assets/img/Equipments/rx50.png";
import upspinx5 from "../../assets/img/Equipments/spinx5.png";
import upsping5comp from "../../assets/img/Equipments/spin5compact.png";
import React from "react";

export default function Equipment() {
  const Equipments = [
    {
      Id: 1,
      Image: uprx50,
      Name: "Test1",
      Category: "A",
      Price: 0,
      Description: "This is test 1",
    },
    {
      Id: 2,
      Image: upspinx5,
      Name: "Test2",
      Category: "B",
      Price: 0,
      Description: "This is test 2",
    },
    {
      Id: 3,
      Image: upsping5comp,
      Name: "Test3",
      Category: "A",
      Price: 0,
      Description: "This is test 3",
    },
    {
      Id: 4,
      Image: upsping5comp,
      Name: "1 Test",
      Category: "A",
      Price: 0,
      Description: "Loream Ipsum",
    },
    {
      Id: 5,
      Image: upsping5comp,
      Name: "2 Test",
      Category: "B",
      Price: 0,
      Description: "This is test",
    },
    {
      Id: 6,
      Image: upspinx5,
      Name: "3 Test",
      Category: "A",
      Price: 0,
      Description: "This is test",
    },
    {
      Id: 7,
      Image: uprx50,
      Name: "Test13",
      Category: "B",
      Price: 0,
      Description: "Loream Ipsum",
    },
    {
      Id: 8,
      Image: upspinx5,
      Name: "Test12",
      Category: "A",
      Price: 0,
      Description: "This is test",
    },
    {
      Id: 9,
      Image: uprx50,
      Name: "Test11",
      Category: "B",
      Price: 0,
      Description: "Loream Ipsum",
    },
  ];
  return (
    <div className="equipment-container">
   <Grid container spacing={2} >
      {Equipments.map((x) => (
        <Grid item xs={12} lg={4}>
          <Card 
           raised
           sx={{
             maxWidth: 400,
             margin: "0 1rem",
             padding: "0.1rem",
           }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                image={x.Image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {x.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {x.Category}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                {x.Price}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>  
 
  );
}
