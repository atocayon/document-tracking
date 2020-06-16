import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import InputField from "../../common/textField/InputField";
import Paper from "@material-ui/core/Paper";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import TextArea from "../../common/textArea/TextArea";
import { Redirect } from "react-router-dom";
import { withSnackbar } from "notistack";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import { getFromStorage } from "../../storage";
import SelectField from "../../common/selectField/SelectField";
import DoneIcon from "@material-ui/icons/Done";
import DraftsIcon from "@material-ui/icons/Drafts";
import DescriptionIcon from "@material-ui/icons/Description";
import FeedbackIcon from "@material-ui/icons/Feedback";
import CommentIcon from "@material-ui/icons/Comment";
import FinalizeDocument from "./FinalizeDocument";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import DialogComponent from "../../common/confirmationDialog/DialogComponent";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import canvas from "../../canvas";
import ExploreIcon from "@material-ui/icons/Explore";
import Radio from "@material-ui/core/Radio";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import BusinessIcon from "@material-ui/icons/Business";
import { connect } from "react-redux";
import { fetchDocumentById } from "../../../redux/actions/fetchDocumentById";
import { fetchDocumentTypes } from "../../../redux/actions/fetchDocumentTypes";
import { fetchDocumentActionRequired } from "../../../redux/actions/fetchDocumentActionRequired";
import { fetchDocumentId } from "../../../redux/actions/fetchDocumentId";
import { fetchUserById } from "../../../redux/actions/fetchUserById";
import { fetchAllSections } from "../../../redux/actions/fetchAllSections";
import { addDocumentInputChange } from "../../../redux/actions/addDocumentInputChange";
import { clearAddNewDocumentInput } from "../../../redux/actions/clearAddNewDocumentInput";
import { documentActionRequired } from "../../../redux/actions/documentActionRequired";
import { addDocumentDestination } from "../../../redux/actions/addDocumentDestination";
import { clearExternalDestinationInput } from "../../../redux/actions/clearAddNewDocumentInput";
import { clearInternalDestinationInput } from "../../../redux/actions/clearAddNewDocumentInput";
import { removeDestination } from "../../../redux/actions/clearAddNewDocumentInput";
import { addNewDocument } from "../../../redux/actions/addNewDocument";
import { logDocumentCreator } from "../../../redux/actions/addDocumentDestination";
import { clearAddNewDocumentState } from "../../../redux/actions/clearAddNewDocumentInput";
import { addNewDocumentDraft } from "../../../redux/actions/addNewDocumentDraft";
import { notification } from "../../../redux/actions/notification";
import { removeFirstIndexOnEditAddDocument } from "../../../redux/actions/addDocumentDestination";
import nl2br from "react-newline-to-break";
import { clearAddDocumentMessage } from "../../../redux/actions/addNewDocument";
import { clearDraftsMessage } from "../../../redux/actions/addNewDocumentDraft";
import { fetchActiveUserList } from "../../../redux/actions/fetchActiveUserList";
import { logout } from "../../../redux/actions/logout";
import io from "socket.io-client";
import endPoint from "../../endPoint";
import UserList from "../../common/userList/UserList";
let socket;

function AddDocument({
  match,
  enqueueSnackbar,
  fetchDocumentById,
  fetchDocumentTypes,
  fetchDocumentActionRequired,
  fetchDocumentId,
  fetchUserById,
  fetchAllSections,
  user,
  document,
  documentId,
  documentType,
  action_req,
  sections,
  addDocumentInputChange,
  addDocument,
  clearDestination,
  handleDocumentActionRequired,
  addDocumentDestination,
  clearExternalDestinationInput,
  clearInternalDestinationInput,
  removeDestination,
  addNewDocument,
  logDocumentCreator,
  submit_new_document,
  clearAddNewDocumentState,
  addNewDocumentDraft,
  submit_new_document_draft,
  notification,
  removeFirstIndexOnEditAddDocument,
  clearAddDocumentMessage,
  clearDraftsMessage,
  fetchActiveUserList,
  userActiveList,
  logout,
  _logout,
}) {
  const checkboxItem = [
    { id: 0, value: "For Approval" },
    { id: 1, value: "For Signature" },
    { id: 2, value: "For Endorsement" },
    { id: 3, value: "For Recommendation" },
    { id: 4, value: "For Action" },
    { id: 5, value: "For Comment" },
    { id: 6, value: "For Information" },
    { id: 7, value: "For File" },
  ];

  const [endSession, setEndSession] = useState(false);
  const [date, setDate] = useState({
    _date: new Date(),
  });

  const [error, setError] = useState({});
  const [finalize, setFinalize] = useState(false);
  const [destination, setDestination] = useState("");
  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    socket = io(endPoint.ADDRESS);
    fetchActiveUserList(socket);
    const timeID = setInterval(() => tick(), 1000);
    const obj = getFromStorage("documentTracking");

    if (obj && obj.token) {
      const { token } = obj;

      async function fetch() {
        await fetchUserById(token);
        await fetchDocumentTypes();
        await fetchAllSections();
        if (match.params.id) {
          await fetchDocumentById(match.params.id);
          await fetchDocumentActionRequired(match.params.id);
        }

        if (!match.params.id) {
          await fetchDocumentId(socket);
        }
      }

      fetch().catch((err) => {
        throw err;
      });
    }

    setEndSession(!(obj && obj.token));

    if (submit_new_document !== "") {
      if (submit_new_document === "success") {
        setFinalize(false);
        setDestination("");
        const variant = "info";
        enqueueSnackbar("Document release successfully...", {
          variant,
        });
        clearAddDocumentMessage();
      }
      if (submit_new_document === "failed") {
        const variant = "error";
        enqueueSnackbar("Document releasing failed...", {
          variant,
        });
        clearAddDocumentMessage();
      }
    }

    if (submit_new_document_draft !== "") {
      if (submit_new_document_draft === "success") {
        setFinalize(false);
        setDestination("");
        const variant = "info";
        enqueueSnackbar("Document saved as draft success...", {
          variant,
        });
        clearDraftsMessage();
      }
      if (submit_new_document_draft === "failed") {
        const variant = "error";
        enqueueSnackbar("Document saving as draft failed...", {
          variant,
        });
        clearDraftsMessage();
      }
    }

    if (_logout !== null){
      if(_logout === "false"){
        const variant = "error";
        enqueueSnackbar("Error logging out", {
          variant,
        });
      }

      if (_logout === "true"){
        window.location.reload(true);
      }
    }

    return () => {
      clearInterval(timeID);
    };
  }, [
    match.params.id,
    submit_new_document,
    submit_new_document_draft,
    _logout,
  ]);

  const handleClick = () => {
    setOpen(!open);
  };

  const tick = () => {
    setDate({
      ...date,
      _date: new Date(),
    });
  };

  const handleAddDestinationInternal = async () => {
    const _destination = [];
    const internal = addDocument.internalDestination;

    if (internal !== "") {
      _destination.push(
        match.params.id ? match.params.id : documentId && documentId.documentID,
        user.user_id,
        "none",
        destination,
        internal,
        "2",
        "0"
      );

      await addDocumentDestination(_destination);
      await clearInternalDestinationInput();
    } else {
      const _error = {};
      _error.internalDestination = "Provide document destination";
      setError(_error);
    }
  };

  const handleAddDestinationExternal = async () => {
    const _destination = [];
    const external = addDocument.externalDestination;
    const _error = {};
    if (external === "") {
      _error.externalDestination = "Provide document destination";
      setError(_error);
    } else {
      _destination.push(
        match.params.id ? match.params.id : documentId && documentId.documentID,
        user.user_id,
        "none",
        destination,
        external,
        "2",
        "0"
      );
      await addDocumentDestination(_destination);
      await clearExternalDestinationInput();
    }
  };

  const handleChangeDestination = async ({ target }) => {
    setDestination(target.value);
    await clearDestination();
  };

  const formValidation = () => {
    const _error = {};

    if (!addDocument.subject) {
      _error.subject = "Subject is required";
    }

    if (!addDocument.note) {
      _error.note = "Note is required";
    }
    if (!addDocument.documentType) {
      _error.documentType = "Document type is required";
    }

    if (addDocument.destination.length === 0) {
      _error.destination = "Destination is Required";
    }

    if (!destination) {
      _error.radDestination = "Please specify destination";
    }

    if (addDocument.action_req.length === 0) {
      _error.action_req = "Please select at least one action required";
    }

    setError(_error);

    return Object.keys(_error).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValidation()) {
      const variant = "error";
      enqueueSnackbar("Fill out all required fields...", { variant });
      return;
    }
    // await logDocumentCreator([
    //   match.params.id ? match.params.id : documentId && documentId.documentID,
    //   user.user_id,
    //   "none",
    //   destination,
    //   "none",
    //   "5",
    //   "0"
    // ]);

    setFinalize(true);
  };

  const handleGoBack = async () => {
    // Reactotron.log(addDocument.destination);
    await removeFirstIndexOnEditAddDocument();
    setFinalize(false);
  };

  const handleRelease = async () => {
    await addNewDocument(
      match.params.id ? match.params.id : documentId && documentId.documentID,
      user.user_id,
      addDocument.subject,
      addDocument.documentType,
      addDocument.note,
      addDocument.action_req,
      addDocument.destination,
      socket
    );
  };

  const handleSaveAsDraft = async () => {
    if (!formValidation) {
      const variant = "error";
      enqueueSnackbar("Fill out all required fields...", { variant });
      return;
    }

    await addNewDocumentDraft(
      documentId.documentID,
      user.user_id,
      addDocument.subject,
      addDocument.documentType,
      addDocument.note,
      addDocument.action_req
    );
  };

  const createCheckbox = (label) => {
    return (
      <CheckBox
        checked={addDocument[label.value]}
        onChange={handleDocumentActionRequired.bind(null, {
          documentID: match.params.id
            ? match.params.id
            : documentId && documentId.documentID,
          value: label.value,
          data: [
            match.params.id
              ? match.params.id
              : documentId && documentId.documentID,
            label.value,
          ],
        })}
        key={label.id}
        label={label.value}
        value={label.value}
        name={"action_req"}
      />
    );
  };

  const createCheckboxes = () => checkboxItem.map(createCheckbox);

  const handleLogOut = async (e) => {
    e.preventDefault();
    socket = io(endPoint.ADDRESS);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      await logout(token, socket);
    }
  };
  return (
    <>
      <Grid container spacing={3}>
        <PrimarySearchAppBar handleLogOut={handleLogOut} />
        <Grid item xs={2}>
          <SideBarNavigation
            open={open}
            setOpen={setOpen}
            handleClick={handleClick}
          />
        </Grid>
        <Grid item xs={8}>
          {endSession && <Redirect to={"/"} />}
          <Paper
            elevation={3}
            style={{
              marginTop: 70,
              paddingTop: 0,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
                    <div className={"col-md-7"}>
                      <h5 style={{ textAlign: "left" }}>
                        Add New Document &nbsp;
                        <span style={{ color: "#2196F3" }}>
                          (To be filled-up by requesting party)
                        </span>
                      </h5>
                    </div>
                    <div className={"col-md-3"}>
                      <span>
                        <small>
                          {date._date.toLocaleDateString() +
                            " " +
                            date._date.toLocaleTimeString()}
                        </small>
                      </span>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid
                item
                xs={12}
                style={{ paddingLeft: "2vw", paddingRight: "2vw" }}
              >
                <div className={"row"}>
                  <div className={"col-md-2"}></div>
                  <div className={"col-md-8"}>
                    {finalize ? (
                      <FinalizeDocument
                          depshort={user.depshort}
                        trackingNumber={
                          match.params.id
                            ? match.params.id
                            : documentId.documentID && documentId.documentID
                        }
                        data={addDocument}
                        documentType={documentType}
                        handleGoBack={handleGoBack}
                        handleRelease={handleRelease}
                        documentDestination={destination}
                      />
                    ) : (
                      <>
                        <div>
                          <h5 style={{ color: "#2196F3" }}>
                            <DescriptionIcon />
                            &nbsp;Document Information
                          </h5>
                          <br />
                        </div>
                        {/*<InputField*/}
                        {/*  id={"tackDocument"}*/}
                        {/*  label={"Tracking Number"}*/}
                        {/*  variant={"outlined"}*/}
                        {/*  disabled={true}*/}
                        {/*  value={*/}
                        {/*    match.params.id*/}
                        {/*      ? match.params.id*/}
                        {/*      : documentId || ""*/}
                        {/*  }*/}
                        {/*  type={"text"}*/}
                        {/*/>*/}

                        <InputField
                          id={"tackDocument"}
                          label={"Subject"}
                          name={"subject"}
                          variant={"outlined"}
                          onChange={addDocumentInputChange}
                          error={error.subject}
                          type={"text"}
                          value={addDocument.subject}
                        />
                        <small>
                          - You may remove any sensitive information (e.g
                          monetary amounts, names, etc.) from the subject if
                          they are not necessary in tracking the document.
                        </small>
                        <br />
                        <br />
                        <SelectField
                          id={"documentType"}
                          name={"documentType"}
                          label={"Document Type"}
                          options={documentType}
                          error={error.documentType}
                          onChange={addDocumentInputChange}
                          variant={"outlined"}
                          value={parseInt(addDocument.documentType)}
                        />
                        <br />
                        <br />
                        <h5 style={{ color: "#2196F3" }}>
                          <FeedbackIcon />
                          &nbsp;Action Required
                        </h5>
                        {error.action_req && (
                          <span style={{ color: "red" }}>
                            <small>{error.action_req}</small>
                          </span>
                        )}
                        <br />
                        <FormGroup>{createCheckboxes()}</FormGroup>
                        <br />
                        <br />
                        <h5 style={{ color: "#2196F3" }}>
                          <CommentIcon />
                          &nbsp;Note
                        </h5>
                        <TextArea
                          placeholder={"Write Your Note Here"}
                          name={"note"}
                          onChange={addDocumentInputChange}
                          error={error.note}
                          value={addDocument.note}
                        />
                        <br />
                        <br />
                        <h5 style={{ color: "#2196F3" }}>
                          <ExploreIcon />
                          &nbsp;Destination
                        </h5>
                        {error.radDestination && (
                          <span style={{ color: "red" }}>
                            <small>{error.radDestination}</small>
                            <br />
                          </span>
                        )}
                        {error.destination && (
                          <span style={{ color: "red" }}>
                            <small>{error.destination}</small>
                          </span>
                        )}
                        <br />
                        <Radio
                          checked={destination === "Internal"}
                          onChange={handleChangeDestination}
                          value="Internal"
                          name="radio-button-demo"
                          inputProps={{ "aria-label": "A" }}
                        />
                        <label>Internal</label>
                        &nbsp;&nbsp;&nbsp;
                        <Radio
                          checked={destination === "External"}
                          onChange={handleChangeDestination}
                          value="External"
                          name="radio-button-demo"
                          inputProps={{ "aria-label": "B" }}
                        />
                        <label>External</label>
                        <br />
                        <br />
                        {destination === "Internal" && (
                          <>
                            <SelectField
                              id={"internalDestination"}
                              name={"internalDestination"}
                              label={"Internal Office/Section"}
                              options={sections}
                              onChange={addDocumentInputChange}
                              variant={"outlined"}
                              error={error.internalDestination}
                            />
                            <br />
                            <button
                              className={"btn btn-sm btn-primary"}
                              onClick={handleAddDestinationInternal}
                            >
                              Add
                            </button>
                          </>
                        )}
                        {destination === "External" && (
                          <>
                            <InputField
                              id={"external"}
                              label={"External Destination"}
                              name={"externalDestination"}
                              variant={"outlined"}
                              error={error.externalDestination}
                              type={"text"}
                              onChange={addDocumentInputChange}
                              value={addDocument.externalDestination}
                            />
                            <br />
                            <br />
                            <button
                              className={"btn btn-sm btn-primary"}
                              onClick={handleAddDestinationExternal}
                            >
                              Add
                            </button>
                          </>
                        )}
                        <br />
                        <br />
                        {addDocument.destination.length > 0 &&
                          addDocument.destination.map((des, index) => (
                            <Chip
                              key={index}
                              avatar={
                                <Avatar>
                                  <BusinessIcon />
                                </Avatar>
                              }
                              label={des[4]}
                              onDelete={(event) => {
                                event.stopPropagation();
                                removeDestination(index);
                              }}
                            />
                          ))}
                        <br />
                        <div
                          style={{
                            textAlign: "right",
                            marginBottom: 100,
                            marginTop: 50,
                          }}
                        >
                          {/*<button*/}
                          {/*  className={"btn btn-outline-info"}*/}
                          {/*  onClick={handleSaveAsDraft}*/}
                          {/*>*/}
                          {/*  <DraftsIcon />*/}
                          {/*  &nbsp;Save as Draft*/}
                          {/*</button>*/}
                          {/*&nbsp;&nbsp;&nbsp;*/}
                          <button
                            className={"btn btn-info"}
                            onClick={handleSubmit}
                          >
                            <DoneIcon />
                            &nbsp;Finalize
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={"col-md-2"}></div>
                </div>
              </Grid>

              <Grid item xs={12} style={{ paddingRight: "2vw" }}></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <UserList user={userActiveList} />
        </Grid>
      </Grid>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.fetchUserById,
    document: state.fetchDocumentById,
    documentId: state.fetchDocumentId,
    documentType: state.fetchDocumentTypes,
    action_req: state.fetchDocumentActionRequired,
    sections: state.fetchInternalDestination,
    addDocument: state.newDocumentCreation,
    submit_new_document: state.addNewDocument,
    submit_new_document_draft: state.addNewDocumentDraft,
    _notification: state.notification,
    userActiveList: state.fetchActiveUserList,
    _logout: state.logout,
  };
}

const mapDispatchToProps = {
  fetchDocumentById,
  fetchDocumentTypes,
  fetchDocumentActionRequired,
  fetchDocumentId,
  fetchUserById,
  fetchAllSections,
  addDocumentInputChange,
  clearDestination: clearAddNewDocumentInput,
  handleDocumentActionRequired: documentActionRequired,
  addDocumentDestination,
  clearExternalDestinationInput,
  clearInternalDestinationInput,
  removeDestination,
  addNewDocument,
  logDocumentCreator,
  clearAddNewDocumentState,
  addNewDocumentDraft,
  notification,
  removeFirstIndexOnEditAddDocument,
  clearAddDocumentMessage,
  clearDraftsMessage,
  fetchActiveUserList,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(AddDocument));
