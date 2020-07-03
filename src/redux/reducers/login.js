import actionTypes from "../actions/actionTypes";

const defaultState = {};

export default function login(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
