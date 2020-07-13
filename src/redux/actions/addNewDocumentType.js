import actionTypes from "./actionTypes";

export function addNewDocumentType(data, socket) {
  return async function (dispatch) {
    await socket.emit("addDocumentType", data, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.ADD_DOCUMENT_TYPE, data });
        }
      }
    });
  };
}
