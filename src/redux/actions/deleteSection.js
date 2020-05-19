import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function deleteSection(id) {
  return function (dispatch) {
    return axios
      .post("http://10.10.10.16:4000/dts/deleteSection/" + id)
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_SECTION, data: id });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
