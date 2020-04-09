import React from "react";
import TextField from "@material-ui/core/TextField";

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
      defaultValue={props.defaultValue}
      fullWidth
      disabled={props.disabled}
      onChange={props.onChange}
      type={
        props.name === "password" || props.name === "confirmPassword"
          ? "password"
          : "text"
      }
      helperText={props.error ? props.error:""}
    />
  );
}
