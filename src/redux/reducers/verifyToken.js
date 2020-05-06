import actionTypes from "../actions/actionTypes";

const defaultState = {};

export default function verifyToken(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.VERIFY_TOKEN:
      return {...state, ...action.data};
    default:
      return state;
  }
}
