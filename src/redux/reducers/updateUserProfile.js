import actionTypes from "../actions/actionTypes";
const defaultState = "";
export default function updateUserProfile(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_USER_PROFILE:
      return (state = action.res);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
}
