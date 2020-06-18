import axios from "axios";
import actionTypes from "./actionTypes";
import server_ip from "../server_ip";

export function fetchSectionsList() {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"sections")
      .then((_sections) => {
        dispatch({
          type: actionTypes.FETCH_SECTIONS_LIST,
          data: _sections.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
