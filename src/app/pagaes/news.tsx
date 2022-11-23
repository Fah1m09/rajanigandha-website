import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import NewsData from "../../assets/newsdb";

export default function News() {
  const Newses = NewsData;

  return (
    <div className="equipment-container">
      {Newses &&
        Newses.map((news) => (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 250 }}
                  image={news.Image}
                  alt="Live from space album cover"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {news.Title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {news.Time}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <Typography>{news.Description}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        ))}
    </div>
  );
}
