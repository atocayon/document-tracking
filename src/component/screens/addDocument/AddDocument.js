import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import InputField from "../../common/textField/InputField";
import Paper from "@material-ui/core/Paper";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import TextArea from "../../common/textArea/TextArea";
import { Redirect } from "react-router-dom";
import { withSnackbar } from "notistack";
import { getFromStorage } from "../../storage";
import SelectField from "../../common/selectField/SelectField";
import DoneIcon from "@material-ui/icons/Done";
import DescriptionIcon from "@material-ui/icons/Description";
import FeedbackIcon from "@material-ui/icons/Feedback";
import CommentIcon from "@material-ui/icons/Comment";
import FinalizeDocument from "./FinalizeDocument";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
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
import { notification } from "../../../redux/actions/notification";
import { removeFirstIndexOnEditAddDocument } from "../../../redux/actions/addDocumentDestination";
import { clearAddDocumentMessage } from "../../../redux/actions/addNewDocument";
import { logout } from "../../../redux/actions/logout";
import { fetchDocCategory } from "../../../redux/actions/manageDocumentCategory";
import ReactJoyride from "react-joyride";
import io from "socket.io-client";
import UserList from "../../common/userList/UserList";
import CircularProgress from "../../common/circularProgress/CircularProgressComponent";
import { animateScroll } from "react-scroll";

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
  documentId,
  documentType,
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
  submit_new_document,
  // addNewDocumentDraft,
  // submit_new_document_draft,
  clearAddDocumentMessage,
  logout,
  _logout,
  fetchDocCategory,
  doc_category,
  section_doc_category,
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

  const tutorial = [
    {
      target: ".addDocHeader",
      disableBeacon: true,
      content:
        "This is the form that you will going to fill up when you or your section/office will going to route a document.",
    },
    {
      target: ".addDocSubject",
      content:
        "This is where you will going to define the subject of the document that you will going to route. (Be precise in defining the subject of your document so that you can easily search it in the future.)",
    },
    {
      target: ".addDocType",
      content:
        "This is where you will going to define the document type of your document.",
    },
    {
      target: ".addDocCategory",
      content:
        "And this is where you will going to define the category of your document. (The purpose of this is to organize by category all the document(s) that your section had made)",
    },
    {
      target: ".addDocActionReq",
      content:
        "This is where you will going choose the action require for your document.",
    },
    {
      target: ".addDocNote",
      content:
        "And this is where you will going to place your note for your document.",
    },
    {
      target: ".addDocInternal",
      content:
        "Click this and choose the internal destination of your document. (You can choose multiple destination here, just pick the desired destination and then click add)",
    },
    {
      target: ".addDocExternal",
      content:
        "Click this and define the external destination of your document. (You can choose multiple destination here, just define the desired destination and then click add)",
    },
    {
      target: ".addDocBtnFinalize",
      content:
        "Click this to review all the information of your document. (You can go back  here  if there is a correction before you release the document)",
    },
  ];

  const [endSession, setEndSession] = useState(false);
  const [date, setDate] = useState({
    _date: new Date(),
  });

  const [error, setError] = useState({});
  const [finalize, setFinalize] = useState(false);
  const [destination, setDestination] = useState("");
  const [open, setOpen] = useState(true);
  const [startGuide, setStartGuide] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    socket = io(process.env.REACT_APP_SERVER);
    const timeID = setInterval(() => tick(), 1000);
    const obj = getFromStorage("documentTracking");

    if (obj && obj.token) {
      const { token } = obj;

      async function fetch() {
        await fetchUserById(token);
        await fetchDocumentTypes();
        await fetchAllSections();
        await fetchDocCategory(token);
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
        enqueueSnackbar("Document released successfully...", {
          variant,
        });
        clearAddDocumentMessage();
      }
      if (submit_new_document === "failed") {
        const variant = "error";
        enqueueSnackbar("Document released failed...", {
          variant,
        });
        clearAddDocumentMessage();
      }
    }

    if (_logout !== null) {
      if (_logout === "false") {
        const variant = "error";
        enqueueSnackbar("Error logging out", {
          variant,
        });
      }

      if (_logout === "true") {
        window.location.reload(true);
      }
    }

    return () => {
      clearInterval(timeID);
    };
  }, [
    match.params.id,
    submit_new_document,
    // submit_new_document_draft,
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

    if (!addDocument.documentCategory) {
      _error.documentCategory = "Document Category is required";
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
    scrollToTop();
    setFinalize(true);
  };

  const scrollToTop = () => {
    animateScroll.scrollToTop({
      containerId: "paper-container",
    });
  };

  const handleGoBack = async () => {
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
      addDocument.documentCategory,
      socket
    );
  };

  const handleSaveAsDraft = async () => {
    if (!formValidation) {
      const variant = "error";
      enqueueSnackbar("Fill out all required fields...", { variant });
      return;
    }

    // await addNewDocumentDraft(
    //   documentId.documentID,
    //   user.user_id,
    //   addDocument.subject,
    //   addDocument.documentType,
    //   addDocument.note,
    //   addDocument.action_req
    // );
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

    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      await logout(token);
    }
  };

  const handleStartGuide = (e) => {
    e.preventDefault();
    setStartGuide(true);
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
        <PrimarySearchAppBar />
        <div className={"col-md-2"}>
          <SideBarNavigation
            open={open}
            user={user}
            setOpen={setOpen}
            handleClick={handleClick}
          />
        </div>
        <div className={"col-md-8"}>
          {endSession && <Redirect to={"/"} />}
          <Paper
            id={"paper-container"}
            elevation={3}
            style={{
              marginTop: "7vh",
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
                    <div className={"col-md-7 addDocHeader"}>
                      <h5 style={{ textAlign: "left" }}>
                        Add New Document &nbsp;
                        <span style={{ color: "#2196F3" }}>
                          (To be filled-up by requesting party)
                        </span>
                      </h5>
                    </div>
                    <div className={"col-md-3"}>
                      <div style={{ textAlign: "right" }}>
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
                        section_doc_category={section_doc_category}
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
                        <div className={"addDocSubject"}>
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
                        </div>
                        <br />
                        <br />
                        <div className={"addDocType"}>
                          <SelectField
                            id={"documentType"}
                            name={"documentType"}
                            label={"Document Type"}
                            options={documentType}
                            error={error.documentType}
                            onChange={addDocumentInputChange}
                            variant={"outlined"}
                            value={addDocument.documentType}
                          />
                        </div>
                        <br />
                        <div className={"addDocCategory"}>
                          <SelectField
                            id={"documentCategory"}
                            name={"documentCategory"}
                            label={"Document Category"}
                            options={doc_category}
                            error={error.documentCategory}
                            onChange={addDocumentInputChange}
                            variant={"outlined"}
                            value={parseInt(addDocument.documentType)}
                          />
                        </div>
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
                        <div className={"row"}>
                          <div className={"col-md-4"}>
                            <div className={"addDocActionReq"}>
                              <FormGroup>{createCheckboxes()}</FormGroup>
                            </div>
                          </div>
                        </div>
                        <br />
                        <br />
                        <h5 style={{ color: "#2196F3" }}>
                          <CommentIcon />
                          &nbsp;Note
                        </h5>
                        <div className={"addDocNote"}>
                          <TextArea
                            placeholder={"Write Your Note Here"}
                            name={"note"}
                            onChange={addDocumentInputChange}
                            error={error.note}
                            value={addDocument.note}
                          />
                        </div>
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
                        <div className={"row"}>
                          <div className={"col-md-3"}>
                            <div className={"addDocInternal"}>
                              <Radio
                                checked={destination === "Internal"}
                                onChange={handleChangeDestination}
                                value="Internal"
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "A" }}
                              />
                              <label>Internal</label>
                            </div>
                          </div>
                          <div className={"col-md-3"}>
                            <div className={"addDocExternal"}>
                              <Radio
                                checked={destination === "External"}
                                onChange={handleChangeDestination}
                                value="External"
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "B" }}
                              />
                              <label>External</label>
                            </div>
                          </div>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <br />
                        <br />
                        {destination === "Internal" && (
                          <>
                            <SelectField
                              id={"internalDestination"}
                              name={"internalDestination"}
                              label={"Internal Office/Section"}
                              options={sections.filter(
                                (item) => item.id !== user.secshort
                              )}
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
                              key={des[0]}
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
                            marginTop: 10,
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
                            className={"btn btn-info addDocBtnFinalize"}
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
    user: state.fetchUserById,
    document: state.fetchDocumentById,
    documentId: state.fetchDocumentId,
    documentType: state.fetchDocumentTypes,
    action_req: state.fetchDocumentActionRequired,
    sections: state.fetchInternalDestination,
    addDocument: state.newDocumentCreation,
    submit_new_document: state.addNewDocument,
    // submit_new_document_draft: state.addNewDocumentDraft,
    _notification: state.notification,
    _logout: state.logout,
    doc_category: state.listSectionDocCategory,
    section_doc_category: state.manageDocumentCategory,
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
  notification,
  removeFirstIndexOnEditAddDocument,
  clearAddDocumentMessage,
  logout,
  fetchDocCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(AddDocument));
