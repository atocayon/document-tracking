import actionTypes from "../actions/actionTypes";

const defaultState = "";

export default function handleDocDissemination(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.HANDLE_DOC_DISSEMINATION:
      return (state = action.data);

    case actionTypes.CLEAR_DISSEMINATION_MESSAGE:
      return (state = "");
    default:
      return state;
  }
}
