import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";

export function fetchSectionById(id) {
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"sections/" + id)
      .then((section) => {
        dispatch({ type: actionTypes.FETCH_USER_BY_ID, data: section.data });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
