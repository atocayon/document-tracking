import actionTypes from "./actionTypes";
import axios from "axios";

export function userRegistration(
  section,
  user_role,
  employeeId,
  name,
  username,
  password,
  confirmPassword,
  email,
  contact,
  position
) {
  const _data = {
    secid: section,
    role_id: user_role,
    employeeId,
    name,
    username,
    email,
    contact,
    position,
    accnt_status: "1"
  };
  return function(dispatch) {
    return axios
      .post("http://localhost:4000/dts/addUser", {
        section,
        role: user_role,
        employeeId,
        name,
        username,
        password,
        confirmPassword,
        email,
        contact,
        position
      })
      .then(_res => {
        if (_res.status === 200) {
          dispatch({ type: actionTypes.ADD_USER, _data });
        }
      })
      .catch(err => {
        alert("Server Error");
      });
  };
}
