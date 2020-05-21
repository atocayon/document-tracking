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

import { handleScan } from "../../../redux/actions/handleScan";
import BarcodeReader from "react-barcode-reader";
import Reactotron from "reactotron-react-js";

import { trackDocument } from "../../../redux/actions/trackDocument";
import DocumentTrack from "./DocumentTrack";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import IconButton from "@material-ui/core/IconButton";
import { resetTrackOrReceive } from "../../../redux/actions/resetTrackOrReceive";

function Dashboard(props) {
  const [open, setOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [trackOrSearchOnly, setTrackOrSearchOnly] = useState(false);
  useEffect(() => {
    if (props.receive !== "") {
      if (props.receive === "success") {
        const variant = "info";
        props.enqueueSnackbar("NMP| Document received successfully...", {
          variant,
        });
      } else {
        const variant = "error";
        props.enqueueSnackbar("Server error...", {
          variant,
        });
      }
    }
  }, [props.receive]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
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

  const handleError = (err) => {
    Reactotron.log(err);
  };
  const scan = (data) => {
    Reactotron.log(data);
  };

  const handleTrackDocument = async () => {
    await props.trackDocument(props.trackingNum.documentTrackingNumber);
  };

  const handleScanning = async (data) => {
    if (!trackOrSearchOnly){
      await props.handleScanAndReceive(
          data,
          props.trackingNum.documentTrackingNumber,
          props.user.user_id,
          props.user.secshort
      );
    }

    if (trackOrSearchOnly){

    }

  };

  const handleTrackOrSearchOnly = async () => {
    setTrackOrSearchOnly(!trackOrSearchOnly);
  };

  return (
    <Grid container spacing={3}>
      <BarcodeReader onError={handleError} onScan={handleScanning} />
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
            overflow: "auto",
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
                  <div className={"col-md-8"}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-amount">
                        {trackOrSearchOnly ? "Search / Tracking":"Document Tracking Number"}
                      </InputLabel>
                      <Input
                        id={"tackDocument"}
                        name={"documentTrackingNumber"}
                        label={trackOrSearchOnly ? "Search / Tracking":"Tracking Number"}
                        variant={"outlined"}
                        onChange={props.documentTrackingNumber}
                        value={props.trackingNum.documentTrackingNumber}
                        type={"search"}
                        endAdornment={
                          props.receive !== "" || props.track.length > 0 ? (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={props.resetTrackOrReceive}
                                onMouseDown={props.resetTrackOrReceive}
                                edge="end"
                              >
                                <HighlightOffRoundedIcon />
                              </IconButton>
                            </InputAdornment>
                          ) : (
                            ""
                          )
                        }
                      />
                    </FormControl>
                  </div>
                  <div className={"col-md-2"}>
                    {trackOrSearchOnly && (
                        <button
                            className={"btn btn-lg btn-info"}
                            // onClick={handleTrackDocument}
                        >
                          Search
                        </button>
                    )}


                  </div>
                </div>
              </div>

              <div className={"row"}>
                <div className={"col-md-12"}>
                  <BarcodeReader onError={handleError} onScan={scan} />

                  {!trackOrSearchOnly && props.receive === "" && props.track.length === 0 ? (
                    <div style={{ textAlign: "center", marginTop: "25vh" }}>
                      <h6 style={{ color: "#9E9E9E" }}>
                        Scan the barcode to receive document and the document
                        track will show here
                      </h6>
                      <br />
                      <button
                        className={"btn btn-sm"}
                        style={{ color: "#2196F3" }}
                        onClick={handleTrackOrSearchOnly}
                      >
                        Click here to track or search only the document
                      </button>
                    </div>
                  ) : null}

                  {trackOrSearchOnly && (
                      <div style={{ textAlign: "center", marginTop: "25vh" }}>
                        <h6 style={{ color: "#9E9E9E" }}>
                          Scan the barcode to track documents or type something and press the search button to search
                        </h6>
                        <br />
                        <button
                            className={"btn btn-sm"}
                            style={{ color: "#2196F3" }}
                            onClick={handleTrackOrSearchOnly}
                        >
                          Click here to track and receive a document
                        </button>
                      </div>
                  )}

                  {props.track.length > 0 && (
                    <DocumentTrack track={props.track} />
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
    receive: state.receiveDocument,
    track: state.trackDocument,
  };
}

const mapDispatchToProps = {
  documentTrackingNumber,
  receiveDocument,
  handleScanAndReceive: handleScan,
  trackDocument,
  resetTrackOrReceive,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Dashboard));
