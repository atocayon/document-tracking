import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function fetchPendingDocuments(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PENDING_DOCUMENTS:
      return [...action.data];
    default:
      return state;
  }
}
