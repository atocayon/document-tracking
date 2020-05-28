import actionTypes from "./actionTypes";

export function logout(token, socket) {
  return async function (dispatch) {
    await socket.emit("logout", token, async (error) => {
      if (error) {
        return dispatch({ type: actionTypes.LOG_OUT, logout: false });
      }
    });

    localStorage.clear();
    dispatch({ type: actionTypes.LOG_OUT, logout: true });
  };
}
