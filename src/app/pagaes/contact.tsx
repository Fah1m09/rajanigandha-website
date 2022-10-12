import { Paper, Grid, Button, TextField } from "@mui/material";

import CallTwoToneIcon from "@mui/icons-material/CallTwoTone";
import MarkunreadTwoToneIcon from "@mui/icons-material/MarkunreadTwoTone";
import LocationCityTwoToneIcon from "@mui/icons-material/LocationCityTwoTone";
import MapsHomeWorkTwoToneIcon from "@mui/icons-material/MapsHomeWorkTwoTone";

export default function Contact() {
  return (
    <Grid container spacing={2} className="container-area">
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} className="contact-heading-container">
            <h1>Get In Touch</h1>
            <p>If you have any queries feel free to connect with us</p>
          </Grid>
          <Grid container spacing={2} className="contact-heading-container">
            <Grid item xs={6}>
              <Paper className="contact-box-large">
                <CallTwoToneIcon
                  className="rounded-icon-border"
                  color="primary"
                />
                <h5>Call Us On</h5>
                <p>01730376269</p>
                <p>01777799333</p>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className="contact-box-large">
                <MarkunreadTwoToneIcon
                  className="rounded-icon-border"
                  color="primary"
                />
                <h5>Eamil Us</h5>
                <p>rajani@dhaka.net</p>
                <p> . </p>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className="contact-box-small">
                <LocationCityTwoToneIcon
                  className="rounded-icon-border"
                  color="primary"
                />
                <h5>Main Branch</h5>
                <p>5/14, Eastern Commercial Complex</p>
                <p>73 Kakrail, Dhaka 1000, Bangladesh</p>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className="contact-box-small">
                <MapsHomeWorkTwoToneIcon
                  className="rounded-icon-border"
                  color="primary"
                />
                <h5>Chittagong Branch</h5>
                <p>5/14, Eastern Commercial Complex</p>
                <p>73 Kakrail, Dhaka 1000, Bangladesh</p>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className="contact-box-small">
                <MapsHomeWorkTwoToneIcon
                  className="rounded-icon-border"
                  color="primary"
                />
                <h5>Sylhet Branch</h5>
                <p>5/14, Eastern Commercial Complex</p>
                <p>73 Kakrail, Dhaka 1000, Bangladesh</p>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} className="contact-heading-container">
              <div>
                <h1>Our Branches & Distributors</h1>
                <p>
                  We have lots of branches and distributor all across the
                  country
                </p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14607.59915521094!2d90.3654215!3d23.750952700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1665601428019!5m2!1sen!2sbd"
                  width="100%"
                  height="450"
                ></iframe>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12} className="contact-heading-container">
            <h1>Send Us A Message</h1>
            <p>We would love to hear from you!</p>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="Name"
              type="email"
              label="Name"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="Email"
              type="email"
              label="Email"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="Subject"
              type="text"
              label="Subject"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              name="Message"
              type="text"
              label="Message"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
