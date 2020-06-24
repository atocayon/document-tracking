import actionTypes from "../actions/actionTypes";
import Reactotron from "reactotron-react-js";
export default function manageDocumentCategory(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_SECTION_DOCUMENT_CATEGORY:
      return [...action.data];
    case actionTypes.ONCHANGE_EDIT_DOC_CATEGORY:
      return state.map((data, index) => {
        if (data.id === parseInt(action.data.name)) {
          return Object.assign({}, data, { category: action.data.value });
        }
        return data;
      });
    default:
      return state;
  }
}
