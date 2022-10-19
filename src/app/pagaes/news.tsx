import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NewsData from "../../assets/newsdb";

export default function News() {
  const Newses = NewsData;

  return (
    <div className="equipment-container">
      {Newses &&
        Newses.map((news) => (
          <Grid className="news-wrapper" container spacing={2} key={news.Id}>
            <Grid item xs={4}>
              <div className="news-image">
                <Link className="news-title" to={`/news/${news.Id}`}>
                  <img src={news.Image} alt="newsImage" width="300px" />
                </Link>
              </div>
            </Grid>
            <Grid item xs={8}>
              <div>
                <Link className="news-title" to={`/news/${news.Id}`}>
                  <h5>{news.Title}</h5>
                </Link>
                <br />
                <span className="news-brand">{news.Time}</span>
                <p className="news-price">{news.Description}</p>
              </div>
            </Grid>
          </Grid>
        ))}
    </div>
  );
}
