import actionTypes from "../actions/actionTypes";

export default function listSectionDocCategory(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_LIST_SECTION_DOC_CATEGORY:
      return [...action.data];
    default:
      return state;
  }
}
