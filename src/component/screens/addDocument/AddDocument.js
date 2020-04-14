import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import InputField from "../../common/textField/InputField";
import ButtonComponent from "../../common/button/ButtonComponent";
import Paper from "@material-ui/core/Paper";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import TextArea from "../../common/textArea/TextArea";
import {Link, Redirect} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import owl from "../../../img/owl.png";
import { withSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import { getFromStorage } from "../../storage";

function AddDocument(props) {
  const [endSession, setEndSession] = useState(false);
  const [date, setDate] = useState({
    _date: new Date()
  });

  const [documentID, setDocumentID] = useState({});
  const [user, setUser] = useState({});
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
              })
              .catch(err => {
                alert(err);
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

  // Reactotron.log(documentID);
  return (
      <>
        {endSession && <Redirect to={"/"} />}
        <Paper
            elevation={3}
            style={{
              marginBottom: 0,
              bottom: 0,
              height: "100vh"
            }}
        >
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
                  <div className={"col-md-10"}>
                    <h5 style={{ textAlign: "left", fontWeight: "bold" }}>
                      Routing Slip Form{" "}
                      <span style={{ color: "#2196F3" }}>
                    (To be filled-up by requesting party)
                  </span>
                    </h5>
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

            <Grid item xs={4} style={{ paddingLeft: "2vw" }}>
              <InputField
                  id={"tackDocument"}
                  label={"Tracking Number"}
                  variant={"filled"}
                  disabled={true}
                  value={Object.keys(documentID).length > 0 && documentID.documentID}
              />
            </Grid>

            <Grid item xs={8}></Grid>

            <Grid item xs={4} style={{ paddingLeft: "2vw" }}>
              <InputField
                  id={"tackDocument"}
                  label={"Requesting Party"}
                  variant={"filled"}
                  value={Object.keys(user).length > 0 && user.name}
                  disabled={true}
              />
            </Grid>

            <Grid item xs={4}>
              <InputField
                  id={"tackDocument"}
                  label={"Subject"}
                  variant={"outlined"}
              />
            </Grid>

            <Grid item xs={4} style={{ paddingRight: "2vw" }}>
              <InputField
                  id={"tackDocument"}
                  label={"Date/Time"}
                  variant={"filled"}
                  value={
                    date._date.toLocaleDateString() +
                    " " +
                    date._date.toLocaleTimeString()
                  }
                  disabled={true}
              />
            </Grid>

            <Grid item xs={12} style={{ paddingLeft: "2vw" }}>
              <h5 style={{ color: "#2196F3" }}>ACTION REQUIRED</h5>
            </Grid>

            <Grid item xs={12} style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
              <FormGroup row>
                <CheckBox
                    checked={false}
                    onChange={() => {}}
                    value={""}
                    label={"For Approval"}
                />

                <CheckBox
                    checked={false}
                    onChange={() => {}}
                    value={""}
                    label={"For Signature"}
                />

                <CheckBox
                    checked={false}
                    onChange={() => {}}
                    value={""}
                    label={"For Endorsement"}
                />

                <CheckBox
                    checked={false}
                    onChange={() => {}}
                    value={""}
                    label={"For Recommendation"}
                />

                <CheckBox
                    checked={false}
                    onChange={() => {}}
                    value={""}
                    label={"For Action"}
                />

                <CheckBox
                    checked={false}
                    onChange={() => {}}
                    value={""}
                    label={"For Comment"}
                />

                <CheckBox
                    checked={false}
                    onChange={() => {}}
                    value={""}
                    label={"For Information"}
                />

                <CheckBox
                    checked={false}
                    onChange={() => {}}
                    value={""}
                    label={"For File"}
                />
              </FormGroup>
            </Grid>
            {/*<Grid item xs={12} style={{ paddingLeft: "2vw" }}>*/}
            {/*  <h5 style={{ color: "#2196F3" }}>DESTINATION</h5>*/}
            {/*</Grid>*/}
            {/*<Grid item xs={4} style={{paddingLeft: "2vw"}}>*/}
            {/*  <InputField*/}
            {/*    id={"tackDocument"}*/}
            {/*    label={"Name/Office"}*/}
            {/*    variant={"outlined"}*/}
            {/*  />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={8}></Grid>*/}

            <Grid item xs={12} style={{ paddingLeft: "2vw" }}>
              <h5 style={{ color: "#2196F3" }}>NOTE:</h5>
              <TextArea placeholder={"Write Your Note Here"} />
            </Grid>

            <Grid item xs={12} style={{ paddingRight: "2vw" }}>
              <div style={{ textAlign: "right" }}>
                <ButtonComponent
                    variant={"contained"}
                    color={"primary"}
                    size={"large"}
                    text={"Finalize"}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </>

  );
}

export default withSnackbar(AddDocument);
