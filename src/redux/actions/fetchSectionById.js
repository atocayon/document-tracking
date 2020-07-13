import actionTypes from "./actionTypes";

export function fetchSectionById(id, socket) {
  return async function (dispatch) {
    await socket.emit("section", id, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.FETCH_USER_BY_ID, data: res });
        }
      }
    });
  };
}
