import actionTypes from "../actions/actionTypes";
const defaultState = null;
export default function deleteUser(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.DELETE_USER:
      return (state = action.res);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
}
