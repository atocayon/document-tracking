import actionTypes from "./actionTypes";

export function addNewDivision(data, socket) {
  const _data = {
    department: data.department,
    depshort: data.depshort,
    payrollshort: data.payroll,
  };
  return async function (dispatch) {
    await socket.emit("addDivision", data, (res) => {
      if (res) {
        if (res !== "server error") {
          dispatch({ type: actionTypes.ADD_DIVISION, _data });
        }
      }
    });
  };
}
