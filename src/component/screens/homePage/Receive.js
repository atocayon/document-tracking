import React from "react";
import DescriptionIcon from "@material-ui/icons/Description";
import InputField from "../../common/textField/InputField";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import CommentIcon from "@material-ui/icons/Comment";

export default function Receive(props) {
  return (
    <>
      <div className={"row"}>
        <div className={"col-md-2"}></div>
        <div
          className={"col-md-8"}
          style={{ overflow: "auto", paddingBottom: 100 }}
        >
          <br />
          <div className={"col-md-4"}>
            <InputField
              label={"Document Creator"}
              name={"subject"}
              disabled={true}
              type={"text"}
              value={props.documentInfo.creator}
            />
            <small>on {props.documentInfo.date_time_created}</small>
            <br />
            <br />
            <InputField
              label={"Document Sender"}
              name={"subject"}
              disabled={true}
              type={"text"}
              value={props.documentInfo.sender}
            />
            <small>on {props.documentInfo.date_time_forwarded} </small>
          </div>
          <br />
          <br />
          <h5 style={{ color: "#2196F3" }}>
            <DescriptionIcon />
            &nbsp;Document Information
          </h5>
          <br />
          <InputField
            label={"Destination Type"}
            name={"subject"}
            variant={"outlined"}
            disabled={true}
            type={"text"}
            value={props.documentInfo.destination_type}
          />
          <br />
          <br />
          <InputField
            label={"Subject"}
            name={"subject"}
            variant={"outlined"}
            disabled={true}
            type={"text"}
            value={props.documentInfo.subject}
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
            value={props.documentInfo.doc_type}
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
            {props.documentInfo.action_req.map((action, index) => (
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
          <div>{props.documentInfo.note}</div>
          <div style={{ marginTop: 50, textAlign: "right" }}>
            <button
              className={"btn btn-outline-info"}
              onClick={props.handlePendingDocument}
            >
              Pending
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className={"btn btn-info"}
              onClick={props.handleSetForwardDialog}
            >
              Forward
            </button>
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>
        <div className={"col-md-2"}></div>
      </div>
    </>
  );
}
