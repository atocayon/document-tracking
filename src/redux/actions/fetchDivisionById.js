import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";


export function fetchDivisionById(id) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"fetchDivisionById/" + id)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_DIVISION_BY_ID, data: res.data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
