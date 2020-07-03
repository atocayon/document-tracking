import actionTypes from "./actionTypes";

export function inputChange({ target }) {
  return function(dispatch) {
    return dispatch({
      type: actionTypes.INPUT_CHANGE,
      text: { name: target.name, value: target.value }
    });
  };
}
