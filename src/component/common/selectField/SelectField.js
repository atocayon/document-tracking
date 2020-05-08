import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import Reactotron from "reactotron-react-js";

export default function SelectField(props) {
  const val = typeof props.value === "number";
  const compare = props.options.filter(option => option.id === props.value);

  return (
    <>
      <select
        id={props.id}
        className={"form-control"}
        name={props.name}
        onChange={props.onChange}
      >
        <>
          <option value={props.value}>
            {props.value && val
              ? compare[0].type
              : props.label}
          </option>
          {props.options.map(option => (
            <option key={option.id} value={option.id}>
              {option.type}
            </option>
          ))}
        </>
        )}
      </select>
      {props.error && (
        <FormHelperText style={{ color: "red" }}>{props.error}</FormHelperText>
      )}
    </>
  );
}
