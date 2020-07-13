import actionTypes from "./actionTypes";

export function fetchSectionsList(socket) {
  return async function (dispatch) {
    await socket.emit("sections", (res) => {
      if (res) {
        alert(res);
      }
    });

    await socket.on("sectionList", async (data) => {
      await dispatch({
        type: actionTypes.FETCH_SECTIONS_LIST,
        data,
      });
    });
  };
}
