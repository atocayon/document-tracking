import React, { useEffect } from "react";
import { withSnackbar } from "notistack";
import DescriptionIcon from "@material-ui/icons/Description";
import FeedbackIcon from "@material-ui/icons/Feedback";
import CommentIcon from "@material-ui/icons/Comment";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";

import CancelIcon from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/Send";
import InputField from "../../common/textField/InputField";

import Barcode from "react-barcode";
import ExploreIcon from "@material-ui/icons/Explore";

import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import BusinessIcon from "@material-ui/icons/Business";
import Reactotron from "reactotron-react-js";
function FinalizeDocument(props) {
  const docType = props.documentType.filter(
    doc => doc.id === parseInt(props.data.documentType)
  );
  const destination = props.data.destination.filter((data,index) => index !== 0);
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
        <div style={{ textAlign: "left" }}>
          <small>&nbsp;&nbsp;DOCUMENT TRACKING NUMBER</small>
        </div>
        <div id={"printarea"} style={{ width: 200 }}>
          <Barcode value={props.trackingNumber} height={50} />
        </div>
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
              key={action[1]}
              label={action[1]}
              value={action[1]}
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
        <h5 style={{ color: "#2196F3" }}>
          <ExploreIcon />
          &nbsp;Destination
        </h5>
        <FormGroup>
          <CheckBox
            checked={true}
            key={props.documentDestination}
            label={props.documentDestination}
            value={props.documentDestination}
            name={props.documentDestination}
          />
        </FormGroup>

        <br />
        {destination.map(destination => (
          <>
            <Chip
              key={destination[4]}
              avatar={
                <Avatar>
                  <BusinessIcon />
                </Avatar>
              }
              label={destination[4]}
            />
            &nbsp;&nbsp;
          </>
        ))}
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
          <button className={"btn btn-info"} onClick={props.handleRelease}>
            <SendIcon />
            &nbsp;&nbsp;Release
          </button>
        </div>
      </div>
    </>
  );
}

export default withSnackbar(FinalizeDocument);
