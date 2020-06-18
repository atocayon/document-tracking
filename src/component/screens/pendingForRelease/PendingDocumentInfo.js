import React, { useEffect, useState, useRef } from "react";
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
import Content from "./Content";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";
import {addForwardDestination} from "../../../redux/actions/onChangForwardDocument";
import {removeForwardDestination} from "../../../redux/actions/onChangForwardDocument";
import UserList from "../../common/userList/UserList";

function PendingDocumentInfo(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [forwardDialog, setForwardDialog] = useState(false);
  const [completedDialog, setCompletedDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [token, setToken] = useState("");
  const [redirect, setRedirect] = useState(false);
  const componentRef = useRef();
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
      props.forwardDocument.des,
      "2"
    );
  };

  const handleCompleted = async (e) => {
    e.preventDefault();
    await props.afterDocumentReceive(
      props.match.params.doc_id,
      token,
      props.forwardDocument.remarks,
      props.pendingDocumentInfo.destinationType,
      "none",
      "4"
    );
  };

  const _addForwardDestination = async (e) => {
    e.preventDefault();
    await props.addForwardDestination(props.forwardDocument.destination);
  };


  return (
    <Grid container spacing={3}>
      <Forward
        open={forwardDialog}
        handleClose={handleSetForwardDialog}
        sections={props.sections}
        selectedValue={selectedValue}
        handleChange={handleChange}
        onChangeDestination={props.onChangeForwardDocument}
        value={props.forwardDocument}
        handleForward={handleForward}
        addForwardDestination={_addForwardDestination}
        removeForwardDestination={props.removeForwardDestination}
      />
      <Completed
        open={completedDialog}
        handleClose={handleSetCompletedDialog}
        handleCompleted={handleCompleted}
        value={props.forwardDocument}
        onChangeDestination={props.onChangeForwardDocument}
      />
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

        <Paper
          elevation={3}
          style={{
            marginTop: 70,
            paddingTop: 0,
            height: "100vh",
            overflow: "auto",
            paddingBottom: 150,
          }}
        >
          <div>
            <Content
              ref={componentRef}
              pendingDocumentInfo={props.pendingDocumentInfo}
            />
          </div>
          <div className={"row"}>
            <div className={"col-md-2"}></div>
            <div className={"col-md-8"}>
              <div className={"row"}>
                <div className={"col-md-6"}>
                  <div style={{ float: "left", marginTop: -120 }}>
                    <ReactToPrint
                      content={() => componentRef.current}
                      trigger={() => (
                        <a href={"#"} className={"btn"} title={"Print"}>
                          <PrintIcon /> &nbsp;Print
                        </a>
                      )}
                    />
                  </div>
                </div>
                <div className={"col-md-6"}>
                  <div style={{ float: "right", marginTop: -120 }}>
                    <button
                      className={"btn btn-outline-info btn-sm"}
                      onClick={handleSetCompletedDialog}
                    >
                      <DoneIcon /> Take Action
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className={"btn btn-info btn-sm"}
                      onClick={handleSetForwardDialog}
                    >
                      <SendIcon /> Forward
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-md-2"}></div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <UserList />
      </Grid>
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
  addForwardDestination,
  removeForwardDestination
};

export default connect(
  mapDispatchToProps,
  mapStateToProps
)(withSnackbar(PendingDocumentInfo));
