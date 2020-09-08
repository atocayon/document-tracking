import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchCurrentSystemUser(token) {
  return async function (dispatch) {
    return axios
      .get("http://" + endPoint.ADDRESS + "/dts/user/" + token)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_SYSTEM_CURRENT_USER,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
