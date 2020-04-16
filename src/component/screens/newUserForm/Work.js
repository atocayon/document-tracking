import React from "react";
import InputField from "../../common/textField/InputField";
import Select from "@material-ui/core/Select";
import WorkIcon from '@material-ui/icons/Work';
export default function Work(props) {
  return (
    <>
        <br/>
        <h5 style={{ textAlign: "left",color: "#2196F3" }}>
           <WorkIcon/>&nbsp;Work Position
        </h5>
        <br/>
      <InputField
        id={"position"}
        name={"position"}
        label={"Work Position/Function"}
        variant={"outlined"}
        onChange={props.handleInput}
        error={props.error.position}
      />
    </>
  );
}
