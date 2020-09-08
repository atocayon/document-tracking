import actionTypes from "./actionTypes";
import axios from "axios";
import endPoint from "../../component/endPoint";
export function fetchDivisions() {
  return async function (dispatch) {
    return axios
      .get("http://" + endPoint.ADDRESS + "/dts/divisions")
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_DIVISIONS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
