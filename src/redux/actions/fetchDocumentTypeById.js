import actionTypes from "./actionTypes";
import axios from "axios";

export function fetchDocumentTypeById(id) {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/dts/fetchDocumentType/" + id)
      .then(document => {
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_TYPE_BY_ID,
          data: document.data
        });
      })
      .catch(err => {
        alert(err);
      });
  };
}
