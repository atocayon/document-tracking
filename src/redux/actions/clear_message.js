import actionTypes from "./actionTypes";

const clear_message = () => {
  return (dispatch) => {
    return dispatch({ type: actionTypes.CLEAR_MESSAGE });
  };
};

export { clear_message };
