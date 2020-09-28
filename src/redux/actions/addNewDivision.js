import actionTypes from "./actionTypes";
import axios from "axios";

export function addNewDivision(data) {
  const { department, depshort, payroll } = data;
  const _data = {
    department: data.department,
    depshort: data.depshort,
    payrollshort: data.payroll,
  };
  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/dts/division/new", {
        department,
        depshort,
        payroll,
      })
      .then((res) => {
        dispatch({ type: actionTypes.ADD_DIVISION, data: "success" });
      })
      .catch((err) => {
        throw err;
      });
  };
}
