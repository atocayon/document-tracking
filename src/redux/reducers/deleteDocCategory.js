import actionTypes from "../actions/actionTypes";

export default function deleteDocCategory(state = "", action) {
  switch (action.type) {
    case actionTypes.DELETE_DOC_CATEGORY:
      return (state = action.data);
    case actionTypes.CLEAR_MESSAGE:
      return (state = "");
    default:
      return state;
  }
}
