import actionTypes from "../actions/actionTypes";

const defaultState = {
  documentTrackingNumber: ""
};

export default function documentTrackingNumber(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ONCHANGE_DOCUMENT_TRACKING_NUMBER:
      return Object.assign({}, state, {
        [action.text.name]: action.text.value
      });

    case actionTypes.HANDLE_SCAN:
      return Object.assign({}, state, { documentTrackingNumber: action.data });
    default:
      return state;
  }
}
