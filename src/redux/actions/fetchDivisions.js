import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function fetchDivisions() {
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/fetchDivisions")
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_DIVISIONS, data: res.data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
