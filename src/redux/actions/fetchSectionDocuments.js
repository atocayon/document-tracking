import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";
import Reactotron from "reactotron-react-js";
export function fetchSectionDocuments(token, folder) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"fetchSectionDocuments/" + token+"/"+folder)
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_SECTION_DOCUMENTS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
