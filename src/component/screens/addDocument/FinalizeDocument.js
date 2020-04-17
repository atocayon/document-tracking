import React from "react";
import { withSnackbar } from "notistack";
import DescriptionIcon from "@material-ui/icons/Description";
import FeedbackIcon from "@material-ui/icons/Feedback";
import CommentIcon from "@material-ui/icons/Comment";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import Reactotron from "reactotron-react-js";
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
            as release. Please review the document information
            carefully and make sure that all information given is correct.
          </p>
        </div>
        <table className={"table table-bordered"}>
          <tbody>
            <tr>
              <td style={{ color: "#2196F3" }}>Tracking Number</td>
              <td>{props.trackingNumber.documentID}</td>
            </tr>
            <tr>
              <td style={{ color: "#2196F3" }}>Subject</td>
              <td>{props.data.subject}</td>
            </tr>
            <tr>
              <td style={{ color: "#2196F3" }}>Document Type</td>
              <td>
                {docType.map(res => (
                  <span key={res.id}>{res.type}</span>
                ))}
              </td>
            </tr>

            <tr>
              <td style={{ color: "#2196F3" }}>Action Required</td>
              <td>
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
              </td>
            </tr>

            <tr>
              <td style={{ color: "#2196F3" }}>Note</td>
              <td>{props.data.note}</td>
            </tr>
          </tbody>
        </table>

          <div style={{textAlign: "right"}}>
              <button className={"btn btn-outline-info"} onClick={props.handleGoBack}>
                  Go Back
              </button>

              &nbsp;&nbsp;&nbsp;
              <button className={"btn btn-info"}>
                  Release
              </button>
          </div>
      </div>
    </>
  );
}

export default withSnackbar(FinalizeDocument);
