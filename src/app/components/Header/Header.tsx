import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import RajaniLogo from "../../../../public/img/rajanigondha.png";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [menuItem, setMenuItem] = useState([
    {
      Id: 1,
      Name: "Equipments",
      Nav: "/equipments",
    },
    {
      Id: 2,
      Name: "Reagents",
      Nav: "/reagent",
    },
    {
      Id: 3,
      Name: "Contact US",
      Nav: "/contact",
    },
    {
      Id: 4,
      Name: "News",
      Nav: "/news",
    },
  ]);

  const { theme, colorMode } = props;

  const [open, setOpen] = useState(false);

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img className="header-logo" src={RajaniLogo} alt="Rajanigandha Logo" />
        <Typography
          className="header-text"
          variant="h6"
          component="a"
          href="/"
          sx={{
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
          }}
        >
          Rajanigandha <br /> International
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMobileMenu}
          >
            <MenuIcon />
          </IconButton>

          {menuItem.map((page) => (
            <MenuItem key={page.Id}>
              <Typography textAlign="center">{page.Name}</Typography>
            </MenuItem>
          ))}
        </Box>

        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Rajanigandha International
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {menuItem.map((page) => (
            <div className="dropdown" key={page.Id}>
              <Link className="link" to={`${page.Nav}`}>
                {page.Name}
              </Link>
            </div>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
