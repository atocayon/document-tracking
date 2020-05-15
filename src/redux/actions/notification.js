import actionTypes from "./actionTypes";
import axios from "axios";
export function notification(section) {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/dts/notification/" + section)
      .then(res => {
        dispatch({ type: actionTypes.NOTIFICATION, data: res.data });
      })
      .catch(err => {
        throw err;
      });
  };
}
