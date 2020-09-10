import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchCurrentSystemUser(token) {
  return async function (dispatch) {
    return axios
      .get("http://" + process.env.REACT_APP_SERVER + "/dts/user/" + token)
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
