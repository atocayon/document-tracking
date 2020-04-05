import React, { useEffect, useState } from "react";
import avatar from "../../../img/avatar.png";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import background from "../../../img/profileBackground.jpg";
import { connect } from "react-redux";
import { fetchUserProfile } from "../../../redux/actions/fetchUserProfile";
import Reactotron from "reactotron-react-js";
import { Link, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import ContactInformation from "./ContactInformation";
import { getFromStorage } from "../../storage";
import axios from "axios";
import CircularProgressComponent from "../../common/circularProgress/CircularProgressComponent";

function Profile({ profile, fetchUserProfile, match }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const id = match.params.id;

    const obj = getFromStorage("documentTracking");

      axios
          .get("http://localhost:4000/dts/user/" + id)
          .then(user => {
            Reactotron.log(user.data);
            setUser(user.data);
          })
          .catch(err => {
            alert(err);
          });
  }, []);

  return (
        <>
          {Object.keys(user).length === 0 ? (
              <CircularProgressComponent/>
          ) : (
              <Paper
                  elevation={3}
                  style={{
                    color: "#263238",
                    paddingBottom: "3vh",
                    height: "100vh"
                  }}
              >
                <div className={"jumbotron"}></div>
                <Grid
                    container
                    spacing={3}
                    style={{
                      paddingLeft: "2vw",
                      paddingRight: "2vw",
                      marginTop: "-12vh"
                    }}
                >
                  <Grid item xs={3}>
                    <img
                        src={avatar}
                        alt={"profile"}
                        style={{
                          width: "10vw",
                          background: "#fefefe",
                          border: "3px solid #fff"
                        }}
                    />
                    <div>
                      <br />
                      <ContactInformation user={user} />
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <h3
                        style={{
                          textAlign: "left",
                          fontWeight: "bold"
                        }}
                    >
                      {user.name}
                    </h3>
                    <h6 style={{ color: "#2196F3" }}>
                      {user.position}
                    </h6>
                    <br />
                    <Link
                        className={"btn btn-sm btn-info"}
                        to={"/update/" + user.user_id}
                        style={{
                          textDecoration: "none"
                        }}
                    >
                      <EditIcon style={{ fontSize: "1vw" }} /> Update Profile
                    </Link>{" "}
                    <br />
                    <hr />
                  </Grid>
                </Grid>
              </Paper>

          )}
          </>



  );
}


export default Profile;
