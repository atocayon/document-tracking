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
        width={this.props.margin ? 1.2 : 1}
        margin={this.props.margin ? this.props.margin : 0}
        fontSize={10}
      />
    );
  }
}
