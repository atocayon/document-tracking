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
import Receive from "./Receive";
import { handleScan } from "../../../redux/actions/handleScan";
import BarcodeReader from "react-barcode-reader";
import Reactotron from "reactotron-react-js";
import { clearReceiveDocument } from "../../../redux/actions/receiveDocument";
import Forward from "./Forward";
import { afterDocumentReceive } from "../../../redux/actions/afterDocumentReceive";
import { onChangeForwardDocument } from "../../../redux/actions/onChangForwardDocument";
import { notification } from "../../../redux/actions/notification";
import { changeDocumentDestination } from "../../../redux/actions/onChangForwardDocument";

function Dashboard(props) {
  const [open, setOpen] = useState(true);
  const [forwardDialog, setForwardDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    if (props.documentInfo.documentId !== "") {
      const variant = "info";
      props.enqueueSnackbar(
        "NMP| Document with subject " +
          props.documentInfo.subject +
          " received successfully.",
        {
          variant
        }
      );
    }

    if (props.action_after !== "") {
      if (props.action_after === "forward") {
        const variant = "info";
        props.enqueueSnackbar("Document successfully forwarded...", {
          variant
        });
      }

      if (props.action_after === "pending") {
        const variant = "warning";
        props.enqueueSnackbar(
          "Document successfully set as pending in your office...",
          {
            variant
          }
        );
      }
    }
  }, [props.documentInfo.documentId, props.action_after]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = event => {

    setSelectedValue(event.target.value);
    props.changeDocumentDestination();
  };

  const handleReceiveDocument = async () => {
    await props.receiveDocument(
      props.trackingNum.documentTrackingNumber,
      props.user.user_id,
      props.user.secshort
    );
  };

  const handleError = err => {
    Reactotron.log(err);
  };
  const scan = data => {
    Reactotron.log(data);
  };

  const handleSetForwardDialog = e => {
    e.preventDefault();
    setForwardDialog(!forwardDialog);
  };

  const handleForwardDocument = async e => {
    e.preventDefault();
    await props.afterDocumentReceive(
      props.trackingNum.documentTrackingNumber,
      props.user.user_id,
      props.forwardDocument.remarks,
      selectedValue,
      props.forwardDocument.destination,
      "2"
    );
    setForwardDialog(!forwardDialog);
  };

  const handlePendingDocument = async e => {
    e.preventDefault();
    await props.afterDocumentReceive(
      props.trackingNum.documentTrackingNumber,
      props.user.user_id,
      "none",
      "none",
      props.user.secshort,
      "3"
    );
    setForwardDialog(!forwardDialog);
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
                  <BarcodeReader onError={handleError} onScan={scan} />

                  {props.documentInfo.documentId === "" && (
                    <div style={{ textAlign: "center", marginTop: "30vh" }}>
                      <h6 style={{ color: "#9E9E9E" }}>
                        Document track / information will show here
                      </h6>
                    </div>
                  )}

                  {props.documentInfo.documentId !== "" && (
                    <>
                      <Receive
                        documentInfo={props.documentInfo}
                        clearReceiveDocument={props.clearReceiveDocument}
                        handleSetForwardDialog={handleSetForwardDialog}
                        handlePendingDocument={handlePendingDocument}
                      />

                      <Forward
                        open={forwardDialog}
                        handleClose={handleSetForwardDialog}
                        sections={props.sections}
                        handleChange={handleChange}
                        selectedValue={selectedValue}
                        forwardDocument={props.forwardDocument}
                        onChangeForwardDocument={props.onChangeForwardDocument}
                        handleForwardDocument={handleForwardDocument}
                      />
                    </>
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
    documentInfo: state.receiveDocument,
    forwardDocument: state.forwardDocument,
    action_after: state.afterDocumentReceive
  };
}

const mapDispatchToProps = {
  documentTrackingNumber,
  receiveDocument,
  handleScan,
  clearReceiveDocument,
  afterDocumentReceive,
  onChangeForwardDocument,
  changeDocumentDestination
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Dashboard));
