import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import { connect } from "react-redux";
import { documentTrackingNumber } from "../../../redux/actions/documentTrackingNumber";
import { withSnackbar } from "notistack";
import { receiveDoc } from "../../../redux/actions/handleScan";
import BarcodeReader from "react-barcode-reader";
import Reactotron from "reactotron-react-js";

import DocumentTrack from "./DocumentTrack";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import IconButton from "@material-ui/core/IconButton";
import { resetTrackOrReceive } from "../../../redux/actions/resetTrackOrReceive";
import { trackDoc } from "../../../redux/actions/handleScan";
import { searchBySubj } from "../../../redux/actions/searchBySubj";
import { clear_message } from "../../../redux/actions/clear_message";
import { getFromStorage } from "../../storage";

import UIFx from "uifx";
import onClick from "../../sounds/pull-out.mp3";
import onScan from "../../sounds/bubbling-up.mp3";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from "@material-ui/icons/Description";
import io from "socket.io-client";
import UserList from "../../common/userList/UserList";
import ReactJoyride from "react-joyride";
import { trackOrSearchOnly } from "../../../redux/actions/trackOrSearchOnly";
import SearchIcon from "@material-ui/icons/Search";
import "../../../styles/dashboard.css";
import scanner from "../../../img/scanner.png";
import CircularProgress from "../../common/circularProgress/CircularProgressComponent";
const _onClick = new UIFx(onClick);
const _onScan = new UIFx(onScan);
let socket;
function Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [startGuide, setStartGuide] = useState(false);
  const [pending, setPending] = useState(null);

  const [tutorial, setTutorial] = useState([
    {
      target: ".start",
      disableBeacon: true,
      content: "This is the current users indicator",
    },
    {
      target: ".mainPage",
      content:
        "This is the indicator where you can scan a document barcode using a barcode scanner to receive an incoming document.",
    },
    {
      target: ".optionTrackOnly",
      content:
        "Also you can just click here if you want to scan and track only the document.",
    },
    {
      target: ".trackingInput",
      content:
        "This is where the document tracking number will appear after you scan the barcode, or (optionally) you can just type the barcode number manually and press enter if barcode scanner is not available.",
    },
    {
      target: ".sidebar",
      content: "This is your system navigation control",
      placement: "right",
    },
    {
      target: ".sidebarNew",
      content:
        "This is where you can create a document to be routed/send internally or externally.",
      placement: "right",
    },
    {
      target: ".sidebarPending",
      content:
        "This is where you can view the document that you've recently received.",
      placement: "right",
    },
    {
      target: ".sidebarSectionDoc",
      content:
        "This is where you can view all the documents made/routed by your respective office/section.",
      placement: "right",
    },
    {
      target: ".sidebarProcessedDoc",
      content:
        "This is where you can view all the documents received and released by your respective office/section.",
      placement: "right",
    },
    {
      target: ".sidebarManageDocCat",
      content:
        "Also, this is where you can manage all the document category in your section.",
      placement: "right",
    },
    {
      target: ".sidebarUserManage",
      content:
        "This is where you can manage the users allowed in your respective office/section",
      placement: "right",
    },
    {
      target: ".settings",
      content:
        "You can click this icon to navigate to your profile, system guide or if you just want to logout.",
    },
  ]);
  useEffect(() => {
    setLoading(false);
    const obj = getFromStorage("documentTracking");

    socket = io(process.env.REACT_APP_SERVER);
    if (props.receive !== "") {
      if (props.receive === "success") {
        const variant = "info";
        props.enqueueSnackbar("NMP| Document received successfully...", {
          variant,
        });

        socket.emit("total_pending_doc", obj.token);
        socket.on("total_pendings", (data) => {
          setPending(data);
        });
        props.clear_message();
      }

      if (props.receive === "failed") {
        const variant = "error";
        props.enqueueSnackbar("There's an error receiving the document", {
          variant,
        });
        props.clear_message();
      }

      if (props.receive === "pending") {
        const variant = "error";
        props.enqueueSnackbar(
          "This document is already pending in your office",
          {
            variant,
          }
        );
        props.clear_message();
      }
    }
  }, [props, props.receive]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleError = (err) => {
    throw err;
  };

  const handleManual = async (e) => {
    e.preventDefault();
    if (!props._trackOrSearchOnly) {
      await props.receiveDoc(
        props.trackingNum.documentTrackingNumber,
        props.user.user_id,
        props.user.secshort,
        socket
      );
      await props.trackDoc(props.trackingNum.documentTrackingNumber);
      _onScan.play();
    }

    if (props._trackOrSearchOnly) {
      await props.trackDoc(props.trackingNum.documentTrackingNumber);
      _onScan.play();
    }
  };

  const handleScanning = async (data) => {
    if (!props._trackOrSearchOnly) {
      await props.receiveDoc(
        data,
        props.user.user_id,
        props.user.secshort,
        socket
      );

      await props.trackDoc(data);
      _onScan.play();
    }

    if (props._trackOrSearchOnly) {
      await props.trackDoc(data);
      _onScan.play();
    }
  };

  const handleTrackOrSearchOnly = async () => {
    await props.trackOrSearchOnly(!props._trackOrSearchOnly);
    _onClick.play();
  };

  const handleSearch = async () => {
    await props.searchBySubj(props.trackingNum.documentTrackingNumber);
  };

  const handleStartGuide = (e) => {
    e.preventDefault();
    setStartGuide(true);
  };

  const onViewProgress = async (val) => {
    Reactotron.log(val);
    await props.trackDoc(val);
  };

  return (
    <>
      {loading && <CircularProgress />}
      <div className={"row"}>
        <ReactJoyride
          steps={tutorial}
          run={startGuide}
          showProgress={true}
          showSkipButton={true}
          continuous={true}
          disableOverlayClose={true}
          // disableOverlay
          styles={{ options: { primaryColor: "#2196F3" } }}
        />
        <BarcodeReader onError={handleError} onScan={handleScanning} />
        <PrimarySearchAppBar handleStartGuide={handleStartGuide} />

        <div className={"col-md-2"}>
          <SideBarNavigation
            dashboard={true}
            user={props.user}
            open={open}
            setOpen={setOpen}
            handleClick={handleClick}
            pending={pending}
          />
        </div>
        <div className={"col-md-8"}>
          <Paper elevation={3} className={"paper"} style={{}}>
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
                      <form onSubmit={handleManual}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            {props._trackOrSearchOnly
                              ? "Type the subject or scan the barcode"
                              : "Document Tracking Number"}
                          </InputLabel>
                          <Input
                            className={"trackingInput"}
                            title={"Type/scan the Document Tracking Number"}
                            id={"tackDocument"}
                            name={"documentTrackingNumber"}
                            label={"Tracking Number"}
                            variant={"outlined"}
                            onChange={props.documentTrackingNumber}
                            value={props.trackingNum.documentTrackingNumber}
                            type={"text"}
                            endAdornment={
                              props.receive !== "" ||
                              props.track.length > 0 ||
                              props.search.length > 0 ? (
                                <InputAdornment position="end">
                                  <IconButton
                                    title={"clear"}
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
                      </form>
                    </div>
                    <div className={"col-md-2"}>
                      {props._trackOrSearchOnly && (
                        <button
                          title={"Search"}
                          className={"btn btn-lg btn-info"}
                          onClick={handleSearch}
                        >
                          <SearchIcon />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {props.track.length === 0 && props.search.length === 0 ? (
                  <div className={"row"}>
                    <div className={"col-md-12"}>
                      <div className={"scanner-img-container"}>
                        <img
                          src={scanner}
                          alt={"scanner"}
                          className={"scanner-img"}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className={"row"}>
                  <div className={"col-md-12"}>
                    {!props._trackOrSearchOnly &&
                    props.receive === "" &&
                    props.track.length === 0 &&
                    props.search.length === 0 ? (
                      <div className={"scanReceiveTextIndicator"}>
                        <h6 style={{ color: "#9E9E9E" }} className={"mainPage"}>
                          Scan the barcode to receive document
                        </h6>

                        <br />
                        <button
                          title={
                            "Click here to track or search only the document"
                          }
                          className={"btn btn-sm optionTrackOnly"}
                          style={{ color: "#2196F3" }}
                          onClick={handleTrackOrSearchOnly}
                        >
                          Click here to track or search only the document
                        </button>
                      </div>
                    ) : null}

                    {props._trackOrSearchOnly &&
                    props.receive === "" &&
                    props.track.length === 0 &&
                    props.search.length === 0 ? (
                      <div className={"scanReceiveTextIndicator"}>
                        <h6 style={{ color: "#9E9E9E" }}>
                          Scan the barcode to track only the document or type
                          the subject and click the search button
                        </h6>
                        <br />
                        <button
                          title={"Click to track and receive a document"}
                          className={"btn btn-sm"}
                          style={{ color: "#2196F3" }}
                          onClick={handleTrackOrSearchOnly}
                        >
                          Click here to receive a document
                        </button>
                      </div>
                    ) : null}

                    {props._trackOrSearchOnly &&
                    props.receive === "" &&
                    props.track.length === 0 &&
                    props.search.length > 0 ? (
                      <>
                        <div className={"row"}>
                          <div className={"col-md-2"}></div>
                          <div
                            className={"col-md-8"}
                            style={{ paddingBottom: 200 }}
                          >
                            <table className={"table"}>
                              <tbody>
                                {props.search.map((data, index) => (
                                  <tr>
                                    <td>
                                      <button
                                        className={"btn"}
                                        onClick={onViewProgress.bind(
                                          null,
                                          data.documentId
                                        )}
                                      >
                                        <List>
                                          <ListItem key={index}>
                                            <ListItemAvatar>
                                              <Avatar>
                                                <DescriptionIcon />
                                              </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                              primary={data.subject}
                                              secondary={
                                                data.creatorSection +
                                                " - " +
                                                data.creator +
                                                " (" +
                                                data.creatorPosition +
                                                ")"
                                              }
                                            />
                                          </ListItem>
                                        </List>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className={"col-md-2"}></div>
                        </div>
                      </>
                    ) : null}

                    {props.track.length > 0 && props.search.length === 0 ? (
                      <DocumentTrack
                        track={props.track}
                        trackingNum={props.trackingNum.documentTrackingNumber}
                      />
                    ) : null}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div className={"col-md-2"}>
          <UserList />
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    trackingNum: state.documentTrackingNumber,
    receive: state.receiveDocument,
    track: state.trackDocument,
    search: state.searchBySubj,
    _trackOrSearchOnly: state.trackOrSearchOnly,
  };
}

const mapDispatchToProps = {
  documentTrackingNumber,
  receiveDoc,
  resetTrackOrReceive,
  trackDoc,
  searchBySubj,
  trackOrSearchOnly,
  clear_message,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Dashboard));
