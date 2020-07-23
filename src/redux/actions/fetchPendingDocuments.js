import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";
export function fetchPendingDocuments(user_id, socket) {
  return async function (dispatch) {
    await socket.emit("fetchPendingDocuments", user_id, (res) => {
      Reactotron.log(res);
      if (res) {
        if (res !== "server error") {
           dispatch({ type: actionTypes.FETCH_PENDING_DOCUMENTS, data: res });
        }
      }
    });
  };
}
