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
import html2canvas from "html2canvas";
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
    note: ""
  });

  const [documentType, setDocumentType] = useState([]);

  const [validateActionReq, setValidateActionReq] = useState(false);
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
          .then(res1 => {
            axios
              .get("http://localhost:4000/dts/documentType")
              .then(res2 => {
                setDocumentType(res2.data);

                axios
                  .get(
                    "http://localhost:4000/dts/fetchActionReq/" +
                      match.params.id
                  )
                  .then(res3 => {
                    const checkedArr = [];
                    const checkbox = {};
                    for (let i = 0; i < res3.data.length; i++) {
                      if (res3.data[i]) {
                        checkedArr.push([
                          match.params.id,
                          res3.data[i].action_req
                        ]);
                        checkbox[res3.data[i].action_req] = true;
                      }
                    }
                    //Duplicate and replace checkbox check
                    setBoolCheckbox({ ...boolCheckbox, ...checkbox });
                    setUser({...user, user_id: token });
                    setFormData({
                      ...formData,
                      subject: res1.data.subject,
                      documentType: res1.data.docType_id.toString(),
                      action_req: checkedArr,
                      note: res1.data.note
                    });
                  })
                  .catch(err => {
                    const variant = "error";
                    enqueueSnackbar(JSON.stringify(err), { variant });
                  });
              })
              .catch(err => {
                const variant = "error";
                enqueueSnackbar(JSON.stringify(err), { variant });
              });
          })
          .catch(err => {
            const variant = "error";
            enqueueSnackbar(JSON.stringify(err), { variant });
          });
      } else {
        axios
          .get("http://localhost:4000/dts/documentId")
          .then(res => {
            setDocumentID(res.data);

            axios
              .get("http://localhost:4000/dts/user/" + token)
              .then(user => {
                setUser(user.data);

                axios
                  .get("http://localhost:4000/dts/documentType")
                  .then(res => {
                    setDocumentType(res.data);
                  })
                  .catch(err => {
                    const variant = "error";
                    enqueueSnackbar(JSON.stringify(err), { variant });
                  });
              })
              .catch(err => {
                const variant = "error";
                enqueueSnackbar(JSON.stringify(err), { variant });
              });
          })
          .catch(err => {
            const variant = "error";
            enqueueSnackbar(JSON.stringify(err), { variant });
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

    setError(_error);

    return Object.keys(_error).length === 0;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!formValidation() || formData.action_req.length === 0) {
      setValidateActionReq(true);
      const variant = "error";
      enqueueSnackbar("Fill out all required fields...", { variant });
      return;
    }

    if (formData.action_req.length === 0) {
      setValidateActionReq(true);
      return;
    }

    if (formData.action_req.length > 0) {
      setValidateActionReq(false);
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
    axios
      .post("http://localhost:4000/dts/addNewDocument", {
        documentID: documentID.documentID,
        creator: user.user_id,
        subject: formData.subject,
        doc_type: formData.documentType,
        note: formData.note,
        action_req: formData.action_req
      })
      .then(res => {
        Reactotron.log(res);
        if (res.status === 200) {
          if (canvas("#printarea", documentID.documentID)){
            setFinalize(false);
            setValidateActionReq(false);
            setFormData({
              ...formData,
              subject: "",
              documentType: "",
              action_req: [],
              note: ""
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
    if (!formValidation() || formData.action_req.length === 0) {
      setValidateActionReq(true);
      const variant = "error";
      enqueueSnackbar("Fill out all required fields...", { variant });
      return;
    }

    if (formData.action_req.length === 0) {
      setValidateActionReq(true);
      return;
    }

    if (formData.action_req.length > 0) {
      setValidateActionReq(false);
    }

    axios
      .post("http://localhost:4000/dts/draft", {
        documentID: documentID.documentID,
        creator: user.user_id,
        subject: formData.subject,
        doc_type: formData.documentType,
        note: formData.note,
        action_req: formData.action_req
      })
      .then(res => {
        if (res.status === 200) {
          const variant = "info";
          enqueueSnackbar("Document saved as draft...", {
            variant
          });
          setValidateActionReq(false);
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
                        {validateActionReq && (
                          <span style={{ color: "red" }}>
                            <small>Kindly check at least one action</small>
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

                        <div style={{ textAlign: "right", marginBottom: 200 }}>
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
