import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function trackDocument(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.TRACK_DOCUMENT:
      if (state.length > 0) {
        return state;
      } else {
        return [...state, ...action.data];
      }

    case actionTypes.CLEAR_TRACK:
      return [];
    default:
      return state;
  }
}
