import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

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
    accnt_status: "1",
  };
  return function (dispatch) {
    return axios
      .post("http://" + localIpUrl("public", "ipv4") + ":4000/dts/addUser", {
        section,
        role: user_role,
        employeeId,
        name,
        username,
        password,
        confirmPassword,
        email,
        contact,
        position,
      })
      .then((_res) => {
        if (_res.status === 200) {
          if (_res.data.success === "success") {
            dispatch({ type: actionTypes.ADD_USER, _data });
            dispatch({
              type: actionTypes.USER_REGISTRATION,
              message: "success",
            });
          }
          if (_res.data.success === "failed") {
            dispatch({
              type: actionTypes.USER_REGISTRATION,
              message: "failed",
            });
          }
        }
      })
      .catch((err) => {
        alert("Server Error");
      });
  };
}
