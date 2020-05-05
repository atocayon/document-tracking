import actionTypes from "./actionTypes";
import axios from "axios";

export function deleteSection(id) {
  return function(dispatch) {
    return axios
      .post("http://localhost:4000/dts/deleteSection/" + id)
      .then(res => {
        dispatch({ type: actionTypes.DELETE_SECTION, data: id });
      })
      .catch(err => {
        alert(err);
      });
  };
}
