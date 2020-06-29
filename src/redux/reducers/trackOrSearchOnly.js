import actionTypes from "../actions/actionTypes";

const defaultState = false;

export default function trackOrSearchOnly(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.TRACK_OR_SEARCH_ONLY:
      return (state = action.data);
    default:
      return state;
  }
}
