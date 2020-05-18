import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function logout(token) {
  return function (dispatch) {
    return axios
      .post(
        "http://" + localIpUrl("public", "ipv4") + ":4000/dts/logout/" + token
      )
      .then((res) => {
        localStorage.clear();
        dispatch({ type: actionTypes.LOG_OUT, logout: true });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.LOG_OUT, logout: false });
      });
  };
}
