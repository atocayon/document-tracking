import actionTypes from "../actions/actionTypes";

const defaultState = {};

export default function fetchDocumentActionRequired(
  state = defaultState,
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_DOCUMENT_ACTION_REQUIRED:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
