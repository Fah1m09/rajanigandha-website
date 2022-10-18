import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from "react-router-dom";

import { Button, CardActionArea, CardActions } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import NewsData from "../../assets/newsdb";

export default function News() {
  const Newses = NewsData;
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    if (Newses) {
      setNewsList(Newses);
    }
  }, []);

  return (
    <div className="news-container">
      {Newses &&
        newsList.map((news) => (
          <Grid container spacing={2} key={news.Id}>
            <Grid item xs={4}>
              <img src={news.Image} alt="newsImage" width="250px" />
            </Grid>
            <Grid item xs={8}>
              <Link className="news-title" to={`/news/${news.Id}`}>
                {news.Title}
              </Link>
              <br />
              <span className="news-brand">{news.Time}</span>
              <p className="news-price">{news.Description}</p>
            </Grid>
          </Grid>
        ))}
    </div>
  );
}
