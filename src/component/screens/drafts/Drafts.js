import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withSnackbar } from "notistack";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import Paper from "@material-ui/core/Paper";
import { getFromStorage } from "../../storage";
import { Link, Redirect } from "react-router-dom";
import TableDocument from "../../common/table/TableDocument";
import Reactotron from "reactotron-react-js";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
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
        .catch(err => {
          const variant = "error";
          props.enqueueSnackbar("Server Error", {variant});
        });
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
              <div className={"col-md-8"}>
                {/*<h5 style={{ textAlign: "left" }}>Draft Documents</h5>*/}
              </div>
              <div className={"col-md-2"}></div>
            </div>
          </div>
          {drafts.length === 0 && (
              <div style={{textAlign: "center", marginTop: 200}}>
                <h6 style={{ color: "#9E9E9E" }}>You don't have any drafts yet</h6>
              </div>
          )}
          <div style={{ marginLeft: 50, marginRight: 10 }}>
            <div className={"row"}>
              <div className={"col-md-8"}>
                <List>
                  {drafts.length > 0
                    && drafts.map(doc => (
                        <Link
                          to={"/addDocument/" + doc.documentID}
                          style={{ textDecoration: "none" }}
                        >
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <DescriptionIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={doc.subject}
                              secondary={doc.doc_type}
                            />
                          </ListItem>
                          {/*<Divider />*/}
                        </Link>
                      ))
                    }
                </List>
              </div>
              <div className={"col-md-4"}></div>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default withSnackbar(Draft);
