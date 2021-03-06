import React, { Component, useRef } from "react";
import InputField from "../../common/textField/InputField";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import "../../../styles/style.css";
export default class Content extends Component {
  render() {
    return (
      <div className={"routingSlipContent"}>
        <div className={"jumbotron"} style={{ padding: 50 }}>
          <div className={"row"}>
            <div className={"col-md-4"}>
              <div className={"row"}>
                <div className={"col-md-5"}></div>
                <div className={"col-md-6"}>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: 8 }} className={"formNumber"}>
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
                <h5
                  className={"routingTitle"}
                  style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  ROUTING SLIP
                </h5>
              </div>
            </div>
            <div className={"col-md-4"}></div>
          </div>
        </div>
        <p className={"note"} style={{ display: "none" }}>
          Note:
          <br />
          <i>
            To be attached to any communications, vouchers and any other
            document for transmission.
          </i>
        </p>
        <p className={"note2"} style={{ display: "none" }}>
          (To be filled-up by requesting party)
        </p>
        <div className={"row"}>
          <div className={"col-md-2"}></div>
          <div className={"col-md-8"}>
            <br />
            <div className={"row originatorInfo"}>
              <div className={"col-md-4 input"}>
                <InputField
                  label={"Requesting Party"}
                  // variant={"outlined"}
                  disabled={true}
                  type={"text"}
                  value={this.props.documentInfo.creatorSection || ""}
                />
              </div>
              <div className={"col-md-4 input"}>
                <InputField
                  label={"Subject"}
                  // variant={"outlined"}
                  disabled={true}
                  type={"text"}
                  value={this.props.documentInfo.subject || ""}
                />
              </div>
              <div className={"col-md-4 input"}>
                <InputField
                  label={"Date/Time:"}
                  name={"date_time"}
                  // variant={"outlined"}
                  disabled={true}
                  type={"text"}
                  value={this.props.documentInfo.date_time_created || ""}
                />
              </div>
            </div>
            <br />
            <br />
            <h6 className={"actionRequired"} style={{ color: "#2196F3" }}>
              <FeedbackIcon className={"action_req_icon"} />
              &nbsp;Action Required:
            </h6>
            <br />
            <div>
              <FormGroup row className={"checkbox"}>
                {this.props.documentInfo.action_req.map((action) => (
                  <CheckBox
                    checked={true}
                    key={action.document_action_req_id}
                    label={action.action_req}
                    value={action.action_req}
                    name={"action_req"}
                  />
                ))}
              </FormGroup>
            </div>

            <br />
            <br />
            <p className={"note3"} style={{ display: "none" }}>
              (To be filled-up by receiving action unit/person and to be signed
              by the head before forwarding to other offices/s)
            </p>
            <div className={"tableContainer"}>
              <table
                className={"table table-bordered"}
                style={{ fontSize: 14 }}
              >
                <thead>
                  <tr>
                    <th>
                      Name of <br />
                      office&nbsp;/&nbsp;division
                      <br />
                      /&nbsp;section&nbsp;/ unit
                    </th>
                    <th>
                      Date/
                      <br />
                      Time Received
                    </th>
                    <th>Action Taken</th>
                    <th>
                      Date/
                      <br />
                      Time Released
                    </th>
                    <th>Initial</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.props.documentInfo.creatorSection}</td>
                    <td colSpan={4}>
                      <b>Note:</b>&nbsp;&nbsp;
                      {this.props.documentInfo.note}
                    </td>
                  </tr>
                  {this.props.documentInfo.destination
                    .filter((item, index) => index !== 0)
                    .map((data, index) => {
                      let i = ++index;
                      return (
                        <tr key={index}>
                          <td>{data.office}</td>
                          <td>{data.date_time_receive}</td>
                          <td>{data.action_taken[i].remarks}</td>
                          <td>
                            {data.date_time_released[i].date_time_released}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <br />
          </div>
          <div className={"col-md-2"}></div>
        </div>
      </div>
    );
  }
}
