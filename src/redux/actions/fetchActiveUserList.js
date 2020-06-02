import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
export function fetchActiveUserList(socket) {
  return async function (dispatch) {
    await socket.emit("active_users");
    await socket.on("activeUsers", (data) => {
      dispatch({ type: actionTypes.FETCH_ACTIVE_USER_LIST, data });
    });
  };
}
