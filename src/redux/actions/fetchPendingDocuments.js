import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function fetchPendingDocuments(user_id) {
  return async function (dispatch) {
    return axios
      .get(
        "http://" +
          process.env.REACT_APP_SERVER +
          "/dts/document/pendings/" +
          user_id
      )
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_PENDING_DOCUMENTS, data: res.data });
      })
      .catch((err) => {
        throw err;
      });
  };
}
