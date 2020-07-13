import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import Profile from "./Profile";
import Contact from "./Contact";
import Work from "./Work";
import { withSnackbar } from "notistack";
import { getFromStorage } from "../../storage";
import Grid from "@material-ui/core/Grid";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import SaveIcon from "@material-ui/icons/Save";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import { connect } from "react-redux";
import { fetchCurrentSystemUser } from "../../../redux/actions/fetchCurrentSystemUser";
import { userRegistration } from "../../../redux/actions/userRegistration";
import UserList from "../../common/userList/UserList";
import io from "socket.io-client";
import endPoint from "../../endPoint";
let socket;
function RegistrationForm(props) {
  const [userInfo, setUserInfo] = useState({
    role: "",
    employeeId: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    contact: "",
    position: "",
  });
  const [error, setError] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    socket = io(endPoint.ADDRESS);
    const obj = getFromStorage("documentTracking");
    setEndSession(!(obj && obj.token));
    if (obj && obj.token) {
      const { token } = obj;
      async function fetch() {
        await props.fetchCurrentSystemUser(token, socket);
      }

      fetch().catch((err) => {
        throw err;
      });

      if (props.user_reg !== "") {
        if (props.user_reg === "success") {
          const variant = "info";
          props.enqueueSnackbar(userInfo.name + " registration success...", {
            variant,
          });
          setRedirect(true);
        }

        if (props.user_reg === "error") {
          const variant = "error";
          props.enqueueSnackbar(userInfo.name + " email is already taken...", {
            variant,
          });
        }

        if (props.user_reg === "email taken") {
          const _error = {};
          _error.email = "Already taken";
          setError(_error);
          const variant = "error";
          props.enqueueSnackbar(userInfo.name + " email is already taken...", {
            variant,
          });
        }

        if (props.user_reg === "username taken") {
          const _error = {};
          _error.username = "Already taken";
          setError(_error);
          const variant = "error";
          props.enqueueSnackbar(
            userInfo.name + " username is already taken...",
            {
              variant,
            }
          );
        }
      }
    }
  }, [props.user_reg]);

  function formValidation() {
    const _error = {};
    if (!userInfo.role) _error.role = "Role is required";
    if (!userInfo.employeeId) _error.employeeId = "Employee ID is required";
    if (!userInfo.name) _error.name = "Name is required";
    if (!userInfo.username) _error.username = "Username is required";
    if (!userInfo.password) _error.password = "Password is required";
    if (!userInfo.confirmPassword)
      _error.confirmPassword = "Confirm Password is required";
    if (!userInfo.email) _error.email = "Email is required";
    if (!userInfo.contact) _error.contact = "Contact is required";
    if (!userInfo.position) _error.position = "Position is required";

    setError(_error);

    return Object.keys(_error).length === 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formValidation()) {
      const variant = "error";
      props.enqueueSnackbar("Please don't leave input fields empty...", {
        variant,
      });
      return;
    }
    if (userInfo.password === userInfo.confirmPassword) {
      await props.userRegistration(
        props.user.secid,
        userInfo.role,
        userInfo.employeeId,
        userInfo.name,
        userInfo.username,
        userInfo.password,
        userInfo.confirmPassword,
        userInfo.email,
        userInfo.contact,
        userInfo.position,
        socket
      );
    } else {
      const _error = {};
      _error.password = "Password Don't match";
      _error.confirmPassword = "Password Don't match";
      setError(_error);
      const variant = "error";
      props.enqueueSnackbar("Password doesn't match...", { variant });
    }
  };

  const handleInput = ({ target }) => {
    setUserInfo({
      ...userInfo,
      [target.name]: target.value,
    });
  };

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
        {redirect && <Redirect to={"/users"} />}
        <Paper
          elevation={3}
          style={{
            marginBottom: 0,
            bottom: 0,
            marginTop: 70,
            paddingBottom: 100,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                    <h5>
                      Registration for{" "}
                      <span style={{ color: "#2196F3" }}>
                        {props.user.section}
                      </span>{" "}
                      user account
                    </h5>
                  </div>

                  <div className={"col-md-2"}></div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className={"row"}>
                <div className={"col-md-2"}></div>
                <div className={"col-md-8"}>
                  <Profile handleInput={handleInput} error={error} />

                  <Contact handleInput={handleInput} error={error} />

                  <Work handleInput={handleInput} error={error} />

                  <br />
                  <br />
                  <div
                    style={{
                      textAlign: "right",
                      marginTop: 50,
                      marginBottom: 100,
                    }}
                  >
                    <Link to={"/users"} className={"btn btn-outline-info"}>
                      <CancelIcon /> &nbsp;&nbsp; Cancel
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <button className={"btn btn-info"} onClick={handleSubmit}>
                      <SaveIcon />
                      &nbsp;&nbsp; Save
                    </button>
                  </div>
                </div>
                <div className={"col-md-2"}></div>
              </div>
            </Grid>
          </Grid>
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
    user: state.fetchCurrentSystemUser,
    user_reg: state.userRegistration,
  };
}

const mapDispatchToProps = {
  fetchCurrentSystemUser,
  userRegistration,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(RegistrationForm));
