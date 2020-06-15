import React, {Component} from "react";
import Barcode from "react-barcode";

export default class BarcodeComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Barcode  format="CODE128" value={this.props.trackingNumber} height={40} />;
    }
}