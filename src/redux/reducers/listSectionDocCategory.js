import actionTypes from "../actions/actionTypes";

export default function listSectionDocCategory(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_LIST_SECTION_DOC_CATEGORY:
      return [...action.data];

    case actionTypes.ADD_NEW_DOCUMENT_CATEGORY:
      let arr = [...state];
      arr.push({
        id: parseInt(arr[arr.length - 1].id + 1),
        category: action.data,
      });

      return [...state, ...arr];

    case actionTypes.SAVE_EDIT_DOC_CATEGORY:
      return [...action.data];

    case actionTypes.DELETE_DOC_CATEGORY:
      return state.filter((item) => item.id !== parseInt(action.data));
    default:
      return state;
  }
}
