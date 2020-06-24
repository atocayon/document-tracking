import actionTypes from "../actions/actionTypes";
const defaultState = [];

export default function searchBySubj(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SEARCH_BY_SUBJ:
      return [...action.data];
    default:
      return state;
  }
}
