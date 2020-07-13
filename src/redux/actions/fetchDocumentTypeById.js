import actionTypes from "./actionTypes";

export function fetchDocumentTypeById(id, socket) {
  return async function (dispatch) {
    await socket.emit("fetchDocumentType", id, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({
            type: actionTypes.FETCH_DOCUMENT_TYPE_BY_ID,
            data: res,
          });
        }
      }
    });
  };
}
