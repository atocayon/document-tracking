import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import StepperComponent from "./StepperComponent";
import Profile from "./Profile";
import Contact from "./Contact";
import Work from "./Work";
import OtherInformation from "./OtherInformation";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import { withSnackbar } from "notistack";
import { getFromStorage } from "../../storage";
import Grid from "@material-ui/core/Grid";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import SaveIcon from "@material-ui/icons/Save";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
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
    position: ""
  });
  const [error, setError] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    setEndSession(!(obj && obj.token));
    if (obj && obj.token) {
      axios
        .get("http://localhost:4000/dts/user/" + obj.token)
        .then(_user => {
          Reactotron.log(_user);
          setUser(_user.data);
        })
        .catch(err => {
          alert(err);
        });
    }
  }, []);

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

  const handleSubmit = event => {
    event.preventDefault();
    Reactotron.log(userInfo);
    if (!formValidation()) {
      const variant = "error";
      props.enqueueSnackbar("Please don't leave input fields empty...", {
        variant
      });
      return;
    }
    if (userInfo.password === userInfo.confirmPassword) {
      axios
        .post("http://localhost:4000/dts/addUser", {
          role: userInfo.role,
          employeeId: userInfo.employeeId,
          name: userInfo.name,
          username: userInfo.username,
          password: userInfo.password,
          email: userInfo.email,
          contact: userInfo.contact,
          section: user.secid,
          position: userInfo.position
        })
        .then(res => {
          if (res.status === 200) {
            if (res.data.success) {
              const variant = "success";
              props.enqueueSnackbar("Registration Success...", { variant });
              setRedirect(true);
            } else {
              const _error = {};
              _error.email = "Email is already taken...";
              setError(_error);
              const variant = "warning";
              props.enqueueSnackbar("Email is already taken...", { variant });
            }
          }
        })
        .catch(err => {
          const variant = "error";
          props.enqueueSnackbar("Server error...", { variant });
        });
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
      [target.name]: target.value
    });

    Reactotron.log(target.name);
  };

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
        {redirect && <Redirect to={"/users"} />}
        <Paper
          elevation={3}
          style={{
            marginBottom: 0,
            bottom: 0,
            marginTop: 70,
            paddingBottom: 100,
            height: "100vh",
            overflow: "auto"
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
                      <span style={{ color: "#2196F3" }}>{user.section}</span>{" "}
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
                      marginBottom: 100
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

          {/*<StepperComponent*/}
          {/*  activeStep={activeStep}*/}
          {/*  steps={steps}*/}
          {/*  handleBack={handleBack}*/}
          {/*  handleNext={handleNext}*/}
          {/*  handleSubmit={handleSubmit}*/}
          {/*  getStepContent={getStepContent}*/}
          {/*/>*/}
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
export default withSnackbar(RegistrationForm);
