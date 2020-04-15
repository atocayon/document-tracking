import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import Reactotron from "reactotron-react-js";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SelectField(props) {
  const classes = useStyles();

  return (
    <FormControl
      variant={props.variant}
      error={props.error ? props.error : ""}
      className={classes.formControl}
    >
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Select
        native
        onChange={props.handleChange}
        inputProps={{
          name: props.name,
          id: props.id
        }}
      >
        <option aria-label="None" value="" />
        {props.options.map(option => (
          <option key={option.id} value={option.id}>
            {option.type}
          </option>
        ))}
      </Select>
      {props.error && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  );
}
