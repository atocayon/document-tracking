import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import Grid from "@material-ui/core/Grid";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { Link, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { getFromStorage } from "../../storage";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { handleSearchSectionDocuments } from "../../../redux/actions/handleSearchSectionDocuments";
import { fetchDocCategory } from "../../../redux/actions/manageDocumentCategory";
import {fetchUserById} from "../../../redux/actions/fetchUserById";
import io from "socket.io-client";
import endPoint from "../../endPoint";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import UserList from "../../common/userList/UserList";
let socket;

function SectionDocuments(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  useEffect(() => {
    socket = io(endPoint.ADDRESS);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      async function fetch() {
        await props.fetchDocCategory(token, socket);
        await props.fetchUserById(token, socket);
      }

      fetch().catch((err) => {
        throw err;
      });
    }
    setEndSession(!(obj && obj.token));
  }, []);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Grid container>
      <PrimarySearchAppBar />
      <Grid item xs={2}>
        <SideBarNavigation
          open={open}
          user={props.user}
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
              <div className={"col-md-6"}>
              </div>
              <div className={"col-md-6"}></div>
            </div>
          </div>

          <div style={{ marginLeft: 50, marginRight: 10 }}>
            <div className={"row"}>
              {props.doc_category.length > 0 &&
                props.doc_category.map((data) => (
                  <div className={"col-md-3"} style={{ paddingLeft: 20 }}>
                    <List>
                      <Link
                        to={"/folder/" + data.category}
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar variant={"rounded"}>
                              <FolderOpenIcon fontSize={"large"} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={data.category}
                            secondary={"Folder"}
                          />
                        </ListItem>
                      </Link>
                    </List>
                  </div>
                ))}
            </div>

          </div>
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <UserList />
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    doc_category: state.manageDocumentCategory,
    user: state.fetchUserById
  };
}

const mapDispatchToProps = {
  handleSearchSectionDocuments,
  fetchDocCategory,
  fetchUserById
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(SectionDocuments));
