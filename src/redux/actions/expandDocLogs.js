import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function expandDocLogs(data, socket) {

  return async function (dispatch) {
    await socket.emit("expandDocLogs", data.doc_id, data.status);
    await socket.on("expandedDoc", (data) => {
      dispatch({ type: actionTypes.EXPAND_DOC_LOGS, data });
    });
  };
}

export function clearExpandLogs(){
  return async function(dispatch){
      dispatch({type: actionTypes.CLEAR_EXPAND_DOC_LOGS});
  }
}
