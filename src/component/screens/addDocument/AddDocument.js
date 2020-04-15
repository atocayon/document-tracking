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

const checkboxItem = [
  "For Approval",
  "For Signature",
  "For Endorsement",
  "For Recommendation",
  "For Action",
  "For Comment",
  "For Information",
  "For File"
];

// const selectItem = [
//   {value: "Certificate of Service" , text: "Certificate of Service"},
//   {value: "Disbursement Voucher" , text: "Disbursement Voucher"},
//   {value: "Inventory and Inspection Report" , text: "Inventory and Inspection Report"},
//   {value: "Letter" , text: "Letter"},
//   {value: "Liquidation Report" , text: "Liquidation Report"},
//   {value: "Memorandum" , text: "Memorandum"},
//   {value: "Memorandum of Agreement" , text: "Memorandum of Agreement"},
//   {value: "Memorandum Receipt" , text: "Memorandum Receipt"},
//   {value: "Official Cash Book" , text: "Official Cash Book"},
//   {value: "Personal Data Sheet" , text: "Personal Data Sheet"},
//   {value: "Purchase Order" , text: "Purchase Order"},
//   {value: "Purchase Request" , text: "Purchase Request"},
//   {value: "Referral Slip" , text: "Referral Slip"},
//   {value: "Request for Obligation of Allotments" , text: "Request for Obligation of Allotments"},
//   {value: "Requisition and Issue Voucher" , text: "Requisition and Issue Voucher"},
//   {value: "Unclassified" , text: "Unclassified"}
// ];

function AddDocument(props) {
  const wrapper_ref = useRef();
  const [endSession, setEndSession] = useState(false);

  // let selectedCheckboxes = new Set();

  const [date, setDate] = useState({
    _date: new Date()
  });

  const [documentID, setDocumentID] = useState({});

  const [user, setUser] = useState({});

  const [formData, setFormData] = useState({
    subject: "",
    action_req: [],
    note: "",
    documentType: ""
  });

  const [documentType, setDocumentType] = useState([]);

  const [validateActionReq, setValidateActionReq] = useState(false);
  const [error, setError] = useState({});

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

              axios.get("http://localhost:4000/dts/documentType").then(res => {
                setDocumentType(

                    res.data
                );
              }).catch(err => {
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

    Reactotron.log(target.name);
  };

  const formValidation = () => {
    const _error = {};

    if (!formData.subject) _error.subject = "Subject is required";
    if (!formData.note) _error.note = "Note is required";
    if (!formData.documentType) _error.documentType = "Document type is required";

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

    if (formData.action_req.length > 0) {
      setValidateActionReq(false);
    }

    Reactotron.log(formData);
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

  const createCheckbox = label => (
    <CheckBox
      // checked={false}
      onChange={handleChange}
      key={label}
      label={label}
      value={label}
      name={"action_req"}
    />
  );

  const createCheckboxes = () => checkboxItem.map(createCheckbox);

  return (
    <>
      {endSession && <Redirect to={"/"} />}
      <Paper
        elevation={3}
        style={{
          marginTop: 80,
          // height: "100vh",
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
                      <Link to={"/"}>
                        <ArrowBackIcon style={{ fontSize: "2vw" }} />
                      </Link>
                    </div>
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
                    <small>{date._date.toLocaleDateString() +
                    " " +
                    date._date.toLocaleTimeString()}</small>
                  </span>
                </div>
              </div>

              {/*<small>*/}
              {/*  Note: To be attached to any communications, vouchers and any other*/}
              {/*  document for transmission.*/}
              {/*  <br />*/}
              {/*  (To be filled-up by requesting party)*/}
              {/*</small>*/}
            </div>
          </Grid>

          <Grid item xs={12} style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>

            <div className={"row"}>

              <div className={"col-md-12"}>

              </div>

              <div className={"col-md-2"}>

              </div>
              <div className={"col-md-8"}>
                <div>
                  <h5 style={{ color: "#2196F3" }}>Document Information</h5>
                  <br/>
                </div>
                <InputField
                    id={"tackDocument"}
                    label={"Tracking Number"}
                    variant={"outlined"}
                    disabled={true}
                    value={
                      Object.keys(documentID).length > 0 && documentID.documentID
                    }
                />
                <br/>
                <br/>
                <InputField
                    id={"tackDocument"}
                    label={"Subject"}
                    name={"subject"}
                    variant={"outlined"}
                    onChange={handleChange}
                    error={error.subject}
                />
                <small>- You may remove any sensitive information (e.g monetary amounts, names, etc.) from the subject if they are not necessary in tracking the document.</small>

                <br/>
                <br/>

                <SelectField
                    id={"documentType"}
                    name={"documentType"}
                    label={"Document Type"}
                    options={documentType}
                    error={error.documentType}
                    onChange={handleChange}
                    variant={"outlined"}
                />

                <br/>
                <br/>

                <h5 style={{ color: "#2196F3" }}>ACTION REQUIRED</h5>
                {validateActionReq && (
                    <span style={{ color: "red" }}>
                <small>Kindly check at least one action</small>
              </span>
                )}

                <br/>
                <FormGroup>{createCheckboxes()}</FormGroup>

                <br/>
                <br/>

                <h5 style={{ color: "#2196F3" }}>NOTE:</h5>
                <TextArea
                    placeholder={"Write Your Note Here"}
                    name={"note"}
                    onChange={handleChange}
                    error={error.note}
                />

                <br/>
                <br/>

                <div style={{ textAlign: "right" }}>

                  <button className={"btn btn-outline-info"}>
                    Save as Draft
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                      className={"btn btn-info"}
                      onClick={handleSubmit}

                  >
                    Finalize
                  </button>
                </div>

              </div>
              <div className={"col-md-2"}>

              </div>
            </div>

          </Grid>

















          <Grid item xs={12} style={{ paddingRight: "2vw" }}>

          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default withSnackbar(AddDocument);
