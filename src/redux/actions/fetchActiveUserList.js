import actionTypes from "./actionTypes";

export function fetchActiveUserList(token, socket) {
  return async function (dispatch) {
    await socket.emit("active_users");
    await socket.on("activeUsers", (_data) => {
      let res = _data.filter(val => val.user_id !== parseInt(token));
      dispatch({ type: actionTypes.FETCH_ACTIVE_USER_LIST, data: res});
    });
  };
}
