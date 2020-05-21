import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import DescriptionIcon from "@material-ui/icons/Description";
function DocumentTrack(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-2"}></div>
      <div className={"col-md-8"} style={{ paddingBottom: 100 }}>
        <Stepper orientation="vertical">
          {props.track.map((doc) => (
            <Step active={true}>
              <StepLabel
                StepIconComponent={DescriptionIcon}
                style={{ color: "#2196F3" }}
              >
                {doc.date_time}
              </StepLabel>
              <StepContent last={false}>
                <Typography>
                  {doc.status === "pending" && doc.status + " on " + doc.name}
                  {doc.status === "completed" &&
                    "Document is now " + doc.status + " by " + doc.name}
                  {doc.status === "created" && doc.status + " by " + doc.name}
                    {doc.status === "receive" && doc.status + " by " + doc.name}
                  &nbsp;
                  {doc.status === "forwarded" &&
                    "to " + doc.destination + " (" + doc.destinationType + ")"}
                  <br />
                  {doc.remarks !== "none" && doc.remarks}
                  <br />
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className={"col-md-2"}></div>
    </div>
  );
}

export default withSnackbar(DocumentTrack);
