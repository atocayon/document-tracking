import React, {Component, useRef} from "react";
import InputField from "../../common/textField/InputField";
import FeedbackIcon from "@material-ui/icons/Feedback";
import {FormGroup} from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import ReactToPrint from "react-to-print";
import BarcodeComponent from "../../common/barcode/BarcodeComponent";

export default class Content extends Component{
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
                                        <p style={{fontSize: 8}}>
                                            NMP Form No. AFM-03<br/>
                                            Issue No. 01<br/>
                                            Rev. No. 02 Oct. 30, 2018<br/>
                                        </p>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-4"}>
                            <div style={{textAlign: "center"}}>
                                <br/>
                                <h5 style={{textDecoration: "underline", fontWeight: "bold"}}>ROUTING SLIP</h5>
                            </div>
                        </div>
                        <div className={"col-md-4"}>

                        </div>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-md-2"}></div>
                    <div className={"col-md-8"}>
                        <br />
                        <div className={"row"}>
                            <div className={"col-md-4"}>
                                <InputField
                                    label={"Requesting Party"}
                                    // variant={"outlined"}
                                    disabled={true}
                                    type={"text"}
                                    value={
                                        this.props.documentInfo.creator +
                                        ", " +
                                        this.props.documentInfo.creatorPosition +
                                        " (" +
                                        this.props.documentInfo.creatorSection +
                                        ")" || ""
                                    }
                                />
                            </div>
                            <div className={"col-md-4"}>
                                <InputField
                                    label={"Subject"}
                                    // variant={"outlined"}
                                    disabled={true}
                                    type={"text"}
                                    value={this.props.documentInfo.subject || ''}
                                />
                            </div>
                            <div className={"col-md-4"}>
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
                        <br/>
                        <br/>
                        <h6 style={{ color: "#2196F3" }}>
                            <FeedbackIcon />
                            &nbsp;Action Required
                        </h6>
                        <br />
                        <FormGroup row>
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
                        <br/>
                        <br/>

                        <table className={"table table-bordered"} style={{fontSize: 14}}>
                            <thead>
                            <tr>
                                <th>Name of <br/>office&nbsp;/&nbsp;division<br/>/&nbsp;section&nbsp;/ unit</th>
                                <th>Date/<br/>Time Received</th>
                                <th>Action Taken</th>
                                <th>Date/<br/>Time Released</th>
                                <th>Initial</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.documentInfo.destination.map((data, index) => (
                                <tr>
                                    <td>{data.office}</td>
                                    <td>{data.date_time_receive}</td>
                                    <td>{data.action_taken.remarks}</td>
                                    <td>{data.date_time_released.date_time_released}</td>
                                    <td></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <br />

                    </div>
                    <div className={"col-md-2"}></div>
                </div>
            </div>
        );
    }
}