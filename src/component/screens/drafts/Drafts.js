import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withSnackbar } from "notistack";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import Paper from "@material-ui/core/Paper";
import { getFromStorage } from "../../storage";
import { Redirect } from "react-router-dom";
import TableDocument from "../../common/table/TableDocument";
import Reactotron from "reactotron-react-js";
import axios from "axios";
const head = ["Document ID", "Subject", "Document Type", ""];

function Draft(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [drafts, setDrafts] = useState([]);
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      axios
        .get("http://localhost:4000/dts/getDrafts/" + obj.token)
        .then(res => {
          // Reactotron.log(res);
          setDrafts(res.data);
        })
        .catch(err => {});
    }

    setEndSession(!(obj && obj.token));
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  Reactotron.log(drafts);
  return (
    <Grid container spacing={3}>
      <PrimarySearchAppBar />
      <Grid item xs={2}>
        <SideBarNavigation
          open={open}
          setOpen={setOpen}
          handleClick={handleClick}
        />
      </Grid>
      <Grid item xs={8}>
        <Paper
          elevation={3}
          style={{
            marginTop: 70,
            paddingTop: 0,
            height: "100vh",
            overflow: "auto"
          }}
        >
          {endSession && <Redirect to={"/"} />}
          <div className={"jumbotron"} style={{ padding: 50 }}>
            <div className={"row"}>
              <div className={"col-md-2"}>
                <div className={"row"}>
                  <div className={"col-md-6"}></div>
                  <div className={"col-md-6"}>
                    <div style={{ textAlign: "right" }}></div>
                  </div>
                </div>
              </div>
              <div className={"col-md-8"}></div>
              <div className={"col-md-2"}></div>
            </div>
          </div>

          <div style={{ marginLeft: 10, marginRight: 10 }}>
            <div className={"row"}>
              <div className={"col-md-12"}>
                <TableDocument head={head} content={drafts} />
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default withSnackbar(Draft);
