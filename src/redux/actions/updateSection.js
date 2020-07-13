import actionTypes from "./actionTypes";

export function updateSection(data, socket) {
  return async function (dispatch) {
    await socket.emit("updateSection", data, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.UPDATE_SECTION, data });
        }
      }
    });
  };
}
