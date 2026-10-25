import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./../assets/scss/App.scss";
import MissingRoute from "./components/MissingRoute";
import Loader from "./features/Loader/Loader";
import HomePage from "./pagaes/home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Equipment from "./pagaes/equipment";
import Reagent from "./pagaes/reagent";
import Contact from "./pagaes/contact";
import EquipmentDetails from "./pagaes/equipmentDetails";
import News from "./pagaes/news";
import NewsDetails from "./pagaes/newsDetails";

const App = () => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
  }), []);

  return (
    <div className={mode === "dark" ? "app-theme dark min-h-screen bg-[#0A0A0A] text-white" : "app-theme min-h-screen bg-white text-slate-900"}>
      <Router basename="/">
        <Header colorMode={colorMode} mode={mode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/equipments" element={<Equipment />} />
          <Route path="/equipments/:equipmentId" element={<EquipmentDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:newsId" element={<NewsDetails />} />
          <Route path="/reagent" element={<Reagent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<MissingRoute />} />
        </Routes>
        <Loader />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
