import actionTypes from "./actionTypes";

export function resetTrackOrReceive() {
  return function (dispatch) {
    dispatch({ type: actionTypes.CLEAR_RECEIVE_DOCUMENT });
    dispatch({ type: actionTypes.CLEAR_TRACK });
    dispatch({ type: actionTypes.CLEAR_DOCUMENT_TRACKING_NUM });
    dispatch({type: actionTypes.CLEAR_SEARCH_RESULT})
  };
}
