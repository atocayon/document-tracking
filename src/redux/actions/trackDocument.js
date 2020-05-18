import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function trackDocument(trackingNumber) {
  return function (dispatch) {
    return axios
      .get(
        "http://" +
          localIpUrl("public", "ipv4") +
          ":4000/dts/track/" +
          trackingNumber
      )
      .then((res) => {
        dispatch({ type: actionTypes.TRACK_DOCUMENT, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
