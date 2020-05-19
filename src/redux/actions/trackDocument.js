import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function trackDocument(trackingNumber) {
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/track/" + trackingNumber)
      .then((res) => {
        dispatch({ type: actionTypes.TRACK_DOCUMENT, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
