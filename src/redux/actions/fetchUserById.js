import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";


export function fetchUserById(id) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"user/" + parseInt(id))
      .then((_user) => {
        dispatch({
          type: actionTypes.FETCH_USER_BY_ID,
          data: _user.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
