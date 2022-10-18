import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./../assets/scss/App.scss";
import MissingRoute from "./components/MissingRoute";
import Loader from "./features/Loader/Loader";
import { SnackbarProvider } from "notistack";
import SnackbarAction from "./components/SnackBarUtils/SnackBarAction";
import { SnackbarUtilsConfigurator } from "./components/SnackBarUtils/SnackBarUtils";
import HomePage from "./pagaes/home";
import { createTheme, Paper, ThemeProvider } from "@mui/material";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Equipment from "./pagaes/equipment";
import Reagent from "./pagaes/reagent";
import Contact from "./pagaes/contact";
import EquipmentDetails from "./pagaes/equipmentDetails";
import News from "./pagaes/news";
import NewsDetails from "./pagaes/newsDetails";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <SnackbarProvider
      action={(key) => <SnackbarAction id={key} />}
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <SnackbarUtilsConfigurator />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Paper>
            <Router basename="/">
              <Header theme={theme} colorMode={colorMode} mode={mode} />
              <Routes>
                {/* map routes from menu constants */}
                {/* <Route path="/" element={<Navigate to={menus[0].path} />} /> */}
                <Route path="/" element={<HomePage />} />
                <Route path="/equipments" element={<Equipment />} />
                <Route
                  path="/equipments/:equipmentId"
                  element={<EquipmentDetails />}
                />
                <Route path="/news" element={<News />} />
                <Route path="/news/:newsId" element={<NewsDetails />} />
                <Route path="/reagent" element={<Reagent />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<MissingRoute />} />
              </Routes>
              <Loader />
              <Footer />
            </Router>
          </Paper>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
