import React from "react";
import InputField from "../../common/textField/InputField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

export default function OtherInfoForm(props) {

    return(
        <>
            <div style={{marginLeft: 30,marginTop: 30, marginBottom: 30}}>
                <div className={"row"}>
                    <div className={"col-md-5"}>
                        <FormControl >
                            <InputLabel htmlFor="outlined-role-native-simple">Gender</InputLabel>
                            <Select
                                native
                                // value={state.age}
                                // onChange={handleChange}
                                label="Gender"
                                inputProps={{
                                    name: 'gender',
                                    id: 'outlined-role-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={'male'}>Male</option>
                                <option value={'female'}>Female</option>
                                <option value={'other'}>Other</option>
                            </Select>
                        </FormControl>
                        <br/>
                        <br/>
                        <InputField
                            id={"bdate"}
                            name={"bdate"}
                            label={"Date of Birth"}
                        />
                    </div>
                    <div className={"col-md-7"}></div>
                </div>
            </div>
        </>
    );
}