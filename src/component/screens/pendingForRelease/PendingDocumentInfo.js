import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import Grid from "@material-ui/core/Grid";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { getFromStorage } from "../../storage";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import InputField from "../../common/textField/InputField";
import DescriptionIcon from "@material-ui/icons/Description";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import CommentIcon from "@material-ui/icons/Comment";
import ExploreIcon from "@material-ui/icons/Explore";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { fetchPendingDocumentInfo } from "../../../redux/actions/fetchPendingDocumentInfo";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import BusinessIcon from "@material-ui/icons/Business";
import Forward from "./Forward";
import { fetchSectionsList } from "../../../redux/actions/fetchSectionsList";
import { onChangeForwardDocument } from "../../../redux/actions/onChangForwardDocument";
import { changeDocumentDestination } from "../../../redux/actions/onChangForwardDocument";
import { afterDocumentReceive } from "../../../redux/actions/afterDocumentReceive";
import SendIcon from "@material-ui/icons/Send";
import DoneIcon from "@material-ui/icons/Done";
import Completed from "./Completed";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function PendingDocumentInfo(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [forwardDialog, setForwardDialog] = useState(false);
  const [completedDialog, setCompletedDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [token, setToken] = useState("");
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    setToken(obj.token);
    async function fetch() {
      await props.fetchPendingDocumentInfo(props.match.params.doc_id);
      await props.fetchSectionsList();
    }

    fetch().catch((err) => {
      throw err;
    });
    setEndSession(!(obj && obj.token));

    if (props.actionForwardOrCompleted !== "") {
      if (props.actionForwardOrCompleted === "forwarded") {
        const variant = "info";
        props.enqueueSnackbar("Document successfully forwarded...", {
          variant,
        });
        setForwardDialog(false);
        setRedirect(true);
      }

      if (props.actionForwardOrCompleted === "completed") {
        const variant = "info";
        props.enqueueSnackbar("Document successfully completed...", {
          variant,
        });
        setCompletedDialog(false);
        setRedirect(true);
      }
    }
  }, [props.actionForwardOrCompleted]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSetForwardDialog = () => {
    setForwardDialog(!forwardDialog);
  };

  const handleSetCompletedDialog = () => {
    setCompletedDialog(!completedDialog);
  };

  const handleChange = async (event) => {
    setSelectedValue(event.target.value);
    await props.changeDocumentDestination();
  };

  const handleForward = async (e) => {
    e.preventDefault();
    await props.afterDocumentReceive(
      props.match.params.doc_id,
      token,
      props.forwardDocument.remarks,
      selectedValue,
      props.forwardDocument.destination,
      "2"
    );
  };

  const handleCompleted = async (e) => {
    e.preventDefault();
    await props.afterDocumentReceive(
      props.match.params.doc_id,
      token,
      "none",
      props.pendingDocumentInfo.destinationType,
      "none",
      "4"
    );
  };

  return (
    <Grid container spacing={3}>
      <PrimarySearchAppBar />
      <Grid item xs={2}>
        <SideBarNavigation
          open={open}
          setOpen={setOpen}
          handleClick={handleClick}
        />
      </Grid>
      <Grid item xs={8}>
        {endSession && <Redirect to={"/"} />}
        {redirect && <Redirect to={"/pending"} />}
        <Forward
          open={forwardDialog}
          handleClose={handleSetForwardDialog}
          sections={props.sections}
          selectedValue={selectedValue}
          handleChange={handleChange}
          onChangeDestination={props.onChangeForwardDocument}
          value={props.forwardDocument}
          handleForward={handleForward}
        />
        <Completed
          open={completedDialog}
          handleClose={handleSetCompletedDialog}
          handleCompleted={handleCompleted}
        />
        <Paper
          elevation={3}
          style={{
            marginTop: 70,
            paddingTop: 0,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <div className={"jumbotron"} style={{ padding: 50 }}>
            <div className={"row"}>
              <div className={"col-md-2"}>
                <div className={"row"}>
                  <div className={"col-md-6"}></div>
                  <div className={"col-md-6"}>
                    <div style={{ textAlign: "right" }}></div>
                  </div>
                </div>
              </div>
              <div className={"col-md-8"}></div>
              <div className={"col-md-2"}></div>
            </div>
          </div>

          <div className={"row"}>
            <div className={"col-md-2"}></div>
            <div
              className={"col-md-8"}
              style={{ overflow: "auto", paddingBottom: 200 }}
            >
              <br />
              <div className={"col-md-6"}>
                <InputField
                  label={"Creator"}
                  name={"subject"}
                  disabled={true}
                  type={"text"}
                  // variant={"outlined"}
                  value={
                    props.pendingDocumentInfo.creator +
                      ", " +
                      props.pendingDocumentInfo.creatorPosition +
                      " (" +
                      props.pendingDocumentInfo.creatorSection +
                      ")" || ""
                  }
                />
                {/*<small>on {props.documentInfo.date_time_created}</small>*/}
                <br />
                <br />
                <InputField
                  label={"Forwarder"}
                  name={"subject"}
                  disabled={true}
                  type={"text"}
                  value={
                    props.pendingDocumentInfo.sender +
                      ", " +
                      props.pendingDocumentInfo.senderPosition +
                      " (" +
                      props.pendingDocumentInfo.senderSection +
                      ")" || ""
                  }
                />
                {/*<small>on {props.documentInfo.date_time_forwarded} </small>*/}
              </div>
              <br />
              <br />
              <h5 style={{ color: "#2196F3" }}>
                <DescriptionIcon />
                &nbsp;Document Information
              </h5>

              <br />
              <InputField
                label={"Subject"}
                name={"subject"}
                variant={"outlined"}
                disabled={true}
                type={"text"}
                value={props.pendingDocumentInfo.subject || ""}
              />

              <br />
              <br />

              <InputField
                id={"documentType"}
                label={"Document Type"}
                name={"doc_type"}
                variant={"outlined"}
                disabled={true}
                type={"text"}
                value={props.pendingDocumentInfo.doc_type}
              />
              <br />
              <br />
              <br />
              <h5 style={{ color: "#2196F3" }}>
                <FeedbackIcon />
                &nbsp;Action Required
              </h5>
              <br />
              <FormGroup>
                {props.pendingDocumentInfo.action_req.map((action, index) => (
                  <CheckBox
                    checked={true}
                    key={index}
                    label={action.action_req}
                    value={action.document_action_req_id}
                    name={"action_req"}
                  />
                ))}
              </FormGroup>
              <br />
              <br />
              <h5 style={{ color: "#2196F3" }}>
                <CommentIcon />
                &nbsp;Note
              </h5>
              <br />
              <div>{props.pendingDocumentInfo.note}</div>

              <br />
              <br />
              <h5 style={{ color: "#2196F3" }}>
                <ExploreIcon />
                &nbsp;Destination
              </h5>
              <br />
              <div>
                {props.pendingDocumentInfo.destination.map((res, index) => (
                  <Chip
                    key={index}
                    avatar={
                      <Avatar>
                        <BusinessIcon />
                      </Avatar>
                    }
                    label={res.destination}
                  />
                ))}
              </div>
              <div style={{ marginTop: 50, textAlign: "right" }}>
                <Fab
                  title={"Complete"}
                  onMouseDown={handleSetCompletedDialog}
                  color="primary"
                  aria-label="add"
                  style={{ position: "fixed", bottom: 100, right: 500 }}
                >
                  <DoneIcon />
                </Fab>

                <Fab
                  title={"Forward"}
                  onMouseDown={handleSetForwardDialog}
                  color="secondary"
                  aria-label="add"
                  style={{ position: "fixed", bottom: 30, right: 500 }}
                >
                  <SendIcon />
                </Fab>
              </div>
            </div>
            <div className={"col-md-2"}></div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

function mapDispatchToProps(state) {
  return {
    pendingDocumentInfo: state.fetchPendingDocumentInfo,
    sections: state.fetchSectionsList,
    forwardDocument: state.forwardDocument,
    actionForwardOrCompleted: state.afterDocumentReceive,
  };
}

const mapStateToProps = {
  fetchPendingDocumentInfo,
  fetchSectionsList,
  onChangeForwardDocument,
  changeDocumentDestination,
  afterDocumentReceive,
};

export default connect(
  mapDispatchToProps,
  mapStateToProps
)(withSnackbar(PendingDocumentInfo));
