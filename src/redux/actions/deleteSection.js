import actionTypes from "./actionTypes";

export function deleteSection(id, socket) {
  return async function (dispatch) {
    await socket.emit("deleteSection", id, async (res) => {
      if (res) {
        if (res !== "server error") {
          await dispatch({ type: actionTypes.DELETE_SECTION, data: id });
        }
      }
    });
  };
}
