import actionTypes from "./actionTypes";

export function addNewSection(data, socket) {
  const _data = {
    divid: data.division,
    section: data.section,
    secshort: data.secshort,
    active: 1,
  };
  return async function (dispatch) {
    await socket.emit(
      "addNewSection",
      data.division,
      data.section,
      data.secshort,
      (res) => {
        if (res) {
          if (res !== "server error") {
            dispatch({ type: actionTypes.ADD_SECTION, _data });
          }
        }
      }
    );
  };
}
