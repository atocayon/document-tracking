import actionTypes from "./actionTypes";
import axios from "axios";

export function updateDocumentType(data) {
  return function(dispatch) {
    return axios
      .post("http://localhost:4000/dts/updateDocumentType", { ...data })
      .then(res => {
        dispatch({ type: actionTypes.UPDATE_DOCUMENT_TYPE, data });
      })
      .catch(err => {
        alert(err);
      });
  };
}