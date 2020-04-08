import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import StepperComponent from "./StepperComponent";
import Profile from "./Profile";
import Contact from "./Contact";
import Work from "./Work";
import OtherInformation from "./OtherInformation";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import { withSnackbar } from 'notistack';
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
    address: "",
    gender: "",
    bdate: ""
  });
  const [error, setError] = useState({});

  function getSteps() {
    return [" Profile", "Contact", "Work", "Other Information"];
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  function formValidation(){
    const _error = {};
    if (!userInfo.role) _error.role = "Role is required";
    if (!userInfo.employeeId) _error.employeeId= "Employee ID is required";
    if (!userInfo.username) _error.username = "Username is required";
    if (!userInfo.password) _error.password = "Password is required";
    if (!userInfo.confirmPassword) _error.confirmPassword = "Confirm Password is required";
    if (!userInfo.email) _error.email = "Email is required";
    if (!userInfo.contact) _error.contact = "Contact is required";
    if (!userInfo.position) _error.position = "Position is required";
    if (!userInfo.address) _error.address = "Address is required";
    if (!userInfo.gender) _error.gender = "Gender is required";
    if (!userInfo.bdate) _error.bdate = "Date of Birth is required";

    setError(_error);

    return Object.keys(_error).length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Reactotron.log(userInfo);
    if (!formValidation()) return;
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
          division: props.user.division,
          section: props.user.section,
          position: userInfo.position,
          address: userInfo.address,
          gender: userInfo.gender,
          bdate: userInfo.bdate
        })
        .then(res => {
          const variant = 'success';
          props.enqueueSnackbar('Registration Success...', {variant});
          setActiveStep(0);
          Reactotron.log(res);
        })
        .catch(err => {
          props.enqueueSnackbar('Server Error...'+err);
        });
    } else {
      setActiveStep(0);
      props.enqueueSnackbar("Password doesn't match...");
    }
  };

  const handleInput = ({ target }) => {
    setUserInfo({
      ...userInfo,
      [target.name]: target.value
    });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Profile handleInput={handleInput} />;
      case 1:
        return <Contact handleInput={handleInput} />;
      case 2:
        return <Work handleInput={handleInput} />;
      case 3:
        return <OtherInformation handleInput={handleInput} />;
      default:
        return "Unknown step";
    }
  }

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
                  <Link to={"/users"}>
                    <ArrowBackIcon style={{ fontSize: "2vw" }} />
                  </Link>
                </div>
                <div className={"col-md-6"}>
                  <div style={{ textAlign: "right" }}></div>
                </div>
              </div>
            </div>
            <div className={"col-md-10"}>
              <h4>
                <b>
                  Registration for{" "}
                  <span style={{ color: "#2196F3" }}>
                    {props.user.section} user account
                  </span>
                </b>
              </h4>
            </div>
          </div>
        </div>

        <StepperComponent
          activeStep={activeStep}
          steps={steps}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
          getStepContent={getStepContent}
        />
      </Paper>
    </>
  );
}
export default withSnackbar(RegistrationForm);