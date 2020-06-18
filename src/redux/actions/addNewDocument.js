import actionTypes from "./actionTypes";

export function addNewDocument(
  documentID,
  user_id,
  subject,
  documentType,
  note,
  action_req,
  destination,
  category,
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
      destination,
      category,
      (message) => {
        if (message) {
          return dispatch({ type: actionTypes.ADD_DOCUMENT, data: "failed" });
        }
      }
    );

    return dispatch({ type: actionTypes.ADD_DOCUMENT, data: "success" });
  };
}

export function clearAddDocumentMessage() {
  return function (dispatch) {
    return dispatch({ type: actionTypes.CLEAR_ADD_DOCUMENT_MESSAGE });
  };
}
