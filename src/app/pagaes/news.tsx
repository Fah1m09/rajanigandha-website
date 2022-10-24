import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import NewsData from "../../assets/newsdb";

export default function News() {
  const Newses = NewsData;

  return (
    <div className="equipment-container">
      {Newses &&
        Newses.map((news) => (
          <Grid container spacing={2} key={news.Id}>
            <Paper>
              <div className="news-image">
                <img
                  src={news.Image}
                  alt="newsImage"
                  width="250px"
                  height="100%"
                />
              </div>
              <div className="news-body">
                <Link className="news-title" to={`/news/${news.Id}`}>
                  <h5>{news.Title}</h5>
                </Link>
                <span className="news-date">{news.Time}</span>
                <p className="news-price">{news.Description}</p>
              </div>
            </Paper>
          </Grid>
        ))}
    </div>
  );
}
