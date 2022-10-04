import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <Grid container className="footer-wrapper">
      <Grid item xs={12} className="footer-social">
        <p>Social Links</p>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <p>Rajanigandha International</p>
          </Grid>
          <Grid item xs={12} lg={4}>
            <p>Useful Links</p>
          </Grid>
          <Grid item xs={12} lg={4}>
            <p>Contact</p>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Rajanigandha International
        </p>
      </Grid>
    </Grid>
  );
}
