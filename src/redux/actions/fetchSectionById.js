import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function fetchSectionById(id) {
  return function (dispatch) {
    return axios
      .post(
        "http://" + localIpUrl("public", "ipv4") + ":4000/dts/sections/" + id
      )
      .then((section) => {
        dispatch({ type: actionTypes.FETCH_USER_BY_ID, data: section.data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
