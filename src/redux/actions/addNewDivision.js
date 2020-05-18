import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
const localIpUrl = require("local-ip-url");

export function addNewDivision(data) {
  Reactotron.log(data);
  const _data = {
    department: data.department,
    depshort: data.depshort,
    payrollshort: data.payroll,
  };
  return function (dispatch) {
    return axios
      .post("http://" + localIpUrl("public", "ipv4") + "/dts/addDivision", {
        department: data.department,
        depshort: data.depshort,
        payrollshort: data.payroll,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: actionTypes.ADD_DIVISION, _data });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
}
