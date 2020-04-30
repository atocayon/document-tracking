import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import Reactotron from "reactotron-react-js";

export default function SelectField(props) {


  return (
    <>
      <select
        id={props.id}
        className={"form-control"}
        name={props.name}
        onChange={props.onChange}
      >
          <>

            <option value={props.value}>{props.label}</option>
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
