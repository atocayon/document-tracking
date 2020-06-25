import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";

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
          server_ip.SERVER_IP_ADDRESS+"updateDivision/" + parseInt(data.depid),
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
