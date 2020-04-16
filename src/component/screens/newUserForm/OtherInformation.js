import React from "react";
import InputField from "../../common/textField/InputField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import SelectField from "../../common/selectField/SelectField";
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
const gender = [
  { id: "male", type: "male" },
  { id: "female", type: "female" },
  { id: "other", type: "other" }
];

export default function OtherInformation(props) {
  return (
    <>
      <br />
      <br/>
      <h5 style={{ textAlign: "left", color: "#2196F3" }}>
        <LiveHelpIcon/>&nbsp;Other Information
      </h5>
      <br />
      <SelectField
        id={"gender"}
        name={"gender"}
        onChange={props.handleInput}
        label={"Gender"}
        options={gender}
        variant={"outlined"}
        error={props.error.gender}
      />
      <br />
      <br />
      <InputField
        id={"bdate"}
        name={"bdate"}
        label={"Date of Birth"}
        variant={"outlined"}
        onChange={props.handleInput}
        error={props.error.bdate}
      />
    </>
  );
}
