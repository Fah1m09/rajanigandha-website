import { SnackbarKey, useSnackbar } from "notistack";
import React from "react";

type SnackbarActionProps = {
  id: SnackbarKey;
};

const SnackbarAction = ({ id }: SnackbarActionProps) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <>
      <button onClick={() => closeSnackbar(id)}>Close</button>
    </>
  );
};

export default SnackbarAction;
