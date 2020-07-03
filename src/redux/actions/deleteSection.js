import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";


export function deleteSection(id) {
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"deleteSection/" + id)
      .then((res) => {
        dispatch({ type: actionTypes.DELETE_SECTION, data: id });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
