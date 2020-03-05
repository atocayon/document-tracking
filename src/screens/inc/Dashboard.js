import React from "react";
import Grid from "@material-ui/core/Grid";
import TableDocument from "./TableDocument";
import Reactotron from 'reactotron-react-js';



export default function Dashboard() {

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TableDocument
              tableTitle={"Incoming Documents"}

             />
        </Grid>

        <Grid item xs={6}>
          <TableDocument
            tableTitle={"Outgoing Documents"}
          />
        </Grid>
      </Grid>
    </div>
  );
}
