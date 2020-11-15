import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchAllUsers() {
  return async function (dispatch) {
    return axios
      .get("http://" + process.env.REACT_APP_SERVER + "/fetchUsers")
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
