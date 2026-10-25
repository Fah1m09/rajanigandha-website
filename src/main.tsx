import React from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import { Provider } from "react-redux";
import App from "./app/App";
import store from "./app/store";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
