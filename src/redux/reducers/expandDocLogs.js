import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function expandDocLogs(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.EXPAND_DOC_LOGS:
      return [...action.data];
    case actionTypes.CLEAR_EXPAND_DOC_LOGS:
      return [];
    default:
      return state;
  }
}
