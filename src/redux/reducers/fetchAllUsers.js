import actionTypes from "../actions/actionTypes";
import Reactotron from "reactotron-react-js";
const defaultState = [];

export default function fetchAllUsers(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ALL_USER:
      return [...action.data];
    case actionTypes.INPUT_CHANGE:
      return state.map((item) => {
        return Object.assign({}, item, {
          [action.text.name]: action.text.value,
        });
      });

    default:
      return state;
  }
}
