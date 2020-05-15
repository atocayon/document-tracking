import actionTypes from "../actions/actionTypes";

const defaultState = {
  destination: "",
  remarks: ""
};
export default function forwardDocument(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.DOCUMENT_REMARKS:
      return Object.assign({}, state, {
        [action.data.name]: action.data.value
      });

    case actionTypes.CHANGE_DOCUMENT_DESTINATION:
      return Object.assign({}, state, {
        destination: "",
        remarks: ""
      });
    default:
      return state;
  }
}
