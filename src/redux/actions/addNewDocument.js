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
      async (message) => {
        if (message !== "success") {
          return dispatch({ type: actionTypes.ADD_DOCUMENT, data: "failed" });
        }
        if (message === "success") {
          await dispatch({ type: actionTypes.ADD_DOCUMENT, data: "success" });

          await socket.emit(
            "sendEmail",
            user_id,
            subject,
            destination,
            async (res) => {
              if (res) {
                if (res === "server error") {
                  alert(res);
                }
              }
            }
          );
        }
      }
    );
  };
}

export function clearAddDocumentMessage() {
  return function (dispatch) {
    return dispatch({ type: actionTypes.CLEAR_ADD_DOCUMENT_MESSAGE });
  };
}
