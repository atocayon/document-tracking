import actionTypes from "./actionTypes";

export function addDocumentDestination(destination) {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.ADD_DOCUMENT_DESTINATION,
      data: destination,
    });
  };
}

export function logDocumentCreator(data) {
  return function (dispatch) {
    return dispatch({ type: actionTypes.ADD_DOCUMENT_CREATOR, data });
  };
}

export function removeFirstIndexOnEditAddDocument(){
  return function(dispatch){
    return dispatch({type: actionTypes.REMOVE_FIRST_INDEX_DESTINATION});
  }
}
