import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function fetchAllUsers() {
  return async function (dispatch) {
    return axios
      .get("http://" + endPoint.ADDRESS + "/dts/users")
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_ALL_USER,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
