import actionTypes from "./actionTypes";

export function handleDocDissemination(
  userId,
  doc_id,
  docInfo,
  destination,
  socket
) {
  return async function (dispatch) {
    await socket.emit(
      "docDissemination",
      userId,
      doc_id,
      docInfo,
      destination,
      (res) => {
        if (res) {
          if (res !== "server error") {
            dispatch({
              type: actionTypes.HANDLE_DOC_DISSEMINATION,
              data: "success",
            });
          } else {
            alert("Unexpected error occurred...");
          }
        }
      }
    );
  };
}

export function clearDisseminationMessage() {
  return function (dispatch) {
    dispatch({type: actionTypes.CLEAR_DISSEMINATION_MESSAGE});
  }
}
