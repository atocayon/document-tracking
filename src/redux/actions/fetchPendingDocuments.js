import actionTypes from "./actionTypes";
import axios from "axios";
export function fetchPendingDocuments(user_id) {
  return function (dispatch) {
    return axios
      .get("http://10.10.10.16:4000/dts/fetchPendingDocument/" + user_id)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_PENDING_DOCUMENTS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
