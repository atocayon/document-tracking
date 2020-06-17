import actionTypes from "../actions/actionTypes";

export default function saveEditDocCategory(state = "", action) {
  switch (action.type) {
    case actionTypes.SAVE_EDIT_DOC_CATEGORY:
      return (state = action.data);
    default:
      return state;
  }
}
