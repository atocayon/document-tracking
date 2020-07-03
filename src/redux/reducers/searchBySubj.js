import actionTypes from "../actions/actionTypes";
const defaultState = [];

export default function searchBySubj(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_BY_SUBJ:
      return [...action.data];
    case actionTypes.CLEAR_SEARCH_RESULT:
      return [];
    case actionTypes.TRACK_DOCUMENT:
      return [];
    default:
      return state;
  }
}
