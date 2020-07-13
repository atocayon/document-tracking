import actionTypes from "./actionTypes";

export function deleteDivision(id, socket) {
  return async function (dispatch) {
    await socket.emit("deleteDivision", id, async (res) => {
      if (res) {
        if (res !== "server error") {
          await dispatch({
            type: actionTypes.DELETE_DIVISION,
            data: id,
          });
        }
      }
    });
  };
}
