import React from "react";
import InputField from "../../common/textField/InputField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import SelectField from "../../common/selectField/SelectField";

const gender = [
    {id: 'male', type: 'male'},
    {id: 'female', type: 'female'},
    {id: 'other', type: 'other'}
];

export default function OtherInformation(props) {

    return(
        <>
            <div style={{marginLeft: 30,marginTop: 30, marginBottom: 30}}>
                <div className={"row"}>
                    <div className={"col-md-2"}></div>
                    <div className={"col-md-8"}>
                        <SelectField
                            id={"gender"}
                            name={"gender"}
                            onChange={props.handleInput}
                            label={"Gender"}
                            options={gender}
                            variant={"outlined"}
                            error={props.error.gender}
                        />
                        <br/>
                        <br/>
                        <InputField
                            id={"bdate"}
                            name={"bdate"}
                            label={"Date of Birth"}
                            variant={"outlined"}
                            onChange={props.handleInput}
                            error={props.error.bdate}
                        />
                    </div>
                    <div className={"col-md-2"}></div>
                </div>
            </div>
        </>
    );
}