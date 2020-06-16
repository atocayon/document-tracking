import actionTypes from "../actions/actionTypes";

export default function manageDocumentCategory(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_SECTION_DOCUMENT_CATEGORY:
      return [...action.data];
    default:
      return state;
  }
}


