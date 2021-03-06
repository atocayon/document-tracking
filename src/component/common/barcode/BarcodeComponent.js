import React, { Component } from "react";
import Barcode from "react-barcode";
import "../../../styles/barcode.css";
export default class BarcodeComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Barcode
        format="CODE128"
        value={this.props.trackingNumber}
        height={20}
        width={this.props.width}
        margin={this.props.margin}
        fontSize={8}
      />
    );
  }
}
