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
import MenuList from "@mui/material/MenuList";
import NestedMenuItem from "material-ui-nested-menu-item";

const Header = (props) => {
  const [menuItem, setMenuItem] = useState([
    {
      Id: 1,
      Name: "Equipments",
      showSubmenu: false,
      subPartition: [
        {
          Id: 1,
          SubName: "Full Auto BioChemistry",
        },
        {
          Id: 2,
          SubName: "Auto Hematology",
        },
        {
          Id: 3,
          SubName: "Semi Autp Biochemistry",
        },
        {
          Id: 4,
          SubName: "Electrolite",
        },
        {
          Id: 5,
          SubName: "Other",
        },
      ],
    },
    {
      Id: 2,
      Name: "Reagents",
      showSubmenu: false,
      subPartition: [
        {
          Id: 1,
          SubName: "Clinical Chemistry",
        },
        {
          Id: 2,
          SubName: "Immuno Chemistry",
        },
        {
          Id: 3,
          SubName: "Blood Grouping",
        },
        {
          Id: 4,
          SubName: "Serology",
        },
      ],
    },
    {
      Id: 3,
      Name: "About US",
      showSubmenu: false,
      subPartition: [],
    },
    {
      Id: 4,
      Name: "Contact US",
      showSubmenu: false,
      subPartition: [],
    },
  ]);

  const { theme, colorMode } = props;

  const [open, setOpen] = useState(false);

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  const handleNavMenu = (Id) => {
    let tempArray = [...menuItem];
    tempArray[Id - 1].showSubmenu = !tempArray[Id - 1].showSubmenu;
    setMenuItem(tempArray);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Rajanigandha International
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
          href=""
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
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
              <Button
                className="link"
                onMouseOver={() => handleNavMenu(page.Id)}
                sx={{ my: 2, color: "white" }}
              >
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
          <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="User" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
