import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function notification(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.NOTIFICATION:
      return [...action.data ];
    case actionTypes.CLEAR_NOTIFICATION:
      return state.filter(data => data.documentId === action.data);
    default:
      return state;
  }
}
