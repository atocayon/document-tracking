import React, { Component } from "react";
import InputField from "../../common/textField/InputField";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import DoneIcon from "@material-ui/icons/Done";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";

export default class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={"jumbotron"} style={{ padding: 50 }}>
          <div className={"row"}>
            <div className={"col-md-4"}>
              <div className={"row"}>
                <div className={"col-md-5"}></div>
                <div className={"col-md-6"}>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: 8 }}>
                      NMP Form No. AFM-03
                      <br />
                      Issue No. 01
                      <br />
                      Rev. No. 02 Oct. 30, 2018
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-md-4"}>
              <div style={{ textAlign: "center" }}>
                <br />
                <h5 style={{ textDecoration: "underline", fontWeight: "bold" }}>
                  ROUTING SLIP
                </h5>
              </div>
            </div>
            <div className={"col-md-4"}></div>
          </div>
        </div>

        <div className={"row"}>
          <div className={"col-md-2"}></div>
          <div
            className={"col-md-8"}
            style={{ overflow: "auto", paddingBottom: 200 }}
          >
            <small>
              Note: To be attached to any communications, vouchers and any other
              document for transmission
            </small>

            <div className={"row"} style={{ marginTop: 50 }}>
              <div className={"col-md-4"}>
                <InputField
                  label={"Requesting party:"}
                  name={"subject"}
                  disabled={true}
                  type={"text"}
                  // variant={"outlined"}
                  value={
                    this.props.pendingDocumentInfo.creator +
                      ", " +
                      this.props.pendingDocumentInfo.creatorPosition +
                      " (" +
                      this.props.pendingDocumentInfo.creatorSection +
                      ")" || ""
                  }
                />
              </div>
              <div className={"col-md-4"}>
                <InputField
                  label={"Subject"}
                  name={"subject"}
                  // variant={"outlined"}
                  disabled={true}
                  type={"text"}
                  value={this.props.pendingDocumentInfo.subject || ""}
                />
              </div>
              <div className={"col-md-4"}>
                <InputField
                  label={"Date/Time:"}
                  name={"date_time"}
                  // variant={"outlined"}
                  disabled={true}
                  type={"text"}
                  value={this.props.pendingDocumentInfo.date_time_created || ""}
                />
              </div>
            </div>
            <div className={"col-md-4"}></div>

            <br />
            <br />
            <h6 style={{ color: "#2196F3" }}>
              <FeedbackIcon />
              &nbsp;Action Required
            </h6>
            <br />
            <FormGroup row>
              {this.props.pendingDocumentInfo.action_req.map(
                (action, index) => (
                  <CheckBox
                    checked={true}
                    key={index}
                    label={action.action_req}
                    value={action.document_action_req_id}
                    name={"action_req"}
                  />
                )
              )}
            </FormGroup>
            <br />
            <table
              className={"table table-bordered table-stripped"}
              style={{ fontSize: 14 }}
            >
              <thead>
                <tr>
                  <th>Name of office/division/section/unit</th>
                  <th>Date/Time Received</th>
                  <th>Action Taken</th>
                  <th>Date/Time Released</th>
                  <th>Signature/Initial</th>
                </tr>
              </thead>
              <tbody>
                {this.props.pendingDocumentInfo.destination.map(
                  (data, index) => (
                    <tr>
                      <td>{data.office}</td>
                      <td>{data.date_time_receive}</td>
                      <td>{data.action_taken.remarks}</td>
                      <td>{data.date_time_released.date_time_released}</td>
                      <td></td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className={"col-md-2"}></div>
        </div>
      </div>
    );
  }
}
