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
  position,
  socket
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
    await socket.emit(
      "addUser",
      user_role,
      employeeId,
      name,
      username,
      password,
      contact,
      email,
      section,
      position,
      (res) => {
        if (res) {
          if (res !== "error") {
            dispatch({ type: actionTypes.USER_REGISTRATION, message: res });
          } else {
            alert(res);
          }
        }
      }
    );
  };
}
