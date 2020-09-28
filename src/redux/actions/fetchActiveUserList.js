import actionTypes from "./actionTypes";

export function fetchActiveUserList(token, socket) {
  return async function (dispatch) {
    await socket.emit("active_users");
    await socket.on("activeUsers", (_data) => {
      if (_data) {
        if (_data.length > 0) {
          let res = _data.filter((val) => val.user_id !== token.toString());

          dispatch({ type: actionTypes.FETCH_ACTIVE_USER_LIST, data: res });
        }
      }
    });
  };
}
