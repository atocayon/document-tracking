import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

export default function CheckBox(props) {
  return (
    <FormControlLabel
      control={<Checkbox checked={props.checked} onChange={props.onChange} value={props.value} />}
      label={props.label}
    />
  );
}
