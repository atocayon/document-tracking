import actionTypes from "../actions/actionTypes";

const defaultState = {
  documentTrackingNumber: ""
};

export default function documentTrackingNumber(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.INPUT_CHANGE:
      return Object.assign({}, state, {
        [action.text.name]: action.text.value
      });
    default:
      return state;
  }
}
