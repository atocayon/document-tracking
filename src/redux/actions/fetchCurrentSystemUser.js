import actionTypes from "./actionTypes";

export function fetchCurrentSystemUser(token, socket) {
  return async function (dispatch) {
    await socket.emit("user", token, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({
            type: actionTypes.FETCH_SYSTEM_CURRENT_USER,
            data: res,
          });
        }
      }
    });
  };
}
