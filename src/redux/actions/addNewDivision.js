import actionTypes from "./actionTypes";
import endPoint from "../../component/endPoint";
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
      .post("http://" + endPoint.ADDRESS + "/dts/division/new", {
        department,
        depshort,
        payroll,
      })
      .then((res) => {
        dispatch({ type: actionTypes.ADD_DIVISION, _data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
