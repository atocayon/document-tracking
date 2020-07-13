import actionTypes from "./actionTypes";

export function logout(token, socket) {
  return function (dispatch) {
    socket.emit("logout", token, (data) => {
      if (data === "server error") {
        dispatch({ type: actionTypes.LOG_OUT, logout: "false" });
      }

      if (data === "logout") {
        localStorage.clear();
        dispatch({ type: actionTypes.LOG_OUT, logout: "true" });
      }
    });
  };
}
