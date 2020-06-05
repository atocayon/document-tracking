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
import { trackOnly } from "../../../redux/actions/handleScan";
import { searchBySubj } from "../../../redux/actions/searchBySubj";
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
import endPoint from "../../endPoint";
import { fetchActiveUserList } from "../../../redux/actions/fetchActiveUserList";
import reactotron from "../../../ReactotronConfig";
import UserList from "../../common/userList/UserList";
import {getFromStorage} from "../../storage";
import { logout } from "../../../redux/actions/logout";
const _onClick = new UIFx(onClick);
const _onScan = new UIFx(onScan);
let socket;
function Dashboard(props) {
  const [open, setOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [trackOrSearchOnly, setTrackOrSearchOnly] = useState(false);
  useEffect(() => {
    socket = io(endPoint.ADDRESS);
    props.fetchActiveUserList(socket);
    if (props.receive !== "") {
      if (props.receive === "success") {
        const variant = "info";
        props.enqueueSnackbar("NMP| Document received successfully...", {
          variant,
        });
      }

      if (props.receive === "failed") {
        const variant = "error";
        props.enqueueSnackbar("There's an error receiving the document", {
          variant,
        });
      }
    }

    if (props._logout !== null){
      if (props._logout === "false"){
        const variant = "error";
        props.enqueueSnackbar("Error Logging out", {
          variant,
        });
      }

      if (props._logout === "true"){
        window.location.reload(true);
      }
    }
  }, [props.receive, props._logout]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleError = (err) => {
    throw err;
  };

  const handleTrackDocument = async (e) => {
    e.preventDefault();
    Reactotron.log("On Type la");
    Reactotron.log(trackOrSearchOnly);
    if (!trackOrSearchOnly) {
      Reactotron.log("polse ini");
      await props.handleScanAndReceive(
        props.trackingNum.documentTrackingNumber,
        props.user.user_id,
        props.user.secshort,
        socket
      );
      _onScan.play();
    }

    if (trackOrSearchOnly) {
      await props.trackOnly(props.trackingNum.documentTrackingNumber, socket);
      _onScan.play();
    }
  };

  const handleScanning = async (data) => {
    if (!trackOrSearchOnly) {
      Reactotron.log("Track and Receive");
      await props.handleScanAndReceive(
        data,
        props.user.user_id,
        props.user.secshort,
        socket
      );
      _onScan.play();
    }

    if (trackOrSearchOnly) {
      await props.trackOnly(data, socket);
      _onScan.play();
    }
  };

  const handleTrackOrSearchOnly = async () => {
    setTrackOrSearchOnly(!trackOrSearchOnly);
    _onClick.play();
  };

  const handleSearch = async () => {

    await props.searchBySubj(props.trackingNum.documentTrackingNumber);
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    socket = io(endPoint.ADDRESS);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token){
      const { token } = obj;
      await props.logout(token, socket);
    }
  };

  return (
    <Grid container spacing={3}>
      <BarcodeReader onError={handleError} onScan={handleScanning} />
      <PrimarySearchAppBar handleLogOut={handleLogOut} />

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
                    <form onSubmit={handleTrackDocument}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-adornment-amount">
                          {trackOrSearchOnly
                            ? "Search / Tracking"
                            : "Document Tracking Number"}
                        </InputLabel>
                        <Input
                          id={"tackDocument"}
                          name={"documentTrackingNumber"}
                          label={
                            trackOrSearchOnly
                              ? "Search / Tracking"
                              : "Tracking Number"
                          }
                          variant={"outlined"}
                          onChange={props.documentTrackingNumber}
                          value={props.trackingNum.documentTrackingNumber}
                          type={"text"}
                          endAdornment={
                            props.receive !== "" || props.track.length > 0 ? (
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
                    {trackOrSearchOnly && (
                      <button
                        className={"btn btn-lg btn-info"}
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className={"row"}>
                <div className={"col-md-12"}>
                  {!trackOrSearchOnly &&
                  props.receive === "" &&
                  props.track.length === 0 &&
                  props.search.length === 0 ? (
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

                  {trackOrSearchOnly &&
                  props.receive === "" &&
                  props.track.length === 0 &&
                  props.search.length === 0 ? (
                    <div style={{ textAlign: "center", marginTop: "25vh" }}>
                      <h6 style={{ color: "#9E9E9E" }}>
                        Scan the barcode to track documents or type something
                        and press the search button to search
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
                  ) : null}

                  {trackOrSearchOnly &&
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
                          <List></List>
                          {props.search.map((data, index) => (
                            <ListItem key={index}>
                              <ListItemAvatar>
                                <Avatar>
                                  <DescriptionIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={data.subject}
                                secondary={data.creator}
                              />
                            </ListItem>
                          ))}
                        </div>

                        <div className={"col-md-2"}></div>
                      </div>
                    </>
                  ) : null}

                  {props.track.length > 0 && props.search.length === 0 ? (
                    <DocumentTrack track={props.track} trackingNum={props.trackingNum.documentTrackingNumber} />
                  ) : null}
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <UserList user={props.userList} />
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    trackingNum: state.documentTrackingNumber,
    receive: state.receiveDocument,
    track: state.trackDocument,
    search: state.searchBySubj,
    userList: state.fetchActiveUserList,
    _logout: state.logout
  };
}

const mapDispatchToProps = {
  documentTrackingNumber,
  receiveDocument,
  handleScanAndReceive: handleScan,
  trackDocument,
  resetTrackOrReceive,
  trackOnly,
  searchBySubj,
  fetchActiveUserList,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Dashboard));
