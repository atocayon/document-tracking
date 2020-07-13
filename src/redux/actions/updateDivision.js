import actionTypes from "./actionTypes";

export function updateDivision(data, socket) {
  const _data = {
    depid: parseInt(data.depid),
    department: data.department,
    depshort: data.depshort,
    payrollshort: data.payrollshort,
  };

  return async function (dispatch) {
    await socket.emit("updateDivision", data, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.UPDATE_DIVISION, data: _data });
        }
      }
    });
  };
}
