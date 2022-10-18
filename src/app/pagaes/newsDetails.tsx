import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useParams } from "react-router-dom";
import NewsData from "../../assets/newsdb";

export default function NewsDetails() {
  const { newsId } = useParams();
  const Newses = NewsData;
  return (
    <>
      {Newses &&
        Newses.filter((x) => x.Id == newsId).map((news) => (
          <Grid container spacing={2} key={news.Id}>
            <Grid item xs={12} lg={8}>
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
                    image={news.Image}
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <h3>{news.Title}</h3>
              <span>Date: </span>
              <span>{news.Time}</span>
              <br />
              <h5>Details</h5>
              {news.Description}
            </Grid>
          </Grid>
        ))}
    </>
  );
}
