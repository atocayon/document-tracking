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
                  {/*  If Pending*/}
                  {doc.status === "pending" && (
                    <>
                      Pending
                      &nbsp;on&nbsp;
                      <span style={{ color: "#2196F3" }}>
                        {doc.secshort}
                        &nbsp;by&nbsp;
                        {doc.name},{doc.position}
                      </span>
                    </>
                  )}

                  {/*    If Completed*/}
                  {doc.status === "completed" && (
                    <>
                      Document is now tag as&nbsp;
                      {doc.status}&nbsp;in&nbsp;
                      <span style={{ color: "#2196F3" }}>
                        {doc.secshort}
                        &nbsp;by&nbsp;
                        {doc.name}
                        ,&nbsp;
                        {doc.position}
                      </span>
                    </>
                  )}

                  {/*    If Created*/}
                  {doc.status === "created" && (
                    <>
                      Created
                      &nbsp;by&nbsp;
                      <span style={{ color: "#2196F3" }}>
                        {doc.name}
                        ,&nbsp;
                        {doc.position}
                        &nbsp;(&nbsp;
                        {doc.secshort})
                      </span>
                    </>
                  )}

                  {/*    If Received*/}
                  {doc.status === "receive" && (
                    <>
                      Received
                      &nbsp;by&nbsp;
                      <span style={{ color: "#2196F3" }}>
                        {doc.name},&nbsp;
                        {doc.position}&nbsp;({doc.secshort})
                      </span>
                    </>
                  )}

                  {/*    If Forwarded*/}
                  {doc.status === "forwarded" && (
                    <>
                      Forwarded&nbsp;by&nbsp;
                      <span style={{ color: "#2196F3" }}>
                        {doc.name},&nbsp;
                        {doc.position}&nbsp; ({doc.secshort})&nbsp; to&nbsp;
                        {doc.destination}
                      </span>
                    </>
                  )}
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
