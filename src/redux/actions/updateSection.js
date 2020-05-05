import actionTypes from "./actionTypes";
import axios from "axios";

export function updateSection(data) {
  return function(dispatch) {
    return axios
      .post("http://localhost:4000/dts/updateSection", { ...data })
      .then(res => {
        dispatch({ type: actionTypes.UPDATE_SECTION, data });
      })
      .catch(err => {
        alert(err);
      });
  };
}
