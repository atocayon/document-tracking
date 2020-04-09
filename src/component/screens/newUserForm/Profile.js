import React from "react";
import InputField from "../../common/textField/InputField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export default function Profile(props) {
  return (
      <div style={{marginLeft: 30,marginTop: 30, marginBottom: 30}}>
          <div className={"row"}>
              <div className={"col-md-2"}></div>
              <div className={"col-md-8"}>
                  <FormControl variant={"outlined"} >
                      <InputLabel htmlFor="outlined-role-native-simple">Role</InputLabel>
                      <Select
                          native
                          // value={state.age}
                          onChange={props.handleInput}
                          label="Role"
                          inputProps={{
                              name: 'role',
                              id: 'outlined-role-native-simple',
                          }}
                      >
                          <option aria-label="None" value="" />
                          <option value={'admin'}>Admin</option>
                          <option value={'member'}>Member</option>

                      </Select>
                  </FormControl>
                  <br/>
                  <br/>
                  <InputField
                      id={"employeeId"}
                      name={"employeeId"}
                      label={"Employee ID"}
                      variant={"outlined"}
                      onChange={props.handleInput}
                      error={props.error.employeeId}
                  />
                  <br/>
                  <br/>
                  <InputField
                      id={"name"}
                      name={"name"}
                      label={"Full Name"}
                      variant={"outlined"}
                      onChange={props.handleInput}
                      error={props.error.name}
                  />
                  <br/>
                  <br/>
                  <InputField
                      id={"username"}
                      name={"username"}
                      label={"Username"}
                      variant={"outlined"}
                      onChange={props.handleInput}
                      error={props.error.username}
                  />
                  <br/>
                  <br/>
                  <InputField
                      id={"password"}
                      name={"password"}
                      label={"Password"}
                      variant={"outlined"}
                      onChange={props.handleInput}
                      error={props.error.password}
                  />
                  <br/>
                  <br/>
                  <InputField
                      id={"confirmPassword"}
                      name={"confirmPassword"}
                      label={"Confirm Password"}
                      variant={"outlined"}
                      onChange={props.handleInput}
                      error={props.error.confirmPassword}
                  />
              </div>
              <div className={"col-md-2"}></div>
          </div>
      </div>

  );
}
