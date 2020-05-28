import actionTypes from "./actionTypes";
import axios from "axios";
const localIpUrl = require("local-ip-url");

export function fetchDocumentId(socket) {
  return async function (dispatch) {
    await socket.emit("assignTrackingNum");
    await socket.on("documentId", (data) => {
      dispatch({
        type: actionTypes.FETCH_DOCUMENT_ID,
        data,
      });
    });
  };
}
