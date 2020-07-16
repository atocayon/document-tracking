import actionTypes from "./actionTypes";

export function fetchDocumentTypes(socket) {
  return async function (dispatch) {
    await socket.emit("documentType", (res) => {
      if (res) {
        alert(res);
      }
    });

    await socket.on("documentTypeList", (data) => {
      if (data.length > 0){
        dispatch({
          type: actionTypes.FETCH_DOCUMENT_TYPES,
          data,
        });
      }

    });
  };
}
