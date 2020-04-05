import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUsers } from "../../../redux/actions/fetchUsersBySection";
import { Paper } from "@material-ui/core";
import Reactotron from "reactotron-react-js";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import HelpIcon from "@material-ui/icons/Help";
import { getFromStorage } from "../../storage";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import owl from "../../../img/owl.png";
import InputField from "../../common/textField/InputField";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddIcon from '@material-ui/icons/Add';
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
function UserManagement({ match }) {
  const [sectionUsers, setSectionUsers] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    const section = match.params.section;
    setToken(obj.token);
    axios
      .get("http://localhost:4000/dts/sectionUser/" + section)
      .then(users => {
        setSectionUsers([...sectionUsers, users.data]);
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  return (
    <>
      <Paper
        elevation={3}
        style={{
          marginBottom: 0,
          bottom: 0,
          height: "100vh"
        }}
      >
        <div className={"jumbotron"} style={{ padding: 20 }}>
          <div className={"row"}>
            <div className={"col-md-2"}>
              <div className={"row"}>
                <div className={"col-md-6"}>
                  <Link to={"/"}>
                    <ArrowBackIcon style={{ fontSize: "2vw" }} />
                  </Link>
                </div>
                <div className={"col-md-6"}>
                  <div style={{ textAlign: "right" }}></div>
                </div>
              </div>
            </div>
            <div className={"col-md-10"}>
              <div className={"row"}>
                <div className={"col-md-6"}></div>
                <div className={"col-md-6"}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <SearchIcon />
                    </Grid>
                    <Grid item>
                      <InputField
                        id={"search"}
                        name={"search"}
                        label={"Search"}
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={"row"}>
          <div className={"col-md-12"}>
            <div style={{marginLeft: 10,marginBottom: 20, textAlign: "left"}}>
              <button className={"btn btn-sm btn-success"}>
                <AddIcon /> New Account
              </button>
            </div>
          </div>

        </div>

        <table className={"table"}>
          <tbody>
            {sectionUsers.map(user => (
              <tr key={user.user_id}>
                <td>
                  <Link
                    to={"/user/" + user.user_id}
                    style={{ textDecoration: "none" }}
                  >
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            alt={user.name}
                            src="/static/images/avatar/1.jpg"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            user.user_id === parseInt(token)
                              ? user.name + " (Me) "
                              : user.name
                          }
                          secondary={user.position + " - " + user.role}
                        />
                      </ListItem>
                    </List>
                  </Link>
                </td>
                <td>
                  <button
                    className={"btn btn-info btn-sm"}
                    style={{ marginTop: 20 }}
                  >
                    Make a client
                  </button>
                  <button
                    className={"btn btn-warning btn-sm"}
                    style={{ marginTop: 20 }}
                  >
                    Deactivate
                  </button>
                  <button
                    className={"btn btn-danger btn-sm"}
                    style={{ marginTop: 20 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </>
  );
}

export default UserManagement;
