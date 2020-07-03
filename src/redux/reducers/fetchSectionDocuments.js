import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function fetchSectionDocuments(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SECTION_DOCUMENTS:
      return [...action.data];
    case actionTypes.HANDLE_SEARCH_SECTION_DOCUMENT:
      return [...action.data];
    default:
      return state;
  }
}
