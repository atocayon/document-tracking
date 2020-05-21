import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

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
      .post("http://10.10.10.16:4000/dts/afterDocumentReceive", {
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

