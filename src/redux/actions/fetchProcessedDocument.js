import actionTypes from "./actionTypes";

export function fetchProcessedDocument(token, socket) {
  return async function (dispatch) {
    await socket.emit("fetchProcessedDoc", token, (err) => {
      if (err) {
        throw err;
      }
    });

    await socket.on("processedDocument", (data) => {
      dispatch({ type: actionTypes.FETCH_PROCESSED_DOCUMENT, data });
    });
  };
}
