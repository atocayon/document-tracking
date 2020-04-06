import React from "react";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import StepperComponent from "./StepperComponent";
import AccountForm from "./AccountForm";
import ContactForm from "./ContactForm";
import WorkForm from "./WorkForm";
import OtherInfoForm from "./OtherInfoForm";


export default function NewUserForm(props) {

  function getSteps() {
    return [ props.section+" Account", "Contact", "Work", "Other Information"];
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AccountForm />;
      case 1:
        return <ContactForm />;
      case 2:
        return <WorkForm />;
      case 3:
        return <OtherInfoForm />;
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
            <div className={"col-md-10"}></div>
          </div>
        </div>

        <StepperComponent
          activeStep={activeStep}
          steps={steps}
          handleBack={handleBack}
          handleNext={handleNext}
          handleReset={handleReset}
          getStepContent={getStepContent}
        />
      </Paper>
    </>
  );
}
