import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function StepperComponent(props) {
  let index = parseInt(props.index);
  return (
    <Stepper orientation="vertical">
      <Step active={true} key={props.data.root.document_id}>
        <StepLabel
          StepIconComponent={FiberManualRecordIcon}
          style={{ color: "#2196F3" }}
        >
          Branch {props.data.root.document_id}
        </StepLabel>
        <StepContent last={false}>
          <Typography>
            <small>
              {props.data.subProcess.length > 0 &&
                props.data.subProcess.map((sub) => (
                  <>
                    => {sub.root.status}&nbsp;
                    {sub.root.status === "forwarded" && "to "+sub.root.destination}
                    &nbsp;on {sub.root.date_time}
                    <br />
                    {sub.root.remarks !== "none" && (
                      <>
                        Remarks: {sub.root.remarks}
                        <br />
                      </>
                    )}
                    <br />
                  </>
                ))}
            </small>
          </Typography>
          {props.data.branch.length > 0 &&
            props.data.branch.map((branch) => (
              <StepperComponent data={branch} />
            ))}
        </StepContent>
      </Step>
    </Stepper>
  );
}

function RootSubProcess(props) {
  return (
    <Step active={true} key={props.sub.root.trans_id}>
      <StepLabel
        StepIconComponent={FiberManualRecordIcon}
        style={{ color: "#2196F3" }}
      >
        {props.sub.root.status} on {props.sub.root.date_time}
      </StepLabel>
      <StepContent last={false}>
        <Typography>
          <small>
            <br />
            {props.sub.root.status === "forwarded" &&
              "Destination: " + props.sub.root.destination}
            <br />
            {props.sub.root.remarks !== "none" &&
              "Remarks: " + props.sub.root.remarks}
          </small>
        </Typography>
      </StepContent>
    </Step>
  );
}

function DocumentTrack(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-2"}></div>
      <div className={"col-md-8"} style={{ paddingBottom: 100 }}>
        <Stepper orientation="vertical">
          {props.track.map((data) =>
            data.subProcess > 0 ? (
              <>
                <Step active={true} key={data.root.document_id}>
                  <StepLabel
                    StepIconComponent={FiberManualRecordIcon}
                    style={{ color: "#2196F3" }}
                  >
                    Created on {data.root.date_time}
                  </StepLabel>
                  <StepContent last={false}>
                    <Typography>
                      <small>
                        Originator: {data.root.section}
                        <br />
                        Subject: {data.root.subject}
                        <br />
                        Document Type: {data.root.type}
                        <br />
                        Note: {data.root.note}
                      </small>
                    </Typography>
                  </StepContent>
                </Step>
                {data.root.subProcess.map((sub) => (
                  <RootSubProcess sub={sub} />
                ))}
              </>
            ) : (
              <Step active={true} key={data.root.document_id}>
                <StepLabel
                  StepIconComponent={FiberManualRecordIcon}
                  style={{ color: "#2196F3" }}
                >
                  Created on {data.root.date_time}
                </StepLabel>
                <StepContent last={false}>
                  <Typography>
                    <small>
                      Originator: {data.root.section}
                      <br />
                      Subject: {data.root.subject}
                      <br />
                      Document Type: {data.root.type}
                      <br />
                      Note: {data.root.note}
                    </small>
                  </Typography>
                  {data.branch.length > 0 &&
                    data.branch.map((branch) => (
                      <StepperComponent data={branch} />
                    ))}
                </StepContent>
              </Step>
            )
          )}
        </Stepper>
      </div>
      <div className={"col-md-2"}></div>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(DocumentTrack));
