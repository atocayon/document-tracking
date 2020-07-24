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
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import BusinessIcon from "@material-ui/icons/Business";
import SendIcon from '@material-ui/icons/Send';
export default function Forward(props) {
  const options = [];
  for (let i = 0; i < props.sections.length; i++) {
    options.push({
      id: props.sections[i].secshort,
      type: props.sections[i].section,
    });
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClickDisseminate}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ color: "#2196F3" }}>
          <SendIcon /> Disseminate Document
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To disseminate document, please enter the desired offices here.
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

              <br />
              <button
                className={"btn btn-sm btn-primary"}
                onClick={props.addForwardDestination}
              >
                Add
              </button>
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

              <br />
              <br />
              <button
                className={"btn btn-sm btn-primary"}
                onClick={props.addForwardDestination}
              >
                Add
              </button>

            </>
          )}
          <br />
          <br/>
          {props.value.des.length > 0 &&
            props.value.des.map((des, index) => (
              <>
                &nbsp;&nbsp;
                <Chip
                  key={index}
                  avatar={
                    <Avatar>
                      <BusinessIcon />
                    </Avatar>
                  }
                  label={des}
                  onDelete={(event) => {
                    event.stopPropagation();
                    props.removeForwardDestination(index);
                  }}
                />
              </>
            ))}
          <br />
          {props.selectedValue && (
            <>
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
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClickDisseminate} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleDisseminate} color="primary">
            Forward
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
