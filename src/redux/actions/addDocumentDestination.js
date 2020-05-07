import actionTypes from "./actionTypes";

export function addDocumentDestination(destination) {
  return function(dispatch) {
    return dispatch({
      type: actionTypes.ADD_DOCUMENT_DESTINATION,
      data: destination
    });
  };
}
