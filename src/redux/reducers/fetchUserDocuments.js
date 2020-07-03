import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function fetchUserDocuments(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_DOCUMENTS:
      return [...action.data];
    case actionTypes.HANDLE_SEARCH_USER_DOCUMENT:
      return [...action.data];
    default:
      return state;
  }
}
