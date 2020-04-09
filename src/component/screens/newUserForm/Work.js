import React from "react";
import InputField from "../../common/textField/InputField";
import Select from "@material-ui/core/Select";

export default function Work(props){

    return(
        <>
            <div style={{marginLeft: 30,marginTop: 30, marginBottom: 30}}>
                <div className={"row"}>
                    <div className={"col-md-2"}></div>
                    <div className={"col-md-8"}>
                        <InputField
                            id={"position"}
                            name={"position"}
                            label={"Work Position/Function"}
                            variant={"outlined"}
                            onChange={props.handleInput}
                            error={props.error.position}
                        />
                    </div>
                    <div className={"col-md-2"}></div>
                </div>
            </div>
        </>
    );
}