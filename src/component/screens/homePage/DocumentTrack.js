import React, { useEffect, useState } from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Reactotron from "reactotron-react-js";
import { onClickTrackShowMore } from "../../../redux/actions/onClickTrackShowMore";
import axios from "axios";

function SubProcess(props) {
  return (
    <Stepper orientation="vertical">
      <Step active={true}>
        <StepLabel
          StepIconComponent={FiberManualRecordIcon}
          style={{ color: "#2196F3" }}
        >
          {props.data.main.status} by {props.data.main.name} on{" "}
          {props.data.main.date_time}
        </StepLabel>
        <StepContent last={false}>
          <Typography>
            {props.data.main.status === "forwarded" && (
              <>
                <small>
                  Destination: {props.data.main.destination}
                  <br />
                  Remarks: {props.data.main.remarks}
                  <br />
                </small>
              </>
            )}
              {props.data.main.status !== "forwarded" && (
                  <small>
                      Remarks: {props.data.main.remarks}
                  </small>
              )}
          </Typography>
            {props.data.sub.length > 0 &&
            props.data.sub.map((sub) => <SubProcess data={sub} />)}
        </StepContent>
      </Step>
    </Stepper>
  );
}

function DocumentTrack(props) {
  // const handleClickShowMore = async (val) => {
  //   Reactotron.log(val);
  //   await props.onClickTrackShowMore(val.trans_id, val.tracking);
  // };

  return (
    <div className={"row"}>
      <div className={"col-md-2"}></div>
      <div className={"col-md-8"} style={{ paddingBottom: 100 }}>
        <Stepper orientation="vertical">
          {props.track.map((data) => (
            <Step active={true} key={data.doc.trans_id}>
              <StepLabel
                StepIconComponent={FiberManualRecordIcon}
                style={{ color: "#2196F3" }}
              >
                {data.doc.status} by {data.doc.name} ({data.doc.position}) -{" "}
                {data.doc.date_time}
              </StepLabel>
              <StepContent last={false}>
                <Typography>
                  {data.doc.status === "forwarded" && (
                    <div>
                      <small>
                        Destination: {data.doc.destination}
                        <br />
                        Remarks: {data.doc.remarks}
                        <br />
                      </small>
                      {data.sub.length > 0 &&
                        data.sub.map((sub) => <SubProcess data={sub} />)}
                    </div>
                  )}
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

function mapStateToProps(state) {
  return {
    showMore: state.onClickTrackShowMore,
  };
}

const mapDispatchToProps = {
  onClickTrackShowMore,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(DocumentTrack));
