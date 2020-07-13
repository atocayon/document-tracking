import actionTypes from "./actionTypes";

export function deleteDocumentType(id, socket) {
  return async function (dispatch) {
    await socket.emit("deleteDocumentType", id, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.DELETE_DOCUMENT_TYPE, data: id });
        }
      }
    });
  };
}
