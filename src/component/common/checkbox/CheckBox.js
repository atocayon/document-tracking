import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "../../../styles/style.css";
export default function CheckBox(props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
            className={"check"}
          checked={props.checked}
          onChange={props.onChange}
          value={props.value}
          name={props.name}
            size={"small"}
        />
      }
      label={<Typography className={"checkboxLabel"} >{props.label}</Typography>}
    />
  );
}
