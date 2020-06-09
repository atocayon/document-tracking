import actionTypes from "./actionTypes";
import axios from "axios";
import server_ip from "../server_ip";

export function afterDocumentReceive(
  documentId,
  user_id,
  remarks,
  destinationType,
  destination,
  status
) {
  return function (dispatch) {
    return axios
      .post(server_ip.SERVER_IP_ADDRESS+"afterDocumentReceive", {
        documentId,
        user_id,
        remarks,
        destinationType,
        destination,
        status,
      })
      .then((res) => {
        if (res.status === 200) {
          // dispatch({ type: actionTypes.CLEAR_RECEIVE_DOCUMENT });
          if (status === "2"){
              dispatch({
                  type: actionTypes.AFTER_DOCUMENT_RECEIVED,
                  data: "forwarded",
              });
          }

          if (status === "4"){
              dispatch({
                  type: actionTypes.AFTER_DOCUMENT_RECEIVED,
                  data: "completed",
              });
          }

        }
      })
      .catch((err) => {
        throw err;
      });
  };
}

