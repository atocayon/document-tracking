import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../../component/endPoint";


export function trackDocument(trackingNumber) {
  return function (dispatch) {
    return axios
      .get(server_ip.SERVER_IP_ADDRESS+"track/" + trackingNumber)
      .then((res) => {
        dispatch({ type: actionTypes.TRACK_DOCUMENT, data: res.data });
        dispatch({type: actionTypes.CLEAR_RECEIVE_DOCUMENT});
      })
      .catch((err) => {
        throw err;
      });
  };
}
