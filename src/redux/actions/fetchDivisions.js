import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchDivisions() {
  return async function (dispatch) {
    return axios
      .get("http://" + process.env.REACT_APP_SERVER + "/dts/divisions")
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_DIVISIONS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
