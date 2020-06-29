import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import server_ip from "../../component/endPoint";
export function searchBySubj(subj) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"searchBySubject/" + subj)
      .then((res) => {
          Reactotron.log(res);
        dispatch({ type: actionTypes.SEARCH_BY_SUBJ, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
