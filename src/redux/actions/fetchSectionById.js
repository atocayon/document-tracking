import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchSectionById(id) {
  return async function (dispatch) {
    return axios
      .get("http://" + process.env.REACT_APP_SERVER + "/dts/section/" + id)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_USER_BY_ID, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
