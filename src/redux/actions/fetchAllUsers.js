import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchAllUsers() {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/dts/getUsers")
      .then(_users => {
        dispatch({
          type: actionTypes.FETCH_ALL_USER,
          data: _users.data
        });
      })
      .catch(err => {
        alert(err);
      });
  };
}
