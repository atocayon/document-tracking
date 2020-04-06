import React from "react";
import InputField from "../../common/textField/InputField";

export default function WorkForm(props){

    return(
        <>
            <div style={{marginLeft: 30,marginTop: 30, marginBottom: 30}}>
                <div className={"row"}>
                    <div className={"col-md-5"}>
                        <InputField
                            id={"position"}
                            name={"position"}
                            label={"Work Position/Function"}
                        />
                    </div>
                    <div className={"col-md-7"}></div>
                </div>
            </div>
        </>
    );
}