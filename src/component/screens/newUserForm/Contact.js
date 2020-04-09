import React from "react";
import InputField from "../../common/textField/InputField";
import Select from "@material-ui/core/Select";

export default function Contact(props){
    return(
        <>
            <div style={{marginLeft: 30,marginTop: 30, marginBottom: 30}}>
                <div className={"row"}>
                    <div className={"col-md-2"}></div>
                    <div className={"col-md-8"}>
                        <InputField
                            id={"email"}
                            name={"email"}
                            label={"Email"}
                            variant={"outlined"}
                            onChange={props.handleInput}
                            error={props.error.email}
                        />
                        <br/>
                        <br/>
                        <InputField
                            id={"contact"}
                            name={"contact"}
                            label={"Mobile Number"}
                            variant={"outlined"}
                            onChange={props.handleInput}
                            error={props.error.contact}
                        />
                        <br/>
                        <br/>
                        <InputField
                            id={"address"}
                            name={"address"}
                            label={"Home Address"}
                            variant={"outlined"}
                            onChange={props.handleInput}
                            error={props.error.address}
                        />
                    </div>
                    <div className={"col-md-2"}></div>
                </div>
            </div>
        </>
    );
}