import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import EquipmetsData from "../../assets/db";

export default function Equipment() {
  const Categories = [
    { Name: "Full Auto BioChemistry", Value: "Full Auto BioChemistry" },
    { Name: "Auto Hematology Analyzer", Value: "Auto Hematology Analyzer" },
    { Name: "Semi Auto BioChemistry", Value: "Semi Auto BioChemistry" },
    { Name: "Electrolite", Value: "Electrolite" },
    { Name: "Others", Value: "Others" },
  ];

  const Equipments = EquipmetsData;
  const [equipmentList, setEquipmentList] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (Equipments) {
      setEquipmentList(Equipments);
    }
  }, []);

  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (filter === "") {
      return equipmentList;
    }
    return equipmentList.filter((item) => item.Category === filter);
  }

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
                <MenuItem value={cat.Value} key={cat.Value}>
                  {cat.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {Equipments &&
          filteredList.map((equipment) => (
            <Grid item xs={12} lg={4} key={equipment.Id}>
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
                  <CardContent>
                    <Link
                      className="equipment-title"
                      to={`/equipments/${equipment.Id}`}
                    >
                      {equipment.Name}
                    </Link>
                    <br />
                    <span className="equipment-category">
                      {equipment.Category}
                    </span>
                    <span className="equipment-brand">{equipment.Brand}</span>
                    <p className="equipment-price">
                      {equipment.Price != 0
                        ? equipment.Price
                        : "Call for price"}
                    </p>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
