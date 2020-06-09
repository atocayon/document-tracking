import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";
export function handleSearchUserDocuments(value) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"searchUserDocument/" + value)
      .then((res) => {
        dispatch({
          type: actionTypes.HANDLE_SEARCH_USER_DOCUMENT,
          data: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}
