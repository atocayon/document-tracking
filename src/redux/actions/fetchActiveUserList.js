import actionTypes from "./actionTypes";

export function fetchActiveUserList(socket) {
  return async function (dispatch) {
    await socket.emit("active_users");
    await socket.on("activeUsers", (data) => {
      dispatch({ type: actionTypes.FETCH_ACTIVE_USER_LIST, data });
    });
  };
}
