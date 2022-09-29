import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../hooks/useReduxHooks";

function Loader() {
  const loading = useAppSelector((state) => state.loader.loading);

  if (!loading) {
    return undefined;
  }
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 1050 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;
