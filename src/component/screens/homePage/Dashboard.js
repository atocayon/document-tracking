import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import InputField from "../../common/textField/InputField";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import { connect } from "react-redux";
import { documentTrackingNumber } from "../../../redux/actions/documentTrackingNumber";
import { withSnackbar } from "notistack";
import { receiveDocument } from "../../../redux/actions/receiveDocument";
import DescriptionIcon from "@material-ui/icons/Description";
import Barcode from "react-barcode";
import CheckBox from "../../common/checkbox/CheckBox";
import { FormGroup } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Receive from "./Receive";
import {handleScan} from "../../../redux/actions/handleScan";
import BarcodeReader from 'react-barcode-reader'
import Reactotron from "reactotron-react-js";
function Dashboard(props) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (props.documentInfo.documentId !== "") {
      const variant = "info";
      props.enqueueSnackbar(
        "NMP| Document with subject " + props.documentInfo.subject +" received successfully",
        {
          variant
        }
      );
    }
  }, [props.documentInfo.documentId]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleReceiveDocument = async () => {
    await props.receiveDocument(
      props.trackingNum.documentTrackingNumber,
      props.user.user_id,
      props.user.secshort
    );
  };

  const handleError = (err) => {
    Reactotron.log(err);
  };
  const scan = (data) => {
    Reactotron.log(data);
  };

  return (
    <Grid container spacing={3}>
      <PrimarySearchAppBar />

      <Grid item xs={2}>
        <SideBarNavigation
          dashboard={true}
          user={props.user}
          open={open}
          setOpen={setOpen}
          handleClick={handleClick}
        />
      </Grid>
      <Grid item xs={8}>
        <Paper
          elevation={3}
          style={{
            paddingBottom: "3vh",
            marginTop: 70,
            height: "100vh",
            overflow: "auto"
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div
                className={"jumbotron"}
                style={{ paddingTop: "3vh", paddingBottom: "2vh" }}
              >
                <div className={"row"}>
                  <div className={"col-md-2"}>
                    <div className={"row"}>
                      <div className={"col-md-6"}></div>
                      <div className={"col-md-6"}>
                        <div style={{ textAlign: "right" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className={"col-md-6"}>
                    <InputField
                      id={"tackDocument"}
                      name={"documentTrackingNumber"}
                      label={"Document Tracking Number"}
                      variant={"outlined"}
                      onChange={props.documentTrackingNumber}
                      value={props.trackingNum.documentTrackingNumber}
                    />
                  </div>
                  <div className={"col-md-4"}>
                    <button className={"btn btn-lg btn-info"}>Track</button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className={"btn btn-lg btn-outline-info"}
                      onClick={handleReceiveDocument}
                    >
                      Receive
                    </button>
                  </div>
                </div>
              </div>

              <div className={"row"}>
                <div className={"col-md-12"}>

                  <BarcodeReader
                      onError={handleError}
                      onScan={scan}
                  />

                  {props.documentInfo.documentId === "" && (
                    <div style={{ textAlign: "center", marginTop: "30vh" }}>
                      <h6 style={{ color: "#9E9E9E" }}>
                        Document track / information will show here
                      </h6>
                    </div>
                  )}


                  {props.documentInfo.documentId !== "" && (
                    <Receive documentInfo={props.documentInfo} />
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    trackingNum: state.documentTrackingNumber,
    documentInfo: state.receiveDocument
  };
}

const mapDispatchToProps = {
  documentTrackingNumber,
  receiveDocument,
  handleScan
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Dashboard));
