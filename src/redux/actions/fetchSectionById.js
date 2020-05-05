import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchSectionById(id) {
  return function(dispatch) {
    return axios
      .post("http://localhost:4000/dts/sections/" + id)
      .then(section => {
        dispatch({ type: actionTypes.FETCH_USER_BY_ID, data: section.data });
      })
      .catch(err => {
        alert(err);
      });
  };
}
