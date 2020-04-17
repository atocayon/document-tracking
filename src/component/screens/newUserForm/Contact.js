import React from "react";
import InputField from "../../common/textField/InputField";
import Select from "@material-ui/core/Select";
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
export default function Contact(props) {
  return (
    <>
      <div>
          <br/>
          <h5 style={{ textAlign: "left",color: "#2196F3" }}>
              <ContactPhoneIcon/>&nbsp;Contact Information
          </h5>
          <br/>
        <InputField
          id={"email"}
          name={"email"}
          label={"Email"}
          variant={"outlined"}
          onChange={props.handleInput}
          error={props.error.email}
          type={"email"}
        />
        <br />
        <br />
        <InputField
          id={"contact"}
          name={"contact"}
          label={"Mobile Number"}
          variant={"outlined"}
          onChange={props.handleInput}
          error={props.error.contact}
          type={"text"}
        />
        <br />
        <br />
        <InputField
          id={"address"}
          name={"address"}
          label={"Home Address"}
          variant={"outlined"}
          onChange={props.handleInput}
          error={props.error.address}
          type={"text"}
        />
      </div>
    </>
  );
}
