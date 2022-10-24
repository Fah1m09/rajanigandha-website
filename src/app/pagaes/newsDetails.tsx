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
    <div className="equipment-container">
      {Newses &&
        Newses.filter((x) => x.Id == newsId).map((news) => (
          <Grid container spacing={2} key={news.Id}>
            <Grid item xs={12} lg={8}>
              <img
                src={news.Image}
                alt="newsImage"
                width="400px"
                height="400px"
              />
            </Grid>
            <Grid item xs={12}>
              <div className="news-date">
                <span>Date: </span>
                <span>{news.Time}</span>
              </div>
              <h3 className="news-title">{news.Title}</h3>
              <br />
              <p>{news.Description}</p>
            </Grid>
          </Grid>
        ))}
    </div>
  );
}
