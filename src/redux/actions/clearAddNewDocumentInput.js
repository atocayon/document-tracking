import actionTypes from "./actionTypes";

export function clearAddNewDocumentInput() {
  return function (dispatch) {
    return dispatch({ type: actionTypes.CLEAR_DESTINATION });
  };
}

export function clearExternalDestinationInput() {
  return function (dispatch) {
    return dispatch({ type: actionTypes.CLEAR_EXTERNAL_DESTINATION_INPUT });
  };
}

export function clearInternalDestinationInput() {
  return function (dispatch) {
    return dispatch({ type: actionTypes.CLEAR_INTERNAL_DESTINATION_INPUT });
  };
}

export function removeDestination(index) {
  return function (dispatch) {
    return dispatch({ type: actionTypes.REMOVE_DESTINATION, index });
  };
}

export function clearAddNewDocumentState() {
  return function (dispatch) {
    return dispatch({ type: actionTypes.CLEAR_ADD_NEW_DOCUMENT_STATE });
  };
}
