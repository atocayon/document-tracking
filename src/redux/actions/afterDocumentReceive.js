import actionTypes from "./actionTypes";

export function afterDocumentReceive(
  documentId,
  user_id,
  remarks,
  destinationType,
  destination,
  status,
  socket
) {
  return async function (dispatch) {
    await socket.emit(
      "afterDocumentReceive",
      documentId,
      user_id,
      remarks,
      destinationType,
      destination,
      status,
      async (res) => {
        if (res) {
          if (res !== "server error") {
            if (status === "2") {
              await dispatch({
                type: actionTypes.AFTER_DOCUMENT_RECEIVED,
                data: "forwarded",
              });
            }

            if (status === "4") {
              await dispatch({
                type: actionTypes.AFTER_DOCUMENT_RECEIVED,
                data: "completed",
              });
            }
          }
        }
      }
    );
  };
}
