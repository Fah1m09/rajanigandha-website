import { Grid } from "@mui/material";

export default function AboutUs() {
  return (
    <Grid container className="container-area">
      <Grid item xs={12}>
        <h1 className="heading">About Us</h1>
        <p className="about-text">
          Rajanigandha International is a medical equipment and diagnostic
          reagent importer and supplier. Our journey began in 1989, and we
          continue to serve our customers with diagnostic equipment and support.
        </p>
      </Grid>
    </Grid>
  );
}
