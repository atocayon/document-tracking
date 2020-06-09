import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import server_ip from "../server_ip";


export function addNewDivision(data) {
  Reactotron.log(data);
  const _data = {
    department: data.department,
    depshort: data.depshort,
    payrollshort: data.payroll,
  };
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"addDivision", {
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
