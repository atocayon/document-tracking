import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { getFromStorage } from "../../storage";
import Paper from "@material-ui/core/Paper";
import { Link, Redirect } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import { withSnackbar } from "notistack";
function MyDocuments(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      axios
        .get("http://localhost:4000/dts/fetchUserDocuments/" + token)
        .then(res => {
          Reactotron.log(res);
          setDocuments(res.data);
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
        {endSession && <Redirect to={"/"} />}
        <Paper
          elevation={3}
          style={{
            marginTop: 70,
            paddingTop: 0,
            height: "100vh",
            overflow: "auto"
          }}
        >
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

          {documents.length === 0 && (
              <div style={{textAlign: "center", marginTop: 200}}>
                  <h6 style={{ color: "#9E9E9E" }}>You don't have any documents yet</h6>
              </div>
          )}

          <div style={{ marginLeft: 50, marginRight: 10 }}>
            <div className={"row"}>
              <div className={"col-md-8"}>
                <List>
                  {documents.length > 0 && documents.map(document => (
                      <Link to={"/doc/"+document.documentID} style={{ textDecoration: "none" }}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <DescriptionIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={document.subject} secondary={document.type} />
                        </ListItem>
                      </Link>
                  ))}

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

export default withSnackbar(MyDocuments);
