import actionTypes from "./actionTypes";
import Reactotron from "reactotron-react-js";

export function documentActionRequired(_val, e) {
  return function (dispatch) {
    const { target } = e;
    Reactotron.log(e.target.type);
    if (target.checked) {
      return dispatch({
        type: actionTypes.ADD_DOCUMENT_ACTION_REQ,
        data: _val,
      });
    } else {
      return dispatch({
        type: actionTypes.REMOVE_DOCUMENT_ACTION_REQ,
        data: _val,
      });
    }
  };
}
