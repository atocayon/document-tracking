import React from "react";
import InputField from "../../common/textField/InputField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SelectField from "../../common/selectField/SelectField";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const role = [
  { id: "1", type: "Admin" },
  { id: "2", type: "Member" },
];

export default function Profile(props) {
  return (
    <div>
      <h5 style={{ textAlign: "left", color: "#2196F3" }}>
        <AccountBoxIcon />
        &nbsp;Profile Account
      </h5>
      <br />
      <SelectField
        id={"role"}
        name={"role"}
        onChange={props.handleInput}
        label={"role"}
        options={role}
        variant={"outlined"}
        error={props.error.role}
      />

      <br />
      <br />
      <InputField
        id={"employeeId"}
        name={"employeeId"}
        label={"Employee ID"}
        variant={"outlined"}
        onChange={props.handleInput}
        error={props.error.employeeId}
        type={"number"}
      />
      <br />
      <br />
      <InputField
        id={"name"}
        name={"name"}
        label={"Full Name"}
        variant={"outlined"}
        onChange={props.handleInput}
        error={props.error.name}
        type={"text"}
      />
      <br />
      <br />
      <InputField
        id={"username"}
        name={"username"}
        label={"Username"}
        variant={"outlined"}
        onChange={props.handleInput}
        error={props.error.username}
        type={"text"}
      />
      <br />
      <br />
      <InputField
        id={"password"}
        name={"password"}
        label={"Password"}
        variant={"outlined"}
        onChange={props.handleInput}
        error={props.error.password}
        type={"password"}
      />
      <br />
      <br />
      <InputField
        id={"confirmPassword"}
        name={"confirmPassword"}
        label={"Confirm Password"}
        variant={"outlined"}
        onChange={props.handleInput}
        error={props.error.confirmPassword}
        type={"password"}
      />
    </div>
  );
}
