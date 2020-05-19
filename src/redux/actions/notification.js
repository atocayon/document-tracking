import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function notification(section) {
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/notification/" + section)
      .then((res) => {
        dispatch({ type: actionTypes.NOTIFICATION, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
