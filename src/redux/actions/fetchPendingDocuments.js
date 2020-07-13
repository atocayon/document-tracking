import actionTypes from "./actionTypes";

export function fetchPendingDocuments(user_id, socket) {
  return async function (dispatch) {
    await socket.emit("fetchPendingDocument", user_id, async (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.FETCH_PENDING_DOCUMENTS, data: res });
        }
      }
    });
  };
}
