import actionTypes from "../actions/actionTypes";
const defaultState = [];

export default function fetchDocumentTypes(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DOCUMENT_TYPES:
      return [...state, ...action.data];
    case actionTypes.ADD_DOCUMENT_TYPE:
      return [...state, { ...action.data }];

    case actionTypes.UPDATE_DOCUMENT_TYPE:
      return state.map((data, index) => {
        if (data.id === parseInt(action.data.id)) {
          return Object.assign({}, data, { type: action.data.type });
        }

        return data;
      });

    case actionTypes.DELETE_DOCUMENT_TYPE:
      return state.filter(data => data.id !== action.data);
    default:
      return state;
  }
}
