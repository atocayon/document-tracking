import React, { useEffect, useState } from "react";
import avatar from "../../../img/avatar.png";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import { Link, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import ContactInformation from "./ContactInformation";
import axios from "axios";
import CircularProgressComponent from "../../common/circularProgress/CircularProgressComponent";
import { getFromStorage } from "../../storage";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import { connect } from "react-redux";
import { fetchUserById } from "../../../redux/actions/fetchUserById";
import { withSnackbar } from "notistack";
import UserList from "../../common/userList/UserList";

function Profile({ match, user, fetchUserById }) {
  const [endSession, setEndSession] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      let params = match.params.id ? match.params.id : token;
      async function fetch() {
        await fetchUserById(params);
      }

      fetch().catch(err => {
        throw err;
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
        {Object.keys(user).length === 0 ? (
          <CircularProgressComponent />
        ) : (
          <Paper
            elevation={3}
            style={{
              color: "#263238",
              paddingBottom: "3vh",
              height: "100vh",
              marginTop: 70,
              overflow: "auto"
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
                <h6 style={{ color: "#2196F3" }}>{user.position}</h6>
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
      </Grid>
      <Grid item xs={2}>
        <UserList />
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return { user: state.fetchUserById };
}

const mapDispatchToProps = {
  fetchUserById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Profile));
