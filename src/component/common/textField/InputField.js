import React from "react";
import TextField from "@material-ui/core/TextField";
import "../../../styles/style.css"
export default function InputField(props) {
  let error = false;

  if (props.error) {
    error = true;
  }

  return (
    <TextField
      error={error}
      id={props.id}
      name={props.name}
      label={props.label}
      variant={props.variant}
      value={props.value}
      defaultValue={props.defaultValue}
      fullWidth
      disabled={props.disabled}
      onChange={props.onChange}
      type={props.type}
      helperText={props.error ? props.error:""}
      InputProps={{
        className: "textInput"
      }}
    />
  );
}
