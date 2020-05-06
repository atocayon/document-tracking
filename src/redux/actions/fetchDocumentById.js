import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchDocumentById(id) {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/dts/fetchDocument/" + id)
      .then(document => {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_BY_ID,
          data: document.data
        });
      })
      .catch(err => {
        throw err;
      });
  };
}
