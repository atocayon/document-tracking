import React, { Component, useEffect } from "react";
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
import EditIcon from "@material-ui/icons/Edit";
import Reactotron from "reactotron-react-js";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";
import BarcodeComponent from "../../common/barcode/BarcodeComponent";

class FinalizeDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
    };
  }

  render() {
    const docType = this.props.documentType.filter(
      (doc) => doc.id === parseInt(this.props.data.documentType)
    );
    const destination = this.props.data.destination.filter(
      (data, index) => index !== 0
    );
    return (
      <>
        <div>
          <div className={"alert alert-warning"}>
            <p>
              You CANNOT make any changes to this document once it has been
              serve as release. Please review the document information carefully
              and make sure that all information given is correct.
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
          <div ref={(el) => (this.componentRef = el)}>
            {destination.map((data, index) => {
              return (
                <BarcodeComponent
                  trackingNumber={this.props.trackingNumber + "-" + ++index}
                />
              );
            })}
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
            value={this.props.data.subject}
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
            value={docType.map((res) => res.type)}
          />

          <br />
          <br />

          <h5 style={{ color: "#2196F3" }}>
            <FeedbackIcon />
            &nbsp;Action Required
          </h5>

          <br />
          <FormGroup>
            {this.props.data.action_req.map((action, index) => (
              <CheckBox
                checked={true}
                key={index}
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
          <div>{this.props.data.note}</div>

          <br />
          <br />
          <h5 style={{ color: "#2196F3" }}>
            <ExploreIcon />
            &nbsp;Destination
          </h5>
          <FormGroup>
            <CheckBox
              checked={true}
              key={this.props.documentDestination}
              label={this.props.documentDestination}
              value={this.props.documentDestination}
              name={this.props.documentDestination}
            />
          </FormGroup>

          <br />
          {destination.map((destination) => (
            <Chip
              key={destination[4]}
              avatar={
                <Avatar>
                  <BusinessIcon />
                </Avatar>
              }
              label={destination[4]}
            />
          ))}
          <br />
          <br />

          <div style={{ textAlign: "right", marginBottom: 50 }}>
            <button
              className={"btn btn-outline-info"}
              onClick={this.props.handleGoBack}
            >
              <EditIcon />
              &nbsp;&nbsp;Edit
            </button>
            &nbsp;&nbsp;&nbsp;
            <ReactToPrint
              onBeforePrint={this.props.handleRelease}
              trigger={() => {
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                return (
                  <a
                    href={"#"}
                    className={"btn btn-info"}
                    title={"Print this barcode"}
                  >
                    <SendIcon />
                    &nbsp;&nbsp;Release
                  </a>
                );
              }}
              content={() => this.componentRef}
            />
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </>
    );
  }
}

export default withSnackbar(FinalizeDocument);
