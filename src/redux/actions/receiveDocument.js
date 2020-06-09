import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import server_ip from "../server_ip";

export function receiveDocument(documentTracking, user_id, user_section) {
  Reactotron.log(documentTracking, user_id, user_section);
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"receiveDocument", {
        documentTracking: documentTracking,
        user_id: user_id,
        user_section: user_section,
      })
      .then((res) => {
        Reactotron.log(res);
        if (res.data.success === "failed") {
          alert("Unknown document tracking number");
        } else {
          axios
            .get(
                server_ip.SERVER_IP_ADDRESS+"fetchActionReq/" +
                res.data.documentId
            )
            .then((action_req) => {
              dispatch({ type: actionTypes.RECEIVE_DOCUMENT, data: res.data });
              dispatch({
                type: actionTypes.CLEAR_NOTIFICATION,
                data: res.data.documentId,
              });
              dispatch({
                type: actionTypes.ACTION_REQ,
                data: action_req.data,
              });
              dispatch({ type: actionTypes.CLEAR_TRACK });
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
}

export function clearReceiveDocument() {
  return function (dispatch) {
    return dispatch({ type: actionTypes.CLEAR_RECEIVE_DOCUMENT });
  };
}
