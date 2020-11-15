import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchSectionsList() {
  return async function (dispatch) {
    return axios
      .get("http://" + process.env.REACT_APP_SERVER + "/fetchSections")
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_SECTIONS_LIST, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
