import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { getFromStorage } from "../../storage";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import InputField from "../../common/textField/InputField";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import ListOfUsers from "./ListOfUsers";
import Reactotron from "reactotron-react-js";
function UserManagement(props) {
  const [sectionUsers, setSectionUsers] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const obj = getFromStorage("documentTracking");

    if (obj && obj.token) {
      const { token } = obj;
      setToken(token);

      axios
        .get("http://localhost:4000/dts/user/" + token)
        .then(_user => {
          axios
            .get("http://localhost:4000/dts/sectionUser/" + _user.data.section)
            .then(users => {
              Reactotron.log(users);
              setSectionUsers([...sectionUsers, users.data]);
            })
            .catch(err => {
              alert(err);
            });
        })
        .catch(err => {
          alert(err);
        });
    }
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
            <div
              style={{ marginLeft: 10, marginBottom: 20, textAlign: "left" }}
            >
              <Link to={"/registration"} className={"btn btn-sm btn-success"}>
                <AddIcon /> New Account
              </Link>
            </div>
          </div>
        </div>

        <ListOfUsers sectionUsers={sectionUsers} token={token} />
      </Paper>
    </>
  );
}

export default UserManagement;
