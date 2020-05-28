import actionTypes from "./actionTypes";
import {setInStorage} from "../../component/storage";

export function login(data, socket) {
  return async function (dispatch) {
    await socket.emit("login", data.email, data.password, (message) => {
      if (message === "server error") {
        return dispatch({
          type: actionTypes.USER_LOGIN,
          data: { success: false, message },
        });
      }

      if (message === "unrecognize email") {
        return dispatch({
          type: actionTypes.USER_LOGIN,
          data: { success: false, message },
        });
      }

      if (message === "incorrect password") {
        return dispatch({
          type: actionTypes.USER_LOGIN,
          data: { success: false, message },
        });
      }
      setInStorage("documentTracking", { token: message.id });
      dispatch({
        type: actionTypes.USER_LOGIN,
        data: { success: true, message : message.name },
      });
    });
  };
}
