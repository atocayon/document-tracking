import actionTypes from "./actionTypes";
import {setInStorage} from "../../component/storage";
import Reactotron from "reactotron-react-js";
export function login(data, socket) {
  return async function (dispatch) {
    Reactotron.log(data);
    await socket.emit("login", data.emailOrPassword, data.password, (message) => {
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
