import React from "react";
import { withSnackbar } from "notistack";
import DescriptionIcon from "@material-ui/icons/Description";
import FeedbackIcon from "@material-ui/icons/Feedback";
import CommentIcon from "@material-ui/icons/Comment";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import Reactotron from "reactotron-react-js";
import CancelIcon from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/Send";
import InputField from "../../common/textField/InputField";
import SelectField from "../../common/selectField/SelectField";
import TextArea from "../../common/textArea/TextArea";
import DraftsIcon from "@material-ui/icons/Drafts";
import DoneIcon from "@material-ui/icons/Done";
function FinalizeDocument(props) {
  const docType = props.documentType.filter(
    doc => doc.id === parseInt(props.data.documentType)
  );

  return (
    <>
      <div>
        <div className={"alert alert-warning"}>
          <p>
            You CANNOT make any changes to this document once it has been serve
            as release. Please review the document information carefully and
            make sure that all information given is correct.
          </p>
        </div>
        <br />

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
          value={props.trackingNumber.documentID}
          type={"number"}
        />
        <br />
        <br />
        <InputField
          id={"tackDocument"}
          label={"Subject"}
          name={"subject"}
          variant={"outlined"}
          disabled={true}
          type={"text"}
          value={props.data.subject}
        />

        <br />
        <br />

        <InputField
          id={"documentType"}
          label={"Document Type"}
          name={"documentType"}
          variant={"outlined"}
          disabled={true}
          type={"text"}
          value={docType.map(res => res.type)}
        />

        <br />
        <br />

        <h5 style={{ color: "#2196F3" }}>
          <FeedbackIcon />
          &nbsp;Action Required
        </h5>

        <br />
        <FormGroup>
          {props.data.action_req.map(action => (
            <CheckBox
              checked={true}
              key={action}
              label={action}
              value={action}
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
        <div>{props.data.note}</div>

        <br />
        <br />

        <div style={{ textAlign: "right", marginBottom: 50 }}>
          <button
            className={"btn btn-outline-info"}
            onClick={props.handleGoBack}
          >
            <CancelIcon />
            &nbsp;&nbsp;Cancel
          </button>
          &nbsp;&nbsp;&nbsp;
          <button className={"btn btn-info"}>
            <SendIcon />
            &nbsp;&nbsp;Release
          </button>
        </div>
      </div>
    </>
  );
}

export default withSnackbar(FinalizeDocument);
