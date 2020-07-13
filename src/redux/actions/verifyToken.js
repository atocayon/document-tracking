import actionTypes from "./actionTypes";

export function verifyToken(token, socket) {
  return async function (dispatch) {
    await socket.emit("verifyToken", token, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.VERIFY_TOKEN, data: res });
        }
      }
    });
  };
}
