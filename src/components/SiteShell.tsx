"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Loader from "../features/Loader/Loader";

// Everything that used to live in App.tsx: theme state, Redux, header and footer around each page.
export default function SiteShell({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
  }), []);

  return (
    <Provider store={store}>
      <div className={mode === "dark" ? "app-theme dark min-h-screen bg-[#0A0A0A] text-white" : "app-theme min-h-screen bg-white text-slate-900"}>
        <Header colorMode={colorMode} mode={mode} />
        {children}
        <Loader />
        <Footer />
      </div>
    </Provider>
  );
}
