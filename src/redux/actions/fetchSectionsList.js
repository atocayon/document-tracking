import axios from "axios";
import actionTypes from "./actionTypes";
const localIpUrl = require("local-ip-url");

export function fetchSectionsList() {
  return function (dispatch) {
    return axios
      .get("http://" + localIpUrl() + ":4000/dts/sections")
      .then((_sections) => {
        dispatch({
          type: actionTypes.FETCH_SECTIONS_LIST,
          data: _sections.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
