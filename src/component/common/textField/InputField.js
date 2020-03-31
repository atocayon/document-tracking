import React from "react";
import TextField from "@material-ui/core/TextField";

export default function InputField(props){
    return (
      <TextField
        id={props.id}
        name={props.name}
        label={props.label}
        variant={props.variant}
        defaultValue={props.defaultValue}
        fullWidth
        disabled={props.disabled}
        onChange={props.onChange}
        type={props.name === "password" ? "password": "text"}
      />
    );
}