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
import {FormGroup} from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import CommentIcon from "@material-ui/icons/Comment";
import ExploreIcon from "@material-ui/icons/Explore";

export default function PendingDocumentInfo(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);

  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    setEndSession(!(obj && obj.token));
  }, []);

  const handleClick = () => {
    setOpen(!open);
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
                    <div className={"col-md-4"}>
                        <InputField
                            label={"Document Creator"}
                            name={"subject"}
                            disabled={true}
                            type={"text"}
                            // value={props.documentInfo.creator}
                        />
                        {/*<small>on {props.documentInfo.date_time_created}</small>*/}
                        <br />
                        <br />
                        <InputField
                            label={"Document Sender"}
                            name={"subject"}
                            disabled={true}
                            type={"text"}
                            // value={props.documentInfo.sender}
                        />
                        {/*<small>on {props.documentInfo.date_time_forwarded} </small>*/}
                    </div>
                    <br />
                    <br />
                    <h5 style={{ color: "#2196F3" }}>
                        <DescriptionIcon />
                        &nbsp;Document Information
                    </h5>
                    {/*<br />*/}
                    {/*<InputField*/}
                    {/*    label={"Destination Type"}*/}
                    {/*    name={"subject"}*/}
                    {/*    variant={"outlined"}*/}
                    {/*    disabled={true}*/}
                    {/*    type={"text"}*/}
                    {/*    value={props.documentInfo.destination_type}*/}
                    {/*/>*/}
                    <br />
                    <br />
                    <InputField
                        label={"Subject"}
                        name={"subject"}
                        variant={"outlined"}
                        disabled={true}
                        type={"text"}
                        // value={props.documentInfo.subject}
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
                        // value={props.documentInfo.doc_type}
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
                        {/*{props.documentInfo.action_req.map((action, index) => (*/}
                        {/*    <CheckBox*/}
                        {/*        checked={true}*/}
                        {/*        key={index}*/}
                        {/*        label={action.action_req}*/}
                        {/*        value={action.document_action_req_id}*/}
                        {/*        name={"action_req"}*/}
                        {/*    />*/}
                        {/*))}*/}
                    </FormGroup>
                    <br />
                    <br />
                    <h5 style={{ color: "#2196F3" }}>
                        <CommentIcon />
                        &nbsp;Note
                    </h5>
                    <br />
                    {/*<div>{props.documentInfo.note}</div>*/}

                    <br/>
                    <br/>
                    <h5 style={{ color: "#2196F3" }}>
                        <ExploreIcon />
                        &nbsp;Destination
                    </h5>
                    <br />
                    {/*<div style={{ marginTop: 50, textAlign: "right" }}>*/}
                    {/*    <button*/}
                    {/*        className={"btn btn-outline-info"}*/}
                    {/*        onClick={props.handlePendingDocument}*/}
                    {/*    >*/}
                    {/*        Pending*/}
                    {/*    </button>*/}
                    {/*    &nbsp;&nbsp;&nbsp;*/}
                    {/*    <button*/}
                    {/*        className={"btn btn-info"}*/}
                    {/*        onClick={props.handleSetForwardDialog}*/}
                    {/*    >*/}
                    {/*        Forward*/}
                    {/*    </button>*/}
                    {/*    &nbsp;&nbsp;&nbsp;*/}
                    {/*</div>*/}
                </div>
                <div className={"col-md-2"}></div>
            </div>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
