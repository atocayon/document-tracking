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
    accnt_status: "1",
  };

  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/dts/registration", {
        role: user_role,
        employeeId,
        name,
        username,
        password,
        contact,
        email,
        section,
        position,
      })
      .then((res) => {
        dispatch({ type: actionTypes.USER_REGISTRATION, message: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
