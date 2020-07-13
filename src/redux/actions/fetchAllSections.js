import actionTypes from "./actionTypes";

export function fetchAllSections(socket) {
  return async function (dispatch) {
    await socket.emit("sections", (res) => {
      if (res) {
        if (res !== "server error") {
          const section = [];
          const internalDestination = [];

          for (let i = 0; i < res.length; i++) {
            section.push({
              id: res[i].secid,
              type: res[i].section,
            });

            internalDestination.push({
              id: res[i].secshort,
              type: res[i].section,
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
        }
      }
    });
  };
}
