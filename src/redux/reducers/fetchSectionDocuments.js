import actionTypes from "../actions/actionTypes";
import Reactotron from "reactotron-react-js";
const defaultState = [];

export default function fetchSectionDocuments(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SECTION_DOCUMENTS:
      return [...action.data];
    case actionTypes.HANDLE_SEARCH_SECTION_DOCUMENT:
      return state.filter((data) => {
        if (
          data.subject.charAt(0).toLowerCase() ===
            action.data.charAt(0).toLowerCase() ||
          data.docType.charAt(0).toLowerCase() ===
            action.data.charAt(0).toLowerCase() ||
          data.subject.charAt(data.subject.length - 1).toLowerCase() ===
            action.data.charAt(action.data.length - 1).toLowerCase() ||
          data.docType.charAt(data.docType.length - 1).toLowerCase() ===
            action.data.charAt(action.data.length - 1).toLowerCase()
        ) {
          return data;
        }
      });
    default:
      return state;
  }
}
