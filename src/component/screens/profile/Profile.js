import React, { useEffect, useState } from "react";
import avatar from "../../../img/avatar.png";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import { Link, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import ContactInformation from "./ContactInformation";
import CircularProgressComponent from "../../common/circularProgress/CircularProgressComponent";
import { getFromStorage } from "../../storage";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import { connect } from "react-redux";
import { fetchUserById } from "../../../redux/actions/fetchUserById";
import { fetchCurrentSystemUser } from "../../../redux/actions/fetchCurrentSystemUser";
import { withSnackbar } from "notistack";
import UserList from "../../common/userList/UserList";
function Profile({
  match,
  user,
  fetchUserById,
  currentUser,
  fetchCurrentSystemUser,
}) {
  const [endSession, setEndSession] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      let params = match.params.id ? match.params.id : token;
      async function fetch() {
        await fetchUserById(params);
        await fetchCurrentSystemUser(obj.token);
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
    <div className={"row"}>
      <PrimarySearchAppBar />
      <div className={"col-md-2"}>
        <SideBarNavigation
          open={open}
          user={currentUser}
          setOpen={setOpen}
          handleClick={handleClick}
        />
      </div>
      <div className={"col-md-8"}>
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
              overflow: "auto",
            }}
          >
            <div className={"jumbotron"}></div>
            <div
              container
              spacing={3}
              style={{
                paddingLeft: "2vw",
                paddingRight: "2vw",
                marginTop: "-12vh",
              }}
            >
              <Grid item xs={3}>
                <img
                  src={avatar}
                  alt={"profile"}
                  style={{
                    width: "10vw",
                    background: "#fefefe",
                    border: "3px solid #fff",
                  }}
                />
                <div>
                  <br />
                  <ContactInformation user={user} />
                </div>
              </Grid>
              <div item xs={9}>
                <h3
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
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
                    textDecoration: "none",
                  }}
                >
                  <EditIcon style={{ fontSize: "1vw" }} /> Update Profile
                </Link>{" "}
                <br />
                <hr />
              </div>
            </div>
          </Paper>
        )}
      </div>
      <div className={"col-md-2"}>
        <UserList />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.fetchUserById,
    currentUser: state.fetchCurrentSystemUser,
  };
}

const mapDispatchToProps = {
  fetchUserById,
  fetchCurrentSystemUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Profile));
