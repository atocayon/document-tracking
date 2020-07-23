import actionTypes from "./actionTypes";

export function fetchAllSections(socket) {
  return async function (dispatch) {
    await socket.emit("sections", (res) => {
      if (res) {
        alert(res);
      }
    });

    await socket.on("sectionList", async (data) => {
      const section = [];
      const internalDestination = [];

      for (let i = 0; i < data.length; i++) {
        section.push({
          id: data[i].secid,
          type: data[i].section,
        });

        internalDestination.push({
          id: data[i].secshort,
          type: data[i].section,
        });
      }

      dispatch({
        type: actionTypes.FETCH_ALL_SECTIONS,
        data: section,
      });

      dispatch({
        type: actionTypes.FETCH_INTERNAL_DESTINATION,
        data: internalDestination,
      });
    });
  };
}
