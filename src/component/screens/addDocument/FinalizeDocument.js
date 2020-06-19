import React, { Component } from "react";
import { withSnackbar } from "notistack";
import DescriptionIcon from "@material-ui/icons/Description";
import FeedbackIcon from "@material-ui/icons/Feedback";
import CommentIcon from "@material-ui/icons/Comment";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import SendIcon from "@material-ui/icons/Send";
import InputField from "../../common/textField/InputField";
import ExploreIcon from "@material-ui/icons/Explore";
import EditIcon from "@material-ui/icons/Edit";
import ReactToPrint from "react-to-print";
import BarcodeComponent from "../../common/barcode/BarcodeComponent";
import "../../../styles/style.css";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import BusinessIcon from "@material-ui/icons/Business";
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

    const category = this.props.section_doc_category.filter(
      (doc) => doc.id === parseInt(this.props.data.documentCategory)
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
          <InputField
            id={"documentCategory"}
            label={"Document Category"}
            name={"documentCategory"}
            variant={"outlined"}
            disabled={true}
            type={"text"}
            value={category.map((res) => res.category)}
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
          {this.props.data.destination.length > 0 &&
            this.props.data.destination.map((des, index) => (
              <Chip
                key={des[0]}
                avatar={
                  <Avatar>
                    <BusinessIcon />
                  </Avatar>
                }
                label={des[4]}
              />
            ))}
          <br />
          <div
            ref={(el) => (this.componentRef = el)}
            className={"barcode"}
            style={{ display: "none" }}
          >
            <div className={"barcodeContainer"}>
              {this.props.data.destination.length > 1 ? (
                this.props.data.destination.map((data, index) => {
                  return (
                    <div style={{textAlign: "center"}} className={"multiBarcode"}>
                      <p className={"office"}>
                        <small>{data[4]}</small>
                      </p>
                      <BarcodeComponent
                        trackingNumber={
                          this.props.trackingNumber + "-" + ++index
                        }
                      />
                    </div>
                  );
                })
              ) : (
                <BarcodeComponent trackingNumber={this.props.trackingNumber} />
              )}
            </div>
          </div>
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
