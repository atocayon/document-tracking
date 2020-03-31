import React, { useEffect } from "react";
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

function Profile({ profile, fetchUserProfile, match }) {
  useEffect(() => {
    const id = match.params.id;

    if (id) {
      fetchUserProfile(match.params.id).catch(err => {
        throw err;
      });
    }
  }, []);

  return (
    <>
      {profile.length === 0 ? (
        <Redirect to={"/"} />
      ) : (
        <Paper
          elevation={3}
          style={{
            color: "#263238",
            paddingBottom: "3vh",
            height: "100vh"
          }}
        >
          <div className={"jumbotron"}>

          </div>
          <Grid container spacing={3} style={{paddingLeft: "2vw", paddingRight: "2vw", marginTop: "-12vh"}}>
            <Grid item xs={3}>
              <img src={avatar} alt={"profile"} style={{ width: "10vw", background: "#fefefe", border: "3px solid #fff" }} />
              <div>
                <br />
                <ContactInformation user={profile} />
              </div>
            </Grid>
            <Grid item xs={9}>
              <h3
                style={{
                  textAlign: "left",
                  fontWeight: "bold"
                }}
              >
                {profile[0].data[0].name}
              </h3>
              <h6 style={{ color: "#2196F3" }}>
                {profile[0].data[0].position}
              </h6>
              <br />
              <Link
                className={"btn btn-sm btn-info"}
                to={"/update/" + profile[0].data[0]._id}
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

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

const mapDispatchToProps = {
  fetchUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
