import actionTypes from "../actions/actionTypes";

const defaultState = "";

export default function receiveDocument(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_DOCUMENT:
      return (state = action.data);
    case actionTypes.CLEAR_RECEIVE_DOCUMENT:
      return state = "";
    default:
      return state;
  }
}
