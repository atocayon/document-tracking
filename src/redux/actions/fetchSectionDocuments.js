import actionTypes from "./actionTypes";

export function fetchSectionDocuments(token, folder, socket) {
  return async function (dispatch) {
    await socket.emit("fetchSectionDocuments", token, folder, async (res) => {
      if (res) {
        if (res !== "server error") {
          await dispatch({ type: actionTypes.FETCH_SECTION_DOCUMENTS, data: res });
        }
      }
    });
  };
}
