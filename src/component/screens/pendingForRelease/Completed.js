import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DescriptionIcon from "@material-ui/icons/Description";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export default function Completed(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ color: "#2196F3" }}>
          <DescriptionIcon /> Completed ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're about to tag this document as completed in your office.
          </DialogContentText>
        </DialogContent>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={props.handleCompleted}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
