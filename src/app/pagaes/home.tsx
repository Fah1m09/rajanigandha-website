import { Box, Grid, Paper, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import spinlogo from "../../assets/img/spinlogo.png";
import microlab from "../../assets/img/microlab.png";
import service from "../../assets/img/service.svg";
import reagent from "../../assets/img/reagent.svg";
import equipment from "../../assets/img/equipment.svg";
import undraw_building from "../../assets/img/undraw_building.svg";
import undraw_security from "../../assets/img/undraw_security.svg";
import undraw_server from "../../assets/img/undraw_server.svg";
import uprx50 from "../../assets/img/uprx50.png";
import upspinx5 from "../../assets/img/upspinx5.png";
import upsping5comp from "../../assets/img/upsping5comp.png";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";

export default function HomePage() {
  const img = [uprx50, upspinx5, upsping5comp];
  const [current, setCurrent] = useState(0);

  const handleBack = () => {
    current === 0 ? setCurrent(img.length - 1) : setCurrent(current - 1);
  };

  const handleForward = () => {
    current === img.length - 1 ? setCurrent(0) : setCurrent(current + 1);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <div className="header">
            <div className="inner-header flex">
              <h1>Welcome to Rajanigandha International</h1>
            </div>

            <svg
              className="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shape-rendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className="parallax">
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="0"
                  fill="rgba(255,255,255,0.7"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(255,255,255,0.5)"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="5"
                  fill="rgba(255,255,255,0.3)"
                />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </div>
        </Grid>
      </Grid>
      <div className="container">
        <Grid container spacing={2}>
          <Grid item={true} xs={12}>
            <div>
              <h1 className="heading">About US</h1>
              <p className="about-text">
                Welcome to the official site of Rajanigandha International,
                Country's one of the oldest Medical Equipment & Diagnostic
                Reagent Importer Supplier. Our Journey have been started since
                1989. Till then we are trying our best to provide best diagnotic
                equipment along with rapid service. In this successful journey
                of nearly 3 decades,we have achieved trust of innumerable
                people. We will not be derailed from our goal.
              </p>
            </div>
          </Grid>
          <Grid item={true} xs={12}>
            <div>
              <h1 className="heading">Our Brands</h1>
            </div>
          </Grid>
          <Grid item={true} xs={12}>
            <Grid container className="brand">
              <Grid item xs={12} lg={4}>
                <a
                  className="brand-image"
                  href="http://www.spinreact.com/"
                  target="_blank"
                >
                  <img src={spinlogo} alt="spinreact" />
                </a>
              </Grid>
              <Grid item xs={12} lg={8}>
                <h3 style={{ color: "#232f5f" }}>
                  <u>Spinreact</u>
                </h3>
                <p>
                  Spinreact is one of the leading company in electro-medical
                  equipment and reagents in the world. Since 1990, we,
                  Rajanigandha International are the exclusive ditributor of
                  SPINREACT in Bangladesh! During the last 43 years, SPINREACT
                  has been fully devoted on developing and manufacturing “in
                  vitro” Diagnostic Reagents. Their wide experience on the
                  research and manufacturing Clinical Diagnostic Reagents has
                  managed SPINREACT to be able to offer a larger and competitive
                  range of products with the highest quality. SPINREACT,
                  manufactures all its products on the new production plant of
                  Sant Esteve de Bas. The quality system implemented by
                  SPINREACT, has been certified according standards ISO
                  9001-2015, ISO 14001:2015 and ISO 13485-2016.
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={12}>
            <Grid container className="brand">
              <Grid item xs={12} lg={8}>
                <h3 style={{ color: "#193a6b" }}>
                  <u>Microlab</u>
                </h3>
                <p>
                  Microlab intruments is one of the finest medical equipment
                  producer of India also around the world. We have started our
                  mutual journey from 2008. In Bangladesh, we are the sole and
                  exclusive distributor of Microlab Instruments. According to
                  their views, "When it matters to quality of life, we provide
                  quality products. Micro Lab Instruments started as servicing
                  company for Biochemistry analyzers, blood cell counters &
                  clinical diagnostic products with an efficient after sales
                  service team of professionals in 1994. In 2006 Micro lab
                  stepped into manufacturing and established as manufacturing
                  unit since then."
                </p>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Box display="flex" justifyContent="flex-end">
                  <a
                    className="brand-image"
                    href="https://www.microlab.co.in/"
                    target="_blank"
                  >
                    <img src={microlab} alt="microlab" />
                  </a>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h1 className="heading">Why Rajanigandha?</h1>
          </Grid>
          <Grid item xs={12} lg={4}>
            <img className="small-svg" src={undraw_building} alt="" />
          </Grid>
          <Grid item xs={12} lg={4} justifyContent="center" alignItems="center">
            <img className="small-svg" src={undraw_security} alt="" />
          </Grid>
          <Grid item xs={12} lg={4} justifyContent="center" alignItems="center">
            <img className="small-svg" src={undraw_server} alt="" />
          </Grid>
          <Grid item xs={12}>
            <h1 className="heading">Our Services</h1>
          </Grid>
          <Grid item={true} xs={12} lg={4}>
            <Grid container>
              <Grid item xs={12} className="service-card">
                <div className="card-img">
                  <img src={equipment} alt="equipment-logo-svg" />
                </div>
                <div className="card-text">
                  <h3>
                    <u>Equipments</u>
                  </h3>
                  <p>
                    We sell varities of medical equipments related to blood
                    testing
                  </p>
                  <button className="card-button">Browse</button>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} lg={4}>
            <Grid container>
              <Grid item xs={12} className="service-card">
                <div className="card-img">
                  <img src={reagent} alt="reagent-logo-svg" />
                </div>
                <div className="card-text">
                  <h3>
                    <u>Reagent</u>
                  </h3>
                  <p>
                    All sorts of blood testing reagents are avaliable in our
                    house.
                  </p>
                  <button className="card-button">Browse</button>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} lg={4}>
            <Grid container>
              <Grid item xs={12} className="service-card">
                <div className="card-img">
                  <img src={service} alt="service-logo-svg" />
                </div>
                <div className="card-text">
                  <h3>
                    <u>Services</u>
                  </h3>
                  <p>Regular maintenance of our equipments are ensured by us</p>
                  <button className="card-button">Call of Details</button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
