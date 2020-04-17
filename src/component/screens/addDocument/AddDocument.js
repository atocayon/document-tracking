import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import InputField from "../../common/textField/InputField";
import ButtonComponent from "../../common/button/ButtonComponent";
import Paper from "@material-ui/core/Paper";
import { Checkbox, FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import TextArea from "../../common/textArea/TextArea";
import { Link, Redirect } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import owl from "../../../img/owl.png";
import { withSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import { getFromStorage } from "../../storage";
import html2canvas from "html2canvas";
import Barcode from "react-barcode";
import SelectField from "../../common/selectField/SelectField";
import DoneIcon from "@material-ui/icons/Done";
import DraftsIcon from "@material-ui/icons/Drafts";
import DescriptionIcon from "@material-ui/icons/Description";
import FeedbackIcon from "@material-ui/icons/Feedback";
import CommentIcon from "@material-ui/icons/Comment";
import FinalizeDocument from "./FinalizeDocument";
const checkboxItem = [
  { id: 0, value: "For Approval"},
  {id: 1, value: "For Signature"},
  {id: 2 , value: "For Endorsement"},
  {id: 3, value: "For Recommendation"},
  {id: 4, value: "For Action"},
  {id: 5, value: "For Comment"},
  {id: 6, value: "For Information"},
  {id: 7, value: "For File"}
];

function AddDocument(props) {
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
    "For Approval" :  false,
    "For Signature": false,
    "For Endorsement": false,
    "For Recommendation": false,
    "For Action": false,
    "For Comment": false,
    "For Information": false,
    "For File": false
  });
  useEffect(() => {
    const timeID = setInterval(() => tick(), 1000);

    const obj = getFromStorage("documentTracking");

    if (obj && obj.token) {
      const { token } = obj;

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
                  props.enqueueSnackbar(err, { variant });
                });
            })
            .catch(err => {
              const variant = "error";
              props.enqueueSnackbar(err, { variant });
            });
        })
        .catch(err => {
          const variant = "error";
          props.enqueueSnackbar(err, { variant });
        });
    }

    setEndSession(!(obj && obj.token));
    return () => {
      clearInterval(timeID);
    };
  }, []);

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
          checkedArr.push(checkeds[i].value);

        }
      }

      val = checkedArr;
    }

    setFormData({
      ...formData,
      [target.name]: val
    });




    Reactotron.log(boolCheckbox);
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
      props.enqueueSnackbar("Fill out all required fields...", { variant });
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
    // let content = document.getElementById('printarea');
    // const iframe = document.createElement('iframe');
    // let pri;
    // iframe.setAttribute('title', documentID.documentID);
    // iframe.setAttribute('id', documentID.documentID);
    // iframe.setAttribute('style', 'height: 0px; width: 0px; position: absolute;');
    // document.body.appendChild(iframe);
    // pri = iframe.contentWindow;
    // pri.document.open();
    // pri.document.write(content.innerHTML);
    // pri.document.close();
    // pri.focus();
    // pri.print();
  };

  const handleGoBack = () => {
    setFinalize(false);
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
      ) ;
};

  const createCheckboxes = () => checkboxItem.map(createCheckbox);


  return (
    <>
      {endSession && <Redirect to={"/"} />}
      <Paper
        elevation={3}
        style={{
          marginTop: 80,
          paddingTop: 0
        }}
      >
        {/*<div id={"printarea"}>*/}
        {/*  <Barcode*/}
        {/*      value={Object.keys(documentID).length > 0 && documentID.documentID}*/}
        {/*  />*/}
        {/*</div>*/}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div
              className={"jumbotron"}
              style={{ paddingTop: "2vh", paddingBottom: "2vh" }}
            >
              <div className={"row"}>
                <div className={"col-md-2"}>
                  <div className={"row"}>
                    <div className={"col-md-6"}>
                      {!finalize && (
                        <Link to={"/"}>
                          <ArrowBackIcon style={{ fontSize: "2vw" }} />
                        </Link>
                      )}
                    </div>
                    <div className={"col-md-6"}>
                      <div style={{ textAlign: "right" }}></div>
                    </div>
                  </div>
                </div>
                <div className={"col-md-8"}>
                  {!finalize && (
                    <h5 style={{ textAlign: "left" }}>
                      Add New Document &nbsp;
                      <span style={{ color: "#2196F3" }}>
                        (To be filled-up by requesting party)
                      </span>
                    </h5>
                  )}
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
                      - You may remove any sensitive information (e.g monetary
                      amounts, names, etc.) from the subject if they are not
                      necessary in tracking the document.
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

                    <div style={{ textAlign: "right" }}>
                      <button className={"btn btn-outline-info"}>
                        <DraftsIcon />
                        &nbsp;Save as Draft
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button className={"btn btn-info"} onClick={handleSubmit}>
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
    </>
  );
}

export default withSnackbar(AddDocument);
