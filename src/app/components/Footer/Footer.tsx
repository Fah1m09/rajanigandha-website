import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <Grid container className="footer-wrapper">
      <Grid item xs={12} className="footer-social">
        <p>Social Links</p>
      </Grid>
      <Grid item xs={12}>
        <Grid container className="footer-links">
          <Grid item xs={12} lg={4}>
            <p>
              Rajanigandha International
              <br />
              Eastern Commercial Complex 73 kakrail,
              <br />
              5th floor, Room no- 5\14, Dhaka-1000, Bangladesh
            </p>
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
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Rajanigandha International</p>
        </div>
      </Grid>
    </Grid>
  );
}
