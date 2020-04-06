import React from "react";
import InputField from "../../common/textField/InputField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export default function AccountForm(props) {
  return (
      <div style={{marginLeft: 30,marginTop: 30, marginBottom: 30}}>
          <div className={"row"}>
              <div className={"col-md-5"}>
                  <FormControl >
                      <InputLabel htmlFor="outlined-role-native-simple">Role</InputLabel>
                      <Select
                          native
                          // value={state.age}
                          // onChange={handleChange}
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

                  />
                  <br/>
                  <br/>
                  <InputField
                      id={"name"}
                      name={"name"}
                      label={"Full Name"}

                  />
                  <br/>
                  <br/>
                  <InputField
                      id={"username"}
                      name={"username"}
                      label={"Username"}

                  />
                  <br/>
                  <br/>
                  <InputField
                      id={"password"}
                      name={"password"}
                      label={"Password"}

                  />
                  <br/>
                  <br/>
                  <InputField
                      id={"confirmPassword"}
                      name={"confirmPassword"}
                      label={"Confirm Password"}

                  />
              </div>
              <div className={"col-md-7"}></div>
          </div>
      </div>

  );
}
