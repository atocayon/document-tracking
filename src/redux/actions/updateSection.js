import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";


export function updateSection(data) {
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"updateSection", { ...data })
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_SECTION, data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
