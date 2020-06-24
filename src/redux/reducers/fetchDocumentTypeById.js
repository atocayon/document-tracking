import actionTypes from "../actions/actionTypes";

const defaultState = {};

export default function fetchDocumentTypeById(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DOCUMENT_TYPE_BY_ID:
      return { ...state, ...action.data };

    case actionTypes.INPUT_CHANGE:
      return Object.assign({}, state, {
        [action.text.name]: action.text.value
      });
    default:
      return state;
  }
}
