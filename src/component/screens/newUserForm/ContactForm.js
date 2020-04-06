import React from "react";
import InputField from "../../common/textField/InputField";

export default function ContactForm(props){
    return(
        <>
            <div style={{marginLeft: 30,marginTop: 30, marginBottom: 30}}>
                <div className={"row"}>
                    <div className={"col-md-5"}>
                        <InputField
                            id={"email"}
                            name={"email"}
                            label={"Email"}

                        />
                        <br/>
                        <br/>
                        <InputField
                            id={"contact"}
                            name={"contact"}
                            label={"Mobile Number"}

                        />
                    </div>
                    <div className={"col-md-7"}></div>
                </div>
            </div>
        </>
    );
}