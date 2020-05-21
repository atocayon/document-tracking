import React, { useEffect, useState } from "react";
import { withSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { Link, Redirect } from "react-router-dom";
import { getFromStorage } from "../../storage";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { fetchPendingDocuments } from "../../../redux/actions/fetchPendingDocuments";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import ListItemText from "@material-ui/core/ListItemText";

function PendingForRelease(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);

  useEffect(() => {
    const obj = getFromStorage("documentTracking");

    async function fetch() {
      await props.fetchPendingDocuments(obj.token);
    }


    fetch().catch((err) => {
      throw err;
    });

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
            overflow: "auto",
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
              <div className={"col-md-8"}></div>
              <div className={"col-md-2"}></div>
            </div>
          </div>

            {props.pending.length === 0 && (
                <div style={{ textAlign: "center", marginTop: 200 }}>
                    <h6 style={{ color: "#9E9E9E" }}>No pending documents available</h6>
                </div>
            )}
            <div className={"row"}>
                <div className={"col-md-8"} style={{ marginLeft: 50, marginRight: 10 }}>
                    {props.pending.length > 0 &&
                    props.pending.map((document, index) => (
                        <Link
                            key={index}
                            to={"/pending_doc/" + document.documentId}
                            style={{ textDecoration: "none" }}
                        >
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <DescriptionIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={document.subject}
                                    secondary={document.doc_type + " by "+document.creator}
                                />
                            </ListItem>
                        </Link>
                    ))}


                </div>
                <div className={"col-md-4"}></div>
            </div>


        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    pending: state.fetchPendingDocuments,
  };
}

const mapDispatchToProps = {
  fetchPendingDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(PendingForRelease));
