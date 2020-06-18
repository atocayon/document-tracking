import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DescriptionIcon from "@material-ui/icons/Description";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import InputField from "../../common/textField/InputField";

export default function Completed(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ color: "#2196F3" }}>
          <DescriptionIcon /> Take Action
        </DialogTitle>
        <DialogContent>
          <br />
          <InputField
              id={"remarks"}
              name={"remarks"}
              label={"Remarks"}
              type={"text"}
              value={props.value.remarks}
              onChange={props.onChangeDestination}
          />
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
