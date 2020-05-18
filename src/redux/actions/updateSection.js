import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function updateSection(data) {
  return function (dispatch) {
    return axios
      .post("http://" + localIpUrl() + ":4000/dts/updateSection", { ...data })
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_SECTION, data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
