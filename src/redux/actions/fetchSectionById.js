import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchSectionById(id) {
  return async function (dispatch) {
    return axios
      .get("http://" + endPoint.ADDRESS + "/dts/section/" + id)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_USER_BY_ID, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
