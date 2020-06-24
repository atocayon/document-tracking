import actionTypes from "../actions/actionTypes";

const defaultState = [];
export default function fetchActiveUserList(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ACTIVE_USER_LIST:
      return [...action.data];
    default:
      return state;
  }
}
