import actionTypes from "./actionTypes";
import axios from "axios";
export function updateDivision(data) {
  // const _data = {
  //   depid: parseInt(data.depid),
  //   department: data.department,
  //   depshort: data.depshort,
  //   payrollshort: data.payrollshort,
  // };

  const { depid, department, depshort, payrollshort } = data;

  return async function (dispatch) {
    return axios
      .post("http://" + process.env.REACT_APP_SERVER + "/dts/division/update", {
        depid,
        department,
        depshort,
        payrollshort,
      })
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_DIVISION, data: "success" });
      })

      .catch((err) => {
        throw err;
      });
  };
}
