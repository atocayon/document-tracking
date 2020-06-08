import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchSectionDocuments(token) {
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/fetchSectionDocuments/" + token)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_SECTION_DOCUMENTS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
