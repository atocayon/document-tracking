import actionTypes from "./actionTypes";

export function fetchDocumentId(socket) {
  return async function (dispatch) {
    await socket.emit("document_trackingNumber");
    await socket.on("documentId", (data) => {
      dispatch({
        type: actionTypes.FETCH_DOCUMENT_ID,
        data,
      });
    });
  };
}
