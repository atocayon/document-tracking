import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
import axios from "axios";
export function addNewDocument(
  documentID,
  user_id,
  subject,
  documentType,
  note,
  action_req,
  destination,
  category
) {
  return async function (dispatch) {
    return axios
      .post("http://" + endPoint.ADDRESS + "/dts/document/new", {
        document_id: documentID,
        creator: user_id,
        subject,
        doc_type: documentType,
        note,
        action_req,
        document_logs: destination,
        category,
      })
      .then((res) => {
        dispatch({ type: actionTypes.ADD_DOCUMENT, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function clearAddDocumentMessage() {
  return function (dispatch) {
    return dispatch({ type: actionTypes.CLEAR_ADD_DOCUMENT_MESSAGE });
  };
}
