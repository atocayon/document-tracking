import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DescriptionIcon from "@material-ui/icons/Description";
import Radio from "@material-ui/core/Radio";
import InputField from "../../common/textField/InputField";
import SelectField from "../../common/selectField/SelectField";
export default function Forward(props) {
  const options = [];
  for (let i = 0; i < props.sections.length; i++) {
    options.push({
      id: props.sections[i].secshort,
      type: props.sections[i].section
    });
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ color: "#2196F3" }}>
          <DescriptionIcon /> Forward Document
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To forward document, please enter the desired office here.
          </DialogContentText>
          <Radio
            checked={props.selectedValue === "Internal"}
            onChange={props.handleChange}
            value="Internal"
            name="radio-button-demo"
            inputProps={{ "aria-label": "Internal" }}
          />
          &nbsp;
          <label>Internal</label>
          <Radio
            checked={props.selectedValue === "External"}
            onChange={props.handleChange}
            value="External"
            name="radio-button-demo"
            inputProps={{ "aria-label": "External" }}
          />
          &nbsp;
          <label>External</label>
          {props.selectedValue === "Internal" && (
            <>
              <br />
              <br />
              <SelectField
                id={"internalInput"}
                name={"destination"}
                label={"Internal Destination"}
                options={options}
                onChange={props.onChangeDestination}
              />
            </>
          )}
          {props.selectedValue === "External" && (
            <>
              <br />
              <InputField
                id={"externalInput"}
                name={"destination"}
                label={"External Office"}
                type={"text"}
                onChange={props.onChangeDestination}
                value={props.value.destination}
              />
            </>
          )}
          {props.selectedValue && (
            <>
              <br />
              <br />
              <InputField
                id={"remarks"}
                name={"remarks"}
                label={"Remarks"}
                type={"text"}
                value={props.value.remarks}
                onChange={props.onChangeDestination}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleForward} color="primary">
            Forward
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
