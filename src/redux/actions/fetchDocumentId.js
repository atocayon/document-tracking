import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchDocumentId() {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/dts/documentId")
      .then(documentId => {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_ID,
          data: documentId.data
        });
      })
      .catch(err => {
        throw err;
      });
  };
}
