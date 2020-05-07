import actionTypes from "./actionTypes";
export function addDocumentInputChange({ target }) {
  return function(dispatch) {
    return dispatch({
      type: actionTypes.ADD_DOCUMENT_INPUT_CHANGE,
      text: { name: target.name, value: target.value }
    });
  };
}
