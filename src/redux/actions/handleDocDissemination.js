import actionTypes from "./actionTypes";
import axios from "axios";
export function handleDocDissemination(
  userId,
  doc_id,
  docInfo,
  remarks,
  destination,
  socket
) {
  return async function (dispatch) {
    return axios
      .post(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/dts/document/dissemination",
        {
          user_id: userId,
          doc_id,
          doc_info: docInfo,
          remarks,
          destination,
        }
      )
      .then((res) => {
        dispatch({
          type: actionTypes.HANDLE_DOC_DISSEMINATION,
          data: "success",
        });
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function clearDisseminationMessage() {
  return function (dispatch) {
    dispatch({ type: actionTypes.CLEAR_DISSEMINATION_MESSAGE });
  };
}
