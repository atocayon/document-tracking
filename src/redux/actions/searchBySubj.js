import actionTypes from "./actionTypes";

export function searchBySubj(subj, socket) {
  return async function (dispatch) {
    await socket.emit("searchBySubject", subj, async (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.SEARCH_BY_SUBJ, data: res });
        }
      }
    });
  };
}
