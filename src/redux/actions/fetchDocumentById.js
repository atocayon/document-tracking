import actionTypes from "./actionTypes";

export function fetchDocumentById(id, socket) {
  return async function (dispatch) {
    await socket.emit("fetchDocument", id, async (res) => {
      if (res) {
        if (res !== "server error") {
          await dispatch({
            type: actionTypes.FETCH_DOCUMENT_BY_ID,
            data: res,
          });
        }
      }
    });
  };
}
