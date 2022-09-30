import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import RajaniLogo from "../../../assets/img/rajanigondha.png";

const Header = (props) => {
  const [menuItem, setMenuItem] = useState([
    {
      Id: 1,
      Name: "Equipments",
    },
    {
      Id: 2,
      Name: "Reagents",
    },
    {
      Id: 3,
      Name: "About US",
    },
    {
      Id: 4,
      Name: "Contact US",
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
              <Button className="link" sx={{ my: 2, color: "white" }}>
                {page.Name}
              </Button>
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
