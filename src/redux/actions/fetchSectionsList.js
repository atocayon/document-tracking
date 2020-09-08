import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchSectionsList() {
  return async function (dispatch) {
    return axios
      .get("http://" + endPoint.ADDRESS + "/dts/sections")
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_SECTIONS_LIST, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
