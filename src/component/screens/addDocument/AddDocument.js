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
import BusinessIcon from '@material-ui/icons/Business';
function AddDocument({ match, enqueueSnackbar }) {
  const checkboxItem = [
    { id: 0, value: "For Approval" },
    { id: 1, value: "For Signature" },
    { id: 2, value: "For Endorsement" },
    { id: 3, value: "For Recommendation" },
    { id: 4, value: "For Action" },
    { id: 5, value: "For Comment" },
    { id: 6, value: "For Information" },
    { id: 7, value: "For File" }
  ];

  const [endSession, setEndSession] = useState(false);
  const [date, setDate] = useState({
    _date: new Date()
  });

  const [documentID, setDocumentID] = useState({});

  const [user, setUser] = useState({});

  const [formData, setFormData] = useState({
    subject: "",
    documentType: "",
    action_req: [],
    note: "",
    externalDestination: "",
    destination: []
  });

  const [documentType, setDocumentType] = useState([]);

  const [error, setError] = useState({});
  const [finalize, setFinalize] = useState(false);
  const [boolCheckbox, setBoolCheckbox] = useState({
    "For Approval": false,
    "For Signature": false,
    "For Endorsement": false,
    "For Recommendation": false,
    "For Action": false,
    "For Comment": false,
    "For Information": false,
    "For File": false
  });
  const [destination, setDestination] = useState("");
  const [section, setSection] = useState([]);
  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const timeID = setInterval(() => tick(), 1000);

    const obj = getFromStorage("documentTracking");

    if (obj && obj.token) {
      const { token } = obj;
      if (match.params.id) {
        setDocumentID({ ...documentID, documentID: match.params.id });
        axios
          .get("http://localhost:4000/dts/fetchDocument/" + match.params.id)
          .then(doc => {
            axios
              .get("http://localhost:4000/dts/documentType")
              .then(docType => {
                setDocumentType(docType.data);

                axios
                  .get(
                    "http://localhost:4000/dts/fetchActionReq/" +
                      match.params.id
                  )
                  .then(actionReq => {
                    const checkedArr = [];
                    const checkbox = {};
                    for (let i = 0; i < actionReq.data.length; i++) {
                      if (actionReq.data[i]) {
                        checkedArr.push([
                          match.params.id,
                          actionReq.data[i].action_req
                        ]);
                        checkbox[actionReq.data[i].action_req] = true;
                      }
                    }
                    //Duplicate and replace checkbox check
                    setBoolCheckbox({ ...boolCheckbox, ...checkbox });
                    setUser({ ...user, user_id: token });
                    setFormData({
                      ...formData,
                      subject: doc.data.subject,
                      documentType: doc.data.docType_id.toString(),
                      action_req: checkedArr,
                      note: doc.data.note
                    });
                  })
                  .catch(err => {
                    const variant = "error";
                    enqueueSnackbar("Error Fetching Document Action Request", {
                      variant
                    });
                  });
              })
              .catch(err => {
                const variant = "error";
                enqueueSnackbar("Error Fetching Document Type", { variant });
              });
          })
          .catch(err => {
            const variant = "error";
            enqueueSnackbar("Error Fetching Documents", { variant });
          });
      } else {
        axios
          .get("http://localhost:4000/dts/documentId")
          .then(docId => {
            setDocumentID(docId.data);

            axios
              .get("http://localhost:4000/dts/user/" + token)
              .then(user => {
                setUser(user.data);

                axios
                  .get("http://localhost:4000/dts/documentType")
                  .then(docType => {
                    setDocumentType(docType.data);

                    axios
                      .get("http://localhost:4000/dts/sections")
                      .then(_section => {
                        const res_section = [];
                        for (let i = 0; i < _section.data.length; i++) {
                          res_section.push({
                            id: _section.data[i].secshort,
                            type:
                              _section.data[i].section +
                              "(" +
                              _section.data[i].depshort +
                              ")"
                          });
                        }
                        setSection(res_section);
                      })
                      .catch(err => {
                        const variant = "error";
                        enqueueSnackbar("Error Fetching Section", { variant });
                      });
                  })
                  .catch(err => {
                    const variant = "error";
                    enqueueSnackbar("Error Fetching Document Type", {
                      variant
                    });
                  });
              })
              .catch(err => {
                const variant = "error";
                enqueueSnackbar("Error Fetching User", { variant });
              });
          })
          .catch(err => {
            const variant = "error";
            enqueueSnackbar("Error Fetching Document ID", { variant });
          });
      }
    }

    setEndSession(!(obj && obj.token));
    return () => {
      clearInterval(timeID);
    };
  }, [match.params.id]);

  const handleClick = () => {
    setOpen(!open);
  };

  const tick = () => {
    setDate({
      ...date,
      _date: new Date()
    });
  };

  const handleChange = ({ target }) => {
    const checkedArr = [];
    let val;
    if (target.type !== "checkbox") {
      val = target.value;
    } else {
      setBoolCheckbox({
        ...boolCheckbox,
        [target.value]: !boolCheckbox[target.value]
      });
      const checkeds = document.getElementsByTagName("input");
      for (let i = 0; i < checkeds.length; i++) {
        if (checkeds[i].checked) {
          checkedArr.push([documentID.documentID, checkeds[i].value]);
        }
      }

      val = checkedArr;
    }

    setFormData({
      ...formData,
      [target.name]: val
    });
  };

  const handleAddDestinationInternal = () => {
    const _destination = [];
    const internal = document.getElementById("internalDestination").value;

    _destination.push([documentID.documentID, user.user_id, "none", destination, internal, "2"]);
    setFormData({
      ...formData,
      destination: [...formData.destination, ..._destination]
    });
  };

  const handleAddDestinationExternal = () => {
    const _destination = [];
    const external = formData.externalDestination;
    const _error = {};
    if (external === "") {
      _error.externalDestination = "Type Something";
      setError(_error);
    } else {
      _destination.push([documentID.documentID, user.user_id, "none", destination, external, "2"]);
      setFormData({
        ...formData,
        externalDestination: "",
        destination: [...formData.destination, ..._destination]
      });
    }

  };

  const handleChangeDestination = ({ target }) => {
    setDestination(target.value);
    setFormData({ ...formData, destination: [] });
  };

  const handleRemoveDestination = name => event => {
    const desArray = [...formData.destination];
    Reactotron.log(desArray);

    desArray.splice(name, 1);

    setFormData({
      ...formData,
      destination: desArray
    });
  };

  const formValidation = () => {
    const _error = {};

    if (!formData.subject) {
      _error.subject = "Subject is required";
    }

    if (!formData.note) {
      _error.note = "Note is required";
    }
    if (!formData.documentType) {
      _error.documentType = "Document type is required";
    }

    if (formData.destination.length === 0) {
      _error.destination = "Destination is Required";
    }

    if (!destination) {
      _error.radDestination = "Please specify destination";
    }

    if (formData.action_req.length === 0) {
      _error.action_req = "Please select at least one action required";
    }

    setError(_error);

    return Object.keys(_error).length === 0;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!formValidation()) {
      const variant = "error";
      enqueueSnackbar("Fill out all required fields...", { variant });
      return;
    }

    setFinalize(true);
  };

  const handleGoBack = () => {
    setFinalize(false);
  };

  const handleRelease = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    setOpenDialog(false);
    formData.destination.splice(-1,0, [documentID.documentID, user.user_id, "none", destination, "none", "5"]);
    axios
      .post("http://localhost:4000/dts/addNewDocument", {
        documentID: documentID.documentID,
        creator: user.user_id,
        subject: formData.subject,
        doc_type: formData.documentType,
        note: formData.note,
        action_req: formData.action_req,
        documentLogs: formData.destination
      })
      .then(res => {
        Reactotron.log(res);
        if (res.status === 200) {
          if (canvas("#printarea", documentID.documentID)) {
            setFinalize(false);
            setDestination("");
            setFormData({
              ...formData,
              subject: "",
              documentType: "",
              action_req: [],
              note: "",
              externalDestination: "",
              destination: []
            });
            setBoolCheckbox({
              ...boolCheckbox,
              "For Approval": false,
              "For Signature": false,
              "For Endorsement": false,
              "For Recommendation": false,
              "For Action": false,
              "For Comment": false,
              "For Information": false,
              "For File": false
            });

            const variant = "info";
            enqueueSnackbar("Document release successfully...", {
              variant
            });
          }
        }
      })
      .catch(err => {
        const variant = "error";
        enqueueSnackbar("Server Error", { variant });
      });
  };

  const handleSaveAsDraft = () => {
    if (!formValidation) {
      const variant = "error";
      enqueueSnackbar("Fill out all required fields...", { variant });
      return;
    }

    formData.destination.splice(-1,0, [documentID.documentID, user.user_id, "none", destination, "none", "5"]);

    axios
      .post("http://localhost:4000/dts/draft", {
        documentID: documentID.documentID,
        creator: user.user_id,
        subject: formData.subject,
        doc_type: formData.documentType,
        note: formData.note,
        action_req: formData.action_req,
        documentLogs: formData.destination
      })
      .then(res => {
        if (res.status === 200) {
          const variant = "info";
          enqueueSnackbar("Document saved as draft...", {
            variant
          });

          setFormData({
            ...formData,
            subject: "",
            documentType: "",
            action_req: [],
            note: ""
          });

          setBoolCheckbox({
            ...boolCheckbox,
            "For Approval": false,
            "For Signature": false,
            "For Endorsement": false,
            "For Recommendation": false,
            "For Action": false,
            "For Comment": false,
            "For Information": false,
            "For File": false
          });

          setDocumentID({
            ...documentID,
            documentID: documentID.documentID + 1
          });
        }
      })
      .catch(err => {
        const variant = "error";
        enqueueSnackbar(err, {
          variant
        });
      });
  };

  const createCheckbox = label => {
    return (
      <CheckBox
        checked={boolCheckbox[label.value]}
        onChange={handleChange}
        key={label.id}
        label={label.value}
        value={label.value}
        name={"action_req"}
      />
    );
  };

  const createCheckboxes = () => checkboxItem.map(createCheckbox);

  // Reactotron.log(boolCheckbox);
  return (
    <>
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
          <Paper
            elevation={3}
            style={{
              marginTop: 70,
              paddingTop: 0,
              height: "100vh",
              overflow: "auto"
            }}
          >
            {openDialog && (
              <DialogComponent
                fullscreen={fullScreen}
                openDialog={openDialog}
                title={""}
                content={
                  "You are about to release a document, print the barcode that will be downloaded after you confirm this message and attach it to the corresponding document."
                }
                handleClose={handleClose}
                handleConfirm={handleConfirm}
              />
            )}
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
                    <div className={"col-md-8"}>
                      <h5 style={{ textAlign: "left" }}>
                        Add New Document &nbsp;
                        <span style={{ color: "#2196F3" }}>
                          (To be filled-up by requesting party)
                        </span>
                      </h5>
                    </div>
                    <div className={"col-md-2"}>
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
                        trackingNumber={documentID}
                        data={formData}
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
                        <InputField
                          id={"tackDocument"}
                          label={"Tracking Number"}
                          variant={"outlined"}
                          disabled={true}
                          value={
                            Object.keys(documentID).length > 0 &&
                            documentID.documentID
                          }
                          type={"number"}
                        />
                        <br />
                        <br />
                        <InputField
                          id={"tackDocument"}
                          label={"Subject"}
                          name={"subject"}
                          variant={"outlined"}
                          onChange={handleChange}
                          error={error.subject}
                          type={"text"}
                          value={formData.subject}
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
                          onChange={handleChange}
                          variant={"outlined"}
                          value={formData.documentType}
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
                          onChange={handleChange}
                          error={error.note}
                          value={formData.note}
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
                             <br/>
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
                              options={section}
                              // onChange={handleChange}
                              variant={"outlined"}
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
                              onChange={handleChange}
                              value={formData.externalDestination}
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
                        {formData.destination.length > 0 &&
                          formData.destination.map((des, index) => (
                              <>
                                <Chip
                                    key={index}
                                    avatar={
                                      <Avatar>
                                        <BusinessIcon />
                                      </Avatar>
                                    }
                                    label={des[4]}
                                    onDelete={handleRemoveDestination(index)}
                                />&nbsp;&nbsp;
                              </>

                          ))}
                        <br />
                        <div
                          style={{
                            textAlign: "right",
                            marginBottom: 100,
                            marginTop: 50
                          }}
                        >
                          <button
                            className={"btn btn-outline-info"}
                            onClick={handleSaveAsDraft}
                          >
                            <DraftsIcon />
                            &nbsp;Save as Draft
                          </button>
                          &nbsp;&nbsp;&nbsp;
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
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}

export default withSnackbar(AddDocument);
