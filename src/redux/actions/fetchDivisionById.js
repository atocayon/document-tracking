import actionTypes from "./actionTypes";

export function fetchDivisionById(id, socket) {
  return async function (dispatch) {
    await socket.emit("fetchDivisionById", id, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.FETCH_DIVISION_BY_ID, data: res });
        }
      }
    });
  };
}
