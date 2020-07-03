import actionTypes from "../actions/actionTypes";
import Reactotron from "reactotron-react-js";
const defaultState = [];

export default function fetchSectionDocuments(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SECTION_DOCUMENTS:
      return [...action.data];
    case actionTypes.HANDLE_SEARCH_SECTION_DOCUMENT:
        return state.filter(data => data.subject === action.data || data.docType === action.data)
    default:
      return state;
  }
}
