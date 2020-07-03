import actionTypes from "../actions/actionTypes";
const defaultState = {};

export default function fetchCurrentSystemUser(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_SYSTEM_CURRENT_USER:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
