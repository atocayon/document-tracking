import actionTypes from "./actionTypes";


export function fetchAllUsers(socket) {
  return async function (dispatch) {
    await socket.emit("getAllUsers");
    await socket.on("users", (data) => {
      dispatch({
        type: actionTypes.FETCH_ALL_USER,
        data,
      });
    });
  };
}
