import React from "react";
import Grid from "@material-ui/core/Grid";
import TableDocument from "./TableDocument";
import SideBarNavigation from "./SideBarNavigation";
import Reactotron from 'reactotron-react-js';
import Paper from '@material-ui/core/Paper';


export default function Dashboard() {

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <SideBarNavigation />
        </Grid>
        <Grid item xs={9}>
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

            <Grid item xs={3}>
                <Paper elevation={3} style={{padding: "1vw"}}>
                    <h3>
                      Send Documents Today
                    </h3>
                    <h1 style={{color: 'green'}}>
                      5 Document(s)
                    </h1>
                    <i>Total</i>

                </Paper>
            </Grid>

            <Grid item xs={3}>
                <Paper elevation={3} style={{padding: "1vw"}}>
                  <h3>
                    Send Documents This Week
                  </h3>
                  <h1 style={{color: 'green'}}>
                    5 Document(s)
                  </h1>
                  <i>Total</i>

                </Paper>
            </Grid>

            <Grid item xs={3}>
                <Paper elevation={3} style={{padding: "1vw"}}>
                  <h3>
                    Receive Documents Today
                  </h3>
                  <h1 style={{color: 'green'}}>
                    5 out of 30
                  </h1>
                  <i>Total</i>

                </Paper>
            </Grid>

            <Grid item xs={3}>
                <Paper elevation={3} style={{padding: "1vw"}}>
                  <h3>
                    Receive Documents This Week
                  </h3>
                  <h1 style={{color: 'green'}}>
                    10 out of 60
                  </h1>
                  <i>Total</i>

                </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>


      </Grid>
    </div>
  );
}
