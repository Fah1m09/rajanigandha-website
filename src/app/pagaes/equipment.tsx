import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import arx199i from "../../assets/img/Equipments/rx50.png";
import upspinx5 from "../../assets/img/Equipments/spinx5.png";
import upsping5comp from "../../assets/img/Equipments/spin5compact.png";
import urispin120 from "../../assets/img/Equipments/urispin120.png";
import spin800 from "../../assets/img/Equipments/spin800.png";
import spin200e from "../../assets/img/Equipments/spin200e.png";
import spincell3 from "../../assets/img/Equipments/spincell3.png";
import micropipet from "../../assets/img/Equipments/micropipet.png";
import spincell5plus from "../../assets/img/Equipments/spincell5plus.png";
import arxclotsc from "../../assets/img/Equipments/arxclotsc.png";
import rx50v from "../../assets/img/rx50.png";
import microlyte from "../../assets/img/Equipments/microlyte.png";
import { useEffect, useMemo, useState } from "react";

export default function Equipment() {
  const Categories = [
    { Name: "Full Auto BioChemistry", Value: "Full Auto BioChemistry" },
    { Name: "Auto Hematology Analyzer", Value: "Auto Hematology Analyzer" },
    { Name: "Semi Auto BioChemistry", Value: "Semi Auto BioChemistry" },
    { Name: "Electrolite", Value: "Electrolite" },
    { Name: "Others", Value: "Others" },
  ];

  const Equipments = [
    {
      Id: 1,
      Image: spin800,
      Name: "Spin 800",
      Category: "Full Auto BioChemistry",
      Price: 0,
      Description: "This is test 1",
    },
    {
      Id: 2,
      Image: spin200e,
      Name: "Spin 200E",
      Category: "Full Auto BioChemistry",
      Price: 0,
      Description: "This is test 2",
    },
    {
      Id: 3,
      Image: upspinx5,
      Name: "Spin 640",
      Category: "Full Auto BioChemistry",
      Price: 0,
      Description: "This is test 3",
    },
    {
      Id: 4,
      Image: upsping5comp,
      Name: "Spincell 5 compact",
      Category: "Auto Hematology Analyzer",
      Price: 0,
      Description: "Loream Ipsum",
    },
    {
      Id: 5,
      Image: spincell5plus,
      Name: "Spincell 5 plus",
      Category: "Auto Hematology Analyzer",
      Price: 0,
      Description: "This is test",
    },
    {
      Id: 6,
      Image: spincell3,
      Name: "Spincell 3",
      Category: "Auto Hematology Analyzer",
      Price: 0,
      Description: "This is test",
    },
    {
      Id: 7,
      Image: rx50v,
      Name: "RX-50V",
      Category: "Semi Auto BioChemistry",
      Price: 0,
      Description: "Loream Ipsum",
    },
    {
      Id: 8,
      Image: arx199i,
      Name: "ARX-199i",
      Category: "Semi Auto BioChemistry",
      Price: 0,
      Description: "This is test",
    },
    {
      Id: 9,
      Image: microlyte,
      Name: "Microlyte",
      Category: "Electrolite",
      Price: 0,
      Description: "Loream Ipsum",
    },
    {
      Id: 10,
      Image: arxclotsc,
      Name: "ARX-CLOT-SC",
      Category: "Electrolite",
      Price: 0,
      Description: "Loream Ipsum",
    },
    {
      Id: 11,
      Image: urispin120,
      Name: "Urispin 120",
      Category: "Others",
      Price: 0,
      Description: "Loream Ipsum",
    },
    {
      Id: 12,
      Image: micropipet,
      Name: "Micropipette",
      Category: "Others",
      Price: 0,
      Description: "Loream Ipsum",
    },
  ];
  const [equipmentList, setEquipmentList] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setEquipmentList(Equipments);
  }, []);

  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (filter === "") {
      return equipmentList;
    }
    return equipmentList.filter((item) => item.Category === filter);
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [filter, equipmentList]);

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <div className="equipment-container">
      <Grid container spacing={2}>
        <Grid item xs={9}></Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter"
              onChange={handleChange}
            >
              <MenuItem value={""}>All</MenuItem>
              {Categories.map((cat) => (
                <MenuItem value={cat.Value}>{cat.Name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {filteredList.map((x) => (
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
