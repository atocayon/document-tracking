import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
export default function TransferOfficialDialog(props) {
  return (
    <Dialog
      fullScreen={props.fullScreen}
      open={props.transferOfficeDialog.open}
      onClose={props.handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <TransferWithinAStationIcon /> Transfer Office
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          I want to transfer{" "}
          <u>
            <b>{props.transferOfficeDialog.name}</b>
          </u>{" "}
          from {props.transferOfficeDialog.section} under the{" "}
          {props.transferOfficeDialog.department}&nbsp;
          {props.transferOfficeDialog.department}(
          {props.transferOfficeDialog.depshort}) to{" "}
          <select
            name={"section"}
            onChange={props.handleSelectOnChangeTransferOffice}
          >
            <option value={""}>
              {props.error.section ? props.error.section : "Select Office"}
            </option>
            {props.sections.map(section => (
              <option key={section.secid} value={section.secid}>
                {section.section}&nbsp;({section.depshort})
              </option>
            ))}
          </select>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose} color="primary">
          cancel
        </Button>
        <Button
          onClick={props.handleConfirmTransferOffice}
          color="primary"
          autoFocus
        >
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
