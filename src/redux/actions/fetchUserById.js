import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchUserById(id) {
  return async function (dispatch) {
    return axios
      .get("http://" + process.env.REACT_APP_SERVER + "/dts/user/" + id)
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_USER_BY_ID,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
