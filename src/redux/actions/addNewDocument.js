import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function addNewDocument(
  documentID,
  user_id,
  subject,
  documentType,
  note,
  action_req,
  destination,
  socket
) {
  return async function (dispatch) {
    await socket.emit(
      "addDocument",
      documentID,
      user_id,
      subject,
      documentType,
      note,
      action_req,
      destination
    );

    return dispatch({ type: actionTypes.ADD_DOCUMENT, data: "success" });
  };
}

export function clearAddDocumentMessage() {
  return function (dispatch) {
    return dispatch({ type: actionTypes.CLEAR_ADD_DOCUMENT_MESSAGE });
  };
}
