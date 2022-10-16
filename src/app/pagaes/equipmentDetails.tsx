import { Grid, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EquipmentDetails(props) {
  const params = useParams();
  const { Equipment } = props;
  const [equipmentId, setEquipmentId] = React.useState(
    parseInt(params["equipmentId"])
  );

  useEffect(() => {
    setEquipmentId(parseInt(props.match.params.equipmentId));
  }, [props.match.params.equipmentId]);

  return (
    <>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {Equipment.Name}
          </Grid>
          <Grid item xs={8}>
            {Equipment.Category}
          </Grid>
          <Grid item xs={12}>
            <h3>Details</h3>
            {Equipment.Description}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
