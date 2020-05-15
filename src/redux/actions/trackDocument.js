import actionTypes from "./actionTypes";
import axios from "axios";
export function trackDocument(trackingNumber) {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/dts/track/" + trackingNumber)
      .then(res => {
        dispatch({ type: actionTypes.TRACK_DOCUMENT, data: res.data });
      })
      .catch(err => {
        throw err;
      });
  };
}
