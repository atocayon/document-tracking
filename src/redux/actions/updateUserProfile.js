import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const localIpUrl = require("local-ip-url");

export function updateUserProfile(data) {
  const _data = {
    user_id: parseInt(data.user_id),
    employeeId: data.employeeId,
    name: data.name,
    username: data.username,
    contact: data.contact,
    email: data.email,
    secid: data.secid,
    position: data.position,
    role: data.role,
  };
  return function (dispatch) {
    return axios
      .post(
        "http://" +
          localIpUrl() +
          ":4000/dts/updateUser/" +
          parseInt(data.user_id),
        {
          employeeId: data.employeeId,
          name: data.name,
          username: data.username,
          contact: data.contact,
          email: data.email,
          section: data.secid,
          position: data.position,
          role: data.role,
        }
      )
      .then((_res) => {
        if (_res.status === 200) {
          dispatch({
            type: actionTypes.UPDATE_USER_PROFILE,
            res: "success",
          });
          dispatch({
            type: actionTypes.UPDATE_USERS_LIST,
            _data,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
}
