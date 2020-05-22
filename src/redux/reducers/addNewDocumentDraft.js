import actionTypes from "../actions/actionTypes";

const defaultState = "";

export default function addNewDocumentDraft(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ADD_DOCUMENT_DRAFT:
      return (state = action.data);
    case actionTypes.CLEAR_SAVE_DRAFT_MESSAGE:
      return (state = "");
    default:
      return state;
  }
}
