import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
export function logout(token, socket) {
  return function (dispatch) {
    // Reactotron.log("logout");
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
