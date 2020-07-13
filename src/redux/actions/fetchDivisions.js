import actionTypes from "./actionTypes";

export function fetchDivisions(socket) {
  return async function (dispatch) {
    await socket.emit("fetchDivisions", (res) => {
      if (res) {
        alert(res);
      }
    });

    await socket.on("divisionsList", async (data) => {
      dispatch({ type: actionTypes.FETCH_DIVISIONS, data });
    });
  };
}
