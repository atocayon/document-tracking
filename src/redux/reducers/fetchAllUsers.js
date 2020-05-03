import actionTypes from "../actions/actionTypes";

const defaultState = [];

export default function fetchAllUsers(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ALL_USER:
      return [...state, ...action.data];
    case actionTypes.POP_USER:
      let res = state;
      for (let i = 0; i < res.length; i++) {
        if (res[i].user_id === parseInt(action.data)) {
          res.splice(i, 1);
        }
      }
      return res;
    default:
      return state;
  }
}
