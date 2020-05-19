import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const localIpUrl = require("local-ip-url");

export function updateDivision(data) {
  const _data = {
    depid: parseInt(data.depid),
    department: data.department,
    depshort: data.depshort,
    payrollshort: data.payrollshort,
  };

  return function (dispatch) {
    return axios
      .post(
        "http://10.10.10.16:4000/dts/updateDivision/" + parseInt(data.depid),
        {
          department: data.department,
          depshort: data.depshort,
          payrollshort: data.payrollshort,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: actionTypes.UPDATE_DIVISION, data: _data });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
}
