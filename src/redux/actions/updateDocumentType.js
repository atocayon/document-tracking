import actionTypes from "./actionTypes";

export function updateDocumentType(data, socket) {
  return async function (dispatch) {
    await socket.emit("updateDocumentType", data, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.UPDATE_DOCUMENT_TYPE, data });
        }
      }
    });
  };
}
